import { ArrowDownRight } from './Icons.jsx'

const projects = [
  {
    number: '01',
    type: 'Hardware + energy',
    title: 'MEMS energy harvester',
    description: 'A miniature energy-harvesting concept exploring how mechanical motion can become useful electrical power.',
    tags: ['MEMS', 'Prototyping'],
  },
  {
    number: '02',
    type: 'Machine learning',
    title: 'Data to better decisions',
    description: 'A machine-learning workflow that turns messy experimental data into patterns that are easier to understand and act on.',
    tags: ['Python', 'Modelling'],
  },
  {
    number: '03',
    type: 'Full-stack web',
    title: 'Tools that feel tangible',
    description: 'A responsive web app built around clear information, thoughtful interactions, and a fast path from idea to use.',
    tags: ['React', 'Product design'],
  },
]

export default function Projects() {
  return (
    <section className="projects-page" id="projects" aria-labelledby="projects-title">
      <div className="projects-page__inner">
        <div className="projects-page__intro">
          <p className="pill pill--accent">Selected work</p>
          <h1 id="projects-title">Things I&rsquo;ve built.</h1>
          <p>
            A collection of hardware, machine-learning, and web projects shaped by curiosity and
            a love of making ideas useful.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className="project-card" key={project.number}>
              <div className="project-card__number">{project.number}</div>
              <div className="project-card__body">
                <p className="project-card__type">{project.type}</p>
                <h2>{project.title}</h2>
                <p className="project-card__description">{project.description}</p>
                <div className="project-card__tags">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </div>
              <ArrowDownRight />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}