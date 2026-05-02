// src/renderer.tsx
// 共通レイアウト: HTML 骨格 + フォント + CSS + フッター。
import { html } from 'hono/html'
import type { HtmlEscapedString } from 'hono/utils/html'
import { Footer } from './components/Footer'

const SITE_URL = 'https://gosu.ke'
const OG_IMAGE = `${SITE_URL}/static/images/profile.jpg`

type LayoutOptions = {
  path?: string  // canonical / og:url 用 (例: '/', '/achievements')
}

export const layout = (
  title: string,
  body: HtmlEscapedString | Promise<HtmlEscapedString>,
  options: LayoutOptions = {}
) => {
  const url = `${SITE_URL}${options.path ?? '/'}`
  return html`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>${title}</title>
        <link rel="canonical" href="${url}" />
        <link rel="icon" type="image/jpeg" href="/static/images/favicon.jpg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/static/css/style.css" />
        <meta property="og:title" content="${title}" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="${url}" />
        <meta property="og:image" content="${OG_IMAGE}" />
      </head>
      <body>
        <div class="wrapper">
          ${body}
          ${(<Footer />)}
        </div>
      </body>
    </html>`
}
