import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CATEGORIES, type Category } from "@/lib/products";
import { useProducts } from "@/lib/useProducts";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

type Search = { cat?: Category | "all" };

export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: (s.cat as Search["cat"]) ?? "all",
  }),
  head: () => ({
    meta: [
      { title: "Products — Gripsta Hardware" },
      { name: "description", content: "Browse Gripsta hinges, channels, tandem systems, pullouts and more." },
    ],
  }),
  component: ProductsPage,
});

function ProductsPage() {
  const { cat } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [query, setQuery] = useState("");
  const { products, loading } = useProducts();

  const list = useMemo(() => {
    let l = products;
    if (cat && cat !== "all") l = l.filter((p) => p.category === cat);
    if (query) l = l.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
    return l;
  }, [cat, query, products]);

  const filters: { id: Search["cat"]; label: string }[] = [
    { id: "all", label: "All" },
    ...CATEGORIES.map((c) => ({ id: c.id as Search["cat"], label: c.label })),
  ];

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Catalog</span>
          <h1 className="font-display text-5xl md:text-7xl mt-3">ALL PRODUCTS</h1>
          <p className="mt-4 text-muted-foreground max-w-2xl">
            Explore the full Gripsta hardware range — hinges, channels, tandem systems, pullouts and more.
          </p>
        </div>
      </section>

      <section id="categories" className="pb-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="lg:sticky lg:top-28 self-start">
            <h3 className="label-accent mb-4">Category</h3>
            <div className="flex lg:flex-col flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f.id}
                  onClick={() => navigate({ search: (prev: Search) => ({ ...prev, cat: f.id }) })}
                  className={`text-left px-4 py-2.5 border text-sm uppercase tracking-widest transition-colors ${
                    cat === f.id
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-foreground/70 hover:border-border-hover hover:text-foreground"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <h3 className="label-accent mt-8 mb-4">Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </aside>

          <div>
            {loading ? (
              <div className="text-muted-foreground text-sm py-20 text-center">
                Loading products...
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground mb-6">
                  Showing {list.length} products
                </p>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {list.map((p, i) => (
                    <Reveal key={p.id} delay={i * 40}>
                      <ProductCard product={p} hideViewButton />
                    </Reveal>
                  ))}
                </div>
                {list.length === 0 && (
                  <div className="text-center py-20 text-muted-foreground">
                    No products match your filters.
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}