import { useEffect, useRef } from 'react'
import { HiX, HiOutlineDownload, HiOutlineExternalLink, HiOutlineDocumentText } from 'react-icons/hi'

function ResumeModal({ open, onClose, resume, name }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!open) return

    const onKey = (e) => e.key === 'Escape' && onClose()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="resume-title"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h2 id="resume-title">
            <HiOutlineDocumentText /> {name} — Resume
          </h2>
          <div className="modal-actions">
            <a href={resume.url} download={resume.fileName} className="btn btn-primary btn-sm">
              <HiOutlineDownload /> <span className="hide-sm">Download</span>
            </a>
            <a
              href={resume.url}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost btn-sm"
              aria-label="Open in new tab"
            >
              <HiOutlineExternalLink /> <span className="hide-sm">New tab</span>
            </a>
            <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close">
              <HiX />
            </button>
          </div>
        </header>

        <div className="modal-body">
          <iframe src={`${resume.url}#view=FitH`} title={`${name} resume`} />
          <p className="modal-fallback">
            Can't see the preview?{' '}
            <a href={resume.url} target="_blank" rel="noreferrer">
              Open the PDF
            </a>{' '}
            or{' '}
            <a href={resume.url} download={resume.fileName}>
              download it
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResumeModal
