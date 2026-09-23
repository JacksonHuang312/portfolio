import { useEffect, useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import Projects from './components/Projects.jsx'
import SkillMarquee from './components/SkillMarquee.jsx'

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
        <section className="placeholder-section" id="studies" aria-labelledby="studies-title">
          <p className="pill pill--accent">Studies</p>
          <h2 id="studies-title">Nothing here for now.</h2>
        </section>
        <section className="placeholder-section" id="skills" aria-labelledby="skills-title">
          <p className="pill pill--sage">Skills</p>
          <h2 id="skills-title">Nothing here for now.</h2>
        </section>
        <section className="placeholder-section" id="coursework" aria-labelledby="coursework-title">
          <p className="pill pill--accent">Coursework</p>
          <h2 id="coursework-title">Nothing here for now.</h2>
        </section>
        <Projects />
        <section className="placeholder-section" id="experience" aria-labelledby="experience-title">
          <p className="pill pill--sage">Experience</p>
          <h2 id="experience-title">Nothing here for now.</h2>
        </section>
        <SkillMarquee />
      </main>
    </div>
  )
}
