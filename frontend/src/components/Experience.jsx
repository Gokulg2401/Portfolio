import { HiOutlineBriefcase } from 'react-icons/hi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechChip from './TechChip'

function Experience({ experience }) {
  return (
    <section className="section" id="experience">
      <div className="container">
        <SectionHeading eyebrow="Experience" title="Where I've worked" />

        <div className="timeline">
          {experience.map((job) => (
            <Reveal as="article" key={job.company} className="timeline-item">
              <span className="timeline-dot" aria-hidden="true">
                <HiOutlineBriefcase />
              </span>

              <div className="job">
                <header className="job-header">
                  <div>
                    <h3>{job.role}</h3>
                    <p className="job-company">{job.company}</p>
                  </div>
                  <span className="job-period">{job.period}</span>
                </header>

                <ul className="chips">
                  {job.stack.map((tech) => (
                    <TechChip key={tech} name={tech} />
                  ))}
                </ul>

                <div className="projects">
                  {job.projects.map((project, i) => (
                    <Reveal key={project.name} className="project" delay={i * 120}>
                      <h4>{project.name}</h4>
                      <ul>
                        {project.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
