import { MapPin, Phone, Clock, Star, ExternalLink } from "lucide-react";
import type { Shop } from "@/data/shops";

const ShopCard = ({ name, service, address, phone, rating, hours, mapLink }: Shop) => {
  const hasExactLink = !!mapLink;
  const mapsUrl = hasExactLink
    ? mapLink
    : `https://www.google.com/maps/search/${encodeURIComponent(`${name} ${address}`)}`;

  return (
    <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow hover:border-primary/30">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
          <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground">
            {service}
          </span>
        </div>
        {rating && (
          <div className="flex items-center gap-1 shrink-0" style={{ color: "hsl(0, 72%, 50%)" }}>
            <Star className="h-4 w-4 fill-current" />
            <span className="text-sm font-semibold">{rating}</span>
          </div>
        )}
      </div>
      <div className="mt-4 space-y-2 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 shrink-0" />
          <span>{address}</span>
        </div>
        {phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 shrink-0" />
            <span>{phone}</span>
          </div>
        )}
        {hours && (
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 shrink-0" />
            <span>{hours}</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-2 flex-wrap">
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:bg-primary/90 active:scale-[0.97] transition-all"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          Open in Maps
        </a>
        {!hasExactLink && (
          <span className="text-[11px] text-muted-foreground/60 italic">Location may not be exact</span>
        )}
      </div>
    </div>
  );
};

export default ShopCard;
