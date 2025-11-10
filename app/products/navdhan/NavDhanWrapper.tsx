'use client';

import { useEffect } from 'react';

export default function NavDhanWrapper({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    document.body.classList.add('navdhan-page');
    return () => {
      document.body.classList.remove('navdhan-page');
    };
  }, []);

  return <>{children}</>;
}

