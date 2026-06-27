// import { createFileRoute } from "@tanstack/react-router";
// import { useMemo, useState } from "react";
// import { CATEGORIES, type Category } from "@/lib/products";
// import { useProducts } from "@/lib/useProducts";
// import { ProductCard } from "@/components/ProductCard";
// import { Reveal } from "@/components/Reveal";

// type Search = { cat?: Category | "all" };

// export const Route = createFileRoute("/products")({
//   validateSearch: (s: Record<string, unknown>): Search => ({
//     cat: (s.cat as Search["cat"]) ?? "all",
//   }),
//   head: () => ({
//     meta: [
//       { title: "Products — Gripsta Hardware" },
//       { name: "description", content: "Browse Gripsta hinges, channels, tandem systems, pullouts and more." },
//     ],
//   }),
//   component: ProductsPage,
// });

// function ProductsPage() {
//   const { cat } = Route.useSearch();
//   const navigate = Route.useNavigate();
//   const [query, setQuery] = useState("");
//   const { products, loading } = useProducts();

//   const list = useMemo(() => {
//     let l = products;
//     if (cat && cat !== "all") l = l.filter((p) => p.category === cat);
//     if (query) l = l.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
//     return l;
//   }, [cat, query, products]);

//   const filters: { id: Search["cat"]; label: string }[] = [
//     { id: "all", label: "All" },
//     ...CATEGORIES.map((c) => ({ id: c.id as Search["cat"], label: c.label })),
//   ];

//   return (
//     <>
//       <section className="pt-32 pb-12">
//         <div className="max-w-7xl mx-auto px-6 lg:px-10">
//           <span className="label-accent">Catalog</span>
//           <h1 className="font-display text-5xl md:text-7xl mt-3">ALL PRODUCTS</h1>
//           <p className="mt-4 text-muted-foreground max-w-2xl">
//             Explore the full Gripsta hardware range — hinges, channels, tandem systems, pullouts and more.
//           </p>
//         </div>
//       </section>

//       <section id="categories" className="pb-24 scroll-mt-24">
//         <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[240px_1fr] gap-10">
//           <aside className="lg:sticky lg:top-28 self-start">
//             <h3 className="label-accent mb-4">Category</h3>
//             <div className="flex lg:flex-col flex-wrap gap-2">
//               {filters.map((f) => (
//                 <button
//                   key={f.id}
//                   onClick={() => navigate({ search: (prev: Search) => ({ ...prev, cat: f.id }) })}
//                   className={`text-left px-4 py-2.5 border text-sm uppercase tracking-widest transition-colors ${
//                     cat === f.id
//                       ? "border-primary text-primary bg-primary/5"
//                       : "border-border text-foreground/70 hover:border-border-hover hover:text-foreground"
//                   }`}
//                 >
//                   {f.label}
//                 </button>
//               ))}
//             </div>
//             <h3 className="label-accent mt-8 mb-4">Search</h3>
//             <input
//               type="text"
//               placeholder="Search products..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               className="w-full bg-surface border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
//             />
//           </aside>

//           <div>
//             {loading ? (
//               <div className="text-muted-foreground text-sm py-20 text-center">Loading products...</div>
//             ) : (
//               <>
//                 <p className="text-sm text-muted-foreground mb-6">Showing {list.length} products</p>
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
//                   {list.map((p, i) => (
//                     <Reveal key={p.id} delay={i * 40}>
//                       <ProductCard product={p} hideViewButton />
//                     </Reveal>
//                   ))}
//                 </div>
//                 {list.length === 0 && (
//                   <div className="text-center py-20 text-muted-foreground">No products match your filters.</div>
//                 )}
//               </>
//             )}
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }



import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type ProductOverride } from "@/lib/supabase";
import { PRODUCTS, CATEGORIES, type Category, type Product } from "@/lib/products";

export const Route = createFileRoute("/products")({
  head: () => ({ meta: [{ title: "Products — Gripsta" }] }),
  component: ProductsPage,
});

// A display product — either from PRODUCTS merged with overrides, or a custom one
interface DisplayProduct {
  id: string;
  name: string;
  short_spec: string;
  description: string;
  image_url: string | null;
  in_stock: boolean;
  visible: boolean;
  category: Category;
  categoryLabel: string;
  badge?: string;
  price?: number;
  unit?: string;
}

