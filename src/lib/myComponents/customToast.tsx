"use client";

import { toast } from "sonner";
import { X, Check } from "lucide-react";
import * as React from "react";

type CustomToastParams = {
  message: string;
  bg?: string;          // Tailwind класс фона, напр. "bg-green-600"
  text?: string;        // цвет текста, напр. "text-white"
  icon?: React.ReactNode;
  duration?: number;    // мс, по умолчанию 3000
};

export function showCustomToast({
  message,
  bg = "bg-green-600",
  text = "text-white",
  icon,
  duration = 3000,
}: CustomToastParams) {
  toast.custom(
    (t) => (
      <div
        className={[
          "pointer-events-auto flex items-center gap-3 rounded-2xl px-5 py-4 shadow-lg",
          "ring-1 ring-black/10", // лёгкая обводка
          bg,
          text,
        ].join(" ")}
      >
        <span className="shrink-0">
          {icon ?? <Check className="size-5" aria-hidden="true" />}
        </span>
        <span className="text-base font-medium">{message}</span>
        <button
          onClick={() => toast.dismiss(t)}
          className="ml-auto inline-flex items-center justify-center rounded-md/none opacity-80 hover:opacity-100"
          aria-label="Закрити"
        >
          <X className="size-4" />
        </button>
      </div>
    ),
    { duration }
  );
}