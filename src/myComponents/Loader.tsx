import { Loader2 } from "lucide-react";
import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="text-center">
        <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 animate-spin mx-auto text-blue-500" />
        <p className="mt-4 text-base sm:text-lg text-muted-foreground">
          Завантаження...
        </p>
      </div>
    </div>
  );
};

export default Loader;
