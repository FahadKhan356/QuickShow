import { useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { setAuthTokenProvider } from '../lib/api';

// Syncs the Clerk session JWT into the shared API helper so that
// every authenticated request to the backend includes the Bearer token.
export default function AuthSync() {
  const { getToken } = useAuth();

  useEffect(() => {
    if (getToken) setAuthTokenProvider(getToken);
  }, [getToken]);

  return null;
}