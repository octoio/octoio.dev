"use client";

import { useEffect, useState } from "react";

export default function SyntaxHighlighter() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const highlightCode = async () => {
      const hljs = await import("highlight.js/lib/core");

      // Register languages
      const [javascript, typescript, ocaml, csharp, json, bash, css, xml] =
        await Promise.all([
          import("highlight.js/lib/languages/javascript"),
          import("highlight.js/lib/languages/typescript"),
          import("highlight.js/lib/languages/ocaml"),
          import("highlight.js/lib/languages/csharp"),
          import("highlight.js/lib/languages/json"),
          import("highlight.js/lib/languages/bash"),
          import("highlight.js/lib/languages/css"),
          import("highlight.js/lib/languages/xml"),
        ]);

      hljs.default.registerLanguage("javascript", javascript.default);
      hljs.default.registerLanguage("typescript", typescript.default);
      hljs.default.registerLanguage("ocaml", ocaml.default);
      hljs.default.registerLanguage("ml", ocaml.default);
      hljs.default.registerLanguage("csharp", csharp.default);
      hljs.default.registerLanguage("json", json.default);
      hljs.default.registerLanguage("bash", bash.default);
      hljs.default.registerLanguage("css", css.default);
      hljs.default.registerLanguage("html", xml.default);

      // Find all code blocks and highlight them
      const codeBlocks = document.querySelectorAll("pre code");
      codeBlocks.forEach((block) => {
        const element = block as HTMLElement;
        if (!element.dataset.highlighted) {
          hljs.default.highlightElement(element);
          element.dataset.highlighted = "yes";
        }
      });
    };

    // Run highlighting after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(highlightCode, 200);

    return () => clearTimeout(timeoutId);
  }, [isClient]);

  return null;
}
