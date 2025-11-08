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
  title: "Kubar Labs — Credit Intelligence for MSMEs",
  description: "NavDhan by Kubar Labs delivers lender-grade API workflows that help NBFCs and banks serve MSMEs with faster, data-rich credit.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable}`} style={{ fontFamily: 'var(--font-body)' }}>
        {children}
      </body>
    </html>
  );
}

