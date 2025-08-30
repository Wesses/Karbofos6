"use client";

import { Suspense } from "react";
import ProtectedWrapper from "@/lib/protection/ProtectedWrapper";
import MyLoader from "@/lib/myComponents/MyLoader";
import { Roles } from "@/lib/types";

export default function InspectorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedWrapper protectedRole={Roles.Inspector}>
      <Suspense fallback={<MyLoader />}>
        <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-6 h-full">{children}</div> 
      </Suspense>
    </ProtectedWrapper>
  );
}
