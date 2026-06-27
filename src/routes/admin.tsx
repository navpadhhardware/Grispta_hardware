// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { supabase, type ProductOverride } from "@/lib/supabase";
// import { PRODUCTS } from "@/lib/products";

// export const Route = createFileRoute("/admin")({
//   head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
//   component: AdminPage,
// });

// const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

// const CATEGORIES = [
//   "Hinges",
//   "Handles",
//   "Locks",
//   "Channels",
//   "Brackets",
//   "Fasteners",
//   "Other",
// ];

// type LocalProduct = ProductOverride & {
//   categoryLabel?: string;
//   isCustom?: boolean;
// };

// const emptyNew = (): Partial<LocalProduct> => ({
//   name: "",
//   short_spec: "",
//   description: "",
//   image_url: "",
//   in_stock: true,
//   visible: true,
//   categoryLabel: "Other",
//   isCustom: true,
// });

// function AdminPage() {
//   const [authed, setAuthed] = useState(false);
//   const [pw, setPw] = useState("");
//   const [error, setError] = useState("");

//   // existing product overrides from supabase
//   const [overrides, setOverrides] = useState<Record<string, LocalProduct>>({});

//   // custom products (added via admin, not in PRODUCTS array)
//   const [customProducts, setCustomProducts] = useState<LocalProduct[]>([]);

//   const [saving, setSaving] = useState<string | null>(null);
//   const [saved, setSaved] = useState<string | null>(null);
//   const [deleting, setDeleting] = useState<string | null>(null);

//   // "Add new product" drawer state
//   const [showAddForm, setShowAddForm] = useState(false);
//   const [newProduct, setNewProduct] = useState<Partial<LocalProduct>>(emptyNew());
//   const [addError, setAddError] = useState("");
//   const [adding, setAdding] = useState(false);

//   // Expanded cards
//   const [expanded, setExpanded] = useState<Record<string, boolean>>({});

//   useEffect(() => {
//     if (!authed) return;
//     supabase.from("products_override").select("*").then(({ data }) => {
//       if (data) {
//         const map: Record<string, LocalProduct> = {};
//         const knownIds = new Set(PRODUCTS.map((p) => p.id));
//         const customs: LocalProduct[] = [];

//         data.forEach((d) => {
//           if (knownIds.has(d.id)) {
//             map[d.id] = d;
//           } else {
//             customs.push({ ...d, isCustom: true });
//           }
//         });

//         setOverrides(map);
//         setCustomProducts(customs);
//       }
//     });
//   }, [authed]);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (pw === ADMIN_PASSWORD) {
//       setAuthed(true);
//       setError("");
//     } else {
//       setError("Wrong password.");
//     }
//   };

//   const getField = (id: string, field: keyof ProductOverride, fallback: any) =>
//     overrides[id]?.[field] ?? fallback;

//   const setField = (id: string, field: keyof ProductOverride, value: any) => {
//     setOverrides((prev) => ({
//       ...prev,
//       [id]: { ...prev[id], id, in_stock: true, visible: true, ...prev[id], [field]: value },
//     }));
//   };

//   const setCustomField = (id: string, field: keyof LocalProduct, value: any) => {
//     setCustomProducts((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
//     );
//   };

//   const handleSave = async (id: string) => {
//     setSaving(id);
//     const product = PRODUCTS.find((p) => p.id === id);
//     const o = overrides[id] ?? { id };
//     const payload = {
//       id,
//       name: o.name ?? product?.name ?? "",
//       short_spec: o.short_spec ?? product?.shortSpec ?? "",
//       description: o.description ?? product?.description ?? "",
//       in_stock: o.in_stock ?? true,
//       image_url: o.image_url ?? null,
//       visible: o.visible ?? true,
//       updated_at: new Date().toISOString(),
//     };
//     await supabase.from("products_override").upsert(payload);
//     setSaving(null);
//     setSaved(id);
//     setTimeout(() => setSaved(null), 2000);
//   };

//   const handleSaveCustom = async (p: LocalProduct) => {
//     setSaving(p.id);
//     const payload = {
//       id: p.id,
//       name: p.name ?? "",
//       short_spec: p.short_spec ?? "",
//       description: p.description ?? "",
//       in_stock: p.in_stock ?? true,
//       image_url: p.image_url ?? null,
//       visible: p.visible ?? true,
//       updated_at: new Date().toISOString(),
//     };
//     await supabase.from("products_override").upsert(payload);
//     setSaving(null);
//     setSaved(p.id);
//     setTimeout(() => setSaved(null), 2000);
//   };

//   const handleDeleteCustom = async (id: string) => {
//     if (!confirm("Remove this product? This cannot be undone.")) return;
//     setDeleting(id);
//     await supabase.from("products_override").delete().eq("id", id);
//     setCustomProducts((prev) => prev.filter((p) => p.id !== id));
//     setDeleting(null);
//   };

//   const handleAddProduct = async () => {
//     if (!newProduct.name?.trim()) {
//       setAddError("Product name is required.");
//       return;
//     }
//     setAdding(true);
//     setAddError("");
//     const id = `custom_${Date.now()}`;
//     const payload = {
//       id,
//       name: newProduct.name!.trim(),
//       short_spec: newProduct.short_spec?.trim() ?? "",
//       description: newProduct.description?.trim() ?? "",
//       in_stock: newProduct.in_stock ?? true,
//       image_url: newProduct.image_url?.trim() || null,
//       visible: newProduct.visible ?? true,
//       updated_at: new Date().toISOString(),
//     };
//     await supabase.from("products_override").upsert(payload);
//     setCustomProducts((prev) => [...prev, { ...payload, isCustom: true, categoryLabel: newProduct.categoryLabel }]);
//     setAdding(false);
//     setShowAddForm(false);
//     setNewProduct(emptyNew());
//   };

//   const toggleExpand = (id: string) =>
//     setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

//   // ─── Login Screen ───────────────────────────────────────────────────────────
//   if (!authed) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="w-full max-w-sm">
//           <span className="label-accent">Admin Access</span>
//           <h1 className="font-display text-4xl mt-2 mb-8">GRIPSTA ADMIN</h1>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input
//               type="password"
//               placeholder="Enter password"
//               value={pw}
//               onChange={(e) => setPw(e.target.value)}
//               className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary"
//             />
//             {error && <p className="text-xs text-red-500">{error}</p>}
//             <button className="btn-primary w-full justify-center">Enter →</button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   // ─── Admin Panel ────────────────────────────────────────────────────────────
//   const allProducts = [
//     ...PRODUCTS.map((p) => ({ ...p, isCustom: false })),
//     ...customProducts.map((p) => ({ id: p.id, name: p.name ?? "", categoryLabel: p.categoryLabel ?? "Custom", shortSpec: p.short_spec ?? "", description: p.description ?? "", isCustom: true, _custom: p })),
//   ];

