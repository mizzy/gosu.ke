// src/index.tsx
// ルーティング:
//   /              -> Home
//   /achievements  -> 業績全件
//   /career        -> 経歴全件
//
// scheduled ハンドラで Cron Triggers から外部ソースを KV に取り込み、
// fetch ハンドラ側は KV を読むだけ(静的化)。

import { Hono } from 'hono'
import { secureHeaders } from 'hono/secure-headers'
import { layout } from './renderer'
import { HomePage } from './components/HomePage'
import { AchievementsPage } from './components/AchievementsPage'
import { CareerPage } from './components/CareerPage'
import { getRepos } from './data/repos'
import { getMizzyOrg, getHateblo, getSpeakerdeck } from './data/writing'
import { getEvents, ingestEvents } from './data/events'

type Bindings = {
  SITE_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.use('*', secureHeaders({
  contentSecurityPolicy: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'"],
    fontSrc: ["'self'"],
    imgSrc: ["'self'", 'data:'],
    // Cloudflare Insights の beacon (static.cloudflareinsights.com から)
    // を許可。RUM 自体はゾーンで無効化済みだが、Cloudflare がページに
    // beacon.min.js を自動注入するため CSP 側で許可しないとブロック警告が出る。
    scriptSrc: ["'self'", 'https://static.cloudflareinsights.com'],
    connectSrc: ["'self'", 'https://cloudflareinsights.com'],
    frameAncestors: ["'none'"],
    baseUri: ["'self'"],
    formAction: ["'self'"],
  },
  strictTransportSecurity: 'max-age=31536000; includeSubDomains',
  xFrameOptions: 'DENY',
  xContentTypeOptions: 'nosniff',
  referrerPolicy: 'strict-origin-when-cross-origin',
  permissionsPolicy: {
    camera: [],
    microphone: [],
    geolocation: [],
    payment: [],
  },
  crossOriginOpenerPolicy: 'same-origin',
  crossOriginResourcePolicy: 'same-site',
}))

app.get('/', async (c) => {
  const [repos, mizzyOrg, hateblo, speakerdeck, events] = await Promise.all([
    getRepos(),
    getMizzyOrg(),
    getHateblo(),
    getSpeakerdeck(),
    getEvents(c.env.SITE_KV),
  ])
  return c.html(layout(
    'Gosuke Miyashita',
    <HomePage repos={repos} mizzyOrg={mizzyOrg} hateblo={hateblo} speakerdeck={speakerdeck} events={events} />,
    {
      path: '/',
      description:
        'Gosuke Miyashita — freelance software engineer. OSS, talks, writing, and career.',
    }
  ))
})

app.get('/achievements', (c) =>
  c.html(layout(
    'Achievements — Gosuke Miyashita',
    <AchievementsPage />,
    {
      path: '/achievements',
      description:
        'Awards, papers, books, articles, and talks by Gosuke Miyashita.',
    }
  ))
)

app.get('/career', (c) =>
  c.html(layout(
    'Career — Gosuke Miyashita',
    <CareerPage />,
    {
      path: '/career',
      description:
        'Career history of Gosuke Miyashita — from ITOCHU Techno-Science to paperboy&co. to freelance.',
    }
  ))
)

export default {
  fetch: app.fetch,
  scheduled: async (_event: ScheduledEvent, env: Bindings, ctx: ExecutionContext) => {
    ctx.waitUntil(ingestEvents(env.SITE_KV))
  },
}
