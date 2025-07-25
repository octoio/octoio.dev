"use client";

import { useEffect, useState } from "react";

export default function HeadingAnchor() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    const addAnchorLinks = () => {
      const headings = document.querySelectorAll(
        "article h1, article h2, article h3, article h4, article h5, article h6"
      );

      if (headings.length === 0) {
        // Retry if no headings found
        setTimeout(addAnchorLinks, 100);
        return;
      }

      headings.forEach((heading) => {
        // Skip if already has anchor link
        if (heading.querySelector(".heading-anchor")) return;

        const headingElement = heading as HTMLElement;
        let id = headingElement.id;

        // Create ID if it doesn't exist
        if (!id) {
          const text = headingElement.textContent || "";
          id = text
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
          headingElement.id = id;
        }

        // Create anchor link
        const anchorLink = document.createElement("button");
        anchorLink.className = "heading-anchor";
        anchorLink.innerHTML = "🔗";
        anchorLink.style.cssText = `
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 20px;
          height: 20px;
          margin-left: 8px;
          border: none;
          background: none;
          color: #94a3b8;
          cursor: pointer;
          opacity: 0;
          transition: all 0.2s ease;
          border-radius: 4px;
          font-size: 14px;
        `;

        anchorLink.addEventListener("mouseenter", () => {
          anchorLink.style.color = "#667eea";
          anchorLink.style.background = "rgba(102, 126, 234, 0.1)";
        });

        anchorLink.addEventListener("mouseleave", () => {
          anchorLink.style.color = "#94a3b8";
          anchorLink.style.background = "none";
        });

        anchorLink.addEventListener("click", async (e) => {
          e.preventDefault();
          const url = `${window.location.origin}${window.location.pathname}#${id}`;

          // Update URL
          window.history.pushState(null, "", `#${id}`);

          // Copy to clipboard
          try {
            await navigator.clipboard.writeText(url);

            // Show feedback
            anchorLink.innerHTML = "✓";
            anchorLink.style.color = "#10b981";
            setTimeout(() => {
              anchorLink.innerHTML = "🔗";
              anchorLink.style.color = "#94a3b8";
            }, 2000);
          } catch {
            // Fallback for browsers that don't support clipboard API
            const textArea = document.createElement("textarea");
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand("copy");
            document.body.removeChild(textArea);

            anchorLink.innerHTML = "✓";
            anchorLink.style.color = "#10b981";
            setTimeout(() => {
              anchorLink.innerHTML = "🔗";
              anchorLink.style.color = "#94a3b8";
            }, 2000);
          }
        });

        // Add hover effect to heading
        headingElement.style.position = "relative";
        headingElement.addEventListener("mouseenter", () => {
          anchorLink.style.opacity = "1";
        });
        headingElement.addEventListener("mouseleave", () => {
          anchorLink.style.opacity = "0";
        });

        headingElement.appendChild(anchorLink);
      });
    };

    // Wait for content to be rendered
    setTimeout(addAnchorLinks, 400);
  }, [isClient]);

  return null;
}