//   return (
//     <>
//       {/* Header */}
//       <section className="pt-32 pb-10">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10 flex items-end justify-between gap-4 flex-wrap">
//           <div>
//             <span className="label-accent">Admin Panel</span>
//             <h1 className="font-display text-5xl mt-1">MANAGE PRODUCTS</h1>
//             <p className="text-muted-foreground text-sm mt-2">
//               {allProducts.length} products · Changes reflect live on the site.
//             </p>
//           </div>
//           <button
//             onClick={() => { setShowAddForm(true); setNewProduct(emptyNew()); setAddError(""); }}
//             className="btn-primary flex items-center gap-2 px-6 py-3"
//           >
//             <span className="text-lg leading-none">+</span> Add Product
//           </button>
//         </div>
//       </section>

//       {/* Add Product Drawer / Modal */}
//       {showAddForm && (
//         <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4">
//           <div className="bg-surface border border-border w-full max-w-lg p-6 sm:p-8 space-y-5 relative">
//             <button
//               onClick={() => setShowAddForm(false)}
//               className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl leading-none"
//             >
//               ✕
//             </button>

//             <div>
//               <span className="label-accent">New Product</span>
//               <h2 className="font-display text-2xl mt-1">Add to Catalogue</h2>
//             </div>

//             {/* Name — required */}
//             <div>
//               <label className="label-accent block mb-1">
//                 Product Name <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="e.g. Heavy Duty Butt Hinge"
//                 value={newProduct.name ?? ""}
//                 onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
//                 className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
//               />
//             </div>

//             {/* Category */}
//             <div>
//               <label className="label-accent block mb-1">Category</label>
//               <select
//                 value={newProduct.categoryLabel ?? "Other"}
//                 onChange={(e) => setNewProduct((p) => ({ ...p, categoryLabel: e.target.value }))}
//                 className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
//               >
//                 {CATEGORIES.map((c) => (
//                   <option key={c} value={c}>{c}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Short spec */}
//             <div>
//               <label className="label-accent block mb-1">Short Spec</label>
//               <input
//                 type="text"
//                 placeholder="e.g. 100mm · SS304 · 2 per pack"
//                 value={newProduct.short_spec ?? ""}
//                 onChange={(e) => setNewProduct((p) => ({ ...p, short_spec: e.target.value }))}
//                 className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
//               />
//             </div>

//             {/* Image URL */}
//             <div>
//               <label className="label-accent block mb-1">Image URL</label>
//               <input
//                 type="text"
//                 placeholder="https://..."
//                 value={newProduct.image_url ?? ""}
//                 onChange={(e) => setNewProduct((p) => ({ ...p, image_url: e.target.value }))}
//                 className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
//               />
//             </div>

//             {/* Toggles */}
//             <div className="flex gap-8">
//               <ToggleField
//                 label="In Stock"
//                 value={newProduct.in_stock ?? true}
//                 onChange={(v) => setNewProduct((p) => ({ ...p, in_stock: v }))}
//               />
//               <ToggleField
//                 label="Visible"
//                 value={newProduct.visible ?? true}
//                 onChange={(v) => setNewProduct((p) => ({ ...p, visible: v }))}
//               />
//             </div>

//             {addError && <p className="text-xs text-red-500">{addError}</p>}

//             <div className="flex gap-3 pt-2">
//               <button
//                 onClick={() => setShowAddForm(false)}
//                 className="flex-1 border border-border px-4 py-2.5 text-sm hover:bg-surface transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleAddProduct}
//                 disabled={adding}
//                 className="btn-primary flex-1 justify-center"
//               >
//                 {adding ? "Adding..." : "Add Product →"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Product List */}
//       <section className="pb-24">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-3">
//           {allProducts.map((p) => {
//             const isCustom = p.isCustom;
//             const customData = isCustom ? (p as any)._custom as LocalProduct : null;
//             const id = p.id;
//             const isExpanded = !!expanded[id];
//             const isSaving = saving === id;
//             const isSaved = saved === id;
//             const isDeleting = deleting === id;

//             // helpers per row
//             const gf = isCustom
//               ? (field: keyof LocalProduct, fallback: any) => customData?.[field] ?? fallback
//               : (field: keyof ProductOverride, fallback: any) => getField(id, field, fallback);

//             const sf = isCustom
//               ? (field: keyof LocalProduct, value: any) => setCustomField(id, field, value)
//               : (field: keyof ProductOverride, value: any) => setField(id, field, value);

//             return (
//               <div key={id} className="bg-surface border border-border">
//                 {/* Collapsed row — always visible */}
//                 <div
//                   className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
//                   onClick={() => toggleExpand(id)}
//                 >
//                   {/* Status dots */}
//                   <div className="flex gap-1.5 shrink-0">
//                     <span
//                       title="In Stock"
//                       className={`w-2 h-2 rounded-full ${gf("in_stock", true) ? "bg-green-500" : "bg-border"}`}
//                     />
//                     <span
//                       title="Visible"
//                       className={`w-2 h-2 rounded-full ${gf("visible", true) ? "bg-primary" : "bg-border"}`}
//                     />
//                   </div>

//                   {/* Name + category */}
//                   <div className="flex-1 min-w-0">
//                     <span className="font-medium text-sm truncate block">
//                       {gf("name", p.name)}
//                     </span>
//                     <span className="text-xs text-muted-foreground">{p.categoryLabel}</span>
//                   </div>

//                   {/* Quick toggles (no expand needed) */}
//                   <div className="flex items-center gap-4 shrink-0" onClick={(e) => e.stopPropagation()}>
//                     <MiniToggle
//                       label="Stock"
//                       value={gf("in_stock", true) as boolean}
//                       onChange={(v) => sf("in_stock" as any, v)}
//                     />
//                     <MiniToggle
//                       label="Show"
//                       value={gf("visible", true) as boolean}
//                       onChange={(v) => sf("visible" as any, v)}
//                     />
//                     <button
//                       onClick={() => isCustom ? handleSaveCustom(customData!) : handleSave(id)}
//                       disabled={isSaving}
//                       className={`text-xs px-4 py-1.5 border transition-colors ${
//                         isSaved
//                           ? "border-green-600 text-green-600"
//                           : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
//                       }`}
//                     >
//                       {isSaving ? "…" : isSaved ? "✓" : "Save"}
//                     </button>
//                     {isCustom && (
//                       <button
//                         onClick={() => handleDeleteCustom(id)}
//                         disabled={isDeleting}
//                         className="text-xs px-3 py-1.5 border border-red-500/40 text-red-500 hover:bg-red-500/10 transition-colors"
//                       >
//                         {isDeleting ? "…" : "✕"}
//                       </button>
//                     )}
//                   </div>

//                   {/* Chevron */}
//                   <span className={`text-muted-foreground text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>
//                     ▾
//                   </span>
//                 </div>

//                 {/* Expanded edit fields */}
//                 {isExpanded && (
//                   <div className="border-t border-border px-5 py-5 space-y-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                       {/* Name */}
//                       <div>
//                         <label className="label-accent block mb-1">Product Name</label>
//                         <input
//                           type="text"
//                           value={gf("name", p.name) as string}
//                           onChange={(e) => sf("name" as any, e.target.value)}
//                           className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
//                         />
//                       </div>

