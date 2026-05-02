// src/components/OssSection.tsx
import { Section, ViewAll } from './Section'
import { safeUrl } from '../lib/url'
import type { Repo } from '../data/repos'

type Props = { repos: Repo[] }

export const OssSection = ({ repos }: Props) => {
  return (
    <Section label="OSS" right={<ViewAll href="https://github.com/mizzy">GitHub →</ViewAll>}>
      <ul class="rows">
        {repos.map((r) => (
          <li class="row row-oss">
            <div class="row-main">
              <a class="row-title" href={safeUrl(r.url)} target="_blank" rel="noopener noreferrer">{r.name}</a>
              <div class="row-meta">{r.desc}</div>
            </div>
            <span class="row-side">★ {r.stars}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
