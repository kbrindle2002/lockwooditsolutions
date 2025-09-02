
import { Card } from '../../components/ui'

export default function IndustriesPage() {
  const items = [
    { name: 'Healthcare', note: 'HIPAA, secure messaging, EMR integrations' },
    { name: 'Finance & Legal', note: 'Data loss prevention, encryption, audit trails' },
    { name: 'Manufacturing & Retail', note: 'Branch networking, POS hardening, uptime' }
  ]
  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold">Industries</h2>
      <p className="text-slate-400 mt-2">We tailor controls and processes to your regulatory and operational needs.</p>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {items.map((it, i) => (
          <Card key={i}>
            <h4 className="font-semibold">{it.name}</h4>
            <p className="mt-2 text-sm text-slate-300">{it.note}</p>
          </Card>
        ))}
      </div>
    </div>
  )
}