//                       {/* Short spec */}
//                       <div>
//                         <label className="label-accent block mb-1">Short Spec</label>
//                         <input
//                           type="text"
//                           value={gf("short_spec", p.shortSpec) as string}
//                           onChange={(e) => sf("short_spec" as any, e.target.value)}
//                           className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
//                         />
//                       </div>
//                     </div>

//                     {/* Image URL */}
//                     <div>
//                       <label className="label-accent block mb-1">Image URL</label>
//                       <input
//                         type="text"
//                         placeholder="https://..."
//                         value={gf("image_url", "") as string}
//                         onChange={(e) => sf("image_url" as any, e.target.value)}
//                         className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
//                       />
//                     </div>

//                     {/* Save (expanded) */}
//                     <div className="flex justify-end pt-1">
//                       <button
//                         onClick={() => isCustom ? handleSaveCustom(customData!) : handleSave(id)}
//                         disabled={isSaving}
//                         className={`btn-primary text-xs px-8 py-2.5 ${isSaved ? "bg-green-600 border-green-600" : ""}`}
//                       >
//                         {isSaving ? "Saving..." : isSaved ? "✓ Saved" : "Save Changes"}
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//           {/* Empty state */}
//           {allProducts.length === 0 && (
//             <div className="text-center py-20 text-muted-foreground">
//               <p className="text-4xl mb-4">📦</p>
//               <p className="text-sm">No products yet. Add your first one above.</p>
//             </div>
//           )}
//         </div>
//       </section>
//     </>
//   );
// }

// // ─── Small helpers ───────────────────────────────────────────────────────────

// function MiniToggle({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: boolean;
//   onChange: (v: boolean) => void;
// }) {
//   return (
//     <div className="flex flex-col items-center gap-1">
//       <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</span>
//       <button
//         onClick={() => onChange(!value)}
//         className={`w-9 h-5 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}
//       >
//         <span
//           className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
//             value ? "left-[18px]" : "left-0.5"
//           }`}
//         />
//       </button>
//     </div>
//   );
// }

// function ToggleField({
//   label,
//   value,
//   onChange,
// }: {
//   label: string;
//   value: boolean;
//   onChange: (v: boolean) => void;
// }) {
//   return (
//     <div className="flex items-center gap-3">
//       <span className="text-sm text-muted-foreground uppercase tracking-widest">{label}</span>
//       <button
//         onClick={() => onChange(!value)}
//         className={`w-12 h-6 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}
//       >
//         <span
//           className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
//             value ? "left-7" : "left-1"
//           }`}
//         />
//       </button>
//     </div>
//   );
// }



// import { createFileRoute } from "@tanstack/react-router";
// import { useEffect, useState } from "react";
// import { supabase, type ProductOverride } from "@/lib/supabase";
// import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products";

// export const Route = createFileRoute("/admin")({
//   head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
//   component: AdminPage,
// });

// const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

// interface AdminProduct {
//   id: string;
//   name: string;
//   short_spec: string;
//   description: string;
//   image_url: string;
//   in_stock: boolean;
//   visible: boolean;
//   category: Category;
//   categoryLabel: string;
//   isCustom: boolean;
//   isDirty: boolean;
// }

// function mergeProducts(overrides: Record<string, ProductOverride>): AdminProduct[] {
//   const staticProducts: AdminProduct[] = PRODUCTS.map((p) => {
//     const o = overrides[p.id];
//     return {
//       id: p.id,
//       name: o?.name ?? p.name,
//       short_spec: o?.short_spec ?? p.shortSpec,
//       description: o?.description ?? p.description,
//       image_url: o?.image_url ?? "",
//       in_stock: o?.in_stock ?? true,
//       visible: o?.visible ?? true,
//       category: p.category,
//       categoryLabel: p.categoryLabel,
//       isCustom: false,
//       isDirty: false,
//     };
//   });

//   const knownIds = new Set(PRODUCTS.map((p) => p.id));
//   const customProducts: AdminProduct[] = Object.values(overrides)
//     .filter((o) => !knownIds.has(o.id))
//     .map((o) => {
//       // id format: custom_{categoryId}_{timestamp}
//       const parts = o.id.split("_");
//       const categoryId = (parts[1] as Category) ?? "hinges";
//       const cat = CATEGORIES.find((c) => c.id === categoryId);
//       return {
//         id: o.id,
//         name: o.name ?? "",
//         short_spec: o.short_spec ?? "",
//         description: o.description ?? "",
//         image_url: o.image_url ?? "",
//         in_stock: o.in_stock ?? true,
//         visible: o.visible ?? true,
//         category: categoryId,
//         categoryLabel: cat?.label ?? "Custom",
//         isCustom: true,
//         isDirty: false,
//       };
//     });

//   return [...staticProducts, ...customProducts];
// }

// const emptyNewProduct = (category: Category, categoryLabel: string) => ({
//   name: "",
//   short_spec: "",
//   image_url: "",
//   in_stock: true,
//   visible: true,
//   category,
//   categoryLabel,
// });

// function AdminPage() {
//   const [authed, setAuthed] = useState(false);
//   const [pw, setPw] = useState("");
//   const [pwError, setPwError] = useState("");

//   const [products, setProducts] = useState<AdminProduct[]>([]);
//   const [saving, setSaving] = useState<Set<string>>(new Set());
//   const [saved, setSaved] = useState<Set<string>>(new Set());
//   const [deleting, setDeleting] = useState<string | null>(null);

//   const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
//   const [expanded, setExpanded] = useState<Set<string>>(new Set());

//   const [addFor, setAddFor] = useState<Category | null>(null);
//   const [newProduct, setNewProduct] = useState<ReturnType<typeof emptyNewProduct> | null>(null);
//   const [addError, setAddError] = useState("");
//   const [adding, setAdding] = useState(false);

//   useEffect(() => {
//     if (!authed) return;
//     supabase.from("products_override").select("*").then(({ data }) => {
//       const map: Record<string, ProductOverride> = {};
//       (data ?? []).forEach((d) => (map[d.id] = d));
//       setProducts(mergeProducts(map));
//     });
//   }, [authed]);

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(""); }
//     else setPwError("Wrong password.");
//   };

//   if (!authed) {
//     return (
//       <div className="min-h-screen flex items-center justify-center px-4">
//         <div className="w-full max-w-sm">
//           <span className="label-accent">Admin Access</span>
//           <h1 className="font-display text-4xl mt-2 mb-8">GRIPSTA ADMIN</h1>
//           <form onSubmit={handleLogin} className="space-y-4">
//             <input type="password" placeholder="Enter password" value={pw}
//               onChange={(e) => setPw(e.target.value)}
//               className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
//             {pwError && <p className="text-xs text-red-500">{pwError}</p>}
//             <button className="btn-primary w-full justify-center">Enter →</button>
//           </form>
//         </div>
//       </div>
//     );
//   }

//   const updateField = (id: string, field: keyof AdminProduct, value: any) => {
//     setProducts((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, [field]: value, isDirty: true } : p))
//     );
//   };

