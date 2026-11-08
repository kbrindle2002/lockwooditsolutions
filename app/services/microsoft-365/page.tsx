import type { Metadata } from "next";
import ServiceDetailPage from "@/components/ServiceDetailPage";
import { services } from "@/lib/site";

const service = services.find((item) => item.slug === "microsoft-365")!;

export const metadata: Metadata = {
  title: service.title,
  description: service.summary,
  alternates: { canonical: "/services/microsoft-365/" },
};

export default function Page() {
  return <ServiceDetailPage service={service} />;
}
