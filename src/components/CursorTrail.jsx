import { useEffect, useRef } from 'react'

// A faint trail of tiny dots and squares that hang where the cursor was and fade out.
// Drawn on one full-screen canvas that ignores the mouse, and only on devices
// with a real pointer when the visitor hasn't asked for reduced motion.
const SPACING = 28 // px of cursor travel per particle
const MAX_PARTICLES = 80

export default function CursorTrail() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const motionOk = window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)')
    if (!motionOk.matches) return

    const ctx = canvas.getContext('2d')
    const particles = []
    let last = null
    let travelled = 0
    let frame = null

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Colours come from the theme tokens, so the trail follows light/dark mode.
    const palette = () => {
      const styles = getComputedStyle(document.querySelector('.app') ?? document.body)
      return [
        styles.getPropertyValue('--sage-strong').trim(),
        styles.getPropertyValue('--sage').trim(),
        styles.getPropertyValue('--ink').trim(),
      ]
    }

    const tick = (now) => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const t = (now - p.born) / p.life
        if (t >= 1) {
          particles.splice(i, 1)
          continue
        }
        p.x += p.vx
        p.y += p.vy
        ctx.globalAlpha = p.alpha * (1 - t)
        ctx.fillStyle = p.color
        if (p.square) {
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size)
        } else {
          ctx.beginPath()
          ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      frame = particles.length ? requestAnimationFrame(tick) : null
    }

    const move = (e) => {
      if (last) travelled += Math.hypot(e.clientX - last.x, e.clientY - last.y)
      last = { x: e.clientX, y: e.clientY }
      if (travelled < SPACING) return
      travelled = 0

      const colors = palette()
      const color = colors[Math.floor(Math.random() * colors.length)]
      particles.push({
        x: e.clientX + (Math.random() - 0.5) * 12,
        y: e.clientY + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 0.06,
        vy: (Math.random() - 0.5) * 0.06,
        size: 1.5 + Math.random() * 1.2,
        square: Math.random() < 0.5,
        color,
        alpha: color === colors[2] ? 0.2 : 0.4,
        born: performance.now(),
        life: 350 + Math.random() * 200,
      })
      if (particles.length > MAX_PARTICLES) particles.shift()
      if (!frame) frame = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', move, { passive: true })
    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', move)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return <canvas ref={canvasRef} className="cursor-trail" aria-hidden="true" />
}
