import { useState } from "react";
import NavigationDot from "./NavigationDot";
import NavigationLabel from "./NavigationLabel";

interface NavigationItem {
  id: string;
  label: string;
}

interface NavigationContainerProps {
  items: NavigationItem[];
  activeSection: string;
  onItemClick: (id: string) => void;
}

export default function NavigationContainer({ 
  items, 
  activeSection, 
  onItemClick 
}: NavigationContainerProps) {
  const [showLabels, setShowLabels] = useState<boolean>(false);

  if (items.length === 0) {
    return null;
  }

  return (
    <nav className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center gap-4 hidden lg:flex">
      <button
        onClick={() => setShowLabels(!showLabels)}
        title={showLabels ? "Hide labels" : "Show labels"}
        aria-label={showLabels ? "Hide navigation labels" : "Show navigation labels"}
        className={`w-6 h-6 border-none bg-none cursor-pointer transition-all duration-200 flex items-center justify-center text-sm font-normal hover:scale-110 focus:outline-none ${
          showLabels ? "text-indigo-500" : "text-slate-600"
        } hover:text-indigo-500`}
      >
        {showLabels ? "▶" : "◀"}
      </button>

      <ul className="list-none m-0 p-0 flex flex-col gap-6">
        {items.map((item, index) => (
          <NavigationDot
            key={item.id}
            id={item.id}
            label={item.label}
            isActive={activeSection === item.id}
            onClick={onItemClick}
            showConnectionLine={index < items.length - 1}
          >
            <NavigationLabel
              id={item.id}
              label={item.label}
              isActive={activeSection === item.id}
              showLabels={showLabels}
              onClick={onItemClick}
            />
          </NavigationDot>
        ))}
      </ul>
    </nav>
  );
}