import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import SkillMarquee from './components/SkillMarquee.jsx'
import Footer from './components/Footer.jsx'
import CursorTrail from './components/CursorTrail.jsx'

export default function App() {
  const [isDark, setIsDark] = useState(() => localStorage.getItem('theme') === 'dark')

  const handleThemeChange = (nextIsDark) => {
    if (!document.startViewTransition) {
      setIsDark(nextIsDark)
      return
    }

    document.startViewTransition(() => setIsDark(nextIsDark))
  }

  useEffect(() => {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }, [isDark])

  // Scroll to in-page sections without putting the #hash in the URL
  useEffect(() => {
    const handleClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      const link = e.target.closest('a[href^="#"]')
      if (!link) return
      const target = document.getElementById(link.getAttribute('href').slice(1))
      if (!target) return

      e.preventDefault()
      target.scrollIntoView()
      if (target.id === 'main') {
        target.setAttribute('tabindex', '-1')
        target.focus({ preventScroll: true })
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return (
    <div className={isDark ? 'app app--dark' : 'app'}>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header isDark={isDark} onThemeChange={handleThemeChange} />
      <main id="main">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <SkillMarquee />
      </main>
      <Footer />
      <CursorTrail />
    </div>
  )
}
