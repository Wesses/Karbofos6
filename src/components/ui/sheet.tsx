"use client";
import * as React from "react";

import { cn } from "@/lib/utils";

interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  side?: "right" | "left";
  className?: string;
  children: React.ReactNode;
}

export function Sheet({ open, onOpenChange, side = "right", className, children }: SheetProps) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 transition-all",
        open ? "pointer-events-auto" : "pointer-events-none",
      )}
      onClick={() => onOpenChange(false)}
    >
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/40 transition-opacity",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Panel */}
      <div
        className={cn(
          "absolute top-0 h-full w-full max-w-md bg-background shadow-xl transition-transform",
          side === "right" ? "right-0" : "left-0",
          open
            ? "translate-x-0"
            : side === "right"
            ? "translate-x-full"
            : "-translate-x-full",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

export function SheetHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("border-b p-4", className)}>{children}</div>;
}

export function SheetContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("p-4 space-y-4 overflow-auto h-[calc(100%-64px)]", className)}>{children}</div>;
}

