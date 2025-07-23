"use client";

import { useState, useEffect } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  element?: HTMLElement;
}

export default function PostNavigation() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [showLabels, setShowLabels] = useState<boolean>(false);

  useEffect(() => {
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
      const extractedHeadings: Heading[] = [];

      headingElements.forEach((element, index) => {
        const headingElement = element as HTMLElement;
        let id = headingElement.id;

        // Create ID if it doesn't exist
        if (!id) {
          const text = headingElement.textContent || "";
          id = `heading-${index}-${text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")}`;
          headingElement.id = id;
        }

        const level = parseInt(headingElement.tagName.charAt(1));
        const text = headingElement.textContent || "";

        // Only include h2 and h3 for cleaner TOC
        if (level >= 2 && level <= 3 && text.trim()) {
          extractedHeadings.push({
            id,
            text: text.trim(),
            level,
            element: headingElement,
          });
        }
      });

      return extractedHeadings;
    };

    const updateActiveSection = () => {
      const extractedHeadings = extractHeadings();
      setHeadings(extractedHeadings);

      if (extractedHeadings.length === 0) return;

      // Find the heading closest to the top of the viewport
      let activeHeading = extractedHeadings[0];
      const viewportTop = window.scrollY + 100; // Offset for header

      for (const heading of extractedHeadings) {
        if (!heading.element) continue;
        
        const headingTop = heading.element.offsetTop;
        
        if (headingTop <= viewportTop) {
          activeHeading = heading;
        } else {
          break;
        }
      }

      setActiveSection(activeHeading.id);
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

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      setActiveSection(headingId);
      
      // Update URL hash without triggering a page reload
      window.history.pushState(null, '', `#${headingId}`);

      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Don't render if no headings found
  if (headings.length === 0) {
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
        {headings.map((heading, index) => (
          <li
            key={heading.id}
            className="relative flex items-center justify-end transition-all duration-300 group"
          >
            <button
              onClick={() => scrollToHeading(heading.id)}
              aria-label={`Navigate to ${heading.text}`}
              className={`w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-300 relative backdrop-blur-md focus:outline-none hover:scale-115 hover:border-indigo-500 ${
                activeSection === heading.id
                  ? "border-indigo-500 bg-gradient-to-br from-indigo-500 to-purple-700 shadow-[0_4px_15px_rgba(102,126,234,0.4),inset_0_1px_0_rgba(255,255,255,0.2)]"
                  : "border-slate-400/30 bg-slate-50/80 shadow-[0_2px_8px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.3)] hover:bg-indigo-500/15"
              }`}
            />
            
            {/* Connection line */}
            {index < headings.length - 1 && (
              <div
                className={`absolute top-4 left-1/2 transform -translate-x-1/2 w-0.5 h-6 rounded-sm backdrop-blur-sm transition-all duration-300 ${
                  activeSection === heading.id
                    ? "bg-gradient-to-b from-indigo-500/80 to-indigo-500/30"
                    : "bg-gradient-to-b from-slate-500/30 to-slate-500/10"
                }`}
              />
            )}
            
            {/* Label */}
            <button
              onClick={() => scrollToHeading(heading.id)}
              className={`absolute right-6 bg-none border-none py-1 px-2 rounded text-xs font-medium whitespace-nowrap transition-all duration-300 focus:outline-none hover:text-indigo-500 hover:bg-indigo-500/10 max-w-[200px] overflow-hidden text-ellipsis ${
                activeSection === heading.id ? "text-indigo-500" : "text-slate-600"
              } ${
                showLabels
                  ? "opacity-100 translate-x-0 pointer-events-auto backdrop-blur-md"
                  : "opacity-0 translate-x-2.5 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 group-hover:pointer-events-auto"
              }`}
            >
              {heading.text}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}