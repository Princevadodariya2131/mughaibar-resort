import { useState, type ChangeEvent, type FormEvent, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ArrowUpRight } from 'lucide-react'
import PageTransition from '@/components/ui/PageTransition'
import PageHero from '@/components/ui/PageHero'
import SectionReveal from '@/components/ui/SectionReveal'
import { usePageMeta } from '@/hooks/usePageMeta'
import { byId } from '@/data/images'
import { RESORT } from '@/data/resort'

interface FormData {
  name: string; email: string; phone: string
  checkIn: string; checkOut: string; guests: string
  message: string; consent: boolean
}
type Field = 'name' | 'email' | 'message' | 'consent' | 'checkOut'
type FormErrors = Partial<Record<Field, string>>

/** Order in which the first invalid field receives focus. */
const FIELD_ORDER: Field[] = ['name', 'email', 'checkOut', 'message', 'consent']

function validate(data: FormData): FormErrors {
  const e: FormErrors = {}
  if (!data.name.trim()) e.name = 'Please enter your name.'
  if (!data.email.trim()) e.email = 'Please enter your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) e.email = 'Please enter a valid email address.'
  if (data.checkIn && data.checkOut && data.checkOut < data.checkIn) e.checkOut = 'Check-out must be on or after check-in.'
  if (!data.message.trim()) e.message = 'Please include a brief message.'
  if (!data.consent) e.consent = 'Please confirm so the resort may use these details to reply.'
  return e
}

// 'sent'      a configured form service answered with res.ok (the only case we say "sent")
// 'composed'  no service configured: email/WhatsApp drafts prepared, NOTHING has been delivered yet
// 'error'     service configured but the request failed
type State = 'idle' | 'submitting' | 'sent' | 'composed' | 'error'

const ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT as string | undefined

type Enquiry = Pick<FormData, 'name' | 'email' | 'phone' | 'checkIn' | 'checkOut' | 'guests' | 'message'>

function enquiryText(f: Enquiry) {
  const lines: string[] = [`Name: ${f.name}`, `Email: ${f.email}`]
  if (f.phone) lines.push(`Phone: ${f.phone}`)
  if (f.checkIn) lines.push(`Check-in: ${f.checkIn}`)
  if (f.checkOut) lines.push(`Check-out: ${f.checkOut}`)
  if (f.guests) lines.push(`Guests: ${f.guests}`)
  lines.push('', f.message)
  return lines.join('\n')
}
const mailtoHref = (f: Enquiry) =>
  `mailto:${RESORT.contact.email}?subject=${encodeURIComponent('Stay enquiry')}&body=${encodeURIComponent(enquiryText(f))}`
const whatsappHref = (f: Enquiry) => `${RESORT.contact.whatsappHref}?text=${encodeURIComponent(enquiryText(f))}`

const DIRECT = [
  { label: 'Phone', value: RESORT.contact.phone, href: RESORT.contact.phoneHref, external: false },
  { label: 'WhatsApp', value: 'Message the resort', href: RESORT.contact.whatsappHref, external: true },
  { label: 'Email', value: RESORT.contact.email, href: RESORT.contact.emailHref, external: false },
  { label: 'Map', value: `${RESORT.location.area}, ${RESORT.location.city}`, href: RESORT.location.mapLink, external: true },
]

const today = () => new Date().toLocaleDateString('en-CA') // YYYY-MM-DD in the visitor's own time zone

