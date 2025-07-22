"use client";

import { useState, useEffect } from "react";
import styled from "styled-components";

const NavigationContainer = styled.nav`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;

  @media (max-width: 1024px) {
    display: none;
  }
`;

const ToggleButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border: 1px solid
    ${(props) => (props.isActive ? "#667eea" : "rgba(71, 85, 105, 0.2)")};
  background: ${(props) =>
    props.isActive ? "rgba(102, 126, 234, 0.2)" : "rgba(248, 250, 252, 0.6)"};
  color: ${(props) => (props.isActive ? "#667eea" : "#64748b")};
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.625rem;
  font-weight: 600;

  &:hover {
    border-color: #667eea;
    background: rgba(102, 126, 234, 0.1);
    color: #667eea;
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const NavigationList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NavigationItem = styled.li.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  transition: all 0.3s ease;
`;

const NavigationDot = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid
    ${(props) => (props.isActive ? "#667eea" : "rgba(71, 85, 105, 0.3)")};
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      : "rgba(248, 250, 252, 0.8)"};
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  backdrop-filter: blur(15px);
  box-shadow: ${(props) =>
    props.isActive
      ? "0 4px 15px rgba(102, 126, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
      : "0 2px 8px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3)"};

  &:hover {
    border-color: #667eea;
    background: ${(props) =>
      props.isActive
        ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
        : "rgba(102, 126, 234, 0.15)"};
    transform: scale(1.15);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.3);
  }

  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const NavigationLine = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isActive", "isLast"].includes(prop),
})<{ isActive: boolean; isLast: boolean }>`
  position: absolute;
  top: 16px;
  left: 50%;
  transform: translateX(-50%);
  width: 2px;
  height: ${(props) => (props.isLast ? "0" : "1.5rem")};
  background: ${(props) =>
    props.isActive
      ? "linear-gradient(180deg, rgba(102, 126, 234, 0.8) 0%, rgba(102, 126, 234, 0.3) 100%)"
      : "linear-gradient(180deg, rgba(71, 85, 105, 0.3) 0%, rgba(71, 85, 105, 0.1) 100%)"};
  transition: all 0.3s ease;
  border-radius: 1px;
  backdrop-filter: blur(5px);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

const NavigationLabel = styled.button.withConfig({
  shouldForwardProp: (prop) => !["isActive", "alwaysShow"].includes(prop),
})<{ isActive: boolean; alwaysShow: boolean }>`
  position: absolute;
  right: 1.5rem;
  background: none;
  border: none;
  color: ${(props) => (props.isActive ? "#667eea" : "#64748b")};
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  opacity: ${(props) => (props.alwaysShow ? "1" : "0")};
  transform: ${(props) =>
    props.alwaysShow ? "translateX(0)" : "translateX(10px)"};
  transition: all 0.3s ease;
  pointer-events: ${(props) => (props.alwaysShow ? "auto" : "none")};
  cursor: ${(props) => (props.alwaysShow ? "pointer" : "default")};
  backdrop-filter: ${(props) => (props.alwaysShow ? "blur(10px)" : "none")};
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    color: #667eea;
    background: rgba(102, 126, 234, 0.1);
  }

  &:focus {
    outline: none;
    color: #667eea;
  }

  ${NavigationItem}:hover & {
    opacity: 1;
    transform: translateX(0);
    pointer-events: auto;
  }
`;

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
    // Extract headings from the post content
    const extractHeadings = () => {
      const headingElements = document.querySelectorAll(
        "h1, h2, h3, h4, h5, h6"
      );
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

    const setupObserver = () => {
      const extractedHeadings = extractHeadings();
      setHeadings(extractedHeadings);

      if (extractedHeadings.length === 0) return;

      const observerOptions = {
        root: null,
        rootMargin: "-10% 0px -80% 0px",
        threshold: [0, 0.1, 0.5, 1],
      };

      let timeoutId: NodeJS.Timeout;

      const observer = new IntersectionObserver((entries) => {
        if (timeoutId) clearTimeout(timeoutId);

        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];

          timeoutId = setTimeout(() => {
            setActiveSection(mostVisible.target.id);
          }, 100);
        }
      }, observerOptions);

      extractedHeadings.forEach((heading) => {
        if (heading.element) {
          observer.observe(heading.element);
        }
      });

      // Set initial active section
      if (extractedHeadings.length > 0) {
        setActiveSection(extractedHeadings[0].id);
      }

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
        observer.disconnect();
      };
    };

    // Wait for content to be rendered
    const timeoutId = setTimeout(setupObserver, 500);

    return () => clearTimeout(timeoutId);
  }, []);

  const scrollToHeading = (headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      setActiveSection(headingId);

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
    <NavigationContainer>
      <ToggleButton
        isActive={showLabels}
        onClick={() => setShowLabels(!showLabels)}
        title={showLabels ? "Hide labels" : "Show labels"}
        aria-label={
          showLabels ? "Hide navigation labels" : "Show navigation labels"
        }
      >
        {showLabels ? "AB" : "A"}
      </ToggleButton>

      <NavigationList>
        {headings.map((heading, index) => (
          <NavigationItem
            key={heading.id}
            isActive={activeSection === heading.id}
          >
            <NavigationDot
              isActive={activeSection === heading.id}
              onClick={() => scrollToHeading(heading.id)}
              aria-label={`Navigate to ${heading.text}`}
            />
            <NavigationLine
              isActive={activeSection === heading.id}
              isLast={index === headings.length - 1}
            />
            <NavigationLabel
              isActive={activeSection === heading.id}
              alwaysShow={showLabels}
              onClick={() => scrollToHeading(heading.id)}
            >
              {heading.text}
            </NavigationLabel>
          </NavigationItem>
        ))}
      </NavigationList>
    </NavigationContainer>
  );
}
