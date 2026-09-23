export default function ThemeToggle({ isDark, onChange }) {
  return (
    <label className="theme-toggle" title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
      <span className="sr-only">Theme: {isDark ? 'dark' : 'light'}</span>
      <input
        type="checkbox"
        role="switch"
        checked={isDark}
        onChange={(event) => onChange(event.target.checked)}
        aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      />
      <span className="theme-toggle__track" aria-hidden="true">
        <svg className="theme-toggle__icon" viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g className="theme-toggle__icon-split">
            <path
              d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
              fill="#f7f7f5"
            />
            <path
              d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
              fill="#111111"
            />
          </g>
          <path
            className="theme-toggle__icon-ring"
            d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
            fill="#f7f7f5"
          />
        </svg>
      </span>
    </label>
  )
}