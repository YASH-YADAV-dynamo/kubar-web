import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Blog — Kubar Labs",
  description: "Insights from Kubar Labs on MSME lending, ONDC, and credit intelligence.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

