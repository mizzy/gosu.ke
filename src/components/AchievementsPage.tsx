// src/components/AchievementsPage.tsx
// 業績全件ページ。カテゴリごとに見出し + 行リスト。
import { achievements } from '../data/achievements'
import { safeUrl } from '../lib/url'

const monthLabel = (m?: number) => (m ? String(m).padStart(2, '0') : '')

export const AchievementsPage = () => {
  const cats = [
    achievements.awards,
    achievements.papers,
    achievements.writing,
    achievements.talks,
  ]

  return (
    <main class="page">
      <p class="page-back">
        <a href="/">
          <img src="/static/images/profile.jpg" alt="" width="32" height="32" />
          <span>← Gosuke Miyashita</span>
        </a>
      </p>
      <h1 class="page-title">Achievements</h1>

      {cats.map((cat) => (
        <section class="section">
          <div class="section-head">
            <h2 class="label">{cat.en}</h2>
          </div>
          <ul class="rows">
            {cat.items.map((it) => {
              const date = it.month ? `${it.year}.${monthLabel(it.month)}` : String(it.year)
              return (
                <li class="row row-dated">
                  <span class="row-date">{date}</span>
                  <div class="row-main">
                    {it.url ? (
                      <a class="row-title" href={safeUrl(it.url)} target="_blank" rel="noopener noreferrer">{it.title}</a>
                    ) : (
                      <span class="row-title">{it.title}</span>
                    )}
                    <div class="row-meta">
                      {it.venue}
                      {it.kind === 'book' ? <span class="tag"> · book</span> : null}
                      {it.kind === 'journal' ? <span class="tag"> · journal</span> : null}
                      {it.kind === 'workshop' ? <span class="tag"> · workshop</span> : null}
                      {it.country === 'intl' ? <span class="tag"> · intl</span> : null}
                      {it.co ? <span class="row-co"> · co-author: {it.co}</span> : null}
                    </div>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>
      ))}
    </main>
  )
}
