import { Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/products";

interface Props {
  product: Product;
  hideViewButton?: boolean;
}

export function ProductCard({ product, hideViewButton }: Props) {
  const { add } = useCart();

  return (
    <div className="bg-surface border border-border hover:border-border-hover transition-colors group flex flex-col">
      {/* Top area — clicking navigates to product detail */}
      <Link to="/products/$id" params={{ id: product.id }} className="block p-6 flex-1">
        {product.badge && (
          <span className="label-accent mb-3 inline-block">{product.badge}</span>
        )}
        <p className="label-accent text-muted-foreground">{product.categoryLabel}</p>
        <h3 className="font-display text-xl mt-1 leading-tight">{product.name}</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{product.shortSpec}</p>
      </Link>

      {/* Actions — always outside the Link */}
      <div className="px-6 pb-6 flex gap-3">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            add(product);
          }}
          className="flex-1 btn-primary text-xs py-2.5"
        >
          Add to Cart
        </button>
        {!hideViewButton && (
          <Link
            to="/products/$id"
            params={{ id: product.id }}
            className="btn-outline text-xs py-2.5 px-4"
          >
            View
          </Link>
        )}
      </div>
    </div>
  );
}
