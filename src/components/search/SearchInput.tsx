interface SearchInputProps {
  query: string;
  onChange: (value: string) => void;
  isLoading: boolean;
}

export default function SearchInput({ query, onChange, isLoading }: SearchInputProps) {
  return (
    <input
      type="text"
      placeholder="Search or browse all content..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
      className="w-full p-6 text-lg bg-transparent border-none outline-none border-b border-slate-200 placeholder:text-slate-400"
      autoFocus
      disabled={isLoading}
    />
  );
}