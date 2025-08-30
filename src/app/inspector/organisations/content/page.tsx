"use client";

import { useSearchParams } from "next/navigation";

export default function OrganisationContentPage() {
  const searchParams = useSearchParams();
  return (
    <div>
      <h1>Організація: {searchParams.get("orgName")}</h1>
    </div>
  );
}