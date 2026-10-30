import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Lockwood IT Solutions website and contact form.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-blue-700">Legal</p>
      <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950">Privacy Policy</h1>
      <p className="mt-3 text-sm text-slate-500">Effective October 30, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">Scope</h2>
          <p className="mt-3">
            This policy describes how Lockwood IT Solutions handles information submitted through this website or provided when you contact us about services. Customer service agreements may contain additional privacy, security, and data-handling terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Information we collect</h2>
          <p className="mt-3">
            The contact form may collect your name, work email, phone number, company, approximate team size, service interests, message, submission time, page path, and limited technical information needed to operate and protect the form. Please do not submit passwords, private keys, payment-card data, protected health information, or other sensitive content through the website.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">How information is used</h2>
          <p className="mt-3">
            We use submitted information to respond to inquiries, evaluate service fit, prepare proposals, communicate about requested work, protect the website from abuse, maintain business records, and meet legal or security obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Service providers and sharing</h2>
          <p className="mt-3">
            We do not sell personal information. Information may be processed by hosting, email-delivery, security, communications, accounting, or other service providers when reasonably necessary for business operations. Information may also be disclosed when required by law, to protect rights or systems, or as part of a business transaction subject to appropriate safeguards.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Retention and security</h2>
          <p className="mt-3">
            Records are retained only as long as reasonably needed for inquiry follow-up, service delivery, contracts, accounting, security, dispute handling, and legal obligations. Reasonable safeguards are used, but no website, email system, or transmission method can be guaranteed perfectly secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Your choices</h2>
          <p className="mt-3">
            You may request access, correction, or deletion of information you submitted, subject to legal, contractual, security, and record-retention requirements. You may also choose to contact us by phone rather than through the web form.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Contact</h2>
          <p className="mt-3">
            Privacy questions may be sent to{" "}
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
