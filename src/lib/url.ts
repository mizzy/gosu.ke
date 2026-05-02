// src/lib/url.ts
// 外部から取得した URL をリンクに使う前にスキームを検証するガード。
// 許可は http:, https:, mailto: のみ。
// 相対URLや javascript: / data: / vbscript: などは弾く。

const ALLOWED_PROTOCOLS = new Set(['http:', 'https:', 'mailto:'])

export const safeUrl = (raw: string): string => {
  if (typeof raw !== 'string' || !raw) return '#'
  try {
    // base 無しでパースし、相対URLは弾く。
    const u = new URL(raw)
    if (!ALLOWED_PROTOCOLS.has(u.protocol)) return '#'
    return u.toString()
  } catch {
    return '#'
  }
}
