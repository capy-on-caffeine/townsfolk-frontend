'use client';

import { useAuth0 } from '@auth0/auth0-react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { HowItWorks } from '@/components/HowItWorks';
import { Testimonials } from '@/components/Testimonials';

export default function Home() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="relative bg-black">
      <Hero />
      <Features />
      <HowItWorks />
      {!isAuthenticated && <Testimonials />}
    </div>
  );
}
