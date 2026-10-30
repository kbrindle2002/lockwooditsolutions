import type { Metadata } from "next";

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
      <p className="mt-3 text-sm text-slate-500">Effective October 30, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">Website use</h2>
          <p className="mt-3">
            This website provides general information about Lockwood IT Solutions. You may use it for lawful purposes and may not interfere with its operation, attempt unauthorized access, submit malicious content, or misuse contact channels.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">No service agreement created</h2>
          <p className="mt-3">
            Visiting the website, submitting a form, or receiving an initial response does not create a managed-service relationship or authorize access to systems. Services begin only under an accepted proposal, statement of work, or service agreement that defines scope, pricing, responsibilities, and applicable terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Informational content</h2>
          <p className="mt-3">
            Website content is general information, not legal, financial, insurance, regulatory, or compliance advice. Technology changes over time, and recommendations must be evaluated against the customer’s actual environment and obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Third-party services</h2>
          <p className="mt-3">
            References to Microsoft, Azure, SendGrid, hardware manufacturers, software products, or other providers do not imply ownership or endorsement. Third-party products and services are governed by their own terms, availability, security, and pricing.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Availability and limitation</h2>
          <p className="mt-3">
            The website is provided on an as-available basis. To the extent permitted by law, Lockwood IT Solutions is not responsible for losses caused solely by website interruption, inaccurate third-party information, or reliance on general website content instead of a written service agreement or professional advice.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Changes</h2>
          <p className="mt-3">
            These website terms may be updated as the site, services, or legal requirements change. The effective date above identifies the current published version.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Contact</h2>
          <p className="mt-3">
            Questions may be sent to{" "}
            <a className="font-semibold text-blue-700 underline underline-offset-2" href="mailto:info@lockwooditsolutions.com">
              info@lockwooditsolutions.com
            </a>
            .
          </p>
        </section>
      </div>
    </section>
  );
}
