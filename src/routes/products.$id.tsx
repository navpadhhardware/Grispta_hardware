import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { FINISH_COLORS, getProduct, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/products/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.product.name ?? "Product"} — Gripsta` },
      { name: "description", content: loaderData?.product.description ?? "" },
    ],
  }),
  notFoundComponent: () => (
    <div className="pt-40 pb-24 text-center">
      <h1 className="font-display text-5xl">Product not found</h1>
      <Link to="/products" className="btn-primary mt-6 inline-flex">Back to Products</Link>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="pt-40 pb-24 text-center">
      <h1 className="font-display text-4xl">Something went wrong</h1>
      <p className="mt-2 text-muted-foreground">{error.message}</p>
      <button className="btn-primary mt-6" onClick={reset}>Try again</button>
    </div>
  ),
  component: Detail,
});

function Detail() {
  const { product } = Route.useLoaderData() as { product: import("@/lib/products").Product };
  const { add } = useCart();
  const [finish, setFinish] = useState(product.finishes?.[0]);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"desc" | "spec" | "app" | "inst">("desc");
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Link to="/products" className="text-xs text-muted-foreground hover:text-primary uppercase tracking-widest">← Back to Products</Link>
          <div className="mt-8 grid lg:grid-cols-2 gap-12">
            <div>
              <div className="aspect-square bg-gradient-to-br from-[#222] to-[#1a1a1a] border border-border flex items-center justify-center overflow-hidden">
                {product.img ? (
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-[180px] opacity-80">{
                    product.category === "hinges" ? "🔩"
                    : product.category === "screws" ? "🪛"
                    : product.category === "channels" ? "📐" : "⚙️"
                  }</div>
                )}
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {[0,1,2,3].map(i => (
                  <div key={i} className="aspect-square bg-surface border border-border hover:border-primary cursor-pointer flex items-center justify-center text-3xl opacity-60 hover:opacity-100">
                    {product.category === "hinges" ? "🔩" : product.category === "screws" ? "🪛" : product.category === "channels" ? "📐" : "⚙️"}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="label-accent">{product.categoryLabel}</span>
              <h1 className="font-display text-4xl md:text-5xl mt-2">{product.name}</h1>
              <p className="text-muted-foreground mt-4">{product.description}</p>
              <div className="mt-6 flex items-baseline gap-2">
                {product.price > 0 ? (
                  <>
                    <span className="font-display text-6xl text-primary">₹{product.price}</span>
                    <span className="text-muted-foreground">/{product.unit}</span>
                  </>
                ) : (
                  <span className="font-display text-3xl text-primary">Contact for Price</span>
                )}
              </div>

              {product.finishes && (
                <div className="mt-8">
                  <h3 className="label-accent mb-3">Finish · {finish}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.finishes.map(f => (
                      <button key={f} onClick={() => setFinish(f)} title={f}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${finish === f ? "border-primary scale-110" : "border-border hover:border-foreground/40"}`}
                        style={{ background: FINISH_COLORS[f] || "#888" }} />
                    ))}
                  </div>
                </div>
              )}

              {product.sizes && (
                <div className="mt-8">
                  <h3 className="label-accent mb-3">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map(s => (
                      <button key={s} onClick={() => setSize(s)}
                        className={`px-4 py-2 border text-sm uppercase tracking-widest ${size === s ? "border-primary text-primary" : "border-border hover:border-foreground/40"}`}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-8 flex items-center gap-4">
                <h3 className="label-accent">Qty</h3>
                <div className="flex items-center border border-border">
                  <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-2 hover:bg-surface-hover">−</button>
                  <input type="number" value={qty} onChange={e => setQty(Math.max(1, +e.target.value || 1))} className="w-16 bg-transparent text-center py-2 focus:outline-none" />
                  <button onClick={() => setQty(q => q + 1)} className="px-4 py-2 hover:bg-surface-hover">+</button>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <button onClick={() => add({ id: product.id, name: product.name, price: product.price, unit: product.unit, finish }, qty)} className="btn-primary flex-1 sm:flex-none justify-center min-w-[180px]">Add to Cart →</button>
                <a href={`https://wa.me/919999999999?text=I'd%20like%20to%20enquire%20about%20${encodeURIComponent(product.name)}`} target="_blank" rel="noreferrer" className="btn-whatsapp flex-1 sm:flex-none justify-center min-w-[180px]">💬 Enquire on WhatsApp</a>
              </div>
            </div>
          </div>

          {/* tabs */}
          <div className="mt-20 border-t border-border pt-12">
            <div className="flex flex-wrap gap-2 border-b border-border">
              {[["desc","Description"],["spec","Specifications"],["app","Applications"],["inst","How to Install"]].map(([k,l]) => (
                <button key={k} onClick={() => setTab(k as typeof tab)}
                  className={`px-5 py-3 text-sm uppercase tracking-widest transition-colors ${tab === k ? "text-primary border-b-2 border-primary -mb-px" : "text-muted-foreground hover:text-foreground"}`}>{l}</button>
              ))}
            </div>
            <div className="py-8 max-w-3xl text-foreground/90 leading-relaxed">
              {tab === "desc" && <p>{product.description}</p>}
              {tab === "spec" && (
                <table className="w-full text-sm">
                  <tbody>
                    {Object.entries(product.specs).map(([k, v]) => (
                      <tr key={k} className="border-b border-border">
                        <td className="py-3 text-muted-foreground uppercase tracking-widest text-xs w-1/3">{k}</td>
                        <td className="py-3">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {tab === "app" && (
                <ul className="grid sm:grid-cols-2 gap-3">{product.applications.map(a => <li key={a} className="flex gap-3"><span className="text-primary">▸</span>{a}</li>)}</ul>
              )}
              {tab === "inst" && <p>{product.install}</p>}
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-display text-4xl mb-8">RELATED PRODUCTS</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* sticky mobile bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-[rgba(10,10,10,0.97)] backdrop-blur border-t border-border p-3 flex gap-2">
        <button onClick={() => add({ id: product.id, name: product.name, price: product.price, unit: product.unit, finish }, qty)} className="flex-1 btn-primary justify-center">Add to Cart</button>
        <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="flex-1 btn-whatsapp justify-center">WhatsApp</a>
      </div>
    </>
  );
}
