// src/components/CareerSection.tsx
// ホーム用 Career サマリ。会社単位の年範囲のみ。
import { Section, ViewAll } from './Section'
import { career } from '../data/career'

export const CareerSection = () => {
  return (
    <Section label="Career" right={<ViewAll href="/career">See all →</ViewAll>}>
      <ul class="rows">
        {career.map((c) => (
          <li class="row row-dated">
            <span class="row-date">{c.span}</span>
            <div class="row-main">
              <span class="row-title">{c.company}</span>
              {c.role ? <div class="row-meta">{c.role}</div> : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
