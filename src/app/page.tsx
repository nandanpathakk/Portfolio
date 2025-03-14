"use client";

import { useState } from "react";
import CosmicLoadingAnimation from "@/components/CosmicLoadingAnimation";
import Welcome from "@/components/Welcome";
import About from "@/components/About";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showWelcome, setShowWelcome] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setShowWelcome(true);
  };

  const handleWelcomeComplete = () => {
    setShowWelcome(false);
  };

  return (
    <div className="scroll-smooth">
      {isLoading && <CosmicLoadingAnimation onComplete={handleLoadingComplete} />}
      {showWelcome && <Welcome onComplete={handleWelcomeComplete} />}
      {!isLoading && !showWelcome && (
        <div>
          <About />
        </div>
      )}
    </div>
  );
}