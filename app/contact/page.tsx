'use client';
import { useState } from "react";
import { Input } from "../../components/ui";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", phone:"", message:"", consent:false });
  const [status, setStatus] = useState<""|"ok"|"err"|"send">("");

  const valid = form.name && /.+@.+/.test(form.email) && form.message.length>4 && form.consent;

  const submit = async (e: any) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("send");
    try {
      // Client-only demo; wire to /api later if needed
      setStatus("ok");
      setForm({ name:"", email:"", phone:"", message:"", consent:false });
    } catch {
      setStatus("err");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>
      {status==="ok" && <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-sm">Thanks! We’ll get back to you shortly.</div>}
      {status==="err" && <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-sm">Something went wrong. Please call (262) 417‑2461.</div>}
      <form className="mt-6 grid gap-4" onSubmit={submit}>
        <Input label="Name" value={form.name} onChange={(e:any)=>setForm({...form, name:e.target.value})}/>
        <Input label="Email" type="email" value={form.email} onChange={(e:any)=>setForm({...form, email:e.target.value})}/>
        <Input label="Phone" type="tel" value={form.phone} onChange={(e:any)=>setForm({...form, phone:e.target.value})}/>
        <label className="text-sm text-slate-300">
          <input type="checkbox" className="mr-2" checked={form.consent} onChange={(e)=>setForm({...form, consent:e.target.checked})}/>
          I agree to be contacted and for my details to be stored (see <a href="/legal" className="underline">Privacy Policy</a>).
        </label>
        <label className="block">
          <span className="text-sm text-slate-300">Message</span>
          <textarea className="mt-1 w-full rounded-xl bg-slate-950 border border-slate-800 p-3 h-32" value={form.message} onChange={(e)=>setForm({...form, message:e.target.value})}/>
        </label>
        <button disabled={!valid || status==="send"} className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50">
          {status==="send" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