//   const handleSave = async (product: AdminProduct) => {
//     setSaving((s) => new Set(s).add(product.id));
//     await supabase.from("products_override").upsert({
//       id: product.id,
//       name: product.name,
//       short_spec: product.short_spec,
//       description: product.description,
//       image_url: product.image_url || null,
//       in_stock: product.in_stock,
//       visible: product.visible,
//       updated_at: new Date().toISOString(),
//     });
//     setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, isDirty: false } : p)));
//     setSaving((s) => { const n = new Set(s); n.delete(product.id); return n; });
//     setSaved((s) => new Set(s).add(product.id));
//     setTimeout(() => setSaved((s) => { const n = new Set(s); n.delete(product.id); return n; }), 2000);
//   };

//   const handleDelete = async (id: string) => {
//     if (!confirm("Remove this product? This cannot be undone.")) return;
//     setDeleting(id);
//     await supabase.from("products_override").delete().eq("id", id);
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//     setDeleting(null);
//   };

//   const handleAddProduct = async () => {
//     if (!newProduct?.name?.trim()) { setAddError("Product name is required."); return; }
//     setAdding(true); setAddError("");
//     const id = `custom_${addFor}_${Date.now()}`;
//     const cat = CATEGORIES.find((c) => c.id === addFor)!;
//     await supabase.from("products_override").upsert({
//       id,
//       name: newProduct.name.trim(),
//       short_spec: newProduct.short_spec.trim(),
//       description: "",
//       image_url: newProduct.image_url.trim() || null,
//       in_stock: newProduct.in_stock,
//       visible: newProduct.visible,
//       updated_at: new Date().toISOString(),
//     });
//     setProducts((prev) => [...prev, {
//       id,
//       name: newProduct.name.trim(),
//       short_spec: newProduct.short_spec.trim(),
//       description: "",
//       image_url: newProduct.image_url.trim(),
//       in_stock: newProduct.in_stock,
//       visible: newProduct.visible,
//       category: addFor!,
//       categoryLabel: cat.label,
//       isCustom: true,
//       isDirty: false,
//     }]);
//     setAdding(false); setAddFor(null); setNewProduct(null);
//   };

//   const openAddForm = (cat: Category) => {
//     const catMeta = CATEGORIES.find((c) => c.id === cat)!;
//     setAddFor(cat);
//     setNewProduct(emptyNewProduct(cat, catMeta.label));
//     setAddError("");
//     // uncollapse that category
//     setCollapsed((s) => { const n = new Set(s); n.delete(cat); return n; });
//   };

//   const toggleCollapse = (catId: string) =>
//     setCollapsed((s) => { const n = new Set(s); n.has(catId) ? n.delete(catId) : n.add(catId); return n; });

//   const toggleExpand = (id: string) =>
//     setExpanded((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

//   const totalProducts = products.length;
//   const totalVisible = products.filter((p) => p.visible).length;
//   const totalInStock = products.filter((p) => p.in_stock).length;

//   return (
//     <>
//       <section className="pt-32 pb-10">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10">
//           <span className="label-accent">Admin Panel</span>
//           <h1 className="font-display text-5xl mt-1 mb-4">MANAGE PRODUCTS</h1>
//           <div className="flex gap-6 text-sm text-muted-foreground">
//             <span><strong className="text-foreground">{totalProducts}</strong> products</span>
//             <span><strong className="text-foreground">{totalVisible}</strong> visible</span>
//             <span><strong className="text-green-500">{totalInStock}</strong> in stock</span>
//           </div>
//         </div>
//       </section>

//       <section className="pb-24">
//         <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-4">
//           {CATEGORIES.map((cat) => {
//             const catProducts = products.filter((p) => p.category === cat.id);
//             const isCollapsed = collapsed.has(cat.id);
//             const isAddingHere = addFor === cat.id;
//             const inStockCount = catProducts.filter((p) => p.in_stock).length;

//             return (
//               <div key={cat.id} className="border border-border overflow-hidden">
//                 {/* ── Category header ── */}
//                 <div
//                   className="flex items-center justify-between px-5 py-4 cursor-pointer bg-surface select-none"
//                   onClick={() => toggleCollapse(cat.id)}
//                 >
//                   <div className="flex items-center gap-3">
//                     <span className="text-xl">{cat.icon}</span>
//                     <div>
//                       <h2 className="font-display text-lg leading-tight">{cat.label}</h2>
//                       <p className="text-xs text-muted-foreground">
//                         {catProducts.length} product{catProducts.length !== 1 ? "s" : ""} · {inStockCount} in stock
//                       </p>
//                     </div>
//                   </div>
//                   <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
//                     <button
//                       onClick={() => openAddForm(cat.id)}
//                       className="text-xs px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
//                     >
//                       + Add
//                     </button>
//                     <span
//                       className={`text-muted-foreground text-xs transition-transform duration-200 cursor-pointer ${isCollapsed ? "" : "rotate-180"}`}
//                       onClick={() => toggleCollapse(cat.id)}
//                     >▾</span>
//                   </div>
//                 </div>

//                 {!isCollapsed && (
//                   <div className="divide-y divide-border">
//                     {/* ── Product rows ── */}
//                     {catProducts.map((p) => {
//                       const isSaving = saving.has(p.id);
//                       const isSaved = saved.has(p.id);
//                       const isExp = expanded.has(p.id);

//                       return (
//                         <div key={p.id}>
//                           <div className="flex items-center gap-3 px-5 py-3 bg-background">
//                             {/* Status dots */}
//                             <div className="flex flex-col gap-1 shrink-0">
//                               <span title={p.in_stock ? "In Stock" : "Out of Stock"}
//                                 className={`w-1.5 h-1.5 rounded-full ${p.in_stock ? "bg-green-500" : "bg-border"}`} />
//                               <span title={p.visible ? "Visible" : "Hidden"}
//                                 className={`w-1.5 h-1.5 rounded-full ${p.visible ? "bg-primary" : "bg-border"}`} />
//                             </div>

//                             {/* Inline editable name + spec */}
//                             <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-0.5">
//                               <input
//                                 type="text"
//                                 value={p.name}
//                                 onChange={(e) => updateField(p.id, "name", e.target.value)}
//                                 className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-sm py-0.5 w-full"
//                                 placeholder="Product name"
//                               />
//                               <input
//                                 type="text"
//                                 value={p.short_spec}
//                                 onChange={(e) => updateField(p.id, "short_spec", e.target.value)}
//                                 className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-xs text-muted-foreground py-0.5 w-full"
//                                 placeholder="Short spec"
//                               />
//                             </div>

//                             {/* Controls */}
//                             <div className="flex items-center gap-2 sm:gap-3 shrink-0">
//                               <MiniToggle label="Stock" value={p.in_stock}
//                                 onChange={(v) => updateField(p.id, "in_stock", v)} />
//                               <MiniToggle label="Show" value={p.visible}
//                                 onChange={(v) => updateField(p.id, "visible", v)} />

//                               {/* Image expand */}
//                               <button
//                                 onClick={() => toggleExpand(p.id)}
//                                 title="Edit image URL"
//                                 className={`text-sm px-2 py-1 border transition-colors ${isExp ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary"}`}
//                               >🖼</button>

