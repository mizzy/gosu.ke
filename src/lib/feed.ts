// src/lib/feed.ts
// フィード/HTML パーサ用の共通ヘルパ。

// HTML/XML のエンティティを最低限デコードする。
// CDATA / 名前付き5種 / 数値文字参照 (10進・16進) に対応。
export const decodeEntities = (s: string): string =>
  s
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(x[0-9a-f]+|[0-9]+);/gi, (_, n: string) => {
      const code = n[0] === 'x' || n[0] === 'X'
        ? parseInt(n.slice(1), 16)
        : parseInt(n, 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : ''
    })

// 日付を Asia/Tokyo (JST) で YYYY-MM-DD に整形。
// Cloudflare Workers ランタイムは UTC で動くため、明示的にタイムゾーン指定が必要。
const jstFmt = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Tokyo',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
})

export const toDateStr = (raw: string): string => {
  const d = new Date(raw.trim())
  if (isNaN(d.getTime())) return raw.trim().slice(0, 10)
  // en-CA のロケールフォーマットは "YYYY-MM-DD" を返す。
  return jstFmt.format(d)
}
