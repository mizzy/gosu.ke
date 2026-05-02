// src/components/FeaturedSection.tsx
// 業績(全カテゴリ)から代表をピックアップ。
import { Section, ViewAll } from './Section'
import { safeUrl } from '../lib/url'
import { achievements } from '../data/achievements'

export const FeaturedSection = () => {
  // ピックアップ:
  //   - 第10回 日本OSS奨励賞
  //   - Black Duck Open Source Rookies of the Year 2013
  //   - トップ論文
  //   - Serverspec (O'Reilly Japan, 著)
  //   - Infrastructure as Code (O'Reilly Japan, 監訳)
  //   - 初の海外登壇
  const picks = [
    achievements.awards.items[0],
    achievements.awards.items.find((i) => i.title.startsWith('Black Duck')),
    achievements.papers.items[0],
    achievements.writing.items.find((i) => i.title === 'Serverspec'),
    achievements.writing.items.find((i) => i.title === 'Infrastructure as Code'),
    achievements.talks.items.find((i) => i.country === 'intl'),
  ].filter(Boolean) as typeof achievements.awards.items

  return (
    <Section label="Featured" right={<ViewAll href="/achievements">See all →</ViewAll>}>
      <ul class="rows">
        {picks.map((it) => (
          <li class="row row-dated">
            <span class="row-date">{it.year}</span>
            <div class="row-main">
              <a class="row-title" href={it.url ? safeUrl(it.url) : '#'} target="_blank" rel="noopener noreferrer">{it.title}</a>
              <div class="row-meta">{it.venue}</div>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  )
}
