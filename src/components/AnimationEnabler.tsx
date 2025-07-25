"use client";

import { useEffect } from "react";

export default function AnimationEnabler() {
  useEffect(() => {
    // Enable animations after hydration
    const timer = setTimeout(() => {
      document.body.classList.add("animations-enabled");
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
