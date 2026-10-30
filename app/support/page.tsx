import type { Metadata } from "next";
import Link from "next/link";
import { AlertTriangle, Mail, Phone, ShieldAlert } from "lucide-react";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Client Support",
  description: "Contact Lockwood IT Solutions for existing-client support and urgent security guidance.",
  alternates: { canonical: "/support/" },
};

export default function SupportPage() {
  return (
    <>
      <PageHero
        eyebrow="Client support"
        title="Need help with an existing Lockwood-managed environment?"
        description="Use the support method defined in your service agreement whenever possible. For general requests, you can call or email using the contact information below."
        actions={
          <>
            <PrimaryLink href={`tel:${site.phoneHref}`}>Call {site.phoneDisplay}</PrimaryLink>
            <SecondaryLink href={`mailto:${site.email}`}>Email support</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
        <Card className="p-7 sm:p-8">
          <Phone className="h-7 w-7 text-blue-700" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-bold text-slate-950">Phone</h2>
          <p className="mt-3 leading-7 text-slate-600">Call for an existing support issue or to clarify the appropriate request path.</p>
          <a href={`tel:${site.phoneHref}`} className="mt-5 inline-flex font-semibold text-blue-700 hover:underline">{site.phoneDisplay}</a>
        </Card>
        <Card className="p-7 sm:p-8">
          <Mail className="h-7 w-7 text-blue-700" aria-hidden="true" />
          <h2 className="mt-5 text-2xl font-bold text-slate-950">Email</h2>
          <p className="mt-3 leading-7 text-slate-600">Include the affected person, device or system, business impact, error details, and the best callback number.</p>
          <a href={`mailto:${site.email}`} className="mt-5 inline-flex break-all font-semibold text-blue-700 hover:underline">{site.email}</a>
        </Card>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <Card className="border-red-200 bg-red-50/60 p-7 sm:p-8">
          <div className="flex gap-4">
            <ShieldAlert className="mt-1 h-7 w-7 shrink-0 text-red-700" aria-hidden="true" />
            <div>
              <h2 className="text-2xl font-bold text-slate-950">Suspect an active security incident?</h2>
              <p className="mt-3 leading-7 text-slate-700">
                If safe to do so, disconnect the affected device from Wi-Fi or Ethernet, do not continue entering passwords, and call using the escalation method in your agreement. Do not delete messages, logs, or files that may be needed to understand what happened.
              </p>
            </div>
          </div>
        </Card>

        <div className="mt-6 flex gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <p>
            Support hours, priority definitions, after-hours availability, response targets, and included on-site service are governed by the applicable written agreement. This webpage does not expand those commitments.
          </p>
        </div>

        <p className="mt-8 text-center text-sm text-slate-600">
          Not yet a client? <Link href="/contact/" className="font-semibold text-blue-700 underline underline-offset-2">Schedule an IT assessment</Link>.
        </p>
      </section>
    </>
  );
}
