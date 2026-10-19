import {
  HiOutlineCode,
  HiOutlineServer,
  HiOutlineDatabase,
  HiOutlineCloud,
  HiOutlineTerminal,
  HiOutlineColorSwatch,
} from 'react-icons/hi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import TechChip from './TechChip'

const categoryIcons = {
  frontend: HiOutlineColorSwatch,
  backend: HiOutlineServer,
  database: HiOutlineDatabase,
  cloud: HiOutlineCloud,
  devops: HiOutlineTerminal,
  tools: HiOutlineTerminal,
}

function getCategoryIcon(category) {
  const key = category.toLowerCase()
  for (const [k, Icon] of Object.entries(categoryIcons)) {
    if (key.includes(k)) return Icon
  }
  return HiOutlineCode
}

function Skills({ skills }) {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <SectionHeading eyebrow="Skills" title="Tech I work with" />

        <div className="skills-grid">
          {skills.map((group, i) => {
            const Icon = getCategoryIcon(group.category)
            return (
              <Reveal key={group.category} className="card" delay={(i % 3) * 80}>
                <h3>
                  <span className="skill-category-icon"><Icon aria-hidden="true" /></span>
                  {group.category}
                  <span className="skill-count">{group.items.length}</span>
                </h3>
                <ul className="chips">
                  {group.items.map((item) => (
                    <TechChip key={item} name={item} />
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Skills
