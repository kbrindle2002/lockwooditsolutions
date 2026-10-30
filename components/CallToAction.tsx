import { PrimaryLink, SecondaryLink } from "@/components/ui";

export default function CallToAction({
  title = "Let’s make your technology easier to support and safer to use.",
  description = "Tell us what is creating risk, downtime, or unnecessary cost. We will help you identify a practical next step.",
}: {
  title?: string;
  description?: string;
}) {
  return (
    <section className="mx-4 overflow-hidden rounded-3xl bg-[#082b59] sm:mx-6 lg:mx-auto lg:max-w-7xl">
      <div className="grid gap-8 px-6 py-12 text-white sm:px-10 lg:grid-cols-[1fr_auto] lg:items-center lg:px-14">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          <p className="mt-3 max-w-2xl text-blue-100">{description}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
          <PrimaryLink href="/contact/" variant="light">
            Schedule an IT assessment
          </PrimaryLink>
          <SecondaryLink href="tel:+12624172461" className="border-white/30 bg-white/5 text-white hover:bg-white/10">
            Call (262) 417-2461
          </SecondaryLink>
        </div>
      </div>
    </section>
  );
}
