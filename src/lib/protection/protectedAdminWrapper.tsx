'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getToken } from '../auth';
import { useRolesStore } from '../stores/useRolesStore';
import MyLoader from '@/myComponents/MyLoader';

export default function ProtectedAdminWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const roles = useRolesStore((state) => state.roles);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {

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
  }, [router, roles]);

  if (!isAuthorized) {
    return (
      <MyLoader />
    );
  }

  return <>{children}</>;
}