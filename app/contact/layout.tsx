import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Contact — Kubar Labs",
  description: "Book a demo or reach the Kubar Labs team.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