//                               <button
//                                 onClick={() => handleSave(p)}
//                                 disabled={isSaving}
//                                 className={`text-xs px-4 py-1.5 border transition-colors min-w-[52px] text-center ${
//                                   isSaved ? "border-green-600 text-green-600"
//                                   : p.isDirty ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
//                                   : "border-border text-muted-foreground hover:border-primary hover:text-primary"
//                                 }`}
//                               >
//                                 {isSaving ? "…" : isSaved ? "✓" : "Save"}
//                               </button>

//                               {p.isCustom && (
//                                 <button
//                                   onClick={() => handleDelete(p.id)}
//                                   disabled={deleting === p.id}
//                                   title="Remove product"
//                                   className="text-xs px-2 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
//                                 >✕</button>
//                               )}
//                             </div>
//                           </div>

//                           {/* Image URL row */}
//                           {isExp && (
//                             <div className="px-5 py-3 bg-surface border-t border-border flex items-center gap-3">
//                               <label className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Image URL</label>
//                               <input
//                                 type="text"
//                                 value={p.image_url}
//                                 onChange={(e) => updateField(p.id, "image_url", e.target.value)}
//                                 placeholder="https://..."
//                                 className="flex-1 bg-background border border-border px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
//                               />
//                               {p.image_url && (
//                                 <img src={p.image_url} alt=""
//                                   className="w-10 h-10 object-cover border border-border shrink-0"
//                                   onError={(e) => (e.currentTarget.style.display = "none")} />
//                               )}
//                             </div>
//                           )}
//                         </div>
//                       );
//                     })}

//                     {/* Empty state */}
//                     {catProducts.length === 0 && !isAddingHere && (
//                       <div className="px-5 py-6 text-center text-xs text-muted-foreground bg-background">
//                         No products yet.{" "}
//                         <button onClick={() => openAddForm(cat.id)} className="text-primary underline underline-offset-2">Add one →</button>
//                       </div>
//                     )}

//                     {/* ── Add form (inline at bottom of category) ── */}
//                     {isAddingHere && newProduct && (
//                       <div className="px-5 py-5 bg-surface border-t-2 border-primary space-y-4">
//                         <p className="label-accent text-xs">New {cat.label} Product</p>

//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//                           <div>
//                             <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
//                               Product Name <span className="text-red-400">*</span>
//                             </label>
//                             <input
//                               type="text"
//                               autoFocus
//                               placeholder={`e.g. SS ${cat.label} 75mm`}
//                               value={newProduct.name}
//                               onChange={(e) => setNewProduct((p) => p && ({ ...p, name: e.target.value }))}
//                               className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
//                             />
//                           </div>
//                           <div>
//                             <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Short Spec</label>
//                             <input
//                               type="text"
//                               placeholder="e.g. 100mm · SS304 · 2pc"
//                               value={newProduct.short_spec}
//                               onChange={(e) => setNewProduct((p) => p && ({ ...p, short_spec: e.target.value }))}
//                               className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
//                             />
//                           </div>
//                         </div>

//                         <div>
//                           <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Image URL</label>
//                           <input
//                             type="text"
//                             placeholder="https://..."
//                             value={newProduct.image_url}
//                             onChange={(e) => setNewProduct((p) => p && ({ ...p, image_url: e.target.value }))}
//                             className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
//                           />
//                         </div>

//                         <div className="flex items-center gap-6 flex-wrap">
//                           <ToggleField label="In Stock" value={newProduct.in_stock}
//                             onChange={(v) => setNewProduct((p) => p && ({ ...p, in_stock: v }))} />
//                           <ToggleField label="Visible" value={newProduct.visible}
//                             onChange={(v) => setNewProduct((p) => p && ({ ...p, visible: v }))} />
//                           <div className="flex gap-2 ml-auto">
//                             <button
//                               onClick={() => { setAddFor(null); setNewProduct(null); }}
//                               className="text-xs px-4 py-2 border border-border hover:bg-background transition-colors"
//                             >Cancel</button>
//                             <button
//                               onClick={handleAddProduct}
//                               disabled={adding}
//                               className="btn-primary text-xs px-6 py-2"
//                             >{adding ? "Adding…" : `Add to ${cat.label} →`}</button>
//                           </div>
//                         </div>

//                         {addError && <p className="text-xs text-red-500">{addError}</p>}
//                       </div>
//                     )}
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </section>
//     </>
//   );
// }

// function MiniToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
//   return (
//     <div className="flex flex-col items-center gap-1 shrink-0">
//       <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</span>
//       <button
//         onClick={() => onChange(!value)}
//         className={`w-9 h-5 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}
//       >
//         <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-[18px]" : "left-0.5"}`} />
//       </button>
//     </div>
//   );
// }

// function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
//   return (
//     <div className="flex items-center gap-2.5">
//       <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
//       <button
//         onClick={() => onChange(!value)}
//         className={`w-11 h-6 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}
//       >
//         <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-6" : "left-1"}`} />
//       </button>
//     </div>
//   );
// }





