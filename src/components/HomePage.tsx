// src/components/HomePage.tsx
import { Hero } from './Hero'
import { OssSection } from './OssSection'
import { FeaturedSection } from './FeaturedSection'
import { CareerSection } from './CareerSection'
import { EducationSection } from './EducationSection'
import { WritingStream } from './WritingStream'
import { EventsSection } from './EventsSection'
import { ChannelsSection } from './ChannelsSection'
import type { WritingItem } from '../data/writing'
import type { Repo } from '../data/repos'
import type { EventItem } from '../data/events'

type Props = {
  repos: Repo[]
  mizzyOrg: WritingItem[]
  hateblo: WritingItem[]
  slides: WritingItem[]
  events: EventItem[]
}

export const HomePage = ({ repos, mizzyOrg, hateblo, slides, events }: Props) => {
  return (
    <main class="home">
      <Hero />
      <OssSection repos={repos} />
      <FeaturedSection />
      <WritingStream label="Slides" sub="decks.gosu.ke / Speaker Deck" links={[{ text: 'decks.gosu.ke →', href: 'https://decks.gosu.ke/' }, { text: 'Speaker Deck →', href: 'https://speakerdeck.com/mizzy' }]} items={slides} />
      <WritingStream label="Tech"   sub="mizzy.org"     links={[{ text: 'See all →', href: 'https://mizzy.org/' }]}        items={mizzyOrg} />
      <EventsSection items={events} />
      <CareerSection />
      <EducationSection />
      <WritingStream label="Life"   sub="Hatena"        links={[{ text: 'See all →', href: 'https://mizzy.hateblo.jp/' }]} items={hateblo} />
      <ChannelsSection />
    </main>
  )
}
