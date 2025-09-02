
import { Card } from '../../components/ui'

export default function CoPilotPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold">LITS CoPilot</h2>
      <p className="text-slate-300 mt-2">Our Azure + Intune management portal for multi-tenant operations—update rings, compliance snapshots, and monthly <em>Flight Logs</em> your leadership can read.</p>
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <Card><Feature title="Azure Lighthouse onboarding" desc="Role-based access across tenants with least privilege."/></Card>
        <Card><Feature title="Patch orchestration" desc="Pilot → Broad rings with pause/resume and proof-of-patch PDFs."/></Card>
        <Card><Feature title="Defender signals" desc="Secure Score & incident rollups to a single dashboard."/></Card>
        <Card><Feature title="Client portal" desc="Read-only dashboards and scheduled maintenance windows."/></Card>
      </div>
      <a href="/contact" className="inline-block mt-8 px-5 py-3 rounded-2xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold">Request a demo</a>
    </div>
  )
}
function Feature({ title, desc }: { title: string, desc: string }) {
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="mt-2 text-sm text-slate-300">{desc}</p>
    </div>
  )
}
