import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Team — Kubar Labs",
  description: "Meet the Kubar Labs team accelerating MSME credit intelligence across India.",
};

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

