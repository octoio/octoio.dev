"use client";

import { useEffect, useRef, useState } from "react";

interface MermaidDiagramProps {
  chart: string;
  className?: string;
}

export default function MermaidDiagram({
  chart,
  className = "",
}: MermaidDiagramProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || !elementRef.current) return;

    const renderMermaid = async () => {
      try {
        const mermaid = await import("mermaid");

        // Initialize mermaid with configuration
        mermaid.default.initialize({
          startOnLoad: false,
          theme: "default",
          themeVariables: {
            primaryColor: "#6366f1", // indigo-500
            primaryTextColor: "#1e293b", // slate-800
            primaryBorderColor: "#e2e8f0", // slate-200
            lineColor: "#64748b", // slate-500
            secondaryColor: "#f1f5f9", // slate-100
            tertiaryColor: "#f8fafc", // slate-50
          },
          flowchart: {
            htmlLabels: true,
            curve: "basis",
          },
          sequence: {
            actorMargin: 50,
            width: 150,
            height: 65,
            boxMargin: 10,
            boxTextMargin: 5,
            noteMargin: 10,
            messageMargin: 35,
          },
        });

        if (elementRef.current) {
          // Clear previous content
          elementRef.current.innerHTML = "";

          // Generate unique ID for this diagram
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;

          // Render the diagram
          const { svg } = await mermaid.default.render(id, chart);
          elementRef.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Error rendering Mermaid diagram:", error);
        if (elementRef.current) {
          elementRef.current.innerHTML = `
            <div class="border border-red-200 bg-red-50 text-red-700 p-4 rounded-lg">
              <p class="font-medium">Error rendering diagram</p>
              <pre class="text-sm mt-2 whitespace-pre-wrap">${chart}</pre>
            </div>
          `;
        }
      }
    };

    renderMermaid();
  }, [chart, isClient]);

  if (!isClient) {
    // Server-side: show loading placeholder
    return (
      <div
        className={`bg-slate-100 rounded-lg p-8 text-center text-slate-500 ${className}`}
      >
        Loading diagram...
      </div>
    );
  }

  return (
    <div className={`mermaid-diagram my-6 ${className}`}>
      <div
        ref={elementRef}
        className="flex justify-center items-center min-h-[200px] bg-white rounded-lg border border-slate-200 p-4 overflow-x-auto"
      />
    </div>
  );
}
