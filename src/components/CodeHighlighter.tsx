"use client";

import { useEffect, useState } from "react";
import { useIsomorphicLayoutEffect } from "@/hooks/useIsomorphicLayoutEffect";

export default function CodeHighlighter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (!isClient) return;

    const highlightCode = async () => {
      try {
        const hljs = await import("highlight.js/lib/core");

        // Register languages
        const [
          javascript,
          typescript,
          ocaml,
          csharp,
          json,
          bash,
          css,
          xml,
          markdown,
          yaml,
        ] = await Promise.all([
          import("highlight.js/lib/languages/javascript"),
          import("highlight.js/lib/languages/typescript"),
          import("highlight.js/lib/languages/ocaml"),
          import("highlight.js/lib/languages/csharp"),
          import("highlight.js/lib/languages/json"),
          import("highlight.js/lib/languages/bash"),
          import("highlight.js/lib/languages/css"),
          import("highlight.js/lib/languages/xml"),
          import("highlight.js/lib/languages/markdown"),
          import("highlight.js/lib/languages/yaml"),
        ]);

        hljs.default.registerLanguage("javascript", javascript.default);
        hljs.default.registerLanguage("typescript", typescript.default);
        hljs.default.registerLanguage("ocaml", ocaml.default);
        hljs.default.registerLanguage("csharp", csharp.default);
        hljs.default.registerLanguage("json", json.default);
        hljs.default.registerLanguage("bash", bash.default);
        hljs.default.registerLanguage("css", css.default);
        hljs.default.registerLanguage("html", xml.default);
        hljs.default.registerLanguage("markdown", markdown.default);
        hljs.default.registerLanguage("md", markdown.default);
        hljs.default.registerLanguage("yaml", yaml.default);
        hljs.default.registerLanguage("mermaid", yaml.default); // Use YAML highlighting for Mermaid syntax

        // Find all code blocks and highlight them
        const codeBlocks = document.querySelectorAll(
          'pre code[class*="language-"]'
        );
        codeBlocks.forEach((block) => {
          const element = block as HTMLElement;
          if (!element.dataset.highlighted) {
            // Extract language from className
            const className = element.className;
            const langMatch = className.match(/language-(\w+)/);
            if (langMatch) {
              const language = langMatch[1];
              try {
                const result = hljs.default.highlight(
                  element.textContent || "",
                  { language }
                );
                element.innerHTML = result.value;
                element.dataset.highlighted = "yes";
              } catch {
                // If language not supported, just mark as highlighted to avoid retrying
                element.dataset.highlighted = "yes";
              }
            }
          }
        });
      } catch (error) {
        console.warn("Failed to load syntax highlighting:", error);
      }
    };

    // Run highlighting after a delay to ensure DOM is ready
    const timeoutId = setTimeout(highlightCode, 100);
    return () => clearTimeout(timeoutId);
  }, [isClient]);

  return null;
}
