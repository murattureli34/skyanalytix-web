import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.skyanalytix.ai"),
  title: {
    default: "SkyAnalytix",
    template: "%s | SkyAnalytix",
  },
  description: "Privacy-first analytics for Retail, ElderCare, Factory and SmartHome.",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "SkyAnalytix",
    description: "Privacy-first analytics for Retail, ElderCare, Factory and SmartHome.",
    url: "https://www.skyanalytix.ai",
    siteName: "SkyAnalytix",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "SkyAnalytix",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkyAnalytix",
    description: "Privacy-first analytics for Retail, ElderCare, Factory and SmartHome.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
