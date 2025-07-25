import { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import { SearchItem } from './useSearchData';

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

interface UseSearchResultsProps {
  searchData: SearchItem[];
}

interface UseSearchResultsReturn {
  results: SearchResult[];
  query: string;
  setQuery: (query: string) => void;
}

export function useSearchResults({ searchData }: UseSearchResultsProps): UseSearchResultsReturn {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => new Fuse(searchData, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3,
  }), [searchData]);

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show all items by default when no query
      return searchData.slice(0, 8).map((item, index) => ({ item, refIndex: index }));
    }
    return fuse.search(query).slice(0, 8);
  }, [query, fuse, searchData]);

  return {
    results,
    query,
    setQuery,
  };
}