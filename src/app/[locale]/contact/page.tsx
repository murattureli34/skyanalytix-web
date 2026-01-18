'use client'

import { useState } from 'react'
import { getLocale, t } from '@/lib/i18n'

export default function Contact({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale)
  const tt = t(locale)
  const [sent, setSent] = useState(false)

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">{tt('nav.contact')}</h1>
      <p className="mt-4 text-gray-600 text-lg">Tell us your camera count, location, and goals. We’ll reply fast.</p>

      <div className="mt-10 rounded-2xl border p-6 bg-white">
        {sent ? (
          <div className="text-sky-700 font-semibold">Thanks — message saved locally (wire your backend next).</div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault()
              setSent(true)
            }}
            className="grid gap-4"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <input className="border rounded-lg px-3 py-2" placeholder="Name" required />
              <input className="border rounded-lg px-3 py-2" placeholder="Email" type="email" required />
            </div>
            <input className="border rounded-lg px-3 py-2" placeholder="Company / Location" />
            <textarea className="border rounded-lg px-3 py-2 min-h-[140px]" placeholder="What are you trying to solve?" />
            <button className="px-5 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700" type="submit">
              Send
            </button>
          </form>
        )}
      </div>

      <p className="mt-6 text-sm text-gray-500">
        Production note: connect this form to your CRM (HubSpot), email (SendGrid), or Payload CMS.
      </p>
    </div>
  )
}
