import { SearchItem } from './hooks/useSearchData';

interface SearchResult {
  item: SearchItem;
  refIndex: number;
}

interface SearchResultsProps {
  results: SearchResult[];
  selectedIndex: number;
  onResultClick: (url: string) => void;
  query: string;
  isLoading: boolean;
}

function getTypeColor(type: string) {
  switch (type) {
    case 'project':
      return 'bg-blue-100 text-blue-800';
    case 'social':
      return 'bg-green-100 text-green-800';
    case 'post':
      return 'bg-orange-100 text-orange-800';
    case 'video':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-purple-100 text-purple-800';
  }
}

export default function SearchResults({
  results,
  selectedIndex,
  onResultClick,
  query,
  isLoading,
}: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="p-6 text-center text-slate-500">
        Loading search index...
      </div>
    );
  }

  if (results.length === 0 && query.trim()) {
    return (
      <div className="p-6 text-center text-slate-500">
        No results found for &quot;{query}&quot;
      </div>
    );
  }

  return (
    <>
      {results.map((result, index) => (
        <div
          key={`${result.item.type}-${result.item.title}`}
          className={`p-4 border-b border-slate-100 cursor-pointer transition-colors duration-150 ${
            index === selectedIndex ? 'bg-indigo-50' : 'hover:bg-slate-50'
          }`}
          onClick={() => onResultClick(result.item.url)}
        >
          <div className="flex items-start gap-3">
            <div className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(result.item.type)}`}>
              {result.item.type}
            </div>
            <div className="flex-1">
              <div className="font-medium text-slate-900">{result.item.title}</div>
              <div className="text-sm text-slate-600 mt-1">{result.item.description}</div>
            </div>
            <div className="text-slate-400 text-sm">
              →
            </div>
          </div>
        </div>
      ))}
    </>
  );
}