import { techIcons } from '../lib/techIcons'

const stack = [
  'Java',
  'Spring Boot',
  'Spring Security',
  'Hibernate',
  'React',
  'JavaScript',
  'Microsoft SQL Server',
  'Docker',
  'AWS',
  'Git',
  'Maven',
  'Postman',
]

function TechMarquee() {
  // Rendered twice so the CSS animation can loop seamlessly.
  const items = [...stack, ...stack]

  return (
    <div className="marquee" aria-label="Tech stack">
      <div className="marquee-track">
        {items.map((name, i) => {
          const { icon: Icon, color } = techIcons[name]
          return (
            <span key={i} className="marquee-item" aria-hidden={i >= stack.length}>
              <Icon style={{ color }} />
              {name === 'Microsoft SQL Server' ? 'SQL Server' : name}
            </span>
          )
        })}
      </div>
    </div>
  )
}

export default TechMarquee
