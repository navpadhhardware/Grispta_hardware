import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/cart")({
  head: () => ({ meta: [{ title: "Cart — Gripsta" }] }),
  component: Cart,
});

function Cart() {
  const { items, total, update, remove } = useCart();

  if (items.length === 0) {
    return (
      <section className="pt-40 pb-24">
        <div className="max-w-xl mx-auto px-6 text-center">
          <div className="text-7xl">🛒</div>
          <h1 className="font-display text-4xl mt-6">YOUR CART IS EMPTY</h1>
          <p className="text-muted-foreground mt-3">Browse our hardware range to add products.</p>
          <Link to="/products" className="btn-primary mt-8 inline-flex">Continue Shopping →</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <span className="label-accent">Cart</span>
        <h1 className="font-display text-5xl md:text-6xl mt-3">YOUR CART</h1>

        <div className="mt-12 grid lg:grid-cols-[1fr_360px] gap-10">
          <div className="space-y-3">
            {items.map(item => (
              <div key={item.id + (item.finish || "")} className="bg-surface border border-border p-4 flex gap-4 items-center">
                <div className="w-20 h-20 bg-background border border-border flex items-center justify-center text-3xl shrink-0">📦</div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{item.name}</h3>
                  {item.finish && <p className="text-xs text-muted-foreground mt-1">Finish: {item.finish}</p>}
                  <p className="text-sm text-primary mt-1">₹{item.price} / {item.unit}</p>
                </div>
                <div className="flex items-center border border-border">
                  <button onClick={() => update(item.id, item.finish, item.qty - 1)} className="px-3 py-1.5 hover:bg-surface-hover">−</button>
                  <span className="w-10 text-center">{item.qty}</span>
                  <button onClick={() => update(item.id, item.finish, item.qty + 1)} className="px-3 py-1.5 hover:bg-surface-hover">+</button>
                </div>
                <div className="font-display text-xl w-24 text-right">₹{item.price * item.qty}</div>
                <button onClick={() => remove(item.id, item.finish)} className="text-muted-foreground hover:text-primary p-2" aria-label="Remove">✕</button>
              </div>
            ))}
          </div>

          <aside className="bg-surface border border-border p-6 h-fit lg:sticky lg:top-28">
            <h2 className="font-display text-2xl">ORDER SUMMARY</h2>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>₹{total}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span className="text-xs text-muted-foreground">Calculated at checkout</span></div>
              <div className="flex justify-between pt-3 border-t border-border font-display text-2xl"><span>Total</span><span>₹{total}</span></div>
            </div>
            <Link to="/products" className="btn-outline w-full justify-center mt-6">Continue Shopping</Link>
          </aside>
        </div>
      </div>
    </section>
  );
}
