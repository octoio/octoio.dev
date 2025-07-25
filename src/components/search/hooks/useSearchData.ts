import { useState, useEffect } from 'react';

export interface SearchItem {
  type: 'project' | 'post' | 'social' | 'page' | 'video';
  title: string;
  description: string;
  url: string;
  tags: string[];
  featured: boolean;
  data: unknown;
}

interface UseSearchDataReturn {
  searchData: SearchItem[];
  isLoading: boolean;
}

export function useSearchData(): UseSearchDataReturn {
  const [searchData, setSearchData] = useState<SearchItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSearchIndex = async () => {
      try {
        const response = await fetch('/search-index.json');
        if (response.ok) {
          const data = await response.json();
          setSearchData(data);
        } else {
          console.error('Failed to load search index');
        }
      } catch (error) {
        console.error('Error loading search index:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSearchIndex();
  }, []);

  return {
    searchData,
    isLoading,
  };
}