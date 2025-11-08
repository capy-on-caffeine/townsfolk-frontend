'use client';

import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function Navigation() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="fixed w-full top-0 bg-black/80 backdrop-blur-sm border-b border-white/10 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="text-white font-bold text-xl">
            Townsfolk
          </Link>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-white hover:text-gray-300">
                  Dashboard
                </Link>
                <Link href="/ideas/new" className="text-white hover:text-gray-300">
                  New Idea
                </Link>
                <Button
                  variant="secondary"
                  onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
                >
                  Log Out
                </Button>
              </>
            ) : (
              <Button onClick={() => loginWithRedirect()}>
                Log In
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}