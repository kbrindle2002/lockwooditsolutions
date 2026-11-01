import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Website Terms",
  description: "Website terms for Lockwood IT Solutions.",
  alternates: { canonical: "/terms/" },
};

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Website Terms</h1>
      <p className="mt-3 text-sm text-slate-500">Effective October 31, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">Website operator and permitted use</h2>
          <p className="mt-3">
            This website is operated by {site.legalName} under the {site.name} brand. The website provides general information about the business and its services. You may use it for lawful purposes and may not interfere with its operation, attempt unauthorized access, submit malicious content, or misuse its contact channels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">No client or service relationship created</h2>
          <p className="mt-3">
            Visiting the website, submitting a form, or receiving an initial response does not create a client, managed-service, advisory, or other professional relationship and does not authorize access to any system or account.
          </p>
          <p className="mt-3">
            Services begin only under a separately signed written agreement. The applicable agreement controls service scope, responsibilities, response targets, exclusions, separately scoped projects, client obligations, authorization boundaries, and other service terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Informational content</h2>
          <p className="mt-3">
            Website content is general information and is not legal, financial, insurance, regulatory, or compliance advice. Technology, threats, products, services, and legal requirements change over time. Any recommendation must be evaluated against the customer’s actual environment, business needs, written agreements, and applicable professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Third-party services</h2>
          <p className="mt-3">
            The website may rely on Microsoft Azure for website and managed application programming interface hosting, Twilio SendGrid for intended contact-form notification delivery, and Google Maps for the embedded service-area map.
          </p>
          <p className="mt-3">
            Third-party services have their own terms, privacy practices, availability, security controls, and technical behavior. References to a third party do not imply that Lockwood IT Solutions owns that service or that the third party endorses, sponsors, or guarantees Lockwood IT Solutions.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Availability and limitations</h2>
          <p className="mt-3">
            The website is provided on an as-available basis. Lockwood IT Solutions does not promise uninterrupted or error-free website availability. Nothing on the website guarantees uptime, response or resolution times, threat prevention, recovery, compliance certification, regulatory approval, or a particular business or technical outcome.
          </p>
          <p className="mt-3">
            To the extent permitted by law, {site.legalName} is not responsible for losses caused solely by website interruption, inaccurate third-party information, third-party service behavior, or reliance on general website content instead of a written service agreement or appropriate professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Changes</h2>
          <p className="mt-3">
            These Website Terms may be updated as the website, services, providers, or applicable requirements change. The effective date above identifies the current published version.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Contact</h2>
          <p className="mt-3">
            Questions about these Website Terms may be sent to{" "}
            <a
              className="font-semibold text-blue-700 underline underline-offset-2"
              href={`mailto:${site.email}`}
            >
              {site.email}
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
