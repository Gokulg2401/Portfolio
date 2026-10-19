import { useState } from 'react'
import { FaLinkedinIn, FaGithub } from 'react-icons/fa'
import {
  HiOutlineMail,
  HiOutlinePhone,
  HiOutlineLocationMarker,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
  HiOutlineExclamationCircle,
} from 'react-icons/hi'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'

const subjects = ['Job opportunity', 'Freelance project', 'Collaboration', 'Just saying hi']

const emptyForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  subject: 'Job opportunity',
  message: '',
  website: '',
}

// Keep these in sync with ContactRequest.java.
const NAME_RE = /^[\p{L} .'-]+$/u
const EMAIL_RE = /^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?\.)+[A-Za-z]{2,}$/
// 10-digit Indian mobile (6-9 start, optional +91 / 0) or +<country code> with 8-15 digits.
const PHONE_RE = /^(?:(?:\+91[\s-]?|0)?[6-9]\d{4}[\s-]?\d{5}|\+(?!91)[1-9]\d{0,2}[\s-]?\d(?:[\s-]?\d){6,13})$/

const validators = {
  name: (v) => {
    if (!v) return 'Please enter your name'
    if (v.length < 2) return 'Name must be at least 2 characters'
    if (!NAME_RE.test(v)) return "Name can only contain letters, spaces, . ' and -"
  },
  email: (v) => {
    if (!v) return 'Please enter your email'
    if (v.includes('..') || !EMAIL_RE.test(v)) return 'Please enter a valid email address (e.g. name@company.com)'
  },
  phone: (v) => {
    if (!v) return 'Please enter your contact number'
    if (!PHONE_RE.test(v)) return 'Enter a valid phone number: 10-digit mobile, or +country code and number'
  },
  subject: (v) => (!v ? 'Please add a subject' : undefined),
  message: (v) => (v.length < 20 ? `Message must be at least 20 characters (${v.length}/20)` : undefined),
}

const validateField = (name, value) => validators[name]?.(value.trim())

function validate(form) {
  const errors = {}
  for (const name of Object.keys(validators)) {
    const error = validateField(name, form[name])
    if (error) errors[name] = error
  }
  return errors
}

function Field({ label, name, error, optional, children }) {
  return (
    <label className={`field ${error ? 'field-error' : ''}`} htmlFor={name}>
      <span className="field-label">
        {label}
        {optional ? (
          <em> (optional)</em>
        ) : (
          <span className="required" aria-hidden="true">
            {' '}
            *
          </span>
        )}
      </span>
      {children}
      {error && (
        <span className="field-msg" id={`${name}-error`}>
          {error}
        </span>
      )}
    </label>
  )
}

