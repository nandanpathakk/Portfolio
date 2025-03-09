"use client";

import { useState } from "react";
import CosmicLoadingAnimation from "@/components/CosmicLoadingAnimation";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {isLoading ? (
        <CosmicLoadingAnimation onComplete={handleLoadingComplete} />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-cyan-400">
            Welcome to My World
          </h1>
          <p className="mt-4 text-lg md:text-xl text-cyan-200">
            A journey into frontend exploration.
          </p>
        </div>
      )}
    </main>
  );
}