function buildDisplayProducts(overrides: Record<string, ProductOverride>): DisplayProduct[] {
  const knownIds = new Set(PRODUCTS.map((p) => p.id));

  // Static products merged with overrides
  const staticMerged: DisplayProduct[] = PRODUCTS.map((p) => {
    const o = overrides[p.id];
    return {
      id: p.id,
      name: o?.name ?? p.name,
      short_spec: o?.short_spec ?? p.shortSpec,
      description: o?.description ?? p.description,
      image_url: o?.image_url ?? null,
      in_stock: o?.in_stock ?? true,
      visible: o?.visible ?? true,
      category: p.category,
      categoryLabel: p.categoryLabel,
      badge: p.badge,
      price: p.price,
      unit: p.unit,
    };
  });

  // Custom products (added via admin, id starts with "custom_")
  const customProducts: DisplayProduct[] = Object.values(overrides)
    .filter((o) => !knownIds.has(o.id))
    .map((o) => {
      const parts = o.id.split("_");
      const categoryId = (parts[1] as Category) ?? "hinges";
      const cat = CATEGORIES.find((c) => c.id === categoryId);
      return {
        id: o.id,
        name: o.name ?? "",
        short_spec: o.short_spec ?? "",
        description: o.description ?? "",
        image_url: o.image_url ?? null,
        in_stock: o.in_stock ?? true,
        visible: o.visible ?? true,
        category: categoryId,
        categoryLabel: cat?.label ?? "Custom",
      };
    });

  return [...staticMerged, ...customProducts];
}

function ProductsPage() {
  const [allProducts, setAllProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  useEffect(() => {
    supabase.from("products_override").select("*").then(({ data }) => {
      const map: Record<string, ProductOverride> = {};
      (data ?? []).forEach((d) => (map[d.id] = d));
      setAllProducts(buildDisplayProducts(map));
      setLoading(false);
    });
  }, []);

  // Only show visible products
  const visibleProducts = allProducts.filter((p) => p.visible);

  // Categories that have at least one visible product
  const activeCategories = CATEGORIES.filter((cat) =>
    visibleProducts.some((p) => p.category === cat.id)
  );

  const filteredProducts =
    activeCategory === "all"
      ? visibleProducts
      : visibleProducts.filter((p) => p.category === activeCategory);

  // Group by category for "all" view
  const groupedByCategory = activeCategories.map((cat) => ({
    ...cat,
    products: filteredProducts.filter((p) => p.category === cat.id),
  })).filter((g) => g.products.length > 0);

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Our Range</span>
          <h1 className="font-display text-5xl lg:text-6xl mt-2">PRODUCTS</h1>
          <p className="text-muted-foreground mt-3 max-w-xl">
            Premium stainless steel hardware for kitchens, wardrobes, and interiors.
            Engineered for smooth operation and lasting finish.
          </p>
        </div>
      </section>

      {/* Category filter pills */}
      <section className="pb-8 sticky top-16 z-10 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <button
              onClick={() => setActiveCategory("all")}
              className={`shrink-0 text-xs px-4 py-2 border transition-colors ${
                activeCategory === "all"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:border-primary hover:text-primary"
              }`}
            >
              All
            </button>
            {activeCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`shrink-0 text-xs px-4 py-2 border transition-colors whitespace-nowrap ${
                  activeCategory === cat.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-12 pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-surface border border-border animate-pulse h-64" />
              ))}
            </div>
          ) : groupedByCategory.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-sm">No products found.</div>
          ) : activeCategory !== "all" ? (
            // Single category grid
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            // Grouped by category
            <div className="space-y-14">
              {groupedByCategory.map((group) => (
                <div key={group.id}>
                  {/* Category heading */}
                  <div className="flex items-end justify-between mb-5 pb-3 border-b border-border">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.icon}</span>
                      <div>
                        <h2 className="font-display text-2xl">{group.label}</h2>
                        <p className="text-xs text-muted-foreground">{group.desc}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveCategory(group.id)}
                      className="text-xs text-primary hover:underline underline-offset-2 shrink-0"
                    >
                      View all →
                    </button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {group.products.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function ProductCard({ product: p }: { product: DisplayProduct }) {
  return (
    <Link
      to="/products/$id"
      params={{ id: p.id }}
      className="group bg-surface border border-border flex flex-col hover:border-primary transition-colors"
    >
      {/* Image */}
      <div className="aspect-square bg-background flex items-center justify-center overflow-hidden relative">
        {p.image_url ? (
          <img
            src={p.image_url}
            alt={p.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <span className="text-4xl opacity-20">
            {CATEGORIES.find((c) => c.id === p.category)?.icon ?? "📦"}
          </span>
        )}
        {p.badge && (
          <span className="absolute top-2 left-2 label-accent text-[9px] px-2 py-0.5 bg-primary text-primary-foreground">
            {p.badge}
          </span>
        )}
        {!p.in_stock && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <span className="text-xs text-muted-foreground border border-border px-3 py-1">Out of Stock</span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <p className="text-[10px] text-muted-foreground uppercase tracking-widest">{p.categoryLabel}</p>
        <h3 className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-primary transition-colors">
          {p.name}
        </h3>
        {p.short_spec && (
          <p className="text-[11px] text-muted-foreground mt-1 line-clamp-1">{p.short_spec}</p>
        )}
        {p.price && (
          <p className="text-sm font-display mt-auto pt-2">
            ₹{p.price.toLocaleString("en-IN")}{" "}
            <span className="text-xs text-muted-foreground font-normal">/ {p.unit}</span>
          </p>
        )}
      </div>
    </Link>
  );
}
