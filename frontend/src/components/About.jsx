import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function About({ profile }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading eyebrow="About" title="Building reliable, data-driven systems end to end">
          {profile.summary}
        </SectionHeading>

        <div className="highlights">
          {profile.highlights.map((h, i) => (
            <Reveal key={h.label} className="highlight" delay={i * 80}>
              <span className="highlight-value">{h.value}</span>
              <span className="highlight-label">{h.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default About
