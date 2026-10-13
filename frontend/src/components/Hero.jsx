import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import { HiOutlineMail, HiOutlineLocationMarker, HiOutlineEye, HiOutlineDownload, HiArrowRight } from 'react-icons/hi'
import { useTypewriter } from '../hooks/useTypewriter'
import TechOrbit from './TechOrbit'

function Hero({ profile, initials, onOpenResume }) {
  const { name, roles, tagline, location, availability, contact, resume } = profile
  const role = useTypewriter(roles)

  return (
    <section className="hero" id="top">
      <div className="hero-grid-bg" aria-hidden="true" />
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-badge">
            <span className="pulse" aria-hidden="true" />
            {availability}
          </p>
          <h1>
            Hi, I'm <span className="accent">{name}</span>
          </h1>
          <p className="hero-title" aria-label={roles.join(', ')}>
            <span className="hero-title-prompt" aria-hidden="true">&gt;</span>
            <span aria-hidden="true">{role}</span>
            <span className="caret" aria-hidden="true" />
          </p>
          <p className="hero-tagline">{tagline}</p>

          <div className="hero-actions">
            <a href="#contact" className="btn btn-primary">
              Hire me <HiArrowRight />
            </a>
            <button type="button" className="btn btn-ghost" onClick={onOpenResume}>
              <HiOutlineEye /> View resume
            </button>
            <a
              href={resume.url}
              download={resume.fileName}
              className="btn btn-icon"
              aria-label="Download resume (PDF)"
              title="Download resume (PDF)"
            >
              <HiOutlineDownload />
            </a>
          </div>

          <ul className="hero-meta">
            <li>
              <HiOutlineLocationMarker /> {location}
            </li>
            <li>
              <a href={`mailto:${contact.email}`}>
                <HiOutlineMail /> {contact.email}
              </a>
            </li>
          </ul>

          <div className="hero-socials">
            {contact.github && (
              <a href={contact.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
            )}
            {contact.linkedin && (
              <a href={contact.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
            )}
            <a href={`mailto:${contact.email}`} aria-label="Email">
              <HiOutlineMail />
            </a>
          </div>
        </div>

        <TechOrbit initials={initials} />
      </div>

    </section>
  )
}

export default Hero
