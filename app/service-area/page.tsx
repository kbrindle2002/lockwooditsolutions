import type { Metadata } from "next";
import { MapPin, MonitorSmartphone, Route } from "lucide-react";
import CallToAction from "@/components/CallToAction";
import PageHero from "@/components/PageHero";
import { Card, PrimaryLink, SecondaryLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "Service Area",
  description:
    "Managed IT service in Southeast Wisconsin and Northern Illinois, with remote support available across the Midwest.",
  alternates: { canonical: "/service-area/" },
};

export default function ServiceAreaPage() {
  return (
    <>
      <PageHero
        eyebrow="Service area"
        title="Local relationship, remote capability"
        description="Lockwood IT Solutions is based in Racine and serves businesses across Southeast Wisconsin and Northern Illinois, with remote support available more broadly across the Midwest."
        actions={
          <>
            <PrimaryLink href="/contact/">Check service availability</PrimaryLink>
            <SecondaryLink href="/who-we-help/">See who we help</SecondaryLink>
          </>
        }
      />

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8 lg:py-20">
        <Card className="p-7">
          <MapPin className="h-7 w-7 text-blue-700" aria-hidden="true" />
          <h2 className="mt-5 text-xl font-bold text-slate-950">Primary region</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Racine, Kenosha, Milwaukee-area communities, and nearby Southeast Wisconsin locations.</p>
        </Card>
        <Card className="p-7">
          <Route className="h-7 w-7 text-blue-700" aria-hidden="true" />
          <h2 className="mt-5 text-xl font-bold text-slate-950">Northern Illinois</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Scheduled project and managed-service work may be available for businesses in Northern Illinois, depending on scope and location.</p>
        </Card>
        <Card className="p-7">
          <MonitorSmartphone className="h-7 w-7 text-blue-700" aria-hidden="true" />
          <h2 className="mt-5 text-xl font-bold text-slate-950">Remote support</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">Many support, Microsoft 365, security, planning, and administration tasks can be delivered remotely across the Midwest.</p>
        </Card>
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <Card className="border-blue-100 bg-blue-50/60 p-7 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">On-site scope is confirmed before engagement</h2>
          <p className="mt-4 leading-7 text-slate-700">
            Travel, scheduling, emergency availability, included visits, and on-site rates are defined in the proposal or service agreement. The website does not promise immediate dispatch or unlimited field coverage.
          </p>
        </Card>
      </section>

      <CallToAction title="Tell us where your team and systems are located" description="Location is one part of fit. The environment, support expectations, and amount of on-site work matter just as much." />
    </>
  );
}
