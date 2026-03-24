import { useState } from "react";
import { MapPin, Phone, Clock, Star, ExternalLink, Share2, Check, Flag, BadgeCheck } from "lucide-react";
import type { Shop } from "@/data/shops";
import { toSlug } from "@/lib/slug";

const ShopCard = ({ id, name, service, address, phone, rating, hours, mapLink, verified }: Shop) => {
  const [copied, setCopied] = useState(false);

  const hasExactLink = !!mapLink;
  const mapsUrl = hasExactLink
    ? mapLink
    : `https://www.google.com/maps/search/${encodeURIComponent(`${name} ${address}`)}`;

  const slug = toSlug(name, id);
  const shopUrl = `${window.location.origin}/shop/${slug}`;

  const shareText = [
    `🏪 ${name}`,
    phone ? `📞 ${phone}` : null,
    `📍 ${address}`,
    shopUrl,
  ]
    .filter(Boolean)
    .join("\n");

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: name, text: shareText, url: shopUrl });
        return;
      } catch {
        // user cancelled or error — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(shareText);
    } catch {
      // fallback for older browsers
      const ta = document.createElement("textarea");
      ta.value = shareText;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

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
        <a
          href="https://forms.gle/4RenPQUZAiRf5DMb8"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-destructive text-destructive-foreground text-xs font-semibold hover:bg-destructive/90 active:scale-[0.97] transition-all"
        >
          <Flag className="h-3.5 w-3.5" />
          Report
        </a>
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[hsl(152,50%,40%)] text-white text-xs font-semibold hover:bg-[hsl(152,50%,35%)] active:scale-[0.97] transition-all"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
          {copied ? "Copied!" : "Share"}
        </button>
        {!hasExactLink && (
          <span className="text-[11px] text-muted-foreground/60 italic">Location may not be exact</span>
        )}
      </div>
      {copied && (
        <div className="mt-3 px-3 py-2 rounded-lg bg-[hsl(152,50%,40%)]/10 text-[hsl(152,50%,30%)] text-xs font-medium text-center animate-in fade-in duration-200">
          You're good to go. Link copied (^.^)
        </div>
      )}
    </div>
  );
};

export default ShopCard;
