import { getLocale, t } from '@/lib/i18n'

export default function Customers({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale)
  const tt = t(locale)

  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Customer Stories</h1>
      <p className="mt-4 text-gray-600 text-lg">
        {tt('comingSoon')}. We’re collecting case studies from retail and care deployments.
      </p>
      <div className="mt-10 rounded-2xl border p-6 bg-white">
        <h2 className="font-bold">Want to be featured?</h2>
        <p className="mt-2 text-gray-600">Contact us for a pilot and measurement plan (ROI, incident reduction, staffing optimization).</p>
      </div>
    </div>
  )
}
