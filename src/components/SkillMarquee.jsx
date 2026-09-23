const skillTiles = [
  { label: 'Nanofabrication', icon: '⌁' },
  { label: 'MEMS Design', icon: '⌬' },
  { label: 'Machine Learning', icon: '◌' },
  { label: 'Python', icon: '⌘' },
  { label: 'Web Development', icon: '◇' },
  { label: 'Data Analysis', icon: '▥' },
  { label: '3D Modeling', icon: '◈' },
  { label: 'Nanotechnology', icon: '⌁' },
  { label: 'Semiconductors', icon: '▦' },
  { label: 'React', icon: '✣' },
  { label: 'JavaScript', icon: 'JS' },
  { label: 'CAD', icon: '△' },
  { label: 'Prototyping', icon: '⌑' },
  { label: 'Experimental Research', icon: '◎' },
  { label: 'Git', icon: '⑂' },
]

export default function SkillMarquee() {
  return (
    <div className="skill-marquee" aria-label="Skills and areas of interest">
      <div className="skill-marquee__track">
        {[...skillTiles, ...skillTiles].map(({ label, icon }, index) => (
          <div className="skill-tile" key={`${label}-${index}`} aria-hidden={index >= skillTiles.length}>
            <span className="skill-tile__icon">{icon}</span>
            <span className="skill-tile__label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}