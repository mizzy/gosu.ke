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

// 内部リンク (`/foo`) は素通り、絶対URLは safeUrl で検証する。
// `//` 始まりの protocol-relative URL は外部リンク扱いで safeUrl に流して弾く。
const linkHref = (href: string): string =>
  href.startsWith('/') && !href.startsWith('//') ? href : safeUrl(href)

export const ViewAll = ({ href, children }: { href: string; children: any }) => (
  <a class="view-all" href={linkHref(href)}>{children}</a>
)
