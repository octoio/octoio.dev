"use client";

import React, { useEffect, useCallback } from "react";
import { useSearchData } from "./search/hooks/useSearchData";
import { useSearchResults } from "./search/hooks/useSearchResults";
import { useKeyboardNavigation } from "./search/hooks/useKeyboardNavigation";
import SearchInput from "./search/SearchInput";
import SearchResults from "./search/SearchResults";

interface SearchProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Search({ isOpen, onClose }: SearchProps) {
  const { searchData, isLoading } = useSearchData();
  const { results, query, setQuery } = useSearchResults({ searchData });

  const handleResultClick = useCallback(
    (url: string) => {
      // Open internal links in same tab, external links in new tab
      if (url.startsWith("/") || url.startsWith("#")) {
        window.location.href = url;
      } else {
        window.open(url, "_blank");
      }
      onClose();
    },
    [onClose]
  );

  const { selectedIndex, resetSelection } = useKeyboardNavigation({
    isOpen,
    results,
    onClose,
    onSelect: handleResultClick,
  });

  useEffect(() => {
    if (isOpen) {
      setQuery("");
      resetSelection();
    }
  }, [isOpen, setQuery, resetSelection]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 pt-[10vh] px-8 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <SearchInput query={query} onChange={setQuery} isLoading={isLoading} />

        <div className="max-h-[60vh] overflow-y-auto">
          <SearchResults
            results={results}
            selectedIndex={selectedIndex}
            onResultClick={handleResultClick}
            query={query}
            isLoading={isLoading}
          />
        </div>

        {!isLoading && results.length > 0 && (
          <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500">
            Use ↑↓ to navigate, ↵ to select, ESC to close
          </div>
        )}
      </div>
    </div>
  );
}
