'use client';

import { useAuth0 } from '@auth0/auth0-react';
import Link from 'next/link';
import { Button } from '@/components/Button';

export default function Navigation() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="fixed left-1/2 -translate-x-1/2 top-4 w-[98%] max-w-7xl bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-2xl shadow-lg shadow-black/10 z-50 before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-30">
      <div className="px-8 py-4 relative">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-white font-bold text-2xl tracking-wider">
            TOWNSFOLK
          </Link>

          <div className="flex items-center gap-8">
            {isAuthenticated ? (
              <>
                <Link href="/dashboard" className="text-white/90 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link href="/ideas/new" className="text-white/90 hover:text-white transition-colors">
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