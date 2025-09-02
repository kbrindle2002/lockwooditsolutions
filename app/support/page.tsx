export default function SupportPage() {
  const cats = [
    { t: "Wi-Fi Tips", i: ["Fixing dead zones","2.4 vs 5 GHz","Mesh basics"]},
    { t: "Passwords & Safety", i: ["Bitwarden setup","MFA","Phishing red flags"]},
    { t: "Backups", i: ["Photo backup 101","Cloud vs external","Restore a file"]},
    { t: "Parental Controls", i: ["Filtering options","Screen-time basics","Kid-safe devices"]}
  ];
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Support</h1> {/* ← was "Knowledge Base" */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mt-6">
        {cats.map(c => (
          <div key={c.t} className="rounded-2xl border border-slate-800 p-5 bg-slate-950/60">
            <div className="text-base font-semibold">{c.t}</div>
            <ul className="mt-2 list-disc pl-5 text-sm text-slate-400 space-y-1">
              {c.i.map(x => <li key={x}>{x}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
