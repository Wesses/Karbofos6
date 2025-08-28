'use client'

import dynamic from 'next/dynamic';

const AdminContent = dynamic(() => import('../../lib/lazyComponents/AdminPage'), {
  ssr: false,
});

export default function AdminPage() {
  return <AdminContent />;
}
