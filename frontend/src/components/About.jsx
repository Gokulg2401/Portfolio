import { HiOutlineCode, HiOutlineLightningBolt, HiOutlineShieldCheck, HiOutlineChip } from 'react-icons/hi'
import { MdRocketLaunch } from 'react-icons/md'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const highlightIconMap = {
  'professional experience': HiOutlineCode,
  'enterprise systems shipped': HiOutlineChip,
  'secured rest endpoints': HiOutlineShieldCheck,
  'faster page loads': HiOutlineLightningBolt,
}

function getIcon(label) {
  const key = label.toLowerCase()
  for (const [k, Icon] of Object.entries(highlightIconMap)) {
    if (key.includes(k.split(' ').pop())) return Icon
  }
  return HiOutlineCode
}

function About({ profile }) {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHeading eyebrow="About" title="Building reliable, data-driven systems end to end">
          {profile.summary}
        </SectionHeading>

        <div className="highlights">
          {profile.highlights.map((h, i) => {
            const Icon = getIcon(h.label)
            return (
              <Reveal key={h.label} className="highlight" delay={i * 80}>
                <Icon className="highlight-icon" aria-hidden="true" />
                <span className="highlight-value">{h.value}</span>
                <span className="highlight-label">{h.label}</span>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default About
