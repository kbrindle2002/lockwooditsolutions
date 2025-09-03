"use client";

import { useState } from "react";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    consent: false,
  });
  const [status, setStatus] = useState<"" | "ok" | "err" | "send">("");

  const valid =
    form.name &&
    /.+@.+/.test(form.email) &&
    form.message.length > 4 &&
    form.consent;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!valid) return;
    setStatus("send");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("ok");
        setForm({ name: "", email: "", phone: "", message: "", consent: false });
      } else {
        setStatus("err");
      }
    } catch (err) {
      console.error(err);
      setStatus("err");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">Contact</h1>

      {status === "ok" && (
        <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500 text-sm">
          ✅ Thanks! We’ll get back to you shortly.
        </div>
      )}

      {status === "err" && (
        <div className="mt-4 p-3 rounded-xl bg-red-500/20 border border-red-500 text-sm">
          ❌ Something went wrong. Please try again later or call (262) 417-2461.
        </div>
      )}

      <form className="mt-6 grid gap-4" onSubmit={submit}>
        <label className="block">
          <span className="text-sm">Name</span>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm">Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="mt-1 w-full rounded-xl border px-3 py-2"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm">Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="mt-1 w-full rounded-xl border px-3 py-2"
          />
        </label>

        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
          />
          <span>
            I agree to be contacted and for my details to be stored (see{" "}
            <a href="/legal" className="underline">
              Privacy Policy
            </a>
            ).
          </span>
        </label>

        <label className="block">
          <span className="text-sm">Message</span>
          <textarea
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-1 w-full rounded-xl border px-3 py-2 h-32"
            required
          />
        </label>

        <button
          type="submit"
          disabled={!valid || status === "send"}
          className="px-5 py-3 rounded-2xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white"
        >
          {status === "send" ? "Sending…" : "Send message"}
        </button>
      </form>
    </div>
  );
}
