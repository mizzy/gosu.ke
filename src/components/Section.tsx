// src/components/Section.tsx
// セクションラッパー: 上罫線 + ラベル + (任意) 右側リンク。
import { safeUrl } from '../lib/url'

type Props = {
  label: string
  sub?: string
  right?: any
  children: any
}

export const Section = ({ label, sub, right, children }: Props) => {
  return (
    <section class="section">
      <div class="section-head">
        <h2 class="label">
          {label}
          {sub ? <span class="sub-label">· {sub}</span> : null}
        </h2>
        {right ? <div class="section-right">{right}</div> : null}
      </div>
      {children}
    </section>
  )
}

// 内部リンク (`/foo`) も許容するため、相対パスは素通り、絶対URLのみ safeUrl で検証する。
const linkHref = (href: string): string => (href.startsWith('/') ? href : safeUrl(href))

export const ViewAll = ({ href, children }: { href: string; children: any }) => (
  <a class="view-all" href={linkHref(href)}>{children}</a>
)
