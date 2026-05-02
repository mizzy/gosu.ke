// src/data/writing.ts
// 各ストリームの最新エントリ。
// - mizzy.org    : Atom フィードから動的取得 (1h キャッシュ)
// - hateblo      : RSS フィードから動的取得 (1h キャッシュ)
// - speakerdeck  : Atom フィードから動的取得 (1h キャッシュ)

export type WritingItem = {
  title: string
  date: string // YYYY-MM-DD
  url: string
}

const cacheTtlSec = 3600

const decodeEntities = (s: string): string =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")

const toDateStr = (raw: string): string => {
  const d = new Date(raw.trim())
  if (isNaN(d.getTime())) return raw.trim().slice(0, 10)
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

const parseAtom = (xml: string): WritingItem[] => {
  const items: WritingItem[] = []
  const entryRe = /<entry\b[\s\S]*?<\/entry>/g
  for (const entry of xml.match(entryRe) ?? []) {
    const title = entry.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]
    const link = entry.match(/<link[^>]*\bhref="([^"]+)"/)?.[1]
    const date = entry.match(/<(updated|published)[^>]*>([\s\S]*?)<\/\1>/)?.[2]
    if (!title || !link || !date) continue
    items.push({ title: decodeEntities(title).trim(), url: link, date: toDateStr(date) })
  }
  return items
}

const parseRss = (xml: string): WritingItem[] => {
  const items: WritingItem[] = []
  const itemRe = /<item\b[\s\S]*?<\/item>/g
  for (const it of xml.match(itemRe) ?? []) {
    const title = it.match(/<title[^>]*>([\s\S]*?)<\/title>/)?.[1]
    const link = it.match(/<link[^>]*>([\s\S]*?)<\/link>/)?.[1]
    const date = it.match(/<pubDate[^>]*>([\s\S]*?)<\/pubDate>/)?.[1]
    if (!title || !link) continue
    items.push({
      title: decodeEntities(title).trim(),
      url: decodeEntities(link).trim(),
      date: date ? toDateStr(date) : '',
    })
  }
  return items
}

const fetchFeed = async (
  feedUrl: string,
  parser: (xml: string) => WritingItem[],
  fallback: WritingItem[],
  limit = 5
): Promise<WritingItem[]> => {
  const cacheKey = `https://gosu.ke/__cache/feed/${encodeURIComponent(feedUrl)}/${limit}`
  const cache = (caches as any).default as Cache | undefined
  try {
    if (cache) {
      const hit = await cache.match(cacheKey)
      if (hit) {
        const data = (await hit.json()) as WritingItem[]
        if (Array.isArray(data) && data.length) return data
      }
    }
  } catch {
    // ignore cache failures
  }

  try {
    const res = await fetch(feedUrl, { headers: { 'User-Agent': 'gosu.ke' } })
    if (!res.ok) return fallback
    const xml = await res.text()
    const items = parser(xml).slice(0, limit)
    if (!items.length) return fallback

    if (cache) {
      try {
        await cache.put(
          cacheKey,
          new Response(JSON.stringify(items), {
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': `public, max-age=${cacheTtlSec}`,
            },
          })
        )
      } catch {
        // ignore cache put failures
      }
    }
    return items
  } catch {
    return fallback
  }
}

const mizzyOrgFallback: WritingItem[] = [
  { title: 'mizzy.org', date: '', url: 'https://mizzy.org/' },
]

const hatebloFallback: WritingItem[] = [
  { title: 'mizzy.hateblo.jp', date: '', url: 'https://mizzy.hateblo.jp/' },
]

export const getMizzyOrg = (): Promise<WritingItem[]> =>
  fetchFeed('https://mizzy.org/atom.xml', parseAtom, mizzyOrgFallback)

export const getHateblo = (): Promise<WritingItem[]> =>
  fetchFeed('https://mizzy.hateblo.jp/rss', parseRss, hatebloFallback)

const speakerdeckFallback: WritingItem[] = [
  { title: 'speakerdeck.com/mizzy', date: '', url: 'https://speakerdeck.com/mizzy' },
]

export const getSpeakerdeck = (): Promise<WritingItem[]> =>
  fetchFeed('https://speakerdeck.com/mizzy.atom', parseAtom, speakerdeckFallback)
