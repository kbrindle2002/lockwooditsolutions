import type { Metadata } from "next";
import { site } from "@/lib/site";

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
      <p className="mt-3 text-sm text-slate-500">Effective October 31, 2026</p>

      <div className="mt-10 space-y-8 text-base leading-8 text-slate-700">
        <section>
          <h2 className="text-2xl font-bold text-slate-950">Scope and website operator</h2>
          <p className="mt-3">
            {site.legalName} operates this website under the {site.name} brand. This policy describes how information is handled when you use the website or voluntarily contact us about an assessment or service. A separate written service agreement may contain additional privacy, security, confidentiality, and data-handling terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Information we may receive</h2>
          <p className="mt-3">
            The website contact form may receive information you voluntarily provide, including:
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-6">
            <li>Name and work email</li>
            <li>Phone number, if provided</li>
            <li>Company name</li>
            <li>Approximate team size</li>
            <li>Service interest</li>
            <li>Your message</li>
            <li>Your consent selection</li>
          </ul>
          <p className="mt-3">
            To process, deliver, and help secure a request, the website may also create a submission timestamp and unique request ID and may process the page path and ordinary technical request information handled by the website infrastructure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">How information is used</h2>
          <p className="mt-3">
            Information may be used to respond to inquiries, evaluate an assessment or service request, communicate about requested work, operate and secure the website, filter obvious automated abuse, maintain appropriate operational records, address disputes, and meet applicable legal or security obligations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Service providers and sharing</h2>
          <p className="mt-3">
            Microsoft Azure hosts the website and its managed application programming interface. Twilio SendGrid is intended to deliver contact-form notification email to Lockwood IT Solutions. Google Maps is embedded on the Contact page and may receive technical request information when the map loads.
          </p>
          <p className="mt-3">
            These and other service providers operate under their own terms, privacy practices, availability, and technical controls. Information may also be disclosed when reasonably necessary to comply with applicable law, protect rights or systems, investigate misuse, or support a business transaction subject to appropriate safeguards. Lockwood IT Solutions does not sell personal information.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Sensitive information</h2>
          <p className="mt-3">
            Do not submit passwords, private keys, payment-card data, protected health information, or other unnecessary sensitive or regulated information through the website form.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Retention and security</h2>
          <p className="mt-3">
            Information is retained only as reasonably necessary for its stated business purpose, operational records, security, dispute handling, and applicable legal obligations, subject to the systems and policies in use.
          </p>
          <p className="mt-3">
            Reasonable safeguards are used to protect website and inquiry information, but no website, email system, third-party service, or transmission method can be guaranteed perfectly secure.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Your choices</h2>
          <p className="mt-3">
            You may request access to, correction of, or deletion of information you submitted, subject to applicable legal, contractual, security, dispute, and record-retention requirements. You may also choose to contact Lockwood IT Solutions by phone rather than through the website form.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-950">Contact</h2>
          <p className="mt-3">
            Privacy questions may be sent to{" "}
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
