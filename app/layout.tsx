import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import localFont from "next/font/local";
import { CursorGlow } from "@/components/ui/cursor-glow";
import { CookieConsent } from "@/components/cookie-consent";
import { Toaster } from "@/components/ui/sonner";

// Import Satoshi font
const satoshi = localFont({
  src: [
    {
      path: "../public/font/satoshi/Fonts/WEB/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/satoshi/Fonts/WEB/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/satoshi/Fonts/WEB/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-satoshi",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://safegrey.com"),
  title: {
    default: "Safegrey",
    template: "%s | Safegrey",
  },
  icons: {
    icon: "/fav.svg",      // or .svg
    apple: "/fav.svg",
  },
  description:
    "Safegrey provides advanced cybersecurity services including Penetration Testing, Red Teaming, SOC, and Risk Management. Secure your digital future with our adversary-focused approach.",
  keywords: [
    "Cybersecurity",
    "Penetration Testing",
    "Red Team Operations",
    "SOC",
    "Managed Security",
    "Vulnerability Assessment",
    "Threat Intelligence",
    "Incident Response",
    "Compliance",
    "Risk Management",
    "Cloud Security",
    "Network Security",
    "Application Security",
    "Zero Trust",
    "ISO 27001",
    "GDPR",
    "PCI DSS",
    "Phishing Simulation",
    "Ransomware Protection",
    "Security Architecture",
    "DevSecOps",
    "Forensics",
    "Malware Analysis",
    "Endpoint Security",
    "Identity and Access Management (IAM)",
    "SIEM",
    "SOAR",
    "Threat Hunting",
    "Security Headers Tool",
    "Security Headers Analysis",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://safegrey.com",
    siteName: "Safegrey",
    title: "Safegrey | Advanced Cybersecurity & Threat Operations",
    description:
      "Safegrey provides advanced cybersecurity services including Penetration Testing, Red Teaming, SOC, and Risk Management. Secure your digital future with our adversary-focused approach.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Safegrey Cybersecurity",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Safegrey",
    description:
      "Safegrey provides advanced cybersecurity services including Penetration Testing, Red Teaming, SOC, and Risk Management. Secure your digital future with our adversary-focused approach.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Safegrey",
        url: "https://safegrey.com",
        logo: "https://safegrey.com/logo.png",
        description:
          "Safegrey provides advanced cybersecurity services including Penetration Testing, Red Teaming, SOC, and Risk Management.",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: "+1-555-555-5555",
          contactType: "customer service",
        },
      },
      {
        "@type": "WebSite",
        name: "Safegrey",
        url: "https://safegrey.com",
        potentialAction: {
          "@type": "SearchAction",
          target: "https://safegrey.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string",
        },
      },
    ],
  };

  return (
    <html lang="en" className="dark">
      <body className={`${satoshi.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CursorGlow />
        <CookieConsent />
        <Suspense fallback={null}>{children}</Suspense>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
