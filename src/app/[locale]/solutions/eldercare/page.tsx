import { MobileAlertMockup } from '@/components/mockups/MobileAlertMockup'

export default function ElderCare() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">ElderCare</h1>
      <p className="mt-4 text-gray-600 text-lg">
        Safety-focused alerts for care environments: falls, wandering, restricted zones, and rapid response.
      </p>
      <div className="mt-10 rounded-2xl border p-8 bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-xl font-bold">Staff-first notifications</h2>
            <p className="mt-2 text-gray-600">
              Alerts can route to on-duty staff, supervisors, and family contacts based on rules.
            </p>
            <ul className="mt-4 text-sm text-gray-600 space-y-2 list-disc pl-5">
              <li>Configurable zones and schedules</li>
              <li>Audit trail for incidents</li>
              <li>Privacy controls and minimization</li>
            </ul>
          </div>
          <MobileAlertMockup />
        </div>
      </div>
    </div>
  )
}
