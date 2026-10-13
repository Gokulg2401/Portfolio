import { techIcons } from '../lib/techIcons'

const innerRing = ['Java', 'Spring Boot', 'React', 'Microsoft SQL Server']
const outerRing = ['JavaScript', 'Hibernate', 'Docker', 'Git', 'AWS', 'Postman']

function Ring({ items, ring }) {
  return (
    <div className={`orbit-ring orbit-ring-${ring}`}>
      {items.map((name, i) => {
        const { icon: Icon, color } = techIcons[name]
        const angle = (360 / items.length) * i
        return (
          <div key={name} className="orbit-item" style={{ '--angle': `${angle}deg` }}>
            <span className="orbit-icon" title={name} style={{ '--glow': color }}>
              <Icon style={{ color }} />
            </span>
          </div>
        )
      })}
    </div>
  )
}

function TechOrbit({ initials }) {
  return (
    <div className="orbit" aria-hidden="true">
      <div className="orbit-track orbit-track-inner" />
      <div className="orbit-track orbit-track-outer" />
      <Ring items={outerRing} ring="outer" />
      <Ring items={innerRing} ring="inner" />

      <div className="orbit-core">
        <span>{initials}</span>
      </div>
    </div>
  )
}

export default TechOrbit
