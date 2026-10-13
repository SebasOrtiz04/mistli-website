import type { MetadataRoute } from "next";
import {getNoticias} from "@/lib/firebase/firebaseAdmin"
const BASE = "https://www.mistli.com.mx";


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const estaticas: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...["ia", "web", "backend", "automatizacion", "documentos", "aplicaciones"].map((r) => ({
      url: `${BASE}/${r}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    { url: `${BASE}/documentation`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/support`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contacto`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
    { url: `${BASE}/noticias`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
  ];

  const noticias = await getNoticias();
  const dinamicas: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: `${BASE}/noticias/${n.id}`,
    lastModified: n.lastModified,
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...estaticas, ...dinamicas];
}