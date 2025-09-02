'use client';
import { useEffect, useState } from 'react';

export default function AdminPage() {
  const [key, setKey] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    const k = sessionStorage.getItem('admin_key');
    if (k) { setKey(k); setUnlocked(true); fetchLeads(k); }
  }, []);

  const fetchLeads = async (k: string) => {
    setLoading(true); setErr(null);
    try {
      const res = await fetch('/api/contacts-list', { headers: { 'x-admin-key': k } });
      if (!res.ok) throw new Error('Unauthorized or server error');
      const data = await res.json();
      setLeads(data);
    } catch (e:any) {
      setErr(e.message || 'Error'); setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const unlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (!key) return;
    sessionStorage.setItem('admin_key', key);
    setUnlocked(true);
    fetchLeads(key);
  };

  const exportCSV = () => {
    const header = 'Name,Email,Phone,Message,CreatedAt,Source\n';
    const rows = leads.map(l =>
      `${csv(l.name)},${csv(l.email)},${csv(l.phone)},${csv(l.message,true)},${csv(l.createdAt)},${csv(l.source)}`
    ).join('\n');
    download('contacts.csv', header + rows);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Leads</h1>

      {!unlocked && (
        <form onSubmit={unlock} className="mt-6 grid gap-3 max-w-sm">
          <label className="text-sm">
            <span className="text-slate-300">Admin key</span>
            <input type="password" className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 p-3"
              value={key} onChange={(e)=>setKey(e.target.value)}/>
          </label>
          <button className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700">Unlock</button>
        </form>
      )}

      {unlocked && (
        <div className="mt-6">
          {loading && <p className="text-sm text-slate-400">Loading…</p>}
          {err && <p className="text-sm text-red-400">{err}</p>}
          {!loading && !err && (
            <>
              <div className="overflow-x-auto rounded-2xl border border-slate-800">
                <table className="min-w-full text-sm">
                  <thead className="bg-slate-900/50">
                    <tr>
                      <th className="p-2 text-left">Name</th>
                      <th className="p-2 text-left">Email</th>
                      <th className="p-2 text-left">Phone</th>
                      <th className="p-2 text-left">Message</th>
                      <th className="p-2 text-left">Created</th>
                      <th className="p-2 text-left">Source</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((l, i) => (
                      <tr key={i} className="border-t border-slate-800">
                        <td className="p-2">{l.name}</td>
                        <td className="p-2">{l.email}</td>
                        <td className="p-2">{l.phone}</td>
                        <td className="p-2">{l.message}</td>
                        <td className="p-2">{l.createdAt}</td>
                        <td className="p-2">{l.source}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex gap-2">
                <button onClick={exportCSV} className="px-4 py-2 rounded-xl bg-sky-600 hover:bg-sky-700">Export CSV</button>
                <button onClick={() => { sessionStorage.removeItem('admin_key'); setUnlocked(false); setLeads([]); }} className="px-4 py-2 rounded-xl ring-1 ring-slate-600">Lock</button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

/* helpers */
function csv(v:any, quote=false) {
  if (v == null) return '';
  const s = String(v);
  return quote || /[",\n]/.test(s) ? `"${s.replace(/"/g,'""')}"` : s;
}
function download(name:string, data:string) {
  const blob = new Blob([data], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a'); a.href = url; a.download = name; a.click();
  URL.revokeObjectURL(url);
}
