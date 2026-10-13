import { useEffect, useState } from 'react'
import { HiMenuAlt3, HiX, HiOutlineDocumentText } from 'react-icons/hi'

const links = [
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#credentials', label: 'Credentials' },
  { href: '#contact', label: 'Contact' },
]

function Navbar({ name, initials, onOpenResume }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the nav link for the section currently being read: the last section whose
  // top has passed 35% of the viewport. At the very bottom, the last section wins
  // (short final sections can never scroll that far up).
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))
    let frame = 0

    const update = () => {
      frame = 0
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4
      let current = ''
      if (atBottom && sections.length) {
        current = sections[sections.length - 1].id
      } else {
        const line = window.innerHeight * 0.35
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= line) current = section.id
        }
      }
      setActive(current ? `#${current}` : '')
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="container nav-inner">
        <a href="#top" className="nav-logo" aria-label="Back to top">
          <span className="nav-logo-mark">{initials}</span>
          <span className="nav-logo-text">{name}</span>
        </a>

        <nav className={`nav-links ${open ? 'nav-links-open' : ''}`}>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={active === link.href ? 'active' : ''}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            className="btn btn-primary btn-sm nav-resume"
            onClick={() => {
              setOpen(false)
              onOpenResume()
            }}
          >
            <HiOutlineDocumentText /> Resume
          </button>
        </nav>

        <button
          className="nav-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
