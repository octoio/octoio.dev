"use client";

import { useState, useEffect } from "react";

interface Section {
  id: string;
  label: string;
  element?: HTMLElement;
}

const sections: Section[] = [
  { id: "hero", label: "About" },
  { id: "posts", label: "Posts" },
  { id: "latest-video", label: "Video" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
];

export default function PageNavigation() {
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [showLabels, setShowLabels] = useState<boolean>(false);

  useEffect(() => {
    const updateActiveSection = () => {
      // Find sections that exist in the DOM
      const sectionsWithElements = sections.map(section => ({
        ...section,
        element: document.getElementById(section.id)
      })).filter(section => section.element);

      if (sectionsWithElements.length === 0) return;

      // Find the section closest to the top of the viewport
      let activeSection = sectionsWithElements[0];
      const viewportTop = window.scrollY + 150; // Increased offset slightly

      for (const section of sectionsWithElements) {
        if (!section.element) continue;
        
        const sectionTop = section.element.offsetTop;
        const sectionBottom = sectionTop + section.element.offsetHeight;
        
        // Check if we're within this section
        if (viewportTop >= sectionTop && viewportTop < sectionBottom) {
          activeSection = section;
          break;
        } else if (sectionTop <= viewportTop) {
          // This section has passed, keep it as candidate
          activeSection = section;
        }
      }

      setActiveSection(activeSection.id);
    };

    // Initial setup
    const setupTimeout = setTimeout(() => {
      updateActiveSection();
    }, 500);

    // Update on scroll
    const handleScroll = () => {
      updateActiveSection();
    };

    // Handle hash navigation
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
            setActiveSection(hash);
          }
        }, 100);
      }
    };

    // Handle initial hash
    if (window.location.hash) {
      handleHashChange();
    }

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      clearTimeout(setupTimeout);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      setActiveSection(sectionId);
      
      // Update URL hash - use location.hash to ensure it shows in the address bar
      window.location.hash = sectionId;

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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
        {sections.map((section, index) => (
          <li
            key={section.id}
            className="relative flex items-center justify-end transition-all duration-300 group"
          >
            <button
              onClick={() => scrollToSection(section.id)}
              aria-label={`Navigate to ${section.label}`}
              className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 relative backdrop-blur-md focus:outline-none hover:scale-115 hover:border-indigo-500 ${
                activeSection === section.id
                  ? "border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-700 shadow-[0_4px_15px_rgba(102,126,234,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  : "border-slate-400/30 bg-slate-50/80 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-indigo-500/15"
              }`}
            />
            
            {/* Connection line */}
            {index < sections.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-6 rounded-sm backdrop-blur-sm transition-all duration-300 ${
                  activeSection === section.id
                    ? "bg-gradient-to-b from-indigo-500/80 to-indigo-500/30"
                    : "bg-gradient-to-b from-slate-500/30 to-slate-500/10"
                }`}
              />
            )}
            
            {/* Label */}
            <button
              onClick={() => scrollToSection(section.id)}
              className={`absolute right-6 bg-none border-none py-1 px-2 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 focus:outline-none hover:text-indigo-500 hover:bg-indigo-500/10 max-w-[200px] overflow-hidden text-ellipsis ${
                activeSection === section.id ? "text-indigo-500" : "text-slate-600"
              } ${
                showLabels
                  ? "opacity-100 translate-x-0 pointer-events-auto backdrop-blur-md"
                  : "opacity-0 translate-x-2.5 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto"
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}