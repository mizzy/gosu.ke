// src/components/EventsSection.tsx
import { Section, ViewAll } from './Section'
import { safeUrl } from '../lib/url'
import type { EventItem } from '../data/events'

type Props = { items: EventItem[] }

export const EventsSection = ({ items }: Props) => {
  return (
    <Section
      label="Events"
      sub="connpass · fortee"
      right={
        <>
          <ViewAll href="https://connpass.com/user/mizzy/">connpass →</ViewAll>
          <ViewAll href="https://fortee.jp/u/mizzy">fortee →</ViewAll>
        </>
      }
    >
      <ul class="rows">
        {items.map((e) => (
          <li class="row row-dated">
            <span class="row-date">{e.date}</span>
            <a class="row-title" href={safeUrl(e.url)} target="_blank" rel="noopener noreferrer">{e.title}</a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