export default function ContactPage() {
  usePageMeta('Contact', 'Phone, WhatsApp, email and an enquiry form for Mughaibar Fort Resort in Hatta.')
  const [form, setForm] = useState<FormData>({ name: '', email: '', phone: '', checkIn: '', checkOut: '', guests: '', message: '', consent: false })
  const [errors, setErrors] = useState<FormErrors>({})
  const [state, setState] = useState<State>('idle')
  const [copied, setCopied] = useState<'idle' | 'yes' | 'no'>('idle')

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    const next = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    setForm((p) => ({ ...p, [name]: next }))
    if (errors[name as Field]) setErrors((p) => ({ ...p, [name]: undefined }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const err = validate(form)
    if (Object.keys(err).length > 0) {
      setErrors(err)
      const first = FIELD_ORDER.find((k) => err[k])
      if (first) document.getElementById(first)?.focus()
      return
    }
    setState('submitting')
    if (ENDPOINT) {
      try {
        const res = await fetch(ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...form, _subject: 'Stay enquiry · Mughaibar Fort Resort' }),
        })
        setState(res.ok ? 'sent' : 'error')
      } catch {
        setState('error')
      }
      return
    }
    // No form service configured: prepare real drafts instead of pretending to deliver.
    window.location.href = mailtoHref(form)
    setState('composed')
  }

  const copyEnquiry = async () => {
    try {
      await navigator.clipboard.writeText(enquiryText(form))
      setCopied('yes')
    } catch {
      setCopied('no')
    }
  }

  const done = state === 'sent' || state === 'composed' || state === 'error'

  return (
    <PageTransition>
      <PageHero
        eyebrow="Contact"
        title="Ask about a stay."
        subtitle="Call, message on WhatsApp, write, or fill in the form. The resort confirms availability, capacity and rates."
        image={byId('outdoor-terrace')}
        seed={43}
        actions={<a href="#enquiry-form" className="btn-bronze">Go to the form</a>}
      />

      <section className="ground-ivory-deep" aria-labelledby="contact-direct-title">
        <div className="container-resort grid gap-14 py-24 lg:grid-cols-12 lg:gap-10 lg:py-36">
          <SectionReveal className="lg:col-span-5">
            <p className="eyebrow mb-5">Direct</p>
            <h2 id="contact-direct-title" className="display-fraunces text-[clamp(2.2rem,4.6vw,4rem)] leading-[1.04]">Reach the resort.</h2>
            <ul className="mt-10 border-t border-umber/25">
              {DIRECT.map((d) => (
                <li key={d.label} className="border-b border-umber/15">
                  <a
                    href={d.href}
                    {...(d.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group flex min-h-[72px] items-center justify-between gap-4 py-4"
                  >
                    <span>
                      <span className="block font-sans text-[12px] font-medium uppercase tracking-[0.16em] text-hajar">{d.label}</span>
                      <span className="mt-1 block break-all font-sans text-[18px]">
                        {d.value}
                        {d.external && <span className="sr-only"> (opens in a new tab)</span>}
                      </span>
                    </span>
                    <ArrowUpRight size={18} aria-hidden="true" className="shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              ))}
            </ul>
            <p className="caption mt-6 max-w-[30rem] text-hajar">{RESORT.bookingNote}</p>
          </SectionReveal>

          <SectionReveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <div id="enquiry-form" className="scroll-mt-28 bg-limewash p-6 sm:p-10">
              <AnimatePresence mode="wait" initial={false}>
                {done ? (
                  <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} role="status">
                    <h2 className="display-fraunces text-[2rem] leading-tight">
                      {state === 'sent' && 'Enquiry sent'}
                      {state === 'composed' && 'Your enquiry is ready, but not sent yet'}
                      {state === 'error' && 'The enquiry did not go through'}
                    </h2>
                    <p className="body-copy mt-4 text-umber/85">
                      {state === 'sent' && 'The form service accepted your enquiry. The resort will reply by email or phone.'}
                      {state === 'composed' && 'A draft should have opened in your email app. It is delivered only when you press Send there. If nothing opened, use WhatsApp or copy the text below.'}
                      {state === 'error' && 'Nothing was delivered. Try again, or contact the resort directly.'}
                    </p>
                    <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                      <a href={RESORT.contact.phoneHref} className="btn-line">Call</a>
                      {state !== 'sent' && <a href={mailtoHref(form)} className="btn-line">Open email draft</a>}
                      {state !== 'sent' && (
                        <a href={whatsappHref(form)} target="_blank" rel="noopener noreferrer" className="btn-bronze">
                          WhatsApp<span className="sr-only"> (opens in a new tab)</span>
                        </a>
                      )}
                    </div>
                    {state === 'composed' && (
                      <div className="mt-6">
                        <button type="button" onClick={copyEnquiry} className="link-underline">Copy enquiry text</button>
                        <span className="ml-3 font-sans text-[14px] text-hajar" role="status">
                          {copied === 'yes' && 'Copied.'}
                          {copied === 'no' && 'Could not copy. Select the text in your email draft instead.'}
                        </span>
                      </div>
                    )}
                    {state !== 'sent' && (
                      <button type="button" onClick={() => { setState('idle'); setCopied('idle') }} className="link-underline mt-8">
                        Edit my enquiry
                      </button>
                    )}
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} noValidate aria-label="Enquiry form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25 }}>
                    <h2 className="display-fraunces text-[2rem] leading-tight">Enquiry form</h2>
                    <p className="body-copy mt-3 text-umber/85">
                      {ENDPOINT
                        ? 'Your enquiry is sent to the resort when you press the button below.'
                        : 'This form prepares an email to the resort in your email app. Nothing is sent until you press Send there. You can also use WhatsApp or call.'}
                    </p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                      <FieldGroup id="name" label="Name" required error={errors.name}>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} className="field"
                          aria-required="true" aria-invalid={!!errors.name} aria-describedby={errors.name ? 'name-error' : undefined} autoComplete="name" />
                      </FieldGroup>
                      <FieldGroup id="email" label="Email" required error={errors.email}>
                        <input id="email" name="email" type="email" value={form.email} onChange={handleChange} className="field"
                          aria-required="true" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'email-error' : undefined} autoComplete="email" />
                      </FieldGroup>
                      <FieldGroup id="phone" label="Phone (optional)">
                        <input id="phone" name="phone" type="tel" value={form.phone} onChange={handleChange} className="field" autoComplete="tel" />
                      </FieldGroup>
                      <FieldGroup id="guests" label="Guests (optional)">
                        <input id="guests" name="guests" type="number" inputMode="numeric" min="1" max="30" value={form.guests} onChange={handleChange} className="field" />
                      </FieldGroup>
                      <FieldGroup id="checkIn" label="Check-in (optional)">
                        <input id="checkIn" name="checkIn" type="date" value={form.checkIn} onChange={handleChange} className="field" min={today()} />
                      </FieldGroup>
                      <FieldGroup id="checkOut" label="Check-out (optional)" error={errors.checkOut}>
                        <input id="checkOut" name="checkOut" type="date" value={form.checkOut} onChange={handleChange} className="field"
                          min={form.checkIn || today()} aria-invalid={!!errors.checkOut} aria-describedby={errors.checkOut ? 'checkOut-error' : undefined} />
                      </FieldGroup>
                    </div>

                    <FieldGroup id="message" label="Message" required error={errors.message} className="mt-8">
                      <textarea id="message" name="message" value={form.message} onChange={handleChange} rows={5} className="field resize-none"
                        aria-required="true" aria-invalid={!!errors.message} aria-describedby={errors.message ? 'message-error' : undefined} />
                    </FieldGroup>

                    <div className="mt-8">
                      <label className="group flex cursor-pointer items-start gap-3">
                        <span className="relative mt-1 shrink-0">
                          <input id="consent" type="checkbox" name="consent" checked={form.consent} onChange={handleChange}
                            className="peer absolute inset-0 h-5 w-5 cursor-pointer opacity-0"
                            aria-invalid={!!errors.consent} aria-describedby={errors.consent ? 'consent-error' : undefined} />
                          <span className="flex h-5 w-5 items-center justify-center border border-umber/60 transition-colors peer-checked:border-dam peer-checked:bg-dam peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-dam" />
                          <svg className="pointer-events-none absolute inset-0 h-5 w-5 text-limewash opacity-0 peer-checked:opacity-100" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                            <path d="M3.5 8.5l3 3L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                        <span className="font-sans text-[14px] leading-relaxed text-umber/85">
                          I agree to my details being used to reply to this enquiry.
                        </span>
                      </label>
                      {errors.consent && <p id="consent-error" className="field-error" role="alert">{errors.consent}</p>}
                    </div>

                    <button type="submit" disabled={state === 'submitting'} className="btn-bronze mt-10 disabled:cursor-not-allowed disabled:opacity-60">
                      {state === 'submitting' ? 'Sending…' : ENDPOINT ? 'Send enquiry' : 'Prepare email'}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </SectionReveal>
        </div>
      </section>
    </PageTransition>
  )
}

function FieldGroup({
  id, label, required, error, children, className = '',
}: {
  id: string; label: string; required?: boolean; error?: string; children: ReactNode; className?: string
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label}{required && <span className="ml-1 text-dam" aria-hidden="true">*</span>}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="field-error" role="alert">{error}</p>}
    </div>
  )
}
