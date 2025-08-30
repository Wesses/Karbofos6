import { LucideLoader } from "lucide-react";
import React from "react";

const SmallLoader = () => {
  return (
      <div className="text-center">
        <LucideLoader className="h-10 w-10 sm:h-12 sm:w-12 animate-spin mx-auto text-green-500" />
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Завантаження...
        </p>
      </div>
  );
};

export default SmallLoader;
