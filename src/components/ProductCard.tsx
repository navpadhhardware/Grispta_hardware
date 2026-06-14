import { Link } from "@tanstack/react-router";
import { FINISH_COLORS, type Product } from "@/lib/products";
import { useCart } from "@/lib/cart";

export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <div className="product-card group flex flex-col">
      <div className="img-wrap relative aspect-square bg-gradient-to-br from-[#222] to-[#1a1a1a] flex items-center justify-center overflow-hidden">
        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 z-10">
          {product.categoryLabel}
        </span>
        {product.badge && (
          <span className="absolute top-3 right-3 bg-foreground/10 backdrop-blur text-foreground text-[10px] font-bold uppercase tracking-wider px-2 py-1 z-10 border border-border">
            {product.badge}
          </span>
        )}
        <ProductGlyph category={product.category} />
      </div>
      <div className="p-5 flex flex-col flex-1 gap-3">
        <h3 className="font-sans font-semibold text-base leading-tight">{product.name}</h3>
        <p className="text-xs text-muted-foreground">{product.shortSpec}</p>
        {product.finishes && (
          <div className="flex gap-1.5">
            {product.finishes.slice(0, 7).map(f => (
              <span key={f} title={f} className="w-3.5 h-3.5 rounded-full border border-border" style={{ background: FINISH_COLORS[f] || "#888" }} />
            ))}
          </div>
        )}
        <div className="mt-auto flex items-end justify-between pt-2">
          <div>
            <span className="font-display text-3xl text-foreground">₹{product.price}</span>
            <span className="text-xs text-muted-foreground ml-1">/{product.unit}</span>
          </div>
        </div>
        <div className="flex gap-2 pt-2">
          <Link to="/products/$id" params={{ id: product.id }} className="flex-1 btn-outline justify-center !py-2.5 !px-3 !text-[11px]">View</Link>
          <button
            onClick={() => add({ id: product.id, name: product.name, price: product.price, unit: product.unit, finish: product.finishes?.[0] })}
            className="flex-1 btn-primary justify-center !py-2.5 !px-3 !text-[11px]"
          >+ Cart</button>
        </div>
      </div>
    </div>
  );
}

function ProductGlyph({ category }: { category: string }) {
  const stroke = "#D71920";
  if (category === "hinges") return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.85">
      <rect x="20" y="30" width="35" height="60" fill="none" />
      <rect x="65" y="30" width="35" height="60" fill="none" />
      <circle cx="60" cy="45" r="4" />
      <circle cx="60" cy="60" r="4" />
      <circle cx="60" cy="75" r="4" />
      <line x1="60" y1="30" x2="60" y2="90" />
    </svg>
  );
  if (category === "screws") return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.85">
      <circle cx="60" cy="30" r="14" />
      <line x1="52" y1="30" x2="68" y2="30" /><line x1="60" y1="22" x2="60" y2="38" />
      <path d="M50 44 L70 44 L66 100 L60 108 L54 100 Z" />
      <line x1="52" y1="55" x2="68" y2="55" /><line x1="53" y1="65" x2="67" y2="65" />
      <line x1="54" y1="75" x2="66" y2="75" /><line x1="55" y1="85" x2="65" y2="85" />
    </svg>
  );
  if (category === "channels") return (
    <svg width="140" height="120" viewBox="0 0 140 120" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.85">
      <rect x="10" y="40" width="120" height="14" /><rect x="10" y="66" width="120" height="14" />
      <circle cx="30" cy="47" r="2" fill={stroke} /><circle cx="70" cy="47" r="2" fill={stroke} /><circle cx="110" cy="47" r="2" fill={stroke} />
      <circle cx="30" cy="73" r="2" fill={stroke} /><circle cx="70" cy="73" r="2" fill={stroke} /><circle cx="110" cy="73" r="2" fill={stroke} />
    </svg>
  );
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.85">
      <circle cx="30" cy="60" r="5" /><circle cx="90" cy="40" r="5" />
      <line x1="30" y1="60" x2="90" y2="40" />
      <rect x="40" y="50" width="40" height="6" transform="rotate(-18 60 53)" />
    </svg>
  );
}
