// src/components/ChannelsSection.tsx
import { Section } from './Section'
import { safeUrl } from '../lib/url'

const accounts = [
  { kind: 'GitHub',       value: 'mizzy',                  url: 'https://github.com/mizzy' },
  { kind: 'X',            value: 'gosukenator',            url: 'https://x.com/gosukenator' },
  { kind: 'Speaker Deck', value: 'mizzy',                  url: 'https://speakerdeck.com/mizzy' },
  { kind: 'Blog',         value: 'mizzy.org',              url: 'https://mizzy.org/' },
  { kind: 'Hatena',       value: 'mizzy.hateblo.jp',       url: 'https://mizzy.hateblo.jp/' },
  { kind: 'Email',        value: 'gosukenator@gmail.com',  url: 'mailto:gosukenator@gmail.com' },
]

export const ChannelsSection = () => {
  return (
    <Section label="Channels">
      <ul class="rows">
        {accounts.map((a) => {
          const isExternal = a.url.startsWith('http://') || a.url.startsWith('https://')
          return (
            <li class="row row-channel">
              <span class="row-kind">{a.kind}</span>
              <a
                class="row-link"
                href={safeUrl(a.url)}
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
              >
                {a.value}
              </a>
            </li>
          )
        })}
      </ul>
    </Section>
  )
}
