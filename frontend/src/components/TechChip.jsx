import { techIcons } from '../lib/techIcons'

function TechChip({ name }) {
  const tech = techIcons[name]
  const Icon = tech?.icon

  return (
    <li className="chip">
      {Icon && <Icon className="chip-icon" style={{ color: tech.color }} aria-hidden="true" />}
      {name}
    </li>
  )
}

export default TechChip
