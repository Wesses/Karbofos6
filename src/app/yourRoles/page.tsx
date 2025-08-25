"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserCog, Eye, User } from "lucide-react";
import { useRouter } from "next/navigation";
import Loader from "@/myComponents/MyLoader";
import { getAllRoles } from "../api/api";
import { useRolesStore } from "@/lib/stores/useRolesStore";
import LogOutButton from "@/myComponents/LogOutButton";

export default function RolesPage() {
  const setRoles = useRolesStore((state) => state.setRoles);
  const { roles } = useRolesStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const rolesList = [
    {
      id: "1",
      name: "Адміністратор",
      description: "Повний доступ до всіх функцій системи",
      rolePath: "/admin",
      isShow: roles.includes("Admin"),
    },
    {
      id: "2",
      name: "Інспектор",
      description: "Перегляд та перевірка даних, генерація звітів",
      rolePath: "/inspector",
      isShow: roles.includes("Inspector"),
    },
    {
      id: "3",
      name: "Користувач",
      description: "Базовий доступ до системи, робота з особистим кабінетом",
      rolePath: "/user",
      isShow: true,
    },
  ];

  const filtredRolesList = rolesList.filter(({ isShow }) => isShow);

  useEffect(() => {
    const loadRoles = async () => {
      try {
        setIsLoading(true);
        const rolesData = await getAllRoles();
        setRoles(rolesData);
      } catch (err) {
        setError("Помилка при завантаженні ролей");
        console.error("Error loading roles:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadRoles();
  }, [setRoles]);

  const getRoleIcon = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "адміністратор":
        return <UserCog className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />;
      case "інспектор":
        return <Eye className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />;
      case "користувач":
        return <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />;
      default:
        return <User className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7" />;
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <div className="text-destructive mb-4 text-sm sm:text-base">
              {error}
            </div>
            <Button
              onClick={() => window.location.reload()}
              className="text-sm sm:text-base"
            >
              Спробувати знову
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-4 sm:py-6 md:py-8 px-3 sm:px-4 lg:px-6">
        {/* Заголовок */}
        <div className="mb-6 sm:mb-8 md:mb-10 text-center flex justify-center items-center relative">
          <LogOutButton className="absolute left-0"/>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
              Доступні ролі
            </h1>
            <p className="text-muted-foreground mt-2 text-sm sm:text-base md:text-lg max-w-2xl mx-auto sm:inline hidden">
              Оберіть роль для перегляду детальної інформації
            </p>
          </div>
        </div>

        {/* Список ролей */}
        <div className="grid gap-4 sm:gap-5 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filtredRolesList.map((role) => (
            <Card
              key={role.id}
              className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 hover:scale-[1.02] flex justify-between flex-col"
            >
              <CardHeader className="pb-4 sm:pb-5 px-4 sm:px-6">
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="p-2 sm:p-3 rounded-full bg-primary/10 border border-primary/20">
                    {getRoleIcon(role.name)}
                  </div>
                </div>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground">
                  {role.name}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm md:text-base mt-2 text-muted-foreground leading-relaxed">
                  {role.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6">
                <Button
                  className="w-full text-sm sm:text-base py-2 sm:py-3 h-auto cursor-pointer"
                  onClick={() => router.push(role.rolePath)}
                >
                  Перейти до контенту
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Повідомлення якщо немає результатів */}
        {roles.length === 0 && !isLoading && (
          <Card className="text-center py-8 max-w-md mx-auto mt-8">
            <CardContent>
              <p className="text-muted-foreground text-sm sm:text-base">
                Ролі не знайдено
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