import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type ProductOverride, type DBCategory } from "@/lib/supabase";
import { PRODUCTS, CATEGORIES as FALLBACK_CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
  component: AdminPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

// ─── Types ────────────────────────────────────────────────────────────────────

interface AdminProduct {
  id: string;
  name: string;
  short_spec: string;
  description: string;
  image_url: string;
  in_stock: boolean;
  visible: boolean;
  category: string;
  categoryLabel: string;
  isCustom: boolean;
  isDirty: boolean;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function mergeProducts(
  overrides: Record<string, ProductOverride>,
  categories: DBCategory[]
): AdminProduct[] {
  const catMap = Object.fromEntries(categories.map((c) => [c.id, c]));

  const staticProducts: AdminProduct[] = PRODUCTS.map((p) => {
    const o = overrides[p.id];
    const cat = catMap[p.category];
    return {
      id: p.id,
      name: o?.name ?? p.name,
      short_spec: o?.short_spec ?? p.shortSpec,
      description: o?.description ?? p.description,
      image_url: o?.image_url ?? "",
      in_stock: o?.in_stock ?? true,
      visible: o?.visible ?? true,
      category: p.category,
      categoryLabel: cat?.label ?? p.categoryLabel,
      isCustom: false,
      isDirty: false,
    };
  });

  const knownIds = new Set(PRODUCTS.map((p) => p.id));
  const customProducts: AdminProduct[] = Object.values(overrides)
    .filter((o) => !knownIds.has(o.id))
    .map((o) => {
      const parts = o.id.split("_");
      const categoryId = parts[1] ?? "hinges";
      const cat = catMap[categoryId];
      return {
        id: o.id,
        name: o.name ?? "",
        short_spec: o.short_spec ?? "",
        description: o.description ?? "",
        image_url: o.image_url ?? "",
        in_stock: o.in_stock ?? true,
        visible: o.visible ?? true,
        category: categoryId,
        categoryLabel: cat?.label ?? categoryId,
        isCustom: true,
        isDirty: false,
      };
    });

  return [...staticProducts, ...customProducts];
}

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

// ─── Component ────────────────────────────────────────────────────────────────

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");

  // Data
  const [categories, setCategories] = useState<DBCategory[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // Product states
  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set());
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [addFor, setAddFor] = useState<string | null>(null);
  const [newProduct, setNewProduct] = useState<Partial<AdminProduct> | null>(null);
  const [addProdError, setAddProdError] = useState("");
  const [addingProd, setAddingProd] = useState(false);

  // Category states
  const [activeTab, setActiveTab] = useState<"products" | "categories">("products");
  const [catSaving, setCatSaving] = useState<Set<string>>(new Set());
  const [catSaved, setCatSaved] = useState<Set<string>>(new Set());
  const [catDeleting, setCatDeleting] = useState<string | null>(null);
  const [showAddCat, setShowAddCat] = useState(false);
  const [newCat, setNewCat] = useState({ label: "", icon: "📦", description: "", id: "" });
  const [addCatError, setAddCatError] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [catDirty, setCatDirty] = useState<Set<string>>(new Set());

  // ── Load data ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!authed) return;
    Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("products_override").select("*"),
    ]).then(([catRes, prodRes]) => {
      const cats: DBCategory[] =
        catRes.data && catRes.data.length > 0
          ? catRes.data
          : FALLBACK_CATEGORIES.map((c, i) => ({
              id: c.id, label: c.label, description: c.desc,
              icon: c.icon, sort_order: i + 1, visible: true,
              created_at: "", updated_at: "",
            }));

      const map: Record<string, ProductOverride> = {};
      (prodRes.data ?? []).forEach((d) => (map[d.id] = d));

      setCategories(cats);
      setProducts(mergeProducts(map, cats));
      setLoading(false);
    });
  }, [authed]);

  // ── Login ──────────────────────────────────────────────────────────────────
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(""); }
    else setPwError("Wrong password.");
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <span className="label-accent">Admin Access</span>
          <h1 className="font-display text-4xl mt-2 mb-8">GRIPSTA ADMIN</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="password" placeholder="Enter password" value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
            {pwError && <p className="text-xs text-red-500">{pwError}</p>}
            <button className="btn-primary w-full justify-center">Enter →</button>
          </form>
        </div>
      </div>
    );
  }

  // ── Product mutations ──────────────────────────────────────────────────────
  const updateField = (id: string, field: keyof AdminProduct, value: any) =>
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value, isDirty: true } : p))
    );

  const handleSaveProd = async (product: AdminProduct) => {
    setSaving((s) => new Set(s).add(product.id));
    await supabase.from("products_override").upsert({
      id: product.id, name: product.name, short_spec: product.short_spec,
      description: product.description, image_url: product.image_url || null,
      in_stock: product.in_stock, visible: product.visible,
      updated_at: new Date().toISOString(),
    });
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, isDirty: false } : p));
    setSaving((s) => { const n = new Set(s); n.delete(product.id); return n; });
    setSaved((s) => new Set(s).add(product.id));
    setTimeout(() => setSaved((s) => { const n = new Set(s); n.delete(product.id); return n; }), 2000);
  };

  const handleDeleteProd = async (id: string) => {
    if (!confirm("Remove this product?")) return;
    setDeleting(id);
    await supabase.from("products_override").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const openAddProd = (catId: string) => {
    setAddFor(catId);
    setNewProduct({ name: "", short_spec: "", image_url: "", in_stock: true, visible: true, category: catId });
    setAddProdError("");
    setCollapsed((s) => { const n = new Set(s); n.delete(catId); return n; });
  };

  const handleAddProd = async () => {
    if (!newProduct?.name?.trim()) { setAddProdError("Product name is required."); return; }
    setAddingProd(true); setAddProdError("");
    const id = `custom_${addFor}_${Date.now()}`;
    const cat = categories.find((c) => c.id === addFor);
    await supabase.from("products_override").upsert({
      id, name: newProduct.name!.trim(), short_spec: newProduct.short_spec ?? "",
      description: "", image_url: newProduct.image_url?.trim() || null,
      in_stock: newProduct.in_stock ?? true, visible: newProduct.visible ?? true,
      updated_at: new Date().toISOString(),
    });
    setProducts((prev) => [...prev, {
      id, name: newProduct.name!.trim(), short_spec: newProduct.short_spec ?? "",
      description: "", image_url: newProduct.image_url?.trim() ?? "",
      in_stock: newProduct.in_stock ?? true, visible: newProduct.visible ?? true,
      category: addFor!, categoryLabel: cat?.label ?? addFor!,
      isCustom: true, isDirty: false,
    }]);
    setAddingProd(false); setAddFor(null); setNewProduct(null);
  };

  // ── Category mutations ─────────────────────────────────────────────────────
  const updateCatField = (id: string, field: keyof DBCategory, value: any) => {
    setCategories((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c));
    setCatDirty((s) => new Set(s).add(id));
  };

  const handleSaveCat = async (cat: DBCategory) => {
    setCatSaving((s) => new Set(s).add(cat.id));
    await supabase.from("categories").upsert({
      id: cat.id, label: cat.label, description: cat.description,
      icon: cat.icon, sort_order: cat.sort_order, visible: cat.visible,
      updated_at: new Date().toISOString(),
    });
    setCatDirty((s) => { const n = new Set(s); n.delete(cat.id); return n; });
    setCatSaving((s) => { const n = new Set(s); n.delete(cat.id); return n; });
    setCatSaved((s) => new Set(s).add(cat.id));
    // also update product categoryLabels in local state
    setProducts((prev) => prev.map((p) => p.category === cat.id ? { ...p, categoryLabel: cat.label } : p));
    setTimeout(() => setCatSaved((s) => { const n = new Set(s); n.delete(cat.id); return n; }), 2000);
  };

  const handleDeleteCat = async (id: string) => {
    const prodCount = products.filter((p) => p.category === id).length;
    const msg = prodCount > 0
      ? `This category has ${prodCount} product(s). Deleting it won't remove the products but they'll lose their category. Continue?`
      : "Delete this category?";
    if (!confirm(msg)) return;
    setCatDeleting(id);
    await supabase.from("categories").delete().eq("id", id);
    setCategories((prev) => prev.filter((c) => c.id !== id));
    setCatDeleting(null);
  };

  const handleAddCategory = async () => {
    if (!newCat.label.trim()) { setAddCatError("Category name is required."); return; }
    const id = newCat.id.trim() || slugify(newCat.label);
    if (categories.find((c) => c.id === id)) { setAddCatError(`ID "${id}" already exists.`); return; }
    setAddingCat(true); setAddCatError("");
    const maxOrder = Math.max(0, ...categories.map((c) => c.sort_order));
    const payload: DBCategory = {
      id, label: newCat.label.trim(), description: newCat.description.trim(),
      icon: newCat.icon || "📦", sort_order: maxOrder + 1, visible: true,
      created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
    };
    await supabase.from("categories").upsert(payload);
    setCategories((prev) => [...prev, payload]);
    setAddingCat(false);
    setShowAddCat(false);
    setNewCat({ label: "", icon: "📦", description: "", id: "" });
    // switch to products tab so admin can immediately add products to new category
    setActiveTab("products");
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const totalVisible = products.filter((p) => p.visible).length;
  const totalInStock = products.filter((p) => p.in_stock).length;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-8">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Admin Panel</span>
          <h1 className="font-display text-5xl mt-1 mb-4">GRIPSTA ADMIN</h1>
          <div className="flex gap-6 text-sm text-muted-foreground mb-6">
            <span><strong className="text-foreground">{products.length}</strong> products</span>
            <span><strong className="text-foreground">{totalVisible}</strong> visible</span>
            <span><strong className="text-green-500">{totalInStock}</strong> in stock</span>
            <span><strong className="text-foreground">{categories.length}</strong> categories</span>
          </div>

          {/* Tabs */}
          <div className="flex gap-0 border-b border-border">
            {(["products", "categories"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 text-sm capitalize transition-colors border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-primary text-primary font-medium"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab === "products" ? `Products (${products.length})` : `Categories (${categories.length})`}
              </button>
            ))}
          </div>
        </div>
      </section>

      {loading ? (
        <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12 text-muted-foreground text-sm">Loading…</div>
      ) : activeTab === "products" ? (
        // ════════════════════ PRODUCTS TAB ════════════════════
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-4">
            {categories.map((cat) => {
              const catProducts = products.filter((p) => p.category === cat.id);
              const isCollapsed = collapsed.has(cat.id);
              const isAddingHere = addFor === cat.id;
              const inStockCount = catProducts.filter((p) => p.in_stock).length;

              return (
                <div key={cat.id} className="border border-border overflow-hidden">
                  {/* Category header */}
                  <div
                    className="flex items-center justify-between px-5 py-4 cursor-pointer bg-surface select-none"
                    onClick={() => setCollapsed((s) => { const n = new Set(s); n.has(cat.id) ? n.delete(cat.id) : n.add(cat.id); return n; })}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{cat.icon}</span>
                      <div>
                        <div className="flex items-center gap-2">
                          <h2 className="font-display text-lg leading-tight">{cat.label}</h2>
                          {!cat.visible && (
                            <span className="text-[10px] border border-border text-muted-foreground px-1.5 py-0.5">Hidden</span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {catProducts.length} product{catProducts.length !== 1 ? "s" : ""} · {inStockCount} in stock
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => openAddProd(cat.id)}
                        className="text-xs px-4 py-1.5 border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
                      >+ Add</button>
                      <span className={`text-muted-foreground text-xs transition-transform duration-200 ${isCollapsed ? "" : "rotate-180"}`}>▾</span>
                    </div>
                  </div>

                  {!isCollapsed && (
                    <div className="divide-y divide-border">
                      {catProducts.map((p) => {
                        const isSaving = saving.has(p.id);
                        const isSaved = saved.has(p.id);
                        const isExp = expanded.has(p.id);

                        return (
                          <div key={p.id}>
                            <div className="flex items-center gap-3 px-5 py-3 bg-background">
                              {/* Status dots */}
                              <div className="flex flex-col gap-1 shrink-0">
                                <span title={p.in_stock ? "In Stock" : "Out of Stock"}
                                  className={`w-1.5 h-1.5 rounded-full ${p.in_stock ? "bg-green-500" : "bg-border"}`} />
                                <span title={p.visible ? "Visible" : "Hidden"}
                                  className={`w-1.5 h-1.5 rounded-full ${p.visible ? "bg-primary" : "bg-border"}`} />
                              </div>

                              {/* Inline editable fields */}
                              <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <input type="text" value={p.name}
                                  onChange={(e) => updateField(p.id, "name", e.target.value)}
                                  className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-sm py-0.5 w-full"
                                  placeholder="Product name" />
                                <input type="text" value={p.short_spec}
                                  onChange={(e) => updateField(p.id, "short_spec", e.target.value)}
                                  className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-xs text-muted-foreground py-0.5 w-full"
                                  placeholder="Short spec" />
                              </div>

                              {/* Controls */}
                              <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                                <MiniToggle label="Stock" value={p.in_stock} onChange={(v) => updateField(p.id, "in_stock", v)} />
                                <MiniToggle label="Show" value={p.visible} onChange={(v) => updateField(p.id, "visible", v)} />
                                <button
                                  onClick={() => setExpanded((s) => { const n = new Set(s); n.has(p.id) ? n.delete(p.id) : n.add(p.id); return n; })}
                                  title="Edit image URL"
                                  className={`text-sm px-2 py-1 border transition-colors ${isExp ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary"}`}
                                >🖼</button>
                                <button
                                  onClick={() => handleSaveProd(p)} disabled={isSaving}
                                  className={`text-xs px-4 py-1.5 border transition-colors min-w-[52px] text-center ${
                                    isSaved ? "border-green-600 text-green-600"
                                    : p.isDirty ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                                    : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                                  }`}
                                >{isSaving ? "…" : isSaved ? "✓" : "Save"}</button>
                                {p.isCustom && (
                                  <button onClick={() => handleDeleteProd(p.id)} disabled={deleting === p.id}
                                    className="text-xs px-2 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                                    title="Remove product"
                                  >✕</button>
                                )}
                              </div>
                            </div>

                            {/* Image URL row */}
                            {isExp && (
                              <div className="px-5 py-3 bg-surface border-t border-border flex items-center gap-3">
                                <label className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Image URL</label>
                                <input type="text" value={p.image_url}
                                  onChange={(e) => updateField(p.id, "image_url", e.target.value)}
                                  placeholder="https://..."
                                  className="flex-1 bg-background border border-border px-3 py-1.5 text-xs focus:outline-none focus:border-primary" />
                                {p.image_url && (
                                  <img src={p.image_url} alt="" className="w-10 h-10 object-cover border border-border shrink-0"
                                    onError={(e) => (e.currentTarget.style.display = "none")} />
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Empty state */}
                      {catProducts.length === 0 && !isAddingHere && (
                        <div className="px-5 py-6 text-center text-xs text-muted-foreground bg-background">
                          No products yet.{" "}
                          <button onClick={() => openAddProd(cat.id)} className="text-primary underline underline-offset-2">Add one →</button>
                        </div>
                      )}

                      {/* Add product form */}
                      {isAddingHere && newProduct && (
                        <div className="px-5 py-5 bg-surface border-t-2 border-primary space-y-4">
                          <p className="label-accent text-xs">New {cat.label} Product</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
                                Product Name <span className="text-red-400">*</span>
                              </label>
                              <input autoFocus type="text" placeholder={`e.g. SS ${cat.label} 75mm`}
                                value={newProduct.name ?? ""}
                                onChange={(e) => setNewProduct((p) => p && ({ ...p, name: e.target.value }))}
                                className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                            <div>
                              <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Short Spec</label>
                              <input type="text" placeholder="e.g. 100mm · SS304 · 2pc"
                                value={newProduct.short_spec ?? ""}
                                onChange={(e) => setNewProduct((p) => p && ({ ...p, short_spec: e.target.value }))}
                                className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                            </div>
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Image URL</label>
                            <input type="text" placeholder="https://..."
                              value={newProduct.image_url ?? ""}
                              onChange={(e) => setNewProduct((p) => p && ({ ...p, image_url: e.target.value }))}
                              className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                          </div>
                          <div className="flex items-center gap-6 flex-wrap">
                            <ToggleField label="In Stock" value={newProduct.in_stock ?? true}
                              onChange={(v) => setNewProduct((p) => p && ({ ...p, in_stock: v }))} />
                            <ToggleField label="Visible" value={newProduct.visible ?? true}
                              onChange={(v) => setNewProduct((p) => p && ({ ...p, visible: v }))} />
                            <div className="flex gap-2 ml-auto">
                              <button onClick={() => { setAddFor(null); setNewProduct(null); }}
                                className="text-xs px-4 py-2 border border-border hover:bg-background transition-colors">Cancel</button>
                              <button onClick={handleAddProd} disabled={addingProd}
                                className="btn-primary text-xs px-6 py-2">
                                {addingProd ? "Adding…" : `Add to ${cat.label} →`}
                              </button>
                            </div>
                          </div>
                          {addProdError && <p className="text-xs text-red-500">{addProdError}</p>}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ) : (
        // ════════════════════ CATEGORIES TAB ════════════════════
        <section className="pb-24">
          <div className="max-w-5xl mx-auto px-6 lg:px-10">
            {/* Add category button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => { setShowAddCat(true); setNewCat({ label: "", icon: "📦", description: "", id: "" }); setAddCatError(""); }}
                className="btn-primary flex items-center gap-2 px-6 py-2.5"
              >
                <span className="text-lg leading-none">+</span> New Category
              </button>
            </div>

            {/* Add category form */}
            {showAddCat && (
              <div className="border border-primary bg-surface p-6 mb-4 space-y-4">
                <p className="label-accent text-xs">New Category</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Icon */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Icon (emoji)</label>
                    <input type="text" placeholder="📦"
                      value={newCat.icon}
                      onChange={(e) => setNewCat((p) => ({ ...p, icon: e.target.value }))}
                      className="w-full bg-background border border-border px-3 py-2 text-xl text-center focus:outline-none focus:border-primary" />
                  </div>
                  {/* Label */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
                      Category Name <span className="text-red-400">*</span>
                    </label>
                    <input autoFocus type="text" placeholder="e.g. Drawer Locks"
                      value={newCat.label}
                      onChange={(e) => setNewCat((p) => ({ ...p, label: e.target.value, id: slugify(e.target.value) }))}
                      className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                  </div>
                  {/* ID (auto-filled, editable) */}
                  <div>
                    <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">ID (auto-generated)</label>
                    <input type="text" placeholder="drawer-locks"
                      value={newCat.id}
                      onChange={(e) => setNewCat((p) => ({ ...p, id: slugify(e.target.value) }))}
                      className="w-full bg-background border border-border px-3 py-2 text-sm text-muted-foreground focus:outline-none focus:border-primary" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Description</label>
                  <input type="text" placeholder="Short description shown on the products page"
                    value={newCat.description}
                    onChange={(e) => setNewCat((p) => ({ ...p, description: e.target.value }))}
                    className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary" />
                </div>
                {addCatError && <p className="text-xs text-red-500">{addCatError}</p>}
                <div className="flex gap-2 justify-end">
                  <button onClick={() => setShowAddCat(false)}
                    className="text-xs px-4 py-2 border border-border hover:bg-background transition-colors">Cancel</button>
                  <button onClick={handleAddCategory} disabled={addingCat}
                    className="btn-primary text-xs px-6 py-2">
                    {addingCat ? "Creating…" : "Create Category →"}
                  </button>
                </div>
              </div>
            )}

            {/* Category list */}
            <div className="space-y-2">
              {categories.map((cat) => {
                const prodCount = products.filter((p) => p.category === cat.id).length;
                const isSaving = catSaving.has(cat.id);
                const isSaved = catSaved.has(cat.id);
                const isDirty = catDirty.has(cat.id);

                return (
                  <div key={cat.id} className="border border-border bg-surface">
                    <div className="flex items-center gap-3 px-5 py-3">
                      {/* Icon edit */}
                      <input
                        type="text"
                        value={cat.icon}
                        onChange={(e) => updateCatField(cat.id, "icon", e.target.value)}
                        className="w-10 text-center text-xl bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none"
                        title="Icon (emoji)"
                      />

                      {/* Label + description */}
                      <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                        <input type="text" value={cat.label}
                          onChange={(e) => updateCatField(cat.id, "label", e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-sm font-medium py-0.5 w-full"
                          placeholder="Category name" />
                        <input type="text" value={cat.description}
                          onChange={(e) => updateCatField(cat.id, "description", e.target.value)}
                          className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-xs text-muted-foreground py-0.5 w-full"
                          placeholder="Short description" />
                      </div>

                      {/* Product count badge */}
                      <span className="text-xs text-muted-foreground shrink-0 hidden sm:block">
                        {prodCount} product{prodCount !== 1 ? "s" : ""}
                      </span>

                      {/* Visible toggle */}
                      <MiniToggle label="Show" value={cat.visible}
                        onChange={(v) => updateCatField(cat.id, "visible", v)} />

                      {/* Sort order */}
                      <div className="flex flex-col items-center shrink-0">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground mb-1">Order</span>
                        <input type="number"
                          value={cat.sort_order}
                          onChange={(e) => updateCatField(cat.id, "sort_order", Number(e.target.value))}
                          className="w-12 text-center bg-background border border-border text-xs py-1 focus:outline-none focus:border-primary"
                        />
                      </div>

                      {/* Save */}
                      <button onClick={() => handleSaveCat(cat)} disabled={isSaving}
                        className={`text-xs px-4 py-1.5 border transition-colors min-w-[52px] text-center ${
                          isSaved ? "border-green-600 text-green-600"
                          : isDirty ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >{isSaving ? "…" : isSaved ? "✓" : "Save"}</button>

                      {/* Delete */}
                      <button onClick={() => handleDeleteCat(cat.id)} disabled={catDeleting === cat.id}
                        className="text-xs px-2 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete category"
                      >{catDeleting === cat.id ? "…" : "✕"}</button>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Tip: Change <strong>Order</strong> number to reorder categories on the site. Lower = first.
            </p>
          </div>
        </section>
      )}
    </>
  );
}

// ─── Shared UI helpers ────────────────────────────────────────────────────────

function MiniToggle({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex flex-col items-center gap-1 shrink-0">
      <span className="text-[9px] uppercase tracking-widest text-muted-foreground">{label}</span>
      <button onClick={() => onChange(!value)}
        className={`w-9 h-5 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}>
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-[18px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function ToggleField({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="text-xs text-muted-foreground uppercase tracking-widest">{label}</span>
      <button onClick={() => onChange(!value)}
        className={`w-11 h-6 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}>
        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${value ? "left-6" : "left-1"}`} />
      </button>
    </div>
  );
}
