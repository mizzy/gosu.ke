// src/renderer.tsx
// 共通レイアウト: HTML 骨格 + フォント + CSS + フッター。
import { html } from 'hono/html'
import type { HtmlEscapedString } from 'hono/utils/html'
import { Footer } from './components/Footer'

const SITE_URL = 'https://gosu.ke'
const OG_IMAGE = `${SITE_URL}/static/images/og.webp`
const DEFAULT_DESCRIPTION =
  'Profile site of Gosuke Miyashita — freelance software engineer. OSS, talks, writing, and career.'

type LayoutOptions = {
  path?: string  // canonical / og:url 用 (例: '/', '/achievements')
  description?: string
}

export const layout = (
  title: string,
  body: HtmlEscapedString | Promise<HtmlEscapedString>,
  options: LayoutOptions = {}
) => {
  const url = `${SITE_URL}${options.path ?? '/'}`
  const description = options.description ?? DEFAULT_DESCRIPTION
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${title}</title>
        <meta name="description" content="${description}" />
        <link rel="canonical" href="${url}" />
        <link rel="icon" type="image/jpeg" href="/static/images/favicon.jpg" />
        <link rel="stylesheet" href="/static/css/style.css" />
        <meta property="og:title" content="${title}" />
        <meta property="og:description" content="${description}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${OG_IMAGE}" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@gosukenator" />
      </head>
      <body>
        <div class="wrapper">
          ${body}
          ${(<Footer />)}
        </div>
      </body>
    </html>`
}
