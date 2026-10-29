import { useEffect } from 'react'

const SITE = 'Mughaibar Fort Resort'

/** Sets the document title (and optionally the description) for the current route. */
export function usePageMeta(title: string, description?: string) {
  useEffect(() => {
    document.title = title ? `${title} · ${SITE}, Hatta` : `${SITE}, Hatta, Dubai`
    if (!description) return
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    meta.content = description
  }, [title, description])
}
