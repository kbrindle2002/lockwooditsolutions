import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";
import { Card } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Schedule an IT assessment or contact Lockwood IT Solutions about managed IT, cybersecurity, Microsoft 365, backup, networking, or technology projects.",
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with the business problem, not a product pitch"
        description="Share what is creating downtime, risk, confusion, or unnecessary cost. Lockwood IT Solutions will review the context and help identify a practical next step."
      />

      <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.7fr_1.3fr] lg:px-8 lg:py-20">
        <div>
          <h2 className="text-2xl font-bold text-slate-950">Direct contact</h2>
          <p className="mt-3 leading-7 text-slate-600">
            The form is the best way to provide enough context for a useful follow-up. You can also call or email directly.
          </p>

          <div className="mt-8 grid gap-4">
            <Card className="flex gap-4 p-5">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-950">Phone</h3>
                <a href={`tel:${site.phoneHref}`} className="mt-1 inline-block text-sm font-semibold text-blue-700 hover:underline">{site.phoneDisplay}</a>
              </div>
            </Card>
            <Card className="flex gap-4 p-5">
              <Mail className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-950">Email</h3>
                <a href={`mailto:${site.email}`} className="mt-1 inline-block break-all text-sm font-semibold text-blue-700 hover:underline">{site.email}</a>
              </div>
            </Card>
            <Card className="flex gap-4 p-5">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-blue-700" aria-hidden="true" />
              <div>
                <h3 className="font-bold text-slate-950">Service area</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{site.serviceArea}<br />{site.remoteArea}</p>
                <a
                  href="#service-area-map"
                  className="mt-2 inline-block text-sm font-semibold text-blue-700 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  View service area map
                </a>
              </div>
            </Card>
          </div>

          <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-5 text-sm leading-6 text-slate-700">
            Please do not send passwords, private keys, payment-card data, protected health information, or other sensitive content through this website form.
          </div>
        </div>

        <Card className="p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-slate-950">Request an IT assessment</h2>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Required fields help distinguish a business inquiry from automated traffic and provide enough information for a useful response.
          </p>
          <div className="mt-7">
            <ContactForm />
          </div>
        </Card>
      </section>

      <section
        id="service-area-map"
        className="scroll-mt-48 border-y border-slate-200 bg-slate-50"
        aria-labelledby="service-area-map-heading"
      >
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center lg:px-8 lg:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-700">Service area map</p>
            <h2 id="service-area-map-heading" className="mt-3 text-3xl font-bold tracking-tight text-slate-950">
              Based in Racine and serving businesses across the region
            </h2>
            <p className="mt-4 max-w-xl leading-7 text-slate-600">
              Lockwood IT Solutions provides on-site service throughout {site.serviceArea}. {site.remoteArea}.
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              The map is centered on Racine, Wisconsin, and does not represent a public walk-in office. Service availability depends on location and project scope.
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <iframe
              title="Map centered on Racine, Wisconsin"
              src="https://www.google.com/maps?q=Racine%2C%20Wisconsin&z=8&output=embed"
              className="h-[360px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  );
}
