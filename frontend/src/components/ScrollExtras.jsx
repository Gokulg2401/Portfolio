import { useEffect, useState } from 'react'
import { HiArrowUp } from 'react-icons/hi'

/** Thin progress bar at the top of the page plus a back-to-top button. */
function ScrollExtras() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  return (
    <>
      <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} aria-hidden="true" />
      <a href="#top" className={`back-to-top ${progress > 0.08 ? 'show' : ''}`} aria-label="Back to top">
        <HiArrowUp />
      </a>
    </>
  )
}

export default ScrollExtras
