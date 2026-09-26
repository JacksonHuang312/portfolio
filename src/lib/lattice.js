// Generates a hexagonal (graphene-style) lattice as plain data, so the component
// stays simple and GSAP can animate each bond individually.
//
// Tweak `size` for bigger/smaller hexagons and `seed` to move the highlighted atoms.

// Small seeded random so the atoms land in the same places on every render.
const mulberry32 = (seed) => () => {
  seed |= 0
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

const round = (n) => Math.round(n * 100) / 100
const key = (x, y) => `${Math.round(x * 10)}_${Math.round(y * 10)}`

export function buildLattice({ width, height, size = 46, atomCount = 6, atomGap = 130, seed = 11 }) {
  const w = Math.sqrt(3) * size // hexagon width (pointy-top)
  const rowH = 1.5 * size // vertical distance between rows
  const cols = Math.ceil(width / w) + 2
  const rows = Math.ceil(height / rowH) + 2

  const vertices = new Map()
  const bonds = new Map()

  for (let r = -1; r < rows; r++) {
    for (let c = -1; c < cols; c++) {
      const cx = c * w + (Math.abs(r) % 2 ? w / 2 : 0)
      const cy = r * rowH
      const pts = Array.from({ length: 6 }, (_, k) => {
        const a = ((30 + 60 * k) * Math.PI) / 180
        return [cx + size * Math.cos(a), cy + size * Math.sin(a)]
      })
      pts.forEach(([x, y]) => vertices.set(key(x, y), [round(x), round(y)]))
      for (let k = 0; k < 6; k++) {
        const [x1, y1] = pts[k]
        const [x2, y2] = pts[(k + 1) % 6]
        const a = key(x1, y1)
        const b = key(x2, y2)
        const id = a < b ? `${a}|${b}` : `${b}|${a}`
        // Neighbouring hexagons share edges, so only keep each bond once.
        if (!bonds.has(id)) {
          bonds.set(id, { x1: round(x1), y1: round(y1), x2: round(x2), y2: round(y2) })
        }
      }
    }
  }

  // Keep bonds that touch the visible area, ordered top-left to bottom-right
  // so a stagger in GSAP sweeps across the lattice diagonally.
  const edges = [...bonds.values()]
    .filter(
      (e) =>
        Math.max(e.x1, e.x2) >= 0 &&
        Math.min(e.x1, e.x2) <= width &&
        Math.max(e.y1, e.y2) >= 0 &&
        Math.min(e.y1, e.y2) <= height,
    )
    .sort((a, b) => a.x1 + a.y1 + a.x2 + a.y2 - (b.x1 + b.y1 + b.x2 + b.y2))

  // Highlighted atoms: random vertices, kept away from the edges
  // and each other.
  const rand = mulberry32(seed)
  const candidates = [...vertices.values()]
    .filter(([x, y]) => x > 70 && x < width - 70 && y > 70 && y < height - 70)
    .sort(() => rand() - 0.5)

  const atoms = []
  for (const [x, y] of candidates) {
    if (atoms.length >= atomCount) break
    if (atoms.every((a) => Math.hypot(a.x - x, a.y - y) > atomGap)) atoms.push({ x, y })
  }

  return { edges, atoms }
}
