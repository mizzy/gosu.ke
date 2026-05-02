# gosu.ke

Profile site of Gosuke Miyashita, deployed on Cloudflare Workers with Hono.

## Stack

- [Hono](https://hono.dev/) — server-side rendered JSX
- Cloudflare Workers + KV + Cron Triggers
- TypeScript

## Development

```sh
npm install
npm run dev
```

Opens `http://localhost:8787`.

Miniflare does not run crons automatically, but `npm run dev` enables
`--test-scheduled` so you can trigger the handler manually:

```sh
# in another shell
curl "http://localhost:8787/__scheduled?cron=0+*+*+*+*"
```

## Deploy

One-time setup:

```sh
npx wrangler login
npx wrangler kv namespace create SITE_KV
# paste the returned id into wrangler.toml under [[kv_namespaces]] -> id
```

Deploy:

```sh
npm run deploy
```

The Worker runs on `gosu.ke` via the custom domain configured in `wrangler.toml`.

## Architecture

- `src/index.tsx` — routes (`/`, `/achievements`, `/career`) and the `scheduled` handler
- `src/components/` — Hono JSX components (one per section)
- `src/data/` — content sources
  - `repos.ts` — GitHub stars (Cache API, 24h TTL)
  - `writing.ts` — RSS/Atom feeds for mizzy.org / Hatena / Speaker Deck (Cache API, 1h TTL)
  - `events.ts` — connpass scraping (KV-backed; refreshed by hourly cron)
  - `achievements.ts`, `career.ts`, `education.ts` — static content
- `src/lib/url.ts` — URL allowlist guard for external links
- `src/renderer.tsx` — shared HTML layout with security headers

## Cron

`0 * * * *` — hourly `scheduled` handler refreshes connpass events into KV.
