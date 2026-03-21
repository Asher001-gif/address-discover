import { useState } from "react";
import { Search, MapPin, Wrench } from "lucide-react";

interface Props {
  onSearch: (address: string, service: string) => void;
}

const SearchForm = ({ onSearch }: Props) => {
  const [address, setAddress] = useState("");
  const [service, setService] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(address.trim(), service.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Your address or area..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
        <div className="relative flex-1">
          <Wrench className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <input
            type="text"
            placeholder="Service type (e.g. plumber)..."
            value={service}
            onChange={(e) => setService(e.target.value)}
            className="w-full pl-10 pr-4 py-3.5 rounded-lg border border-border bg-card text-card-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-shadow"
          />
        </div>
        <button
          type="submit"
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 active:scale-[0.97] transition-all"
        >
          <Search className="h-5 w-5" />
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
