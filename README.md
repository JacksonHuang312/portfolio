<<<<<<< HEAD
# Jackson Huang: portfolio (starter)

Vite + React, with GSAP for the hero animation. Header and hero are built from the
`student-portfolio` frame in Figma; the other sections are next.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

Put your CV in `public/cv.pdf` so the "Open CV" button works.

## Where things live

| File | What to change |
| --- | --- |
| `src/styles.css` | Colors, fonts, spacing (tokens at the top). Retune the whole look here. |
| `src/components/Hero.jsx` | The GSAP timeline, hero copy, buttons. |
| `src/lib/lattice.js` | Hexagon `size` and the `seed` that decides which atoms are highlighted. |
| `src/components/Lattice.jsx` | The SVG the lattice renders into. |

## How the hero animation works

- **Load sequence (one timeline):** bonds draw across the lattice, headline words rise out of
  masks, the pills, paragraph, and buttons settle in, then the atoms pop.
- **Ambient:** the atoms pulse slowly; the lattice drifts against the cursor on devices with a real pointer.
- **Reduced motion:** everything sits inside `gsap.matchMedia('(prefers-reduced-motion: no-preference)')`,
  so visitors who ask for less motion just see the finished page.

Each bond is a `<path pathLength="1">`, so "drawing" it is a single `strokeDashoffset: 1 -> 0`
with no plugin needed.

## Notes

- Fonts (Fraunces, Figtree) are installed from npm via Fontsource, so nothing loads from Google.
- The terracotta and sage in the Figma file are a bit too light for small text on cream, so buttons
  and pills use slightly darker `--terracotta-strong` / `--sage-strong`. The big headline keeps the original terracotta.
- Nav links point at `#studies`, `#skills`, `#coursework`, `#projects`, `#experience`. Give your
  sections those ids as you build them.

## Next steps

1. Build Studies, Projects, Experience, Interests, Contact from the Figma frame.
2. If you want scroll animation later: `import { ScrollTrigger } from 'gsap/ScrollTrigger'`,
   `gsap.registerPlugin(ScrollTrigger)`, and tie it to something specific instead of fading everything in.
=======
# portfolio
>>>>>>> d9a14eb5e83e8aba8e64a843aa41dcf001816c7f
