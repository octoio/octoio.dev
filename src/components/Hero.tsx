"use client";

import { useState, useEffect } from "react";
import HeroContent from "./hero/HeroContent";
import TechStackRotator from "./hero/TechStackRotator";
import TerminalDisplay from "./hero/TerminalDisplay";
import ScrollIndicator from "./hero/ScrollIndicator";

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section
      id="hero"
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-700"
    >
      <div className="relative z-10 min-h-screen flex items-center justify-center px-8">
        <div className="max-w-6xl w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Main content */}
            <HeroContent isVisible={isVisible}>
              <TechStackRotator />
            </HeroContent>

            {/* Right side - Terminal */}
            <TerminalDisplay isVisible={isVisible} />
          </div>
        </div>
      </div>

      <ScrollIndicator />
    </section>
  );
}
