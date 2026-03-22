import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";

interface Props {
  onSearch: (query: string) => void;
}

const SearchForm = ({ onSearch }: Props) => {
  const [query, setQuery] = useState("");
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      onSearch(query.trim());
    }, 200);
    return () => clearTimeout(timerRef.current);
  }, [query, onSearch]);

  return (
    <form onSubmit={(e) => e.preventDefault()} className="w-full max-w-2xl mx-auto">
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name, service, or area... (e.g. coffee, hospital, fuel)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
      </div>
    </form>
  );
};

export default SearchForm;
