import { HiOutlineBadgeCheck, HiOutlineAcademicCap, HiOutlineCheckCircle } from 'react-icons/hi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

function Credentials({ certifications, education }) {
  return (
    <section className="section" id="credentials">
      <div className="container">
        <SectionHeading eyebrow="Credentials" title="Certifications & education" />

        <div className="cred-grid">
          {certifications.map((cert, i) => (
            <Reveal key={cert.name} className="card cred" delay={i * 80}>
              <HiOutlineBadgeCheck className="cred-icon" />
              <div>
                <h3>{cert.name}</h3>
                <p className="cred-sub">{cert.issuer}</p>
                <p className="cred-desc">{cert.description}</p>
                <span className="cred-badge"><HiOutlineCheckCircle /> Certified</span>
              </div>
            </Reveal>
          ))}
          {education.map((edu, i) => (
            <Reveal key={`${edu.degree}-${edu.year}`} className="card cred" delay={(certifications.length + i) * 80}>
              <HiOutlineAcademicCap className="cred-icon" />
              <div>
                <h3>{edu.degree}</h3>
                <p className="cred-sub">
                  {edu.institution} · {edu.year}
                </p>
                <p className="cred-desc">Percentage: {edu.score}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Credentials
