// src/components/WritingStream.tsx
// Tech / Life / Slides のいずれか1ストリームを描画する汎用コンポーネント。
import { Section, ViewAll } from './Section'
import { safeUrl } from '../lib/url'
import type { WritingItem } from '../data/writing'

type Props = {
  label: string
  sub: string
  href: string
  items: WritingItem[]
}

export const WritingStream = ({ label, sub, href, items }: Props) => {
  return (
    <Section label={label} sub={sub} right={<ViewAll href={href}>See all →</ViewAll>}>
      <ul class="rows">
        {items.map((w) => (
          <li class="row row-dated">
            <span class="row-date">{w.date}</span>
            <a class="row-title" href={safeUrl(w.url)} target="_blank" rel="noopener noreferrer">{w.title}</a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
