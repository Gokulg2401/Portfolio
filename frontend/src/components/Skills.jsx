import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechChip from './TechChip'

function Skills({ skills }) {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Tech I work with" />

        <div className="skills-grid">
          {skills.map((group, i) => (
            <Reveal key={group.category} className="card" delay={(i % 3) * 80}>
              <h3>{group.category}</h3>
              <ul className="chips">
                {group.items.map((item) => (
                  <TechChip key={item} name={item} />
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
