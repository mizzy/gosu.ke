// src/components/CareerPage.tsx
// 職務経歴の詳細ページ。
import { career } from '../data/career'

export const CareerPage = () => {
  return (
    <main class="achievements">
      <p class="achievements-back"><a href="/">← Back to home</a></p>
      <h1 class="achievements-title">Career</h1>

      {career.map((c) => (
        <section class="section">
          <div class="section-head">
            <h2 class="career-company">{c.company}</h2>
            <p class="career-span">{c.span}</p>
          </div>
          <div class="career-entry">
            {c.role ? <p class="career-role">{c.role}</p> : null}
            {c.details && c.details.length ? (
              <ul class="career-list">
                {c.details.map((d) => <li>{d}</li>)}
              </ul>
            ) : null}
            {c.clients && c.clients.length ? (
              <>
                <p class="career-subhead">クライアント</p>
                <ul class="career-list">
                  {c.clients.map((cl) => <li>{cl}</li>)}
                </ul>
              </>
            ) : null}
          </div>
        </section>
      ))}
    </main>
  )
}
