"use client";

interface ScrollIndicatorProps {
  text?: string;
}

export default function ScrollIndicator({
  text = "Scroll to explore",
}: ScrollIndicatorProps) {
  const scrollToNextSection = () => {
    const postsSection = document.querySelector("#posts");
    if (postsSection) {
      postsSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      onClick={scrollToNextSection}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer group transition-colors duration-300 hover:text-white bg-transparent border-none z-50"
      aria-label="Scroll to next section"
    >
      <div className="flex flex-col items-center text-white/70 group-hover:text-white/90">
        <span className="text-sm mb-2">{text}</span>
        <svg
          className="w-6 h-6 transition-transform duration-300 group-hover:scale-110"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </button>
  );
}
