import { createFileRoute, Link } from "@tanstack/react-router";
import { useCart } from "@/lib/cart";
// 
export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [{ title: "Cart — Gripsta" }],
  }),
  component: CartPage,
});

function CartPage() {
  const { items, remove, update,  } = useCart();

  const handleGetQuote = () => {
    if (items.length === 0) return;
//     const lines = items.map(
//       (item) =>
//         `• ${item.name} (x${item.qty}) — ₹${(item.price * item.qty).toLocaleString("en-IN")}`
//     );
    // const totalLine = `\nTotal: ₹${total.toLocaleString("en-IN")}`;
    const message = encodeURIComponent(
      `Hi Gripsta! I'd like a quote for the following:\n\n${lines.join("\n")}${totalLine}\n\nPlease confirm pricing and availability.`
    );
    window.open(`https://wa.me/917995955787?text=${message}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
        <div className="text-6xl">🛒</div>
        <h1 className="font-display text-4xl">YOUR CART IS EMPTY</h1>
        <p className="text-muted-foreground">
          Browse our range and add products you're interested in.
        </p>
        <Link to="/products" className="btn-primary mt-2">
          Browse Products →
        </Link>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Your Selection</span>
          <h1 className="font-display text-5xl md:text-6xl mt-3">CART</h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_320px] gap-10">

          {/* ITEMS */}
          <div className="space-y-4">
            {items.map(({ id, name,unit, finish, qty }) => (
              <div
                key={id + (finish ?? "")}
                className="bg-surface border border-border p-5 flex gap-5 items-start"
              >
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-xl leading-tight">{name}</h3>
                  {finish && (
                    <p className="text-xs text-muted-foreground mt-1">Finish: {finish}</p>
                  )}
//                   <p className="text-primary font-semibold mt-2">
//                     ₹{price.toLocaleString("en-IN")} / {unit}
//                   </p>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  {/* Qty controls */}
                  <div className="flex items-center border border-border">
                    <button
                      onClick={() => update(id, finish, qty - 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 transition-colors text-lg"
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{qty}</span>
                    <button
                      onClick={() => update(id, finish, qty + 1)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 transition-colors text-lg"
                    >
                      +
                    </button>
//                   </div>

//                   <p className="font-display text-lg">
                    // ₹{(price * qty).toLocaleString("en-IN")}
//                   </p>

                  <button
                    onClick={() => remove(id, finish)}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* QUOTE PANEL */}
          <div className="lg:sticky lg:top-28 self-start">
            <div className="bg-surface border border-border p-6">
              <h2 className="font-display text-2xl mb-5">GET QUOTE</h2>

              <div className="space-y-2 text-sm border-b border-border pb-5 mb-5">
                {items.map(({ id, name, finish, qty }) => (
                  <div key={id + (finish ?? "")} className="flex justify-between gap-2">
                    <span className="text-muted-foreground truncate">
                      {name} ×{qty}
                    </span>
//                     <span className="shrink-0">
//                       ₹{(price * qty).toLocaleString("en-IN")}
//                     </span>
                  </div>
                ))}
              </div>

//               <div className="flex justify-between font-display text-xl mb-6">
//                 <span>TOTAL</span>
//                 <span>₹{total.toLocaleString("en-IN")}</span>
//               </div>

              <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
                Clicking below will open WhatsApp with your cart items pre-filled. Just hit
                send and our team will get back to you with pricing and availability.
              </p>

              <button
                onClick={handleGetQuote}
                className="w-full bg-whatsapp text-white py-4 font-semibold uppercase tracking-widest hover:bg-whatsapp-dark transition-colors flex items-center justify-center gap-2"
              >
                <span className="text-xl">💬</span> Get Quote on WhatsApp
              </button>

              <p className="text-[10px] text-muted-foreground text-center mt-3">
                Prices shown are indicative. Final quote subject to confirmation.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}



// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useCart } from "@/lib/cart";

// export const Route = createFileRoute("/cart")({
//   head: () => ({
//     meta: [{ title: "Cart — Gripsta" }],
//   }),
//   component: CartPage,
// });

// function CartPage() {
//   const { items, remove, update } = useCart();

//   const handleGetQuote = () => {
//     if (items.length === 0) return;
//     const lines = items.map(
//       (item) => `• ${item.name} (x${item.qty})`
//     );
//     const message = encodeURIComponent(
//       `Hi Gripsta! I'd like a quote for the following:\n\n${lines.join("\n")}\n\nPlease confirm pricing and availability.`
//     );
//     window.open(`https://wa.me/917995955787?text=${message}`, "_blank");
//   };

//   if (items.length === 0) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 text-center">
//         <div className="text-6xl">🛒</div>
//         <h1 className="font-display text-4xl">YOUR CART IS EMPTY</h1>
//         <p className="text-muted-foreground">
//           Browse our range and add products you're interested in.
//         </p>
//         <Link to="/products" className="btn-primary mt-2">
//           Browse Products →
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <>
//       <section className="pt-32 pb-12">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10">
//           <span className="label-accent">Your Selection</span>
//           <h1 className="font-display text-5xl md:text-6xl mt-3">CART</h1>
//           <p className="text-muted-foreground mt-3 text-sm">
//             Add the products you're interested in and request a quote via WhatsApp — our team will confirm pricing.
//           </p>
//         </div>
//       </section>

//       <section className="pb-24">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10 grid lg:grid-cols-[1fr_320px] gap-10">

//           {/* ITEMS */}
//           <div className="space-y-4">
//             {items.map(({ id, name, unit, finish, qty }) => (
//               <div
//                 key={id + (finish ?? "")}
//                 className="bg-surface border border-border p-5 flex gap-5 items-center"
//               >
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-display text-xl leading-tight">{name}</h3>
//                   {finish && (
//                     <p className="text-xs text-muted-foreground mt-1">Finish: {finish}</p>
//                   )}
//                   <p className="text-xs text-muted-foreground mt-1">Unit: {unit}</p>
//                 </div>

//                 <div className="flex flex-col items-end gap-3 shrink-0">
//                   {/* Qty controls */}
//                   <div className="flex items-center border border-border">
//                     <button
//                       onClick={() => update(id, finish, qty - 1)}
//                       className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 transition-colors text-lg"
//                     >
//                       −
//                     </button>
//                     <span className="w-10 text-center text-sm font-medium">{qty}</span>
//                     <button
//                       onClick={() => update(id, finish, qty + 1)}
//                       className="w-8 h-8 flex items-center justify-center hover:bg-primary/10 transition-colors text-lg"
//                     >
//                       +
//                     </button>
//                   </div>

//                   <button
//                     onClick={() => remove(id, finish)}
//                     className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* QUOTE PANEL */}
//           <div className="lg:sticky lg:top-28 self-start">
//             <div className="bg-surface border border-border p-6">
//               <h2 className="font-display text-2xl mb-5">GET QUOTE</h2>

//               <div className="space-y-2 text-sm border-b border-border pb-5 mb-5">
//                 {items.map(({ id, name, finish, qty }) => (
//                   <div key={id + (finish ?? "")} className="flex justify-between gap-2">
//                     <span className="text-muted-foreground truncate">{name}</span>
//                     <span className="shrink-0 text-foreground">×{qty}</span>
//                   </div>
//                 ))}
//               </div>

//               <p className="text-xs text-muted-foreground mb-5 leading-relaxed">
//                 Clicking below will open WhatsApp with your selected items pre-filled. Our team will get back to you with pricing and availability.
//               </p>

//               <button
//                 onClick={handleGetQuote}
//                 className="w-full bg-whatsapp text-white py-4 font-semibold uppercase tracking-widest hover:bg-whatsapp-dark transition-colors flex items-center justify-center gap-2"
//               >
//                 <span className="text-xl">💬</span> Get Quote on WhatsApp
//               </button>

//               <p className="text-[10px] text-muted-foreground text-center mt-3">
//                 Pricing will be confirmed by our team directly.
//               </p>
//             </div>
//           </div>

//         </div>
//       </section>
//     </>
//   );
// }