function Contact({ profile }) {
  const { contact, location } = profile
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState({ state: 'idle', message: '' })

  const update = (e) => {
    const { name } = e.target
    // Phone: only allow digits, +, spaces and dashes to be typed.
    const value = name === 'phone' ? e.target.value.replace(/[^\d+\s-]/g, '') : e.target.value
    setForm((f) => ({ ...f, [name]: value }))
    // Once a field has shown an error, re-check it live so the message clears as soon as it's fixed.
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }))
  }

  const checkOnBlur = (e) => {
    const { name, value } = e.target
    if (value.trim()) setErrors((errs) => ({ ...errs, [name]: validateField(name, value) }))
  }

  const submit = async (e) => {
    e.preventDefault()
    const clientErrors = validate(form)
    setErrors(clientErrors)
    if (Object.keys(clientErrors).length > 0) return

    setStatus({ state: 'sending', message: '' })
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(
          Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])),
        ),
      })
      const data = await res.json().catch(() => ({}))

      if (res.ok) {
        setStatus({ state: 'success', message: data.message ?? 'Thanks! Your message has been sent.' })
        setForm(emptyForm)
      } else {
        if (data.errors) setErrors(data.errors)
        setStatus({ state: 'error', message: data.message ?? 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus({ state: 'error', message: 'Network error. Please check your connection and try again.' })
    }
  }

  const mailtoFallback = `mailto:${contact.email}?subject=${encodeURIComponent(form.subject || 'Hello')}&body=${encodeURIComponent(form.message)}`
  const fieldProps = (name) => ({
    id: name,
    name,
    value: form[name],
    onChange: update,
    onBlur: checkOnBlur,
    'aria-required': name in validators,
    'aria-invalid': Boolean(errors[name]),
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
  })

  return (
    <section className="section section-alt" id="contact">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="Let's work together">
          Hiring for a Java / React role, or have a project in mind? Send me a message and it lands straight in my
          inbox. I usually reply within a day.
        </SectionHeading>

        <div className="contact-grid">
          <Reveal className="contact-info">
            <a href={`mailto:${contact.email}`} className="info-card">
              <span className="info-icon">
                <HiOutlineMail />
              </span>
              <span>
                <small>Email</small>
                {contact.email}
              </span>
            </a>
            <a href={`tel:${contact.phone.replace(/\s/g, '')}`} className="info-card">
              <span className="info-icon">
                <HiOutlinePhone />
              </span>
              <span>
                <small>Phone</small>
                {contact.phone}
              </span>
            </a>
            <div className="info-card hoverable">
              <span className="info-icon">
                <HiOutlineLocationMarker />
              </span>
              <span>
                <small>Location</small>
                {location} · Open to relocate & remote
              </span>
            </div>
            <div className="info-socials">
              {contact.linkedin && (
                <a href={contact.linkedin} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                  <FaLinkedinIn /> LinkedIn
                </a>
              )}
              {contact.github && (
                <a href={contact.github} target="_blank" rel="noreferrer" className="btn btn-ghost btn-sm">
                  <FaGithub /> GitHub
                </a>
              )}
            </div>
          </Reveal>

          <Reveal as="form" className="contact-form" delay={100} onSubmit={submit} noValidate>
            {status.state === 'success' ? (
              <div className="form-success" role="status">
                <HiOutlineCheckCircle />
                <h3>Message sent!</h3>
                <p>{status.message} I'll get back to you soon.</p>
                <button type="button" className="btn btn-ghost" onClick={() => setStatus({ state: 'idle' })}>
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <div className="subject-chips" role="group" aria-label="What's this about?">
                  {subjects.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`subject-chip ${form.subject === s ? 'active' : ''}`}
                      aria-pressed={form.subject === s}
                      onClick={() => {
                        setForm((f) => ({ ...f, subject: s }))
                        setErrors((errs) => ({ ...errs, subject: undefined }))
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <div className="form-row">
                  <Field label="Your name" name="name" error={errors.name}>
                    <input {...fieldProps('name')} autoComplete="name" maxLength={100} placeholder="Jane Doe" />
                  </Field>
                  <Field label="Email" name="email" error={errors.email}>
                    <input
                      {...fieldProps('email')}
                      type="email"
                      autoComplete="email"
                      maxLength={150}
                      placeholder="jane@company.com"
                    />
                  </Field>
                </div>

                <div className="form-row">
                  <Field label="Contact number" name="phone" error={errors.phone}>
                    <input
                      {...fieldProps('phone')}
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      maxLength={20}
                      placeholder="98765 43210 or +1 415 555 0123"
                    />
                  </Field>
                  <Field label="Company" name="company" error={errors.company} optional>
                    <input
                      {...fieldProps('company')}
                      autoComplete="organization"
                      maxLength={100}
                      placeholder="Acme Corp"
                    />
                  </Field>
                </div>

                <Field label="Subject" name="subject" error={errors.subject}>
                  <input {...fieldProps('subject')} maxLength={150} />
                </Field>

                <Field label="Message" name="message" error={errors.message}>
                  <textarea
                    {...fieldProps('message')}
                    rows={5}
                    maxLength={3000}
                    placeholder="Tell me about the role or project: team, stack, location, timeline…"
                  />
                  <span className="char-count">{form.message.length}/3000</span>
                </Field>

                {/* Honeypot: visually hidden, ignored by people, filled by bots */}
                <input
                  className="hp"
                  name="website"
                  value={form.website}
                  onChange={update}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />

                <p className="form-note">
                  <span className="required">*</span> Required fields
                </p>

                {status.state === 'error' && (
                  <p className="form-alert" role="alert">
                    <HiOutlineExclamationCircle />
                    <span>
                      {status.message} <a href={mailtoFallback}>Email me instead</a>
                    </span>
                  </p>
                )}

                <button type="submit" className="btn btn-primary btn-block" disabled={status.state === 'sending'}>
                  {status.state === 'sending' ? (
                    <>
                      <span className="spinner spinner-sm" aria-hidden="true" /> Sending…
                    </>
                  ) : (
                    <>
                      <HiOutlinePaperAirplane className="rotate-45" /> Send message
                    </>
                  )}
                </button>
              </>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default Contact
