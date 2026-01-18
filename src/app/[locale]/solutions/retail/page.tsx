import { HeatmapMockup } from '@/components/mockups/HeatmapMockup'
import { DetectionMockup } from '@/components/mockups/DetectionMockup'

export default function Retail() {
  return (
    <div>
      <section className="mx-auto max-w-6xl px-4 py-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Retail</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Reduce shrink, speed response, and optimize store operations using your existing cameras.
        </p>

        <div className="mt-10 grid lg:grid-cols-2 gap-10">
          <div className="rounded-2xl border p-6 bg-white">
            <h2 className="font-bold">Proactive alerts</h2>
            <p className="mt-2 text-gray-600">Suspicious behavior detections with clear context and escalation.</p>
            <div className="mt-6"><DetectionMockup /></div>
          </div>
          <div className="rounded-2xl border p-6 bg-white">
            <h2 className="font-bold">Operational insights</h2>
            <p className="mt-2 text-gray-600">Heatmaps, queue analytics and traffic trends.</p>
            <div className="mt-6"><HeatmapMockup /></div>
          </div>
        </div>
      </section>
    </div>
  )
}
