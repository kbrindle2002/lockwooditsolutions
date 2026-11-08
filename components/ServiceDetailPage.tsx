import PageHero from "@/components/PageHero";
import { PrimaryLink, SecondaryLink } from "@/components/ui";
import { services } from "@/lib/site";

type Service = (typeof services)[number];

export default function ServiceDetailPage({ service }: { service: Service }) {
  return (
    <PageHero
      eyebrow="Specialties"
      title={service.title}
      description={service.summary}
      actions={
        <>
          <PrimaryLink href="/contact/">Discuss your environment</PrimaryLink>
          <SecondaryLink href="/services/">View all services</SecondaryLink>
        </>
      }
    />
  );
}
