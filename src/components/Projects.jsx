import { ArrowUpRight, GitHub } from './Icons.jsx'

const projects = [
  {
    number: '01',
    type: 'Hardware + energy',
    title: 'Triboelectric Nanogenerator',
    description: 'A MEMS-based triboelectric nanogenerator that harvests energy from airflow-induced motion at frequencies up to 10 Hz. It uses a contact-separation mechanism: two materials with opposite charge affinities repeatedly touch and pull apart, building up surface charge that drives current through an external load and generates peak voltages in the tens of volts. The aim is to turn everyday ambient airflow into usable power for small, self-powered sensors and electronics.',
    tags: ['MEMS', 'Energy Harvesting', 'Triboelectric Effect', 'Microfabrication', 'Self-Powered Sensors', 'Oscilloscope Testing'],
    graphic: 'tribo',
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
  {
    number: '04',
    type: 'Full-stack web',
    title: 'Do You Even Log Bro?',
    description: 'A free, Hevy-style workout tracker for the web. Log sets and reps, save routines, add custom exercises, and share workouts that friends can like and comment on. In-progress workouts survive refreshes, and saves queue offline when the gym has no signal.',
    tags: ['Next.js', 'TypeScript', 'Firebase', 'Firestore', 'Tailwind CSS', 'PWA'],
    link: 'https://doyouevenlogbro.vercel.app/',
    video: '/projects/logbro-demo.mp4',
  },
]

// Wind spinning a fan that's wired to a load.
function TriboGraphic() {
  const blade = 'M170 88C150 78 148 50 164 38C180 50 182 74 170 88Z'
  return (
    <svg className="tribo-graphic" viewBox="0 0 320 200" role="img" aria-label="Wind blowing onto a fan that generates electricity">
      <g className="tribo-graphic__air" fill="none" strokeWidth="2.5" strokeLinecap="round">
        <path d="M18 62c14-10 28 10 42 0s20-6 30-2" />
        <path d="M10 100c16-10 32 10 48 0s24-6 40-2" />
        <path d="M18 138c14-10 28 10 42 0s20-6 30-2" />
      </g>
      <g className="tribo-graphic__wire" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M170 92v76M148 168h44" />
        <path d="M180 158h96v-37" />
      </g>
      <g className="tribo-graphic__fan">
        {[0, 120, 240].map((angle) => (
          <path key={angle} d={blade} transform={`rotate(${angle} 170 88)`} />
        ))}
      </g>
      <circle className="tribo-graphic__hub" cx="170" cy="88" r="7" />
      <circle className="tribo-graphic__load" cx="276" cy="100" r="21" />
      <path className="tribo-graphic__bolt" d="M279 86l-11 17h8l-3 11 11-17h-8z" />
    </svg>
  )
}

export default function Projects() {
  return (
    <section className="projects-page" id="projects" aria-labelledby="projects-title">
      <div className="projects-page__inner">
        <div className="projects-page__intro">
          <h1 id="projects-title">Projects</h1>
        </div>

        <div className="project-list">
          {projects.map((project) => {
            const hasMedia = Boolean(project.image || project.video || project.graphic)
            return (
            <article
              className={`project-card${hasMedia ? ' project-card--media' : ''}`}
              key={project.number}
            >
              {hasMedia && (
                <div className="project-card__media">
                  {project.graphic === 'tribo' ? (
                    <TriboGraphic />
                  ) : project.video ? (
                    <video
                      src={project.video}
                      poster={project.image}
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
                {(project.link || project.repo) && (
                  <div className="project-card__links">
                    {project.link && (
                      <a className="project-card__visit" href={project.link} target="_blank" rel="noreferrer">
                        Visit project <ArrowUpRight />
                      </a>
                    )}
                    {project.repo && (
                      <a className="project-card__visit" href={project.repo} target="_blank" rel="noreferrer">
                        <GitHub /> View code
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
