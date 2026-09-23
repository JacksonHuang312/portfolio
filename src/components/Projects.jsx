import { ArrowDownRight, ArrowUpRight } from './Icons.jsx'

const projects = [
  {
    number: '01',
    type: 'Hardware + energy',
    title: 'Triboelectric Nanogenerator',
    description: 'A MEMS-based nanogenerator harvesting energy from airflow-induced motion at frequencies up to 10 Hz, using a contact-separation mechanism to generate peak voltages in the tens of volts.',
    tags: ['MEMS', 'Energy Harvesting'],
  },
  {
    number: '02',
    type: 'Full-stack web',
    title: 'ChatApp',
    description: 'A real-time chat app with a custom Windows XP-themed UI — DMs and group chats with replies, reactions, live presence, and typing indicators for 50+ test users.',
    tags: ['React', 'Socket.io', 'PostgreSQL'],
  },
  {
    number: '03',
    type: 'Full-stack web',
    title: 'Materials Explorer',
    description: 'Search, filter, and compare 150,000+ DFT-computed crystalline solids from the Materials Project API — free, open, no login required.',
    tags: ['React', 'Materials Project API'],
    link: 'https://materialsdatabase.vercel.app/',
    image: '/projects/materials-db.png',
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
                  <img src={project.image} alt={`${project.title} screenshot`} loading="lazy" />
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
              {!project.link && <ArrowDownRight />}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
