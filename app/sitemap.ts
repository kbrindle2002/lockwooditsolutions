import type { MetadataRoute } from "next";
import { services, site } from "@/lib/site";

const routes = [
  "",
  "/services",
  ...services.map((service) => `/services/${service.slug}`),
  "/who-we-help",
  "/why-lockwood",
  "/resources",
  "/service-area",
  "/support",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: route ? `${site.url}${route}/` : `${site.url}/`,
    lastModified: new Date("2026-10-30"),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/services") ? 0.8 : 0.6,
  }));
}
