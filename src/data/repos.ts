// src/data/repos.ts
// 看板OSSリポジトリ。Stars は GitHub API から動的に取得し、
// Cloudflare Cache API で 24h キャッシュする。

export type Repo = {
  name: string
  desc: string
  stars: string
  url: string
}

type RepoSpec = Omit<Repo, 'stars'> & { fallbackStars: string }

const repoSpecs: RepoSpec[] = [
  { name: 'mizzy/serverspec',  desc: 'RSpec tests for your servers',                  url: 'https://github.com/mizzy/serverspec',  fallbackStars: '2.5k' },
  { name: 'mizzy/specinfra',   desc: 'Common layer for serverspec / itamae',          url: 'https://github.com/mizzy/specinfra',   fallbackStars: '300'  },
  { name: 'carina-rs/carina',  desc: 'A strongly typed infrastructure management tool', url: 'https://github.com/carina-rs/carina',  fallbackStars: '48'   },
  { name: 'mizzy/maglica',     desc: 'A simple internal cloud tool',                   url: 'https://github.com/mizzy/maglica',     fallbackStars: '48'   },
]

const formatStars = (n: number): string => {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
  return String(n)
}

const fetchStars = async (fullName: string): Promise<number | null> => {
  const cacheUrl = `https://gosu.ke/__cache/gh-stars/${fullName}`
  const cache = (caches as any).default as Cache | undefined
  try {
    if (cache) {
      const hit = await cache.match(cacheUrl)
      if (hit) {
        const n = Number(await hit.text())
        if (Number.isFinite(n)) return n
      }
    }
  } catch {
    // ignore cache failures
  }

  try {
    const res = await fetch(`https://api.github.com/repos/${fullName}`, {
      headers: {
        'User-Agent': 'gosu.ke',
        Accept: 'application/vnd.github+json',
      },
    })
    if (!res.ok) return null
    const json: any = await res.json()
    const n = json?.stargazers_count
    if (typeof n !== 'number') return null

    if (cache) {
      try {
        await cache.put(
          cacheUrl,
          new Response(String(n), {
            headers: { 'Cache-Control': 'public, max-age=86400' },
          })
        )
      } catch {
        // ignore cache put failures
      }
    }
    return n
  } catch {
    return null
  }
}

export const getRepos = async (): Promise<Repo[]> => {
  const stars = await Promise.all(repoSpecs.map((r) => fetchStars(r.name)))
  return repoSpecs.map((r, i) => {
    const n = stars[i]
    return {
      name: r.name,
      desc: r.desc,
      url: r.url,
      stars: n != null ? formatStars(n) : r.fallbackStars,
    }
  })
}
