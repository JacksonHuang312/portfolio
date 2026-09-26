const skillGroups = [
  {
    title: 'Languages',
    tags: ['Python', 'SQL', 'JavaScript', 'TypeScript', 'Java', 'C', 'R', 'PHP', 'Bash', 'PowerShell', 'HTML', 'CSS', 'MatLab', 'Verilog'],
  },
  {
    title: 'Technologies',
    tags: [
      'React', 'Node.js', 'Express', 'Vite', 'Firebase', 'Clerk', 'Socket.io', 'PostgreSQL',
      'Redis', 'Git', 'GitHub', 'VS Code', 'Cursor', 'Claude Code', 'Jupyter Notebook', 'Power BI', 'DAX', 'Google Analytics', 'SEMrush',
      'Ahrefs', 'AutoCAD', 'SolidWorks', 'Oscilloscope', 'Multimeter', 'Breadboarding', 'WordPress',
    ],
  },
  {
    title: 'Applied skills',
    tags: [
      'Energy harvesting', 'Microfabrication', 'Data visualization', 'Dashboard development',
      'Real-time systems', 'Technical troubleshooting',
      'Full-stack development', 'Responsive UI design',
      'Circuit prototyping', 'CAD modeling', 'Data analysis', 'Business intelligence',
      'SEO optimization', 'Agile collaboration',
    ],
  },
]

export default function Skills() {
  return (
    <section className="content-section" id="skills" aria-labelledby="skills-title">
      <div className="content-section__inner">
        <div className="section-intro">
          <h2 id="skills-title">Skills</h2>
        </div>

        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <h3>{group.title}</h3>
              <div className="tag-row">
                {group.tags.map((tag) => <span className="tag-pill" key={tag}>{tag}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
