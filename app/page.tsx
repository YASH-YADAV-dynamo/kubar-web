'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeClient from './HomeClient';

const SPLASH_COMPLETED_KEY = 'splash-completed';

export default function Home() {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if splash has been completed
    if (typeof window !== 'undefined') {
      const splashCompleted = localStorage.getItem(SPLASH_COMPLETED_KEY);
      if (!splashCompleted) {
        // Redirect to splash if not completed
        router.replace('/splash');
      } else {
        setIsChecking(false);
      }
    }
  }, [router]);

  // Show nothing while checking to prevent flash
  if (isChecking) {
    return null;
  }

  return (
    <>
      <Header />
      <HomeClient />
      <Footer />
    </>
  );
}

