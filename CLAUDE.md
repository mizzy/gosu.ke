# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — Wrangler dev server with `--test-scheduled` enabled. Hits at `http://localhost:8787`. Trigger the cron handler with `curl "http://localhost:8787/__scheduled?cron=0+*+*+*+*"`.
- `npm run deploy` — `wrangler deploy --minify`. Pushes to Cloudflare Workers under the `gosu.ke` custom domain.
- `npx tsc --noEmit` — type-check (no test runner is configured).
- `npx wrangler deploy --dry-run --outdir /tmp/wrangler-out` — verify the build without uploading.

The dev server uses Miniflare; KV is simulated locally and persists in `.wrangler/state/v3/cache/` and `.wrangler/state/v3/kv/`. **Cron triggers do not fire automatically** — `--test-scheduled` is what makes the `/__scheduled` endpoint available.

## Architecture

Server-rendered profile site on Cloudflare Workers. Hono with `hono/jsx` provides JSX SSR; there is no client-side runtime besides the Inter web font.

### Request → page

1. `src/index.tsx` is the Worker entry. It exports `{ fetch, scheduled }`.
2. `secureHeaders` middleware (CSP allowlists Google Fonts; HSTS, X-Frame-Options DENY, etc.) wraps every route.
3. Three routes: `/`, `/achievements`, `/career`. The home route fan-outs to five external data sources via `Promise.all` and passes results into `<HomePage>` as props. Achievements and Career are static.
4. `src/renderer.tsx` `layout()` produces the HTML shell. It takes a `path` option to emit per-page `<title>`, `og:title`, `og:url`, and `<link rel="canonical">`.

### Data layer (`src/data/`)

| File | Source | Cache layer | Refresh |
|------|--------|-------------|---------|
| `repos.ts` | GitHub REST (`/repos/{owner}/{repo}`) | Cache API | 24h on read miss |
| `writing.ts` | mizzy.org Atom, hateblo RSS, Speaker Deck Atom | Cache API | 1h on read miss |
| `events.ts` | connpass user-page HTML scrape | **KV** (`SITE_KV`, key `events:connpass:v1`) | hourly cron via `scheduled` |
| `achievements.ts`, `career.ts`, `education.ts` | inline TS | n/a | hand-edited |

Why the split: events live in KV because they are populated by `scheduled` (consistent across edge POPs); the others are cheap RSS/JSON pulls and tolerate per-edge cache. Cache-API helpers in `repos.ts`/`writing.ts` and the KV reader in `events.ts` all degrade silently to fallback rows on any error.

`src/lib/feed.ts` holds the shared `decodeEntities` (named + numeric character references) and `toDateStr` (formats in **`Asia/Tokyo`** — Workers run in UTC, so naive UTC formatting was off by a day for late-night JST timestamps).

### URL safety

External URLs (from feeds, scraping, or static data) are funneled through `src/lib/url.ts` `safeUrl()` before being placed in `href`. It allowlists `http:`, `https:`, `mailto:` and rejects relative URLs (`new URL(raw)` with no base). `src/components/Section.tsx` `linkHref()` is the special case for internal absolute paths (`/career`, `/achievements`) — it lets `/foo` through but explicitly catches protocol-relative `//evil.com` and routes it back to `safeUrl`.

External anchors must use `target="_blank" rel="noopener noreferrer"`. The `mailto:` row in `ChannelsSection` deliberately omits `target="_blank"` (it would leave an orphan blank tab when the OS hands the URL to the mail client).

### Featured picks

`FeaturedSection` curates 7 items by hand-picking from the achievement categories. Note that `achievements.talks.items` is **reverse-chronological**, so the "first international talk" is selected with `filter(...).at(-1)` (last array element = oldest). Don't switch back to `find()`.

### KV / Cron in production

`wrangler.toml` declares one KV namespace `SITE_KV` and one cron `0 * * * *`. The `id` in the toml is the production KV namespace id and is not a secret. New static-content sources should pick KV+cron (events.ts pattern) over Cache API if they need to be consistent across regions or if the upstream is expensive to hit.

## Conventions

- Hono JSX: SSR only, no client hydration. Keep components pure functions returning JSX.
- Section labels and chrome (Featured / See all / Channels / etc.) are English. Content (career titles, achievement entries, blog post titles) stays in its source language — typically Japanese. Do not auto-translate content.
- The Ink palette in `public/static/css/style.css` flips on `prefers-color-scheme: dark`. Light is the default block; the `@media` block overrides for dark.
- Section order in `HomePage.tsx` puts technical sections (OSS / Featured / Slides / Tech / Events) above personal (Career / Education / Life / Channels).
