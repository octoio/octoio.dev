import { useState, useEffect, useCallback } from "react";
import { SearchItem } from "./useSearchData";

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  results: SearchResult[];
  onClose: () => void;
  onSelect: (url: string) => void;
}

interface UseKeyboardNavigationReturn {
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  resetSelection: () => void;
}

export function useKeyboardNavigation({
  isOpen,
  results,
  onClose,
  onSelect,
}: UseKeyboardNavigationProps): UseKeyboardNavigationReturn {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Reset selection when search opens
  const resetSelection = useCallback(() => {
    setSelectedIndex(0);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((i) => (i + 1) % results.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((i) => (i - 1 + results.length) % results.length);
          break;
        case "Enter":
          e.preventDefault();
          if (results[selectedIndex]) {
            onSelect(results[selectedIndex].item.url);
          }
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, results, selectedIndex, onSelect]);

  return {
    selectedIndex,
    setSelectedIndex,
    resetSelection,
  };
}
