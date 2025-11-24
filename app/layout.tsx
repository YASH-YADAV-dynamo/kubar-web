import type { Metadata } from 'next';
import { Inter, Space_Grotesk, Orbitron } from 'next/font/google';
import './globals.css';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Kubar Labs - Credit Intelligence for MSMEs",
  description: "NavDhan by Kubar Labs delivers lender-grade API workflows that help NBFCs and banks serve MSMEs with faster, data-rich credit.",
  icons: {
    icon: '/favicon.png',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`} style={{ fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  );
}

