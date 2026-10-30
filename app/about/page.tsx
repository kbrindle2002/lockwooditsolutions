import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { PrimaryLink, SecondaryLink } from "@/components/ui";

export const metadata: Metadata = {
  title: "About",
  description: "About Lockwood IT Solutions and founder Kelly L. Lockwood.",
  alternates: { canonical: "/why-lockwood/" },
  robots: { index: false, follow: true },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="Lockwood IT Solutions is a founder-led managed IT provider"
        description="The full founder story, operating principles, experience, and service approach are available on the Why LIT page."
        actions={
          <>
            <PrimaryLink href="/why-lockwood/">Why LIT</PrimaryLink>
            <SecondaryLink href="/contact/">Contact us</SecondaryLink>
          </>
        }
      />
      <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 lg:px-8">
        <p className="leading-7 text-slate-600">
          This legacy page is retained so older links continue to work. Visit{" "}
          <Link href="/why-lockwood/" className="font-semibold text-blue-700 underline underline-offset-2">Why LIT</Link>{" "}
          for the current business information.
        </p>
      </section>
    </>
  );
}
