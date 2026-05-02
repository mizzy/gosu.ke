// src/components/Hero.tsx
// 名前 + 一行サブ。

export const Hero = () => {
  return (
    <header class="hero">
      <div class="hero-avatar">
        <img src="/static/images/profile.jpg" alt="Gosuke Miyashita" width="64" height="64" />
      </div>
      <div class="hero-text">
        <h1>Gosuke Miyashita</h1>
        <p class="hero-sub">Freelance software engineer</p>
      </div>
    </header>
  )
}
