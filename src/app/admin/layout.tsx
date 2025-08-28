'use client';

import { Suspense } from 'react';
import ProtectedAdminWrapper from "@/lib/protection/protectedAdminWrapper";
import MyLoader from '@/myComponents/MyLoader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ProtectedAdminWrapper>
      <Suspense fallback={<MyLoader />}>
        {children}
      </Suspense>
    </ProtectedAdminWrapper>
  );
}