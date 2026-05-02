// src/data/events.ts
// connpass 参加イベントを KV から読む(静的化)。
// KV への書き込みは scheduled ハンドラ経由 (Cron Triggers)。
// 取り込み元は connpass の公開ユーザーページ HTML (hCalendar / vevent)。
//
// なぜ KV (repos.ts / writing.ts は Cache API なのに):
//   HTML スクレイピングは RSS/Atom より重く、 every-edge で取りに行くと
//   connpass への負荷も応答時間も悪化する。一箇所(scheduled)で取って
//   グローバルな KV に置けば、各エッジは KV を読むだけで済む。
//   軽量な RSS/Atom (writing.ts) や API ピンポイント取得 (repos.ts) は
//   per-edge Cache API で十分なので使い分けている。

import { decodeEntities, toDateStr } from '../lib/feed'

export type EventItem = {
  title: string
  date: string  // YYYY-MM-DD
  url: string
}

const KV_KEY = 'events:connpass:v1'
const LIMIT = 5
const USER_PAGE = 'https://connpass.com/user/mizzy/'

const parseConnpass = (html: string): EventItem[] => {
  const items: EventItem[] = []
  const blockRe = /<div class="event_list vevent">[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/g
  for (const block of html.match(blockRe) ?? []) {
    const dt = block.match(/<span class="dtstart">[\s\S]*?title="([^"]+)"/)?.[1]
    const linkMatch = block.match(/<a class="url summary"\s+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/)
    if (!dt || !linkMatch) continue
    const url = decodeEntities(linkMatch[1])
    const stripped = linkMatch[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
    const title = decodeEntities(stripped)
    items.push({ title, url, date: toDateStr(dt) })
  }
  return items
}

const fallback: EventItem[] = [
  { title: 'connpass.com/user/mizzy', date: '', url: USER_PAGE },
]

export const getEvents = async (kv?: KVNamespace): Promise<EventItem[]> => {
  if (!kv) return fallback
  try {
    const data = await kv.get<EventItem[]>(KV_KEY, 'json')
    if (Array.isArray(data) && data.length) return data
  } catch {
    // ignore
  }
  return fallback
}

// scheduled ハンドラから呼び出す書き込み専用関数。
export const ingestEvents = async (kv: KVNamespace): Promise<void> => {
  const res = await fetch(USER_PAGE, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; gosu.ke/1.0; +https://gosu.ke)',
      Accept: 'text/html',
    },
  })
  if (!res.ok) return
  const html = await res.text()
  const items = parseConnpass(html).slice(0, LIMIT)
  if (!items.length) return
  await kv.put(KV_KEY, JSON.stringify(items))
}
