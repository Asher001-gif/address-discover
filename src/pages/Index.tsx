import { useState, useCallback } from "react";
import { SearchX, Store, Sparkles, MapPin, TrendingUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchForm from "@/components/SearchForm";
import ShopCard from "@/components/ShopCard";
import { shops, type Shop } from "@/data/shops";
import { searchShops } from "@/lib/search";

const Index = () => {
  const [results, setResults] = useState<Shop[] | null>(null);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSearch = useCallback((query: string) => {
    const trimmed = query.trim();
    if (!trimmed) {
      setResults(null);
      setSearched(false);
      setLoading(false);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const filtered = searchShops(trimmed, shops);
      setResults(filtered);
      setSearched(true);
      setLoading(false);
    }, 400);
  }, []);

  const stats = [
    { label: "Listed Shops", value: shops.length, icon: Store },
    { label: "Verified", value: shops.filter(s => s.verified).length, icon: Sparkles },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary px-4 pt-16 pb-28 text-center">
        {/* Animated gradient blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,hsl(212_80%_60%/0.3),transparent_70%)] animate-pulse" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,hsl(152_50%_50%/0.15),transparent_70%)] animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[radial-gradient(circle,hsl(212_62%_50%/0.1),transparent_60%)]" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm text-primary-foreground/90 text-sm font-medium border border-primary-foreground/10">
            <MapPin className="h-4 w-4" />
            Find what you need, nearby
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-primary-foreground leading-[1.1] tracking-tight">
            Discover Shops &amp; Services{" "}
            <span className="bg-gradient-to-r from-primary-foreground via-primary-foreground/90 to-primary-foreground/70 bg-clip-text">
              Around You
            </span>
          </h1>
          <p className="mt-4 text-primary-foreground/65 text-lg max-w-xl mx-auto text-balance">
            Type what you're looking for — we'll show you what's nearby in seconds.
          </p>

          {/* Quick stats */}
          <div className="mt-6 flex items-center justify-center gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-2 text-primary-foreground/70">
                <stat.icon className="h-4 w-4" />
                <span className="text-sm">
                  <span className="font-bold text-primary-foreground">{stat.value}</span> {stat.label}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Search Card */}
      <section className="px-4 -mt-10 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-2xl mx-auto bg-card rounded-2xl border border-border shadow-xl p-5 sm:p-6"
        >
          <SearchForm onSearch={handleSearch} />
          <div className="mt-3 flex items-center justify-center gap-2.5 flex-wrap">
            <a
              href="https://forms.gle/4RenPQUZAiRf5DMb8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-semibold hover:bg-accent/90 active:scale-[0.97] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring shadow-sm"
            >
              <Store className="h-3.5 w-3.5" />
              Business Profile
            </a>
            <span className="text-xs text-muted-foreground">Add, Update or Remove your shop!</span>
          </div>
        </motion.div>
      </section>

      {/* Results */}
      <section className="flex-1 px-4 py-12 max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground"
            >
              <div className="relative h-20 w-20 mb-4">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-primary/30 animate-[spin_6s_linear_infinite]" />
                <div className="absolute inset-0 animate-[spin_1.5s_cubic-bezier(0.4,0,0.2,1)_infinite]">
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2">
                    <svg className="h-5 w-5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M13 7 8 2 2 8l5 5" />
                      <path d="m17 11 5 5-5 5-5-5" />
                      <path d="m8 13 4-4" />
                      <path d="m16 8 1-4 4 1" />
                    </svg>
                  </div>
                </div>
                <div className="absolute inset-[30%] rounded-full bg-primary/20 animate-ping" />
                <div className="absolute inset-[35%] rounded-full bg-primary/40" />
              </div>
              <p className="text-lg font-medium">Scanning nearby...</p>
              <p className="mt-1 text-sm">Finding shops & services for you</p>
            </motion.div>
          )}

          {!loading && searched && results && results.length === 0 && (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground"
            >
              <SearchX className="h-16 w-16 mb-4 opacity-40" />
              <p className="text-xl font-medium">Nothing found</p>
              <p className="mt-1 text-sm">No shops or services matched your search. Try a different address or service.</p>
            </motion.div>
          )}

          {!loading && results && results.length > 0 && (
            <motion.div
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium">
                <TrendingUp className="h-3.5 w-3.5" />
                {results.length} result{results.length > 1 ? "s" : ""} found
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {results.map((shop, i) => (
                  <motion.div
                    key={shop.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                  >
                    <ShopCard {...shop} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {!loading && !searched && (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground"
            >
              <div className="relative">
                <MapPinIcon />
                <div className="absolute inset-0 animate-ping opacity-20">
                  <MapPinIcon />
                </div>
              </div>
              <p className="mt-4 text-lg font-medium">Search for nearby shops</p>
              <p className="mt-1 text-sm">Enter your address and service type above to get started.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Terms & Last Updated */}
      <div className="px-4 py-4 text-center space-y-2">
        <a href="/terms" className="text-xs font-medium text-muted-foreground hover:text-foreground underline underline-offset-2 transition-colors">
          Terms &amp; Conditions
        </a>
        <p id="lastUpdated" className="text-xs tracking-wide text-muted-foreground/70">
          Last updated: <span className="font-semibold text-muted-foreground">{new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}</span>
        </p>
      </div>

      {/* Colored divider strip */}
      <div className="h-1 w-full flex">
        <div className="flex-1 bg-primary" />
        <div className="flex-1 bg-[hsl(152,50%,40%)]" />
        <div className="flex-1 bg-accent" />
      </div>

      {/* Footer */}
      <footer className="bg-[hsl(212,30%,15%)] px-4 py-10">
        <div className="max-w-3xl mx-auto text-center space-y-3">
          <p className="text-sm leading-relaxed tracking-wide text-[hsl(210,20%,75%)] text-balance">
            <span className="font-semibold text-[hsl(210,60%,70%)]">Map &amp; POI Data</span>
            {" © "}
            <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 font-medium hover:opacity-80 transition-opacity text-[hsl(210,60%,70%)]">
              OpenStreetMap Contributors
            </a>
            {" "}
            <span>(via </span>
            <a href="https://overpass-turbo.eu/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 transition-opacity">
              Overpass Turbo
            </a>
            <span>).</span>
          </p>
          <p className="text-sm leading-relaxed text-[hsl(210,20%,75%)]">
            <span>Used and presented by </span>
            <span className="font-bold text-accent">Samipa</span>
            <span>.</span>
          </p>
          <p className="text-xs leading-relaxed text-[hsl(210,20%,65%)] text-balance">
            Thanks to the{" "}
            <span className="font-medium text-[hsl(152,50%,60%)]">OpenStreetMap Community</span>
            {" "}for providing open data. Licensed under{" "}
            <a href="https://opendatacommons.org/licenses/odbl/1-0/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:opacity-80 transition-opacity text-[hsl(210,60%,70%)]">
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
