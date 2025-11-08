let tokenGetter: (() => Promise<string>) | null = null;

export const initAuth = (tokenFn: () => Promise<string>) => {
  tokenGetter = tokenFn;
};

export const getAuth0Token = async (): Promise<string | null> => {
  if (!tokenGetter) {
    console.error('Auth token function not initialized');
    return null;
  }
  
  try {
    // Always get a fresh token from Auth0
    const token = await tokenGetter();
    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    // If there's an error, redirect to login
    window.location.href = '/';
    return null;
  }
};