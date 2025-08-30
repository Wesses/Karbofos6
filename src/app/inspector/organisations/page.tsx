// app/inspector/organisations/page.tsx
"use client";

import { getInspectorDBS } from "@/api/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ErrorPage from "@/lib/myComponents/ErrorPage";
import LogOutButton from "@/lib/myComponents/LogOutButton";
import SmallLoader from "@/lib/myComponents/SmallLoader";
import { OrganisationT } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function InspectorDataBasePage() {
  const router = useRouter();
  const [dbList, setDbList] = useState<OrganisationT[]>([]);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setIsLoading(true);
    (async () => {
      try {
        const fetchData = await getInspectorDBS();
        setDbList(fetchData);
      } catch (error) {
        setIsError(true);
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const filteredDBS = dbList.filter((db) =>
    db.orgName.toLowerCase().includes(query.toLowerCase())
  );

  if (isError) {
    return <ErrorPage />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="mb-6 sm:mb-8 md:mb-10 text-center flex justify-center items-center relative">
        <LogOutButton className="absolute right-0 md:bottom-8 bottom-1" />
        <div>
          <h1 className="text-xl md:text-3xl sm:text-2xl font-bold tracking-tight text-foreground mb-1">
            Доступні організації
          </h1>
          <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-2xl mx-auto sm:inline hidden">
            Оберіть організацію для роботи
          </p>
        </div>
      </div>

      <Input
        placeholder="Назва організації..."
        className="w-72"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        disabled={isLoading}
      />
      
      {isLoading ? (
        <SmallLoader />
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>
              Список доступних для вас організацій, оберіть одну для початку роботи
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {filteredDBS.length === 0 ? (
              <p className="text-muted-foreground">
                {query ? 'Організацій не знайдено' : 'Немає доступних організацій'}
              </p>
            ) : (
              filteredDBS.map(({ orgName, orgId }) => (
                <div
                  className="cursor-pointer transform transition duration-300 hover:scale-105"
                  key={orgId}
                  onClick={() => router.push(`/inspector/organisations/content?orgName=${orgName}`)}
                >
                  <Badge className="text-sm hover:border-emerald-700 border-2">
                    {orgName}
                  </Badge>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}