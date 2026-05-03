// src/data/events.ts
// 参加イベントを KV から読む(静的化)。ソースは connpass と fortee.jp の2系統。
// KV への書き込みは scheduled ハンドラ経由 (Cron Triggers)。
// 取り込み元は各サービスの公開ユーザーページ HTML スクレイピング。
//
// なぜ KV (repos.ts / writing.ts は Cache API なのに):
//   HTML スクレイピングは RSS/Atom より重く、 every-edge で取りに行くと
//   先方への負荷も応答時間も悪化する。一箇所(scheduled)で取って
//   グローバルな KV に置けば、各エッジは KV を読むだけで済む。
//   軽量な RSS/Atom (writing.ts) や API ピンポイント取得 (repos.ts) は
//   per-edge Cache API で十分なので使い分けている。
//
// 2系統を別 KV キーで持つ理由: パーサも upstream の障害特性も独立。
// 片方のスクレイプが壊れても、もう片方はそのまま生かしたい。

import { decodeEntities, toDateStr } from '../lib/feed'

export type EventSource = 'connpass' | 'fortee'

export type EventItem = {
  title: string
  date: string  // YYYY-MM-DD
  url: string
  source: EventSource
}

const CONNPASS_KEY = 'events:connpass:v1'
const FORTEE_KEY = 'events:fortee:v1'
const LIMIT = 5
const CONNPASS_PAGE = 'https://connpass.com/user/mizzy/'
const FORTEE_PAGE = 'https://fortee.jp/u/mizzy'
const FORTEE_ORIGIN = 'https://fortee.jp'

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
    items.push({ title, url, date: toDateStr(dt), source: 'connpass' })
  }
  return items
}

// fortee の period は "2026/07/24 〜 07/25" (start のみ年月日, end は月日) や
// "2025/11/08 〜 11/08" のような表記。開始日だけ取って YYYY-MM-DD に正規化する。
const parseFortee = (html: string): EventItem[] => {
  const items: EventItem[] = []
  const blockRe = /<li class="conference[^"]*"[\s\S]*?<\/li>/g
  for (const block of html.match(blockRe) ?? []) {
    const titleMatch = block.match(/<h2 class="title"><a href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/h2>/)
    const periodMatch = block.match(/<div class="period">\s*([0-9]{4}\/[0-9]{2}\/[0-9]{2})/)
    if (!titleMatch || !periodMatch) continue
    const href = decodeEntities(titleMatch[1])
    const url = href.startsWith('http') ? href : `${FORTEE_ORIGIN}${href}`
    const title = decodeEntities(titleMatch[2].replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim())
    const date = toDateStr(periodMatch[1].replace(/\//g, '-'))
    items.push({ title, url, date, source: 'fortee' })
  }
  return items
}

const fallback: EventItem[] = [
  { title: 'connpass.com/user/mizzy', date: '', url: CONNPASS_PAGE, source: 'connpass' },
]

const readKey = async (kv: KVNamespace, key: string): Promise<EventItem[]> => {
  try {
    const data = await kv.get<EventItem[]>(key, 'json')
    if (Array.isArray(data)) return data
  } catch {
    // ignore
  }
  return []
}

export const getEvents = async (kv?: KVNamespace): Promise<EventItem[]> => {
  if (!kv) return fallback
  const [connpass, fortee] = await Promise.all([
    readKey(kv, CONNPASS_KEY),
    readKey(kv, FORTEE_KEY),
  ])
  const merged = [...connpass, ...fortee]
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, LIMIT)
  return merged.length ? merged : fallback
}

// scheduled ハンドラから呼び出す書き込み専用関数。
const ingestSource = async (
  kv: KVNamespace,
  url: string,
  key: string,
  parse: (html: string) => EventItem[],
): Promise<void> => {
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (compatible; gosu.ke/1.0; +https://gosu.ke)',
      Accept: 'text/html',
    },
  })
  if (!res.ok) return
  const html = await res.text()
  const items = parse(html).slice(0, LIMIT)
  if (!items.length) return
  await kv.put(key, JSON.stringify(items))
}

export const ingestEvents = async (kv: KVNamespace): Promise<void> => {
  await Promise.all([
    ingestSource(kv, CONNPASS_PAGE, CONNPASS_KEY, parseConnpass),
    ingestSource(kv, FORTEE_PAGE, FORTEE_KEY, parseFortee),
  ])
}
