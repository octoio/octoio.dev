interface ScrollIndicatorProps {
  text?: string;
}

export default function ScrollIndicator({ text = "Scroll to explore" }: ScrollIndicatorProps) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
      <div className="flex flex-col items-center text-white/70">
        <span className="text-sm mb-2">{text}</span>
        <svg
          className="w-6 h-6"
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
    </div>
  );
}