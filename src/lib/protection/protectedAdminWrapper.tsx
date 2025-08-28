'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../auth';
import { useRolesStore } from '../stores/useRolesStore';
import MyLoader from '@/myComponents/MyLoader';

export default function ProtectedAdminWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { roles, hydrated } = useRolesStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const token = getToken();
    if (!token) {
      router.replace('/login');
      return;
    }

    if (!roles.includes('Admin')) {
      router.replace('/yourRoles');
      return;
    }

    setIsAuthorized(true);
  }, [router, roles, hydrated]);

  if (!hydrated || !isAuthorized) {
    return <MyLoader />;
  }

  return <>{children}</>;
}
