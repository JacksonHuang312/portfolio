import { roles } from '../data/roles.js'

export default function Experience() {
  return (
    <section className="content-section" id="experience" aria-labelledby="experience-title">
      <div className="content-section__inner">
        <div className="section-intro">
          <h2 id="experience-title">Experience</h2>
        </div>

        <div className="experience-list">
          {roles.map((role) => (
            <article className="experience-item" key={role.company}>
              <p className="experience-item__year">{role.year}</p>
              <div className="experience-item__body">
                <h3>{role.title}</h3>
                <p className="experience-item__company">
                  {role.url ? (
                    <a className={`highlight highlight--${role.highlight}`} href={role.url} target="_blank" rel="noopener">{role.company}</a>
                  ) : role.company}
                </p>
                <p className="experience-item__blurb">{role.blurb}</p>
              </div>
              <div className="experience-item__logo">
                <img src={role.logo} alt={`${role.company} logo`} loading="lazy" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
