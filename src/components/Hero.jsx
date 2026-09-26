import { Fragment, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Lattice from './Lattice.jsx'
import { ArrowDownRight, ChevronDown, Discord, GitHub, LinkedIn, Mail } from './Icons.jsx'
import { roles } from '../data/roles.js'
import { DISCORD_USERNAME, EMAIL, GITHUB_URL, LINKEDIN_URL } from '../data/contact.js'

gsap.registerPlugin(useGSAP)

// The headline is split into words so each one can rise out of its own mask.
// Only the name is left at full brightness; the rest sits back a shade.
// Each part starts on its own line.
const TITLE = [
  { text: 'Jackson Huang -' },
  { text: '@UWaterloo', muted: true, href: 'https://uwaterloo.ca/', highlight: 1 },
]

const LATTICE_WIDTH = 572
const LATTICE_HEIGHT = 660

function Title() {
  const words = TITLE.flatMap((part, p) =>
    part.text.split(' ').map((word, w) => ({
      word,
      muted: part.muted,
      href: part.href,
      highlight: part.highlight,
      lineStart: p > 0 && w === 0,
    })),
  )
  return (
    <h1 className="hero__title">
      {words.map(({ word, muted, href, highlight, lineStart }, i) => (
        <Fragment key={i}>
          {lineStart ? <br /> : i > 0 ? ' ' : null}
          <span className={muted ? 'word word--muted' : 'word'}>
            {href ? (
              <a className={`word__inner highlight highlight--${highlight}`} href={href} target="_blank" rel="noopener">{word}</a>
            ) : (
              <span className="word__inner">{word}</span>
            )}
          </span>
        </Fragment>
      ))}
    </h1>
  )
}

// Discord has no profile links for usernames, so this copies the username instead
// and briefly shows a note saying so.
function DiscordCopy() {
  const [status, setStatus] = useState(null)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(DISCORD_USERNAME)
      setStatus('copied')
    } catch {
      setStatus('failed')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setStatus(null), 2000)
  }

  return (
    <button
      type="button"
      className="hero__social-button"
      onClick={copy}
      aria-label={`Copy Discord username ${DISCORD_USERNAME}`}
    >
      <Discord />
      <span className={`hero__social-toast${status ? ' is-visible' : ''}`} role="status">
        {status === 'copied' && 'Username copied!'}
        {status === 'failed' && `Discord: ${DISCORD_USERNAME}`}
      </span>
    </button>
  )
}

