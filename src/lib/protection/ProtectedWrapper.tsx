"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getToken } from "../auth";
import { useRolesStore } from "../stores/useRolesStore";
import MyLoader from "@/lib/myComponents/MyLoader";
import { Roles } from "../types";

export default function ProtectedWrapper({
  children,
  protectedRole,
}: {
  children: React.ReactNode,
  protectedRole: Roles
}) {
  const router = useRouter();
  const { roles, hydrated } = useRolesStore();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (!hydrated) return;

    const token = getToken();
    if (!token) {
      router.replace("/login");
      return;
    }

    if (!roles.includes(protectedRole)) {
      router.replace("/your-roles");
      return;
    }

    setIsAuthorized(true);
  }, [router, roles, hydrated, protectedRole]);

  if (!hydrated || !isAuthorized) {
    return <MyLoader />;
  }

  return <>{children}</>;
}
