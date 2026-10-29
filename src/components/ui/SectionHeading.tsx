import type { ReactNode } from 'react'

/** Eyebrow + display heading + optional lede. One heading style for every section on every route. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lede,
  tone = 'light',
  className = '',
  size = 'md',
}: {
  id?: string
  eyebrow?: string
  title: ReactNode
  lede?: ReactNode
  /** light = on ivory/sand, dark = on charcoal */
  tone?: 'light' | 'dark'
  className?: string
  size?: 'md' | 'lg'
}) {
  const ledeColour = tone === 'dark' ? 'text-limewash/75' : 'text-umber/80'
  const sizeClass =
    size === 'lg'
      ? 'text-[clamp(2.6rem,6vw,5.2rem)] leading-[1]'
      : 'text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04]'
  return (
    <div className={`${tone === 'dark' ? 'on-dark' : ''} ${className}`}>
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 id={id} className={`display-fraunces text-balance ${sizeClass}`}>
        {title}
      </h2>
      {lede && <div className={`lede mt-7 max-w-[34rem] ${ledeColour}`}>{lede}</div>}
    </div>
  )
}
