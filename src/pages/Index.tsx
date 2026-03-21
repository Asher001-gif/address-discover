import { useState } from "react";
import { SearchX, Store } from "lucide-react";
import SearchForm from "@/components/SearchForm";
import ShopCard from "@/components/ShopCard";
import { shops, type Shop } from "@/data/shops";

const Index = () => {
  const [results, setResults] = useState<Shop[] | null>(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (query: string) => {
    if (!query) {
      setResults(null);
      setSearched(false);
      return;
    }

    const keywords = query.toLowerCase().split(/\s+/).filter(Boolean);
    const filtered = shops.filter((shop) => {
      const blob = `${shop.name} ${shop.service} ${shop.address} ${shop.phone || ""}`.toLowerCase();
      return keywords.every((kw) => blob.includes(kw));
    });

    setResults(filtered);
    setSearched(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 pt-20 pb-24 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,hsl(160_60%_48%/0.3),transparent_60%)]" />
        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary-foreground/10 text-primary-foreground/80 text-sm">
            <Store className="h-4 w-4" />
            Find what you need, nearby
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-primary-foreground leading-tight" style={{ lineHeight: 1.1 }}>
            Discover Shops &amp; Services Around You
          </h1>
          <p className="mt-4 text-primary-foreground/70 text-lg max-w-xl mx-auto" style={{ textWrap: "balance" } as React.CSSProperties}>
            Type your address and the service you're looking for — we'll show you what's nearby.
          </p>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 -mt-7 relative z-20">
        <div className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-lg p-4 sm:p-6">
          <SearchForm onSearch={handleSearch} />
        </div>
      </section>

      {/* Results */}
      <section className="flex-1 px-4 py-12 max-w-4xl mx-auto w-full">
        {searched && results && results.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <SearchX className="h-16 w-16 mb-4 opacity-40" />
            <p className="text-xl font-medium">Nothing found</p>
            <p className="mt-1 text-sm">No shops or services matched your search. Try a different address or service.</p>
          </div>
        )}

        {results && results.length > 0 && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {results.length} result{results.length > 1 ? "s" : ""} found
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              {results.map((shop) => (
                <ShopCard key={shop.id} {...shop} />
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground">
            <MapPinIcon />
            <p className="mt-4 text-lg font-medium">Search for nearby shops</p>
            <p className="mt-1 text-sm">Enter your address and service type above to get started.</p>
          </div>
        )}
      </section>

      {/* Footer Attribution */}
      <footer className="border-t border-border bg-card px-4 py-8">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm leading-relaxed tracking-wide" style={{ textWrap: "balance" } as React.CSSProperties}>
            <span className="font-semibold" style={{ color: "hsl(210, 60%, 45%)" }}>Map &amp; POI Data</span>
            {" © "}
            <a
              href="https://www.openstreetmap.org/copyright"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity"
              style={{ color: "hsl(210, 60%, 45%)" }}
            >
              OpenStreetMap Contributors
            </a>
            {" "}
            <span className="text-muted-foreground">(via </span>
            <a
              href="https://overpass-turbo.eu/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity text-muted-foreground"
            >
              Overpass Turbo
            </a>
            <span className="text-muted-foreground">).</span>
          </p>
          <p className="mt-2 text-sm leading-relaxed">
            <span className="text-muted-foreground">Used and presented by </span>
            <span className="font-bold" style={{ color: "hsl(0, 72%, 50%)" }}>Samipa</span>
            <span className="text-muted-foreground">.</span>
          </p>
          <p className="mt-2 text-xs text-muted-foreground leading-relaxed" style={{ textWrap: "balance" } as React.CSSProperties}>
            Thanks to the{" "}
            <span className="font-medium" style={{ color: "hsl(152, 50%, 40%)" }}>OpenStreetMap Community</span>
            {" "}for providing open data. Licensed under{" "}
            <a
              href="https://opendatacommons.org/licenses/odbl/1-0/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:opacity-80 transition-opacity"
              style={{ color: "hsl(210, 60%, 45%)" }}
            >
              ODbL 1.0
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
};

const MapPinIcon = () => (
  <svg className="h-16 w-16 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
  </svg>
);

export default Index;
