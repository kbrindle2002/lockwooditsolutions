"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { FormEvent } from "react";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  company: "",
  teamSize: "",
  service: "",
  message: "",
  consent: false,
  website: "",
};

type Status = "idle" | "sending" | "success" | "error";

const teamSizes = ["1-9", "10-24", "25-49", "50-99", "100+", "Not sure"];
const serviceOptions = [
  "Managed IT Services",
  "Managed Cybersecurity",
  "Microsoft 365 and Cloud",
  "Backup and Business Continuity",
  "Network and Infrastructure",
  "Projects and Advisory",
  "Not sure yet",
];

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<Status>("idle");
  const [requestId, setRequestId] = useState("");
  const startedAt = useRef(Date.now());

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === "sending") return;

    setStatus("sending");
    setRequestId("");

    try {
      const response = await fetch("/api/contacts-create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          source: "website",
          path: window.location.pathname,
          startedAt: startedAt.current,
        }),
      });

      const result = (await response.json().catch(() => ({}))) as { ok?: boolean; requestId?: string };
      if (!response.ok || !result.ok) throw new Error(result.requestId || "Contact request failed");

      setForm(initialForm);
      startedAt.current = Date.now();
      setRequestId(result.requestId || "");
      setStatus("success");
    } catch (error) {
      setRequestId(error instanceof Error ? error.message : "");
      setStatus("error");
    }
  };

  const inputClass =
    "mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-4 focus:ring-blue-100";

  return (
    <form onSubmit={submit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Name <span className="text-red-600">*</span>
          <input
            className={inputClass}
            type="text"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={100}
            value={form.name}
            onChange={(event) => setForm({ ...form, name: event.target.value })}
          />
        </label>

        <label className="text-sm font-semibold text-slate-800">
          Work email <span className="text-red-600">*</span>
          <input
            className={inputClass}
            type="email"
            name="email"
            autoComplete="email"
            required
            maxLength={254}
            value={form.email}
            onChange={(event) => setForm({ ...form, email: event.target.value })}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Phone
          <input
            className={inputClass}
            type="tel"
            name="phone"
            autoComplete="tel"
            maxLength={40}
            value={form.phone}
            onChange={(event) => setForm({ ...form, phone: event.target.value })}
          />
        </label>

        <label className="text-sm font-semibold text-slate-800">
          Company
          <input
            className={inputClass}
            type="text"
            name="company"
            autoComplete="organization"
            maxLength={120}
            value={form.company}
            onChange={(event) => setForm({ ...form, company: event.target.value })}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-semibold text-slate-800">
          Team size <span className="text-red-600">*</span>
          <select
            className={inputClass}
            name="teamSize"
            required
            value={form.teamSize}
            onChange={(event) => setForm({ ...form, teamSize: event.target.value })}
          >
            <option value="">Select one</option>
            {teamSizes.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>

        <label className="text-sm font-semibold text-slate-800">
          Service interest <span className="text-red-600">*</span>
          <select
            className={inputClass}
            name="service"
            required
            value={form.service}
            onChange={(event) => setForm({ ...form, service: event.target.value })}
          >
            <option value="">Select one</option>
            {serviceOptions.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
      </div>

      <label className="text-sm font-semibold text-slate-800">
        What would you like to improve? <span className="text-red-600">*</span>
        <textarea
          className={`${inputClass} min-h-40 resize-y`}
          name="message"
          required
          minLength={20}
          maxLength={4000}
          value={form.message}
          onChange={(event) => setForm({ ...form, message: event.target.value })}
          placeholder="Tell us what is happening, what systems are involved, how many people are affected, and what a good outcome would look like."
        />
      </label>

      <label className="absolute left-[-10000px] top-auto h-px w-px overflow-hidden" aria-hidden="true">
        Website
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) => setForm({ ...form, website: event.target.value })}
        />
      </label>

      <label className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
        <input
          type="checkbox"
          name="consent"
          required
          checked={form.consent}
          onChange={(event) => setForm({ ...form, consent: event.target.checked })}
          className="mt-1 h-4 w-4 rounded border-slate-300 text-blue-700 focus:ring-blue-600"
        />
        <span>
          I agree that Lockwood IT Solutions may use these details to respond to my request. See the{" "}
          <Link href="/privacy/" className="font-semibold text-blue-700 underline underline-offset-2">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending" || !form.consent}
        className="inline-flex min-h-12 items-center justify-center rounded-xl bg-blue-700 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
      >
        {status === "sending" ? "Sending…" : "Send assessment request"}
      </button>

      <div aria-live="polite" aria-atomic="true" className="min-h-6 text-sm">
        {status === "success" && (
          <p className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 font-medium text-emerald-800">
            Your request has been sent. We will review it and follow up using the contact information you provided.
            {requestId && <span className="mt-1 block text-xs font-normal">Reference: {requestId}</span>}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 font-medium text-red-800">
            The form could not be delivered. Please call (262) 417-2461 or email info@lockwooditsolutions.com.
            {requestId && <span className="mt-1 block text-xs font-normal">Reference: {requestId}</span>}
          </p>
        )}
      </div>
    </form>
  );
}
