import { ArrowRight, BrandMark } from './Icons.jsx'
import ThemeToggle from './ThemeToggle.jsx'

const links = [
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
]

export default function Header({ isDark, onThemeChange }) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Jackson Huang, home">
        <span className="brand__mark"><BrandMark /></span>
        <span className="brand__name">Jackson <em>.nano</em></span>
      </a>

      <nav className="site-nav" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href}>{l.label}</a>
        ))}
      </nav>

      <div className="header-actions">
        <ThemeToggle isDark={isDark} onChange={onThemeChange} />
        <a className="btn btn--primary" href="/cv.pdf" target="_blank" rel="noopener">
          <span className="btn__top-key" />
          <span className="btn__text">Open Resume <ArrowRight /></span>
          <span className="btn__bottom-key-1" />
          <span className="btn__bottom-key-2" />
        </a>
      </div>
    </header>
  )
}
