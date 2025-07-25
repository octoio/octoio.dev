import { useState, useEffect } from "react";

export interface Heading {
  id: string;
  text: string;
  level: number;
  element?: HTMLElement;
}

interface UseHeadingNavigationReturn {
  headings: Heading[];
  activeSection: string;
  scrollToHeading: (id: string) => void;
}

export function useHeadingNavigation(): UseHeadingNavigationReturn {
  const [activeSection, setActiveSection] = useState<string>("");
  const [headings, setHeadings] = useState<Heading[]>([]);

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

  return {
    headings,
    activeSection,
    scrollToHeading,
  };
}