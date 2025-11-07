import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kubar Labs – Revolutionizing Trade Financing Accessibility",
  description: "Kubar Labs is transforming how businesses access trade finance using decentralised solutions.Unlock MSME lending with secure, transparent blockchain technology.",
  keywords: ["Kubar","Kubar Labs", "Loan Management", "DeFi", "Trade Finance", "MSME Financing", "Blockchain Lending", "Decentralized Finance", "MSME Loans", "Fintech Protocol"],
  authors: [{ name: "Vaibhav Sharma" }],
  // creator: "", // To add company name
  // publisher: "",
  metadataBase: new URL("https://kubar.tech"), // Your canonical base URL
  openGraph: {
    title: "Kubar Protocol",
    description: "Revolutionizing Trade Financing Accessibility",
    url: "https://kubar.tech",
    siteName: "Kubar Protocol",
    images: [
      {
        url: "https://kubar.tech/landing.png", // A good-looking 1200x630 OG image
        width: 1200,
        height: 630,
        alt: "Kubar Protocol – Revolutionizing Trade Financing Accessibility"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Kubar Protocol",
    description: "Revolutionizing invoice discounting accessibility for all",
    site: "@kubarprotocol", // Your Twitter handle
    creator: "@kubarprotocol",
    images: ["https://kubar.tech/landing.png"]
  },
  robots: {
    index: true,
    follow: true,
    nocache: false
  },
  themeColor: "#000000"
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
