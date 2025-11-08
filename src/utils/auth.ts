import { useAuth0 } from '@auth0/auth0-react';

export const getAuth0Token = async (): Promise<string | null> => {
  const { getAccessTokenSilently } = useAuth0();
  try {
    return await getAccessTokenSilently();
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};