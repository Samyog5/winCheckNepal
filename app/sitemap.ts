import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "#checker", "#draws", "#how-it-works", "#faq"].map(
    (route) => ({
      url: `${siteConfig.url}${route}`,
      lastModified: new Date().toISOString(),
      changeFrequency: "daily" as const,
      priority: route === "" ? 1.0 : 0.8,
    })
  );

  return routes;
}
