export default function Terms() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-4xl font-extrabold tracking-tight">Terms</h1>
      <p className="mt-4 text-gray-600">
        This is a placeholder terms page. Replace with your legal text before production launch.
      </p>
      <div className="mt-8 rounded-2xl border p-6 bg-white text-gray-600 space-y-3">
        <p>1) Use of service is subject to applicable laws and customer policies.</p>
        <p>2) Privacy: deployments should follow local privacy regulations and signage requirements.</p>
        <p>3) Data: storage and retention depend on your chosen configuration (edge/cloud).</p>
      </div>
    </div>
  )
}
