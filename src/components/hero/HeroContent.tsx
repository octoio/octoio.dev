import Link from "next/link";
import React from "react";

interface HeroContentProps {
  isVisible: boolean;
  children?: React.ReactNode; // For TechStackRotator
}

export default function HeroContent({ isVisible, children }: HeroContentProps) {
  return (
    <div
      className={`text-center lg:text-left transition-all duration-1000 ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      <div className="mb-6">
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
          Octoio
        </h1>
        {children}
      </div>

      <p className="text-xl text-white/90 leading-relaxed mb-8 max-w-xl lg:mx-0 mx-auto">
        Crafting immersive game experiences through code. From type-safe
        data pipelines to interactive Unity worlds, I bridge the gap
        between elegant architecture and compelling gameplay.
      </p>

      <div className="flex justify-center lg:justify-start">
        <Link
          href="#about"
          className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold transition-all hover:bg-white/20 hover:-translate-y-1 hover:shadow-xl"
        >
          <span className="flex items-center gap-2">
            About Me
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </span>
        </Link>
      </div>
    </div>
  );
}