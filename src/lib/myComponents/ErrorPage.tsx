"use client"

import { useRouter } from "next/navigation"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function ErrorPage() {
  const router = useRouter()

  const handleReload = () => {
    window.location.reload()
  }

  const handleLoginRedirect = () => {
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center h-full bg-background">
      <Card className="max-w-md w-full shadow-lg">
        <CardHeader>
          <CardTitle className="text-center text-destructive text-2xl font-bold">
            Сталася помилка
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground">
          <p>Будь ласка, спробуйте ще раз або увійдіть у систему заново.</p>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button variant="default" onClick={handleReload}>
            Перезавантажити
          </Button>
          <Button variant="outline" onClick={handleLoginRedirect}>
            Перейти на логін
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}