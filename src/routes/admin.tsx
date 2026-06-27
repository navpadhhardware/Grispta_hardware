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
import { supabase } from "@/lib/supabase";
import { PRODUCTS, CATEGORIES } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
  component: AdminPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

interface CustomProduct {
  id: string;
  name: string;
  category: string;
  category_label: string;
  image_url: string;
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  // Existing product image URLs
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);

  // New product form
  const [newProduct, setNewProduct] = useState<CustomProduct>({
    id: "", name: "", category: CATEGORIES[0].id, category_label: CATEGORIES[0].label, image_url: "",
  });
  const [adding, setAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState("");

  // Custom products list
  const [customProducts, setCustomProducts] = useState<any[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    if (!authed) return;
    loadData();
  }, [authed]);

  const loadData = async () => {
    const { data } = await supabase.from("products_override").select("*");
    if (data) {
      const urls: Record<string, string> = {};
      data.forEach((d) => { if (!d.is_custom) urls[d.id] = d.image_url ?? ""; });
      setImageUrls(urls);
      setCustomProducts(data.filter((d) => d.is_custom));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setError(""); }
    else setError("Wrong password.");
  };

  const handleSaveImage = async (productId: string) => {
    setSaving(productId);
    await supabase.from("products_override").upsert({
      id: productId,
      name: PRODUCTS.find(p => p.id === productId)?.name ?? productId,
      category: PRODUCTS.find(p => p.id === productId)?.category ?? "",
      image_url: imageUrls[productId] ?? null,
      is_custom: false,
      visible: true,
      updated_at: new Date().toISOString(),
    });
    setSaving(null);
    setSaved(productId);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name.trim()) return;
    setAdding(true);
    const id = `custom-${Date.now()}`;
    const catInfo = CATEGORIES.find(c => c.id === newProduct.category);
    await supabase.from("products_override").insert({
      id,
      name: newProduct.name.trim(),
      category: newProduct.category,
      category_label: catInfo?.label ?? newProduct.category,
      image_url: newProduct.image_url || null,
      is_custom: true,
      visible: true,
      updated_at: new Date().toISOString(),
    });
    setAdding(false);
    setAddedMsg(`✓ "${newProduct.name}" added to ${catInfo?.label}`);
    setTimeout(() => setAddedMsg(""), 3000);
    setNewProduct({ id: "", name: "", category: CATEGORIES[0].id, category_label: CATEGORIES[0].label, image_url: "" });
    loadData();
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    await supabase.from("products_override").delete().eq("id", id);
    setDeletingId(null);
    loadData();
  };

  const handleUpdateCustomImage = async (id: string, imageUrl: string) => {
    await supabase.from("products_override").update({ image_url: imageUrl }).eq("id", id);
    loadData();
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <span className="label-accent">Admin Access</span>
          <h1 className="font-display text-4xl mt-2 mb-8">GRIPSTA ADMIN</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary"
            />
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button className="btn-primary w-full justify-center">Enter →</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-w-6xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Admin Panel</span>
          <h1 className="font-display text-5xl mt-2">MANAGE PRODUCTS</h1>
        </div>
      </section>

      <section className="pb-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-10 space-y-12">

          {/* ── ADD NEW PRODUCT ── */}
          <div>
            <span className="label-accent">Add New Product</span>
            <h2 className="font-display text-3xl mt-1 mb-6">NEW PRODUCT</h2>
            <form onSubmit={handleAddProduct} className="bg-surface border border-border p-6 space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label className="label-accent block mb-2">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. SS Butt Hinge 75mm"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(p => ({ ...p, name: e.target.value }))}
                    className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="label-accent block mb-2">Category *</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => {
                      const cat = CATEGORIES.find(c => c.id === e.target.value);
                      setNewProduct(p => ({ ...p, category: e.target.value, category_label: cat?.label ?? e.target.value }));
                    }}
                    className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
                  >
                    {CATEGORIES.map(c => (
                      <option key={c.id} value={c.id}>{c.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="label-accent block mb-2">Image URL <span className="text-muted-foreground normal-case tracking-normal">(optional — paste later)</span></label>
                <input
                  type="text"
                  placeholder="https://... leave empty for now"
                  value={newProduct.image_url}
                  onChange={(e) => setNewProduct(p => ({ ...p, image_url: e.target.value }))}
                  className="w-full bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={adding}
                  className="btn-primary px-8"
                >
                  {adding ? "Adding..." : "Add Product →"}
                </button>
                {addedMsg && (
                  <span className="text-sm text-green-500 font-medium">{addedMsg}</span>
                )}
              </div>
            </form>
          </div>

          {/* ── CUSTOM PRODUCTS LIST ── */}
          {customProducts.length > 0 && (
            <div>
              <span className="label-accent">Admin Added Products</span>
              <h2 className="font-display text-3xl mt-1 mb-6">CUSTOM PRODUCTS</h2>
              <div className="space-y-3">
                {customProducts.map((p) => (
                  <div key={p.id} className="bg-surface border border-border p-5 flex gap-4 items-center flex-wrap">
                    <div className="flex-1 min-w-0">
                      <span className="label-accent">{p.category_label}</span>
                      <h3 className="font-display text-lg mt-0.5">{p.name}</h3>
                    </div>

                    {/* Image URL for custom product */}
                    <input
                      type="text"
                      placeholder="Paste image URL here"
                      defaultValue={p.image_url ?? ""}
                      onBlur={(e) => handleUpdateCustomImage(p.id, e.target.value)}
                      className="flex-1 min-w-[200px] bg-background border border-border px-3 py-2 text-xs focus:outline-none focus:border-primary"
                    />

                    <button
                      onClick={() => handleDelete(p.id)}
                      disabled={deletingId === p.id}
                      className="text-xs text-muted-foreground hover:text-red-500 uppercase tracking-widest transition-colors shrink-0"
                    >
                      {deletingId === p.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── EXISTING PRODUCTS — IMAGE URLS ── */}
          <div>
            <span className="label-accent">Existing Products</span>
            <h2 className="font-display text-3xl mt-1 mb-2">ADD IMAGES</h2>
            <p className="text-muted-foreground text-sm mb-6">Paste image URLs here when photos are ready — they'll show live instantly.</p>
            <div className="space-y-3">
              {PRODUCTS.map((p) => (
                <div key={p.id} className="bg-surface border border-border p-5 flex gap-4 items-center flex-wrap">
                  <div className="flex-1 min-w-0">
                    <span className="label-accent">{p.categoryLabel}</span>
                    <h3 className="font-display text-lg mt-0.5">{p.name}</h3>
                  </div>
                  <input
                    type="text"
                    placeholder="Paste image URL here"
                    value={imageUrls[p.id] ?? ""}
                    onChange={(e) => setImageUrls(prev => ({ ...prev, [p.id]: e.target.value }))}
                    className="flex-1 min-w-[200px] bg-background border border-border px-3 py-2 text-xs focus:outline-none focus:border-primary"
                  />
                  <button
                    onClick={() => handleSaveImage(p.id)}
                    disabled={saving === p.id}
                    className={`shrink-0 text-xs px-5 py-2 border transition-colors uppercase tracking-widest ${
                      saved === p.id
                        ? "border-green-500 text-green-500"
                        : "border-border text-foreground hover:border-primary hover:text-primary"
                    }`}
                  >
                    {saving === p.id ? "Saving..." : saved === p.id ? "✓ Saved" : "Save"}
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  );
}




