"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"
import { useRouter } from "next/navigation"

export default function NotFound() {
  const router = useRouter()

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      {/* Декоративный фон */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_75%_at_0%_0%,rgba(59,130,246,0.08)_0%,transparent_60%),radial-gradient(75%_75%_at_100%_100%,rgba(16,185,129,0.08)_0%,transparent_60%)]" />
      
      {/* Градиентные шары */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-200/20 blur-3xl" />
      <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-green-200/20 blur-3xl" />
      
      <div className="container flex min-h-[100dvh] flex-col items-center justify-center px-4 py-16 text-center">
        {/* Декоративный номер 404 */}
        <div className="absolute left-1/2 top-1/4 -translate-x-1/2 -translate-y-1/2 text-[20rem] font-bold text-muted-foreground/5 select-none pointer-events-none">
          404
        </div>

        <div className="relative z-10 max-w-2xl">
          {/* Иконка */}
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-muted/50 p-4">
              <Search className="h-12 w-12 text-muted-foreground" />
            </div>
          </div>

          {/* Заголовок */}
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl mb-4">
            Сторінку не знайдено
          </h1>

          {/* Описание */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
            Вибачте, але сторінка, яку ви шукаєте, не існує або була переміщена. 
            Перевірте правильність URL-адреси або поверніться на головну сторінку.
          </p>

          {/* Кнопки действий */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button asChild size="lg" className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                На головну
              </Link>
            </Button>
            
            <Button 
              onClick={handleGoBack} 
              variant="outline" 
              size="lg" 
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Назад
            </Button>
          </div>

          {/* Дополнительная информация */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>Код помилки: 404 - Page Not Found</p>
            <p>Якщо проблема повторюється, зверніться до адміністратора</p>
          </div>
        </div>

        {/* Декоративные элементы внизу */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>•</span>
            <span>Сторінка не знайдена</span>
            <span>•</span>
          </div>
        </div>
      </div>
    </div>
  )
}