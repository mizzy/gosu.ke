// src/components/EducationSection.tsx
import { Section } from './Section'
import { education } from '../data/education'

export const EducationSection = () => {
  return (
    <Section label="Education">
      <ul class="rows">
        {education.map((e) => (
          <li class="row row-dated">
            <span class="row-date">{e.year}</span>
            <div class="row-main">
              <span class="row-title">{e.school}</span>
              <div class="row-meta">
                {e.detail}
                {e.note ? <span class="tag"> · {e.note}</span> : null}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
