import { getLocale, t } from '@/lib/i18n'

export default function About({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale)
  const tt = t(locale)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">{tt('nav.about')}</h1>
      <p className="mt-4 text-gray-600 text-lg">
        SkyAnalytix helps organizations turn existing cameras into real-time security and operational intelligence.
      </p>

      <div className="mt-10 grid gap-6">
        <div className="rounded-2xl border p-6 bg-white">
          <h2 className="text-xl font-bold">Mission</h2>
          <p className="mt-2 text-gray-600">
            Make safety and insights accessible—without invasive surveillance. Privacy-first by design.
          </p>
        </div>
        <div className="rounded-2xl border p-6 bg-white">
          <h2 className="text-xl font-bold">What we believe</h2>
          <ul className="mt-3 list-disc pl-5 text-gray-600 space-y-2">
            <li>Edge options reduce risk and keep data local.</li>
            <li>Alerts must be actionable, not noisy.</li>
            <li>Insights should improve workflows, not just create dashboards.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
