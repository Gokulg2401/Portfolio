import { useCallback, useState } from 'react'
import { FaGithub, FaLinkedinIn } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import { useProfile } from './hooks/useProfile'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechMarquee from './components/TechMarquee'
import About from './components/About'
import Services from './components/Services'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Credentials from './components/Credentials'
import Contact from './components/Contact'
import ResumeModal from './components/ResumeModal'
import ScrollExtras from './components/ScrollExtras'

const CURRENT_YEAR = new Date().getFullYear()

function App() {
  const { profile, error, loading } = useProfile()
  const [resumeOpen, setResumeOpen] = useState(false)
  const openResume = useCallback(() => setResumeOpen(true), [])
  const closeResume = useCallback(() => setResumeOpen(false), [])

  if (loading) {
    return (
      <div className="status">
        <span className="spinner" aria-hidden="true" />
        <p>Loading portfolio…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="status">
        <p className="status-title">Couldn't reach the API</p>
        <p>Start the Spring Boot backend on port 8080, then refresh.</p>
        <code>{error.message}</code>
      </div>
    )
  }

  const initials = profile.name
    .split(' ')
    .map((part) => part[0])
    .join('')
  const { contact } = profile

  return (
    <>
      <ScrollExtras />
      <Navbar name={profile.name} initials={initials} onOpenResume={openResume} />
      <main>
        <Hero profile={profile} initials={initials} onOpenResume={openResume} />
        <TechMarquee />
        <About profile={profile} />
        <Services services={profile.services} />
        <Experience experience={profile.experience} />
        <Skills skills={profile.skills} />
        <Credentials certifications={profile.certifications} education={profile.education} />
        <Contact profile={profile} />
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <p>
            © {CURRENT_YEAR} {profile.name} · Built with Spring Boot & React
          </p>
          <div className="footer-socials">
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
      </footer>

      <ResumeModal open={resumeOpen} onClose={closeResume} resume={profile.resume} name={profile.name} />
    </>
  )
}

export default App
