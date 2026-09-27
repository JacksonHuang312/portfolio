import { ArrowUpRight } from './Icons.jsx'

const projects = [
  {
    number: '01',
    type: 'Hardware + energy',
    title: 'Triboelectric Nanogenerator',
    description: 'A MEMS-based triboelectric nanogenerator that harvests energy from airflow-induced motion at frequencies up to 10 Hz. It uses a contact-separation mechanism: two materials with opposite charge affinities repeatedly touch and pull apart, building up surface charge that drives current through an external load and generates peak voltages in the tens of volts. The aim is to turn everyday ambient airflow into usable power for small, self-powered sensors and electronics.',
    tags: ['MEMS', 'Energy Harvesting', 'Triboelectric Effect', 'Microfabrication', 'Self-Powered Sensors', 'Oscilloscope Testing'],
  },
  {
    number: '02',
    type: 'Full-stack web',
    title: 'TalkRetro',
    description: 'A real-time chat app with a custom Windows XP-themed UI — DMs and group chats with replies, reactions, live presence, and typing indicators for 50+ test users.',
    tags: ['React', 'Socket.io', 'PostgreSQL'],
    link: 'https://talkretro.vercel.app/',
    image: '/projects/chatapp.png',
  },
  {
    number: '03',
    type: 'Full-stack web',
    title: 'Materials Explorer',
    description: 'Search, filter, and compare 150,000+ DFT-computed crystalline solids from the Materials Project API — free, open, no login required.',
    tags: ['React', 'Materials Project API'],
    link: 'https://materialsdatabase.vercel.app/',
    image: '/projects/materials-db.png',
    video: '/projects/materials-db.mp4',
  },
]

export default function Projects() {
  return (
    <section className="projects-page" id="projects" aria-labelledby="projects-title">
      <div className="projects-page__inner">
        <div className="projects-page__intro">
          <h1 id="projects-title">Projects</h1>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article
              className={`project-card${project.image ? ' project-card--media' : ''}`}
              key={project.number}
            >
              {project.image && (
                <div className="project-card__media">
                  {project.video ? (
                    <video
                      src={project.video}
                      ref={(el) => {
                        if (el) el.muted = true
                      }}
                      aria-label={`${project.title} demo`}
                      autoPlay
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
                  )}
                </div>
              )}
              <div className="project-card__number">{project.number}</div>
              <div className="project-card__body">
                <p className="project-card__type">{project.type}</p>
                <h2>{project.title}</h2>
                <p className="project-card__description">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                {project.link && (
                  <a className="project-card__visit" href={project.link} target="_blank" rel="noreferrer">
                    Visit project <ArrowUpRight />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
