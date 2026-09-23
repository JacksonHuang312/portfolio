import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import SkillMarquee from './components/SkillMarquee.jsx'
import Footer from './components/Footer.jsx'

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
    </div>
  )
}