export default function Hero() {
  const root = useRef(null)
  const visual = useRef(null)

  useGSAP(
    () => {
      const q = gsap.utils.selector(root)
      const mm = gsap.matchMedia()

      // Everything below only runs if the visitor hasn't asked for reduced motion.
      // Without it, the page simply shows its final state.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const atoms = q('.lattice__atom')

        // One orchestrated load sequence: bonds draw across, the headline rises,
        // the rest settles in, then the highlighted atoms pop.
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from(q('.word__inner'), { yPercent: 115, duration: 0.9, ease: 'power4.out', stagger: 0.06 }, 0.2)
          .from(q('[data-reveal]'), { autoAlpha: 0, y: 14, duration: 0.7, stagger: 0.08 }, 0.85)
          .from(atoms, { scale: 0, duration: 0.6, ease: 'back.out(2.2)', stagger: 0.12 }, 1.4)

        // A slow, quiet pulse on the atoms once everything has landed.
        gsap.to(atoms, {
          opacity: 0.35,
          scale: 0.75,
          duration: 2.2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 3,
          stagger: { each: 0.5, from: 'random' },
        })

        // On devices with a real pointer, the lattice drifts against the cursor.
        if (window.matchMedia('(hover: hover)').matches) {
          const card = visual.current
          const lattice = q('.lattice')[0]
          const dotNodes = q('.lattice__dot, .lattice__atom')
          const forceRadius = 165
          const forceStrength = 42
          const xTo = gsap.quickTo(lattice, 'x', { duration: 0.9, ease: 'power3' })
          const yTo = gsap.quickTo(lattice, 'y', { duration: 0.9, ease: 'power3' })

          const move = (e) => {
            const r = card.getBoundingClientRect()
            const pointerX = ((e.clientX - r.left) / r.width) * LATTICE_WIDTH
            const pointerY = ((e.clientY - r.top) / r.height) * LATTICE_HEIGHT

            xTo(-((e.clientX - r.left) / r.width - 0.5) * 28)
            yTo(-((e.clientY - r.top) / r.height - 0.5) * 28)

            dotNodes.forEach((dotNode) => {
              const dotX = Number(dotNode.dataset.x)
              const dotY = Number(dotNode.dataset.y)
              const distanceX = dotX - pointerX
              const distanceY = dotY - pointerY
              const distance = Math.hypot(distanceX, distanceY)

              if (distance >= forceRadius) {
                gsap.to(dotNode, { x: 0, y: 0, scale: 1, duration: 0.45, ease: 'power3.out', overwrite: true })
                return
              }

              const falloff = (1 - distance / forceRadius) ** 2
              const directionX = distance === 0 ? 1 : distanceX / distance
              const directionY = distance === 0 ? 0 : distanceY / distance

              gsap.to(dotNode, {
                x: directionX * forceStrength * falloff,
                y: directionY * forceStrength * falloff,
                scale: 1 + falloff * 0.9,
                duration: 0.4,
                ease: 'power3.out',
                overwrite: true,
              })
            })
          }
          const leave = () => {
            xTo(0)
            yTo(0)
            gsap.to(dotNodes, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'power3.out', overwrite: true })
          }

          card.addEventListener('pointermove', move)
          card.addEventListener('pointerleave', leave)
          return () => {
            card.removeEventListener('pointermove', move)
            card.removeEventListener('pointerleave', leave)
          }
        }
      })
    },
    { scope: root },
  )

  return (
    <section className="hero" id="top" ref={root}>
      <div className="hero__inner">
        <div className="hero__copy">
          <div className="hero__text">
            <Title />

            <div className="hero__socials" data-reveal>
              <a href={GITHUB_URL} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHub />
              </a>
              <a href={LINKEDIN_URL} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedIn />
              </a>
              <a href={`mailto:${EMAIL}`} aria-label={`Email ${EMAIL}`}>
                <Mail />
              </a>
              <DiscordCopy />
            </div>

            <p className="hero__lede" data-reveal>
              I&rsquo;m a{' '}
              <a
                className="highlight highlight--2"
                href="https://uwaterloo.ca/future-students/programs/nanotechnology-engineering"
                target="_blank"
                rel="noopener"
              >
                nanotechnology engineer
              </a>{' '}
              who builds hardware, machine learning, and web
              tools that turn ideas into working prototypes.
            </p>
          </div>

          <div className="hero__bottom">
            <div className="hero__roles" data-reveal>
              {roles.map((role) => (
                <div className="hero__role" key={role.company}>
                  <span className="hero__role-year">{role.year}</span>
                  <span className="hero__role-detail">
                    <strong>
                      {role.url ? (
                        <a className={`highlight highlight--${role.highlight}`} href={role.url} target="_blank" rel="noopener">{role.company}</a>
                      ) : role.company}
                    </strong> &mdash; {role.title}
                  </span>
                </div>
              ))}
            </div>

            <div className="hero__actions" data-reveal>
              <a className="btn btn--primary" href="#projects">
                <span className="btn__top-key" />
                <span className="btn__text">View Projects <ChevronDown /></span>
                <span className="btn__bottom-key-1" />
                <span className="btn__bottom-key-2" />
              </a>
              <a className="btn btn--ghost" href="#skills">
                <span className="btn__top-key" />
                <span className="btn__text">Skills <ArrowDownRight /></span>
                <span className="btn__bottom-key-1" />
                <span className="btn__bottom-key-2" />
              </a>
            </div>
          </div>
        </div>

        <div className="hero__visual" ref={visual}>
          <Lattice />
        </div>
      </div>

    </section>
  )
}
