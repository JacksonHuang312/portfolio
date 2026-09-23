// Only the handful of icons this page uses, drawn inline so there's no icon dependency.
const base = {
  width: 16,
  height: 16,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
}

export const ArrowLeft = () => (
  <svg {...base}><path d="M19 12H5" /><path d="m12 19-7-7 7-7" /></svg>
)

export const BackChevrons = () => (
  <svg width="30" height="20" viewBox="0 0 30 20" fill="none" aria-hidden="true" focusable="false">
    <path d="m27 2-8 8 8 8M18 2l-8 8 8 8M9 2l-8 8 8 8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter" />
  </svg>
)

export const ArrowRight = () => (
  <svg {...base}><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
)

export const ChevronDown = () => (
  <svg {...base}><path d="m6 9 6 6 6-6" /></svg>
)

export const ArrowDownRight = () => (
  <svg {...base}><path d="m7 7 10 10" /><path d="M17 7v10H7" /></svg>
)

export const BrandMark = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" focusable="false">
    <rect x="3" y="3" width="3.5" height="9" rx="1" />
    <rect x="8.25" y="3" width="3.5" height="14" rx="1" />
    <rect x="13.5" y="3" width="3.5" height="6" rx="1" />
  </svg>
)
