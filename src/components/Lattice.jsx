import { useMemo } from 'react'
import { buildLattice } from '../lib/lattice.js'

// The SVG is 10% larger than the card it sits in, so it can drift with the
// cursor without exposing an edge. Keep these in sync with `.lattice-svg`.
const W = 572
const H = 660

export default function Lattice() {
  const { edges, atoms } = useMemo(
    () => buildLattice({ width: W, height: H, size: 46, atomCount: 6, seed: 11 }),
    [],
  )

  const dots = useMemo(() => {
    const columns = 14
    const rows = 16
    const gapX = W / (columns - 1)
    const gapY = H / (rows - 1)

    return Array.from({ length: columns * rows }, (_, index) => ({
      x: (index % columns) * gapX,
      y: Math.floor(index / columns) * gapY,
    }))
  }, [])

  return (
    <svg className="lattice-svg" viewBox={`0 0 ${W} ${H}`} aria-hidden="true" focusable="false">
      <g className="lattice">
        {dots.map((dot, i) => (
          <circle key={i} className="lattice__dot" cx={dot.x} cy={dot.y} r="2.5" />
        ))}
        {atoms.map((a, i) => (
          <circle key={i} className="lattice__atom" cx={a.x} cy={a.y} r="6" />
        ))}
      </g>
    </svg>
  )
}
