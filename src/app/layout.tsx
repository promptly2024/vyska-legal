import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { ClerkProvider } from '@clerk/nextjs'
import Script from "next/script";
import DisclaimerModal from "@/components/DisclaimerModal";
import { prisma } from "@/lib/prisma";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-lato',
  display: 'swap',
})



export const metadata: Metadata = {
  title: {
    default: "Vyska Legal - Expert Legal Services",
    template: "%s | Vyska Legal",
  },
  description: "Vyska Legal provides trusted legal resources, expert consultations, and seamless appointment booking for all your legal needs.",
  keywords: ["legal services", "lawyer consultation", "legal advice", "vyska legal", "law firm", "appointments", "legal resources"],
  authors: [{ name: "Vyska Legal" }],
  creator: "Vyska Legal",
  publisher: "Vyska Legal",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://vyskalegal.com",
    title: "Vyska Legal - Expert Legal Services & Consultation",
    description: "Your trusted partner for legal excellence. Book consultations, access resources, and manage your legal journey with Vyska Legal.",
    siteName: "Vyska Legal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vyska Legal - Expert Legal Services",
    description: "Trusted legal resources and expert consultations.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/logo/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/logo/favicon.ico",
    apple: "/logo/apple-touch-icon.png",
  },
  manifest: "/logo/site.webmanifest",
  applicationName: "Vyska Legal",
  appleWebApp: {
    capable: true,
    title: "Vyska Legal",
    statusBarStyle: "default",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyInfo = await prisma.companyInfo.findFirst();

  return (
    <html lang="en" className={lato.variable}>
      <head>
      </head>
      <body
        className="font-lato"
      >
        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: '#2563eb', // blue-600
              colorText: '#1f2937', // gray-800
              borderRadius: '0.75rem', // rounded-xl
              fontFamily: 'var(--font-lato)',
            },
            elements: {
              card: "shadow-xl border border-gray-100 bg-white/90 backdrop-blur-md",
              formButtonPrimary: "bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20",
              formFieldInput: "rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all",
              footerActionLink: "text-blue-600 hover:text-blue-700 font-medium"
            }
          }}
        >
          <DisclaimerModal
            message={companyInfo?.disclaimerMessage}
            points={companyInfo?.disclaimerPoints}
          />
          <Toaster />
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
