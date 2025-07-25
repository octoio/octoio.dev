"use client";

import { useSectionNavigation, Section } from "./navigation/hooks/useSectionNavigation";
import NavigationContainer from "./navigation/NavigationContainer";

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "posts", label: "Posts" },
  { id: "latest-video", label: "Video" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "connect", label: "Connect" },
];

export default function PageNavigation() {
  const { activeSection, scrollToSection } = useSectionNavigation({ sections });

  return (
    <NavigationContainer
      items={sections}
      activeSection={activeSection}
      onItemClick={scrollToSection}
    />
  );
}