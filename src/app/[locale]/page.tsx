import Link from 'next/link'
import Image from 'next/image'
import { getLocale, t } from '@/lib/i18n'
import { HeatmapMockup } from '@/components/mockups/HeatmapMockup'
import { DetectionMockup } from '@/components/mockups/DetectionMockup'
import { DashboardMetrics } from '@/components/animations/DashboardMetrics'
import { MobileAlertMockup } from '@/components/mockups/MobileAlertMockup'

export default function Home({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale)
  const tt = t(locale)

  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="inline-flex items-center gap-2 text-xs px-3 py-1.5 rounded-full bg-sky-50 text-sky-700 border border-sky-100">
              <span className="w-2 h-2 rounded-full bg-sky-600 animate-ping-slow" />
              Privacy-first • Edge-ready • Real-time alerts
            </div>
            <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              {tt('hero.title')}
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              {tt('hero.subtitle')}
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Link href={`/${locale}/contact`} className="px-5 py-3 rounded-lg bg-sky-600 text-white hover:bg-sky-700 text-center">
                {tt('hero.ctaPrimary')}
              </Link>
              <Link href={`/${locale}/solutions/retail`} className="px-5 py-3 rounded-lg border hover:bg-gray-50 text-center">
                {tt('hero.ctaSecondary')}
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 opacity-80">
              <Image src="/logos/skypulse.svg" alt="SkyPulse" width={90} height={24} />
              <Image src="/logos/skycare.svg" alt="SkyCare" width={90} height={24} />
              <Image src="/logos/skyfactory.svg" alt="SkyFactory" width={90} height={24} />
            </div>
          </div>

          <div className="rounded-2xl border bg-gradient-to-b from-white to-sky-50 p-6 shadow-sm">
            <DashboardMetrics />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold">{tt('section.how.title')}</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[tt('section.how.step1'), tt('section.how.step2'), tt('section.how.step3')].map((s, i) => (
            <div key={i} className="rounded-2xl border p-5 bg-white">
              <div className="text-sm text-sky-700 font-semibold">Step {i + 1}</div>
              <div className="mt-2 font-semibold">{s}</div>
              <p className="mt-2 text-sm text-gray-600">
                {i === 0 && 'RTSP/NVR compatible. Works with existing camera systems.'}
                {i === 1 && 'Smart detections with clear context and escalation workflows.'}
                {i === 2 && 'Heatmaps, trends and KPI dashboards for decision-making.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <h2 className="text-2xl md:text-3xl font-bold">{tt('section.benefits.title')}</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {[tt('benefit.security'), tt('benefit.insights'), tt('benefit.privacy')].map((b, i) => (
            <div key={i} className="rounded-2xl border p-5 bg-white">
              <div className="font-semibold">{b}</div>
              <p className="mt-2 text-sm text-gray-600">
                {i === 0 && 'Instant alerts to staff and management with evidence snapshots.'}
                {i === 1 && 'Understand traffic, queue bottlenecks, and high-risk zones.'}
                {i === 2 && 'Run on-prem or edge; anonymize by design with blur options.'}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          <div>
            <h3 className="text-xl font-bold">Visual Analytics</h3>
            <p className="mt-2 text-gray-600">Heatmaps and movement patterns from standard cameras.</p>
            <div className="mt-6"><HeatmapMockup /></div>
          </div>
          <div>
            <h3 className="text-xl font-bold">Real-time Detection</h3>
            <p className="mt-2 text-gray-600">Clear overlays and confidence scoring help staff act fast.</p>
            <div className="mt-6"><DetectionMockup /></div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="rounded-3xl border bg-gradient-to-r from-sky-50 to-white p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold">Mobile alerts</h3>
              <p className="mt-2 text-gray-600">Staff and admins receive notifications with actionable context.</p>
              <Link href={`/${locale}/customers`} className="inline-block mt-5 text-sky-700 font-semibold hover:underline">
                See customer stories →
              </Link>
            </div>
            <MobileAlertMockup />
          </div>
        </div>
      </section>
    </div>
  )
}
