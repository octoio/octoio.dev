"use client";

import { useHeadingNavigation } from "./navigation/hooks/useHeadingNavigation";
import NavigationContainer from "./navigation/NavigationContainer";

export default function PostNavigation() {
  const { headings, activeSection, scrollToHeading } = useHeadingNavigation();

  const navigationItems = headings.map((heading) => ({
    id: heading.id,
    label: heading.text,
  }));

  return (
    <NavigationContainer
      items={navigationItems}
      activeSection={activeSection}
      onItemClick={scrollToHeading}
    />
  );
}
