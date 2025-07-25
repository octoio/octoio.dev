import { useState, useEffect } from "react";

export interface Section {
  id: string;
  label: string;
  element?: HTMLElement;
}

interface UseSectionNavigationProps {
  sections: Section[];
}

interface UseSectionNavigationReturn {
  activeSection: string;
  scrollToSection: (id: string) => void;
}

export function useSectionNavigation({ sections }: UseSectionNavigationProps): UseSectionNavigationReturn {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "");

  useEffect(() => {
    const updateActiveSection = () => {
      // Find sections that exist in the DOM
      const sectionsWithElements = sections.map(section => ({
        ...section,
        element: document.getElementById(section.id)
      })).filter(section => section.element);

      if (sectionsWithElements.length === 0) return;

      // Use a smaller offset to improve detection
      const viewportTop = window.scrollY + window.innerHeight * 0.3;
      let currentActiveSection = sectionsWithElements[0];

      // Find the section that's most visible in the viewport
      for (let i = 0; i < sectionsWithElements.length; i++) {
        const section = sectionsWithElements[i];
        if (!section.element) continue;
        
        const rect = section.element.getBoundingClientRect();
        const sectionTop = window.scrollY + rect.top;
        
        // If this section's top is above our detection point, it's a candidate
        if (sectionTop <= viewportTop) {
          currentActiveSection = section;
        }
        
        // If we've found a section that starts after our detection point, stop
        if (sectionTop > viewportTop) {
          break;
        }
      }

      setActiveSection(currentActiveSection.id);
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
  }, [sections]);

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

  return {
    activeSection,
    scrollToSection,
  };
}