import { useMemo } from 'react'
import { buildLattice } from '../lib/lattice.js'

// The SVG is 10% larger than the card it sits in, so it can drift with the
// cursor without exposing an edge. Keep these in sync with `.lattice-svg`.
const W = 572
const H = 660

// The highlighted atoms cycle through these shapes, each drawn around (x, y).
// data-x / data-y hold the centre so the hero's cursor effect works for any shape.
const SHAPES = ['circle', 'square', 'triangle', 'ring', 'diamond', 'plus']

function Atom({ x, y, shape }) {
  const props = { className: 'lattice__atom', 'data-x': x, 'data-y': y }

  switch (shape) {
    case 'square':
      return <rect {...props} x={x - 5.5} y={y - 5.5} width="11" height="11" rx="1.5" />
    case 'triangle':
      return <path {...props} d={`M${x} ${y - 7.5}L${x + 7} ${y + 5}H${x - 7}Z`} />
    case 'ring':
      return <circle {...props} className="lattice__atom lattice__atom--ring" cx={x} cy={y} r="5.5" />
    case 'diamond':
      return <path {...props} d={`M${x} ${y - 7.5}L${x + 7.5} ${y}L${x} ${y + 7.5}L${x - 7.5} ${y}Z`} />
    case 'plus':
      return (
        <path
          {...props}
          d={`M${x - 2} ${y - 7}h4v5h5v4h-5v5h-4v-5h-5v-4h5Z`}
        />
      )
    default:
      return <circle {...props} cx={x} cy={y} r="6" />
  }
}

export default function Lattice() {
  const { atoms } = useMemo(
    () => buildLattice({ width: W, height: H, size: 46, atomCount: 13, atomGap: 100, seed: 11 }),
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
          <circle key={i} className="lattice__dot" cx={dot.x} cy={dot.y} r="2.5" data-x={dot.x} data-y={dot.y} />
        ))}
        {atoms.map((a, i) => (
          <Atom key={i} x={a.x} y={a.y} shape={SHAPES[i % SHAPES.length]} />
        ))}
      </g>
    </svg>
  )
}
