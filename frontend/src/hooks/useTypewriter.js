import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Types and deletes each word in turn, looping forever. */
export function useTypewriter(words, { typeMs = 70, deleteMs = 40, holdMs = 1600 } = {}) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const reduced = prefersReducedMotion()

  useEffect(() => {
    if (reduced || words.length === 0) return

    const word = words[index % words.length]
    let delay = deleting ? deleteMs : typeMs

    if (!deleting && text === word) delay = holdMs
    else if (deleting && text === '') delay = 300

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true)
      } else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => i + 1)
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)))
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs, reduced])

  return reduced ? (words[0] ?? '') : text
}
