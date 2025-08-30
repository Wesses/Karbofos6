'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InspectorPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/inspector/organisations");

  }, [router]);

  return null;
}
