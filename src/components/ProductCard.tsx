
import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import type { MergedProduct } from "@/lib/useProducts";
import { useState } from "react";

const CATEGORY_GRADIENTS: Record<string, string> = {
  hinges:           "linear-gradient(135deg, #1c1c1c 0%, #2a1a0e 100%)",
  channel:          "linear-gradient(135deg, #111 0%, #1a1a2e 100%)",
  tandem:           "linear-gradient(135deg, #141414 0%, #1e2a1e 100%)",
  pullout:          "linear-gradient(135deg, #1a1a1a 0%, #2a1e10 100%)",
  pantry:           "linear-gradient(135deg, #141414 0%, #241414 100%)",
  "s-corner":       "linear-gradient(135deg, #1a1a1a 0%, #0e1a2a 100%)",
  umc:              "linear-gradient(135deg, #111 0%, #1a1a1a 100%)",
  "sky-wheel":      "linear-gradient(135deg, #141414 0%, #1e1424 100%)",
  "rolling-shutters":   "linear-gradient(135deg, #16181c 0%, #1c2a2e 100%)",
  "elevator-pull-down": "linear-gradient(135deg, #16181c 0%, #24202e 100%)",
};

const CATEGORY_ICONS: Record<string, string> = {
  hinges:           "🔩",
  channel:          "📐",
  tandem:           "🗂️",
  pullout:          "🧺",
  pantry:           "🚪",
  "s-corner":       "🔄",
  umc:              "⚙️",
  "sky-wheel":      "🌀",
  "rolling-shutters":   "🎚️",
  "elevator-pull-down": "⬇️",
};

interface Props {
  product: MergedProduct;
  hideViewButton?: boolean;
}

export function ProductCard({ product, hideViewButton }: Props) {
  const { add, update, remove, items } = useCart();
  const [pop, setPop] = useState(false);

  const existingItem = items.find((i) => i.id === product.id);
  const qty = existingItem?.qty ?? 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    add({ id: product.id, name: product.name, price: product.price, unit: product.unit });
    setPop(true);
    setTimeout(() => setPop(false), 600);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    update(product.id, undefined, qty + 1);
    setPop(true);
    setTimeout(() => setPop(false), 600);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (qty === 1) remove(product.id, undefined);
    else update(product.id, undefined, qty - 1);
  };

  const gradient = CATEGORY_GRADIENTS[product.category] ?? "linear-gradient(135deg,#1a1a1a,#222)";
  const icon = CATEGORY_ICONS[product.category] ?? "📦";

  return (
    <div className="bg-surface border border-border hover:border-border-hover transition-colors group flex flex-col">

      {/* Image */}
      <Link
        to="/products"
        search={{ cat: product.category }}
        className="block relative overflow-hidden"
        style={{ aspectRatio: "4/3" }}
      >
        {product.imageUrl || product.img ? (
          <img
            src={product.imageUrl ?? product.img}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className="w-full h-full flex flex-col items-center justify-center gap-3 relative"
            style={{ background: gradient }}
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg,transparent,transparent 24px,#fff 24px,#fff 25px)," +
                  "repeating-linear-gradient(90deg,transparent,transparent 24px,#fff 24px,#fff 25px)",
              }}
            />
            <span className="text-4xl relative z-10" style={{ filter: "grayscale(0.3) opacity(0.7)" }}>
              {icon}
            </span>
            <span
              className="relative z-10 text-[10px] uppercase tracking-[0.25em] font-medium"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              Image coming soon
            </span>
            <span className="absolute top-3 left-3 w-4 h-4 border-t border-l border-white/10" />
            <span className="absolute top-3 right-3 w-4 h-4 border-t border-r border-white/10" />
            <span className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-white/10" />
            <span className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-white/10" />
          </div>
        )}

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-background/70 flex items-center justify-center z-10">
            <span className="bg-background border border-border px-4 py-1.5 text-xs uppercase tracking-widest text-muted-foreground font-medium">
              Out of Stock
            </span>
          </div>
        )}

        {product.badge && product.inStock && (
          <span className="absolute top-3 left-3 z-20 label-accent bg-background/90 px-2 py-0.5 text-primary text-[10px]">
            {product.badge}
          </span>
        )}

        {qty > 0 && (
          <span className="absolute top-3 right-3 z-20 bg-primary text-primary-foreground font-bold text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {qty}
          </span>
        )}
      </Link>

      {/* Text */}
      <div className="p-5 flex-1 flex flex-col">
        <p className="label-accent text-muted-foreground">{product.categoryLabel}</p>
        <h3 className="font-display text-xl mt-1 leading-tight">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed flex-1">
          {product.shortSpec}
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-5">
          {!product.inStock ? (
            <button disabled className="flex-1 btn-primary text-xs py-2.5 opacity-40 cursor-not-allowed">
              Out of Stock
            </button>
          ) : qty === 0 ? (
            <button
              onClick={handleAdd}
              className="flex-1 btn-primary text-xs py-2.5 relative overflow-hidden"
            >
              <span
                className="absolute inset-0 flex items-center justify-center pointer-events-none font-bold"
                style={{
                  animation: pop ? "cartPop 0.6s ease forwards" : "none",
                  opacity: pop ? 1 : 0,
                }}
              >
                +1
              </span>
              <span style={{ opacity: pop ? 0 : 1, transition: "opacity 0.15s" }}>
                Add to Cart
              </span>
            </button>
          ) : (
            <div className="flex-1 flex items-center border border-primary overflow-hidden">
              <button
                onClick={handleDecrease}
                className="w-10 h-9 flex items-center justify-center hover:bg-primary/10 transition-colors text-lg text-primary font-bold"
              >−</button>
              <span className="flex-1 text-center text-sm font-bold text-primary">{qty}</span>
              <button
                onClick={handleIncrease}
                className="w-10 h-9 flex items-center justify-center hover:bg-primary/10 transition-colors text-lg text-primary font-bold"
              >+</button>
            </div>
          )}

          {!hideViewButton && (
            <Link
              to="/products"
              search={{ cat: product.category }}
              className="btn-outline text-xs py-2.5 px-4"
            >
              View
            </Link>
          )}
        </div>
      </div>

    </div>
  );
}
