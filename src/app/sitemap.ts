import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/home";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [
    { path: "/", priority: 1 },
    { path: "/kadra/", priority: 0.8 },
    { path: "/sale/", priority: 0.7 },
    { path: "/zajecia/", priority: 0.7 },
    { path: "/konsultacja/", priority: 0.6 },
    { path: "/polityka-prywatnosci/", priority: 0.2 },
  ];
  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority,
  }));
}
