'use client';

import { PropsWithChildren, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { initAuth } from '@/utils/auth';

function AuthInitializer({ children }: PropsWithChildren) {
  const { getAccessTokenSilently, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (!isAuthenticated || isLoading) return;
    
    const initializeAuth = async () => {
      try {
        // Initialize the auth with a function that will always get a fresh token
        initAuth(async () => {
          const token = await getAccessTokenSilently({
            authorizationParams: {
              audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
            },
            detailedResponse: true,
            cacheMode: 'on'
          });
          return token.access_token;
        });
      } catch (error) {
        console.error('Error initializing auth:', error);
      }
    };
    initializeAuth();
  }, [getAccessTokenSilently, isAuthenticated, isLoading]);

  return <>{children}</>;
}

export default function Auth0ProviderClient({ children }: PropsWithChildren) {
  if (typeof window === 'undefined') return null;

  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN || ''}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID || ''}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: process.env.NEXT_PUBLIC_AUTH0_AUDIENCE,
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      <AuthInitializer>
        {children}
      </AuthInitializer>
    </Auth0Provider>
  );
}