import { getLocale, t } from '@/lib/i18n'

export default function Pricing({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale)
  const tt = t(locale)

  return (
    <div className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">{tt('nav.pricing')}</h1>
      <p className="mt-4 text-gray-600 text-lg">
        {tt('comingSoon')}. In the meantime, we price based on camera count and features.
      </p>
      <div className="mt-10 grid md:grid-cols-3 gap-4">
        {[{t:'Starter',d:'1-4 cameras'}, {t:'Growth',d:'5-16 cameras'}, {t:'Enterprise',d:'Multi-site'}].map((p)=> (
          <div key={p.t} className="rounded-2xl border p-6 bg-white">
            <div className="font-bold">{p.t}</div>
            <div className="mt-2 text-gray-600">{p.d}</div>
            <ul className="mt-4 text-sm text-gray-600 space-y-2">
              <li>Alerts + event review</li>
              <li>Role-based access</li>
              <li>Privacy controls</li>
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
