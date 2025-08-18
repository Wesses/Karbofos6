"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/password-input";
import { postLoginReq } from "../api/api";
import { saveToken } from "@/lib/auth";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  username: z.string().min(2),
  password: z.string().min(2),
});

export default function MyForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const data = await postLoginReq(values);
      const token =
        (data && (data.token || data.accessToken || data.access_token)) || data;
      if (typeof token !== "string") {
        throw new Error("Invalid login response: token missing");
      }
      saveToken(token);
      router.push("/admin");
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Не вдалося надіслати форму. Спробуйте ще раз.");
    }
  }

  return (
    <div className="relative min-h-[100dvh] overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(75%_75%_at_0%_0%,rgba(59,130,246,0.12)_0%,transparent_60%),radial-gradient(75%_75%_at_100%_100%,rgba(16,185,129,0.12)_0%,transparent_60%)]" />
      <div className="grid min-h-[100dvh] place-items-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-5xl">
          <div className="grid items-stretch gap-0 md:grid-cols-2">
            <div className="relative hidden overflow-hidden rounded-t-2xl border-x border-t border-border bg-gradient-to-br from-primary/10 to-secondary/20 p-8 md:block md:rounded-l-2xl md:rounded-tr-none md:border-y">
              <div className="absolute -left-10 -top-10 size-40 rounded-full bg-primary/15 blur-2xl" />
              <div className="absolute -right-10 -bottom-10 size-40 rounded-full bg-chart-2/15 blur-2xl" />
              <div className="relative z-10 flex h-full flex-col justify-between">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                    Ласкаво просимо
                  </div>
                  <h1 className="text-3xl font-bold leading-tight">З поверненням!</h1>
                  <p className="text-muted-foreground">Увійдіть в акаунт, щоб продовжити роботу в панелі.</p>
                </div>
                <div className="mt-10 space-y-4 text-sm text-muted-foreground">
                  <p className="leading-relaxed">
                    Надійна авторизація, сучасний інтерфейс та акуратна адаптивна верстка.
                  </p>
                  <p className="leading-relaxed">Підтримка світлої й темної теми з коробки.</p>
                </div>
              </div>
            </div>

            <div className="rounded-b-2xl border-x border-b border-border bg-card/80 backdrop-blur-xl md:rounded-r-2xl md:rounded-bl-none">
              <div className="p-6 sm:p-10">
                <div className="mb-8 space-y-2">
                  <div className="inline-flex items-center gap-2 rounded-lg border border-border bg-background/70 px-2.5 py-1 text-xs text-muted-foreground backdrop-blur">
                    Karbofos6
                  </div>
                  <h2 className="text-2xl font-semibold">Вхід до системи</h2>
                  <p className="text-sm text-muted-foreground">Введіть логін і пароль, щоб продовжити.</p>
                </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Логін</FormLabel>
                          <FormControl>
                            <Input autoComplete="username" placeholder="Ваш логін" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Пароль</FormLabel>
                          <FormControl>
                            <PasswordInput autoComplete="current-password" placeholder="Ваш пароль" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="pt-2">
                      <Button className="w-full" type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? (
                          <span className="inline-flex items-center gap-2">
                            <span className="size-4 animate-spin rounded-full border-2 border-current border-b-transparent" />
                            Входимо...
                          </span>
                        ) : (
                          "Увійти"
                        )}
                      </Button>
                    </div>
                  </form>
                </Form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                  Забули пароль? Зверніться до адміністратора.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
