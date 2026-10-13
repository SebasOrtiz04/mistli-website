import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import I18nProvider from "@/Providers/Provider";
import MainLayout from "@/layouts/MainLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  metadataBase: new URL("https://www.mistli.com.mx"),
  title: {
    default: "Mistli | Soluciones en la nube",
    template: "%s | Mistli",
  },
  description:
    "Software, automatización e inteligencia artificial para tu negocio. Soluciones en la nube.",
  applicationName: "Mistli",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: "/",
    siteName: "Mistli",
    title: "Mistli | Soluciones en la nube",
    description:
      "Software, automatización e inteligencia artificial para tu negocio.",
    images: [
      { url: "/og-image.png", width: 1200, height: 630, alt: "Mistli, soluciones en la nube" },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mistli | Soluciones en la nube",
    description:
      "Software, automatización e inteligencia artificial para tu negocio.",
    images: ["/og-image.png"],
  },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <MainLayout>

      <html
        lang="es"
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <I18nProvider>
          <body className="min-h-full flex flex-col">{children}</body>
        </I18nProvider>
      </html>
    </MainLayout>
  );
}
