import { useEffect, useState } from 'react'
import { LinkedIn, GitHub, Document } from './Icons.jsx'

const EMAIL = 'j672huan@uwaterloo.ca'

const timeFormatter = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: '2-digit',
  timeZone: 'America/Toronto',
})

function useLocalTime() {
  const [time, setTime] = useState(() => timeFormatter.format(new Date()))

  useEffect(() => {
    const id = setInterval(() => setTime(timeFormatter.format(new Date())), 1000)
    return () => clearInterval(id)
  }, [])

  return time
}

export default function Footer() {
  const time = useLocalTime()

  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <a className="site-footer__email" href={`mailto:${EMAIL}`}>{EMAIL}</a>

        <div className="site-footer__clock">
          <span className="site-footer__clock-dot" aria-hidden="true" />
          {time} in Waterloo, ON
        </div>

        <div className="site-footer__links">
          <a href="/cv.pdf" target="_blank" rel="noopener" aria-label="Resume">
            <Document />
            <span>Resume</span>
          </a>
          <a href="https://www.linkedin.com/in/jackson-huang-a5792b359/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedIn />
            <span>LinkedIn</span>
          </a>
          <a href="https://github.com/JacksonHuang312" target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHub />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
