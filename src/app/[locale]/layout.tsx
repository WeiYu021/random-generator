import './globals.css';
import '@radix-ui/themes/styles.css';
import React from 'react';
import { Inter } from 'next/font/google'
import { Layout } from '@/components/Layout';
import { Metadata } from 'next'
import { GoogleAnalyticsScript } from "@/components/analytics/GoogleAnalyticsScript";
import { PlausibleAnalyticsScript } from "@/components/analytics/PlausibleAnalyticsScript";
// import GoogleAdsenseScript from "@/components/ads/GoogleAdsenseScript";
import { ThemeProvider } from "next-themes"
import { DM_Sans } from "next/font/google";
import { cn } from "@/lib/utils";

import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const inter = Inter({ subsets: ['latin'] })
const sansFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: {
    "default": "AnythingRandom | QR Codes, Passwords & AI Content Generators",
    "template": "%s | Secure Randomization Engine"
  },
  description: "Generate cryptographically secure random data with dynamic parameters. Create disposable QR codes, unpredictable text strings, AI-powered content variations and more with military-grade algorithms.",
  authors: {
    "name": "AnythingRandom Labs",
    "url": "https://anythingrandom.net/"
  },
  keywords: "",
  alternates: {
    "canonical": "https://anythingrandom.net/",
    "languages": {
      "en-US": "https://anythingrandom.net/en/",
      "zh-CN": "https://anythingrandom.net/zh/"
    }
  },
  icons: [
    { rel: "icon", type: 'image/png', sizes: "16x16", url: "/favicon-16x16.png" },
    { rel: "icon", type: 'image/png', sizes: "32x32", url: "/favicon-32x32.png" },
    { rel: "icon", type: 'image/ico', url: "/favicon.ico" },
    { rel: "apple-touch-icon", sizes: "180x180", url: "/apple-touch-icon.png" },
    { rel: "android-chrome", sizes: "512x512", url: "/android-chrome-512x512.png" },
    { rel: "android-chrome", sizes: "192x192", url: "/android-chrome-192x192.png" },
  ],
}

export default async function RootLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages();

  return (
    <>
      <html lang={locale} suppressHydrationWarning>
        <head />
        <body className={cn(inter.className, sansFont.variable,
        )}>
          <NextIntlClientProvider messages={messages}>
            <ThemeProvider
              attribute="class"

            >
              <Layout>{children}</Layout>
              {/* <GoogleAdsenseScript /> */}
              <GoogleAnalyticsScript />
              <PlausibleAnalyticsScript />
            </ThemeProvider>
          </NextIntlClientProvider>
        </body>
      </html>
    </>
  )
}