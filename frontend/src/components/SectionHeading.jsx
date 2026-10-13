import Reveal from './Reveal'

function SectionHeading({ eyebrow, title, children }) {
  return (
    <Reveal className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {children && <p className="lead">{children}</p>}
    </Reveal>
  )
}

export default SectionHeading
