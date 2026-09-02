import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { event } from "@/data/event";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const body = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const description = `${event.tagline}. ${event.dateRange} at ${event.venue.name}, ${event.venue.city}. Schedule, activities, dress code, travel and RSVP for guests.`;

export const metadata: Metadata = {
  metadataBase: new URL(event.siteUrl),
  title: {
    default: event.title,
    template: `%s · ${event.coupleShort}'s 50th`,
  },
  description,
  applicationName: event.title,
  keywords: [
    "50th wedding anniversary",
    event.coupleFull,
    "celebration schedule",
    "Bhagwat",
    "garba",
    event.venue.city,
  ],
  openGraph: {
    type: "website",
    title: event.title,
    description,
    siteName: event.title,
    url: event.siteUrl,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: event.title,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#FDFAF4",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-plum-600 focus:px-5 focus:py-3 focus:text-sm focus:font-semibold focus:text-ivory"
        >
          Skip to content
        </a>
        <Navigation />
        <main id="main" className="pad-bottom-nav lg:pb-0">
          {children}
        </main>
        <Footer />
        <BackToTop />
      </body>
    </html>
  );
}
