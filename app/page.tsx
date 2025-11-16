import { redirect } from 'next/navigation';

export default function Home() {
  // Always redirect to splash first - splash page will handle routing logic
  redirect('/splash');
}

