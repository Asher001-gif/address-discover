import { MapPin, Phone, Clock, Star } from "lucide-react";
import type { Shop } from "@/data/shops";

const ShopCard = ({ name, service, address, phone, rating, hours }: Shop) => (
  <div className="bg-card rounded-xl border border-border p-5 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between gap-3">
      <div>
        <h3 className="text-lg font-semibold text-card-foreground">{name}</h3>
        <span className="inline-block mt-1 px-2.5 py-0.5 text-xs font-medium rounded-full bg-primary/10 text-primary">
          {service}
        </span>
      </div>
      {rating && (
        <div className="flex items-center gap-1 text-accent shrink-0">
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
  </div>
);

export default ShopCard;
