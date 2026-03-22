import { useParams, Link } from "react-router-dom";
import { MapPin, Phone, Clock, Star, ExternalLink, ArrowLeft } from "lucide-react";
import { shops } from "@/data/shops";
import { toSlug } from "@/lib/slug";

const ShopDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const shop = shops.find((s) => toSlug(s.name, s.id) === slug);

  if (!shop) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background text-center px-4">
        <p className="text-2xl font-semibold text-foreground">Shop not found</p>
        <Link to="/" className="mt-4 text-primary underline underline-offset-2">Go back home</Link>
      </div>
    );
  }

  const hasExactLink = !!shop.mapLink;
  const mapsUrl = hasExactLink
    ? shop.mapLink!
    : `https://www.google.com/maps/search/${encodeURIComponent(`${shop.name} ${shop.address}`)}`;

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/" className="inline-flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground text-sm mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" /> Back to search
          </Link>
          <h1 className="text-3xl font-bold text-primary-foreground">{shop.name}</h1>
          <span className="inline-block mt-2 px-3 py-1 text-xs font-medium rounded-full bg-primary-foreground/10 text-primary-foreground/80">
            {shop.service}
          </span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 space-y-4">
        <div className="bg-card rounded-xl border border-border p-6 space-y-3 text-sm text-muted-foreground">
          <div className="flex items-center gap-2"><MapPin className="h-4 w-4 shrink-0" /><span>{shop.address}</span></div>
          {shop.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4 shrink-0" /><span>{shop.phone}</span></div>}
          {shop.hours && <div className="flex items-center gap-2"><Clock className="h-4 w-4 shrink-0" /><span>{shop.hours}</span></div>}
          {shop.rating && (
            <div className="flex items-center gap-1" style={{ color: "hsl(0, 72%, 50%)" }}>
              <Star className="h-4 w-4 fill-current" /><span className="font-semibold">{shop.rating}</span>
            </div>
          )}
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all"
        >
          <ExternalLink className="h-4 w-4" /> Open in Maps
        </a>
        {!hasExactLink && <p className="text-[11px] text-muted-foreground/60 italic">Location may not be exact</p>}
      </div>
    </div>
  );
};

export default ShopDetail;
