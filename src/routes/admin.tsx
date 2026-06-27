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




import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import { supabase } from "@/lib/supabase";
import { PRODUCTS, CATEGORIES, type Category } from "@/lib/products";
import { GripstaLogo } from "@/components/GripstaLogo";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
  component: AdminPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

interface AdminProduct {
  id: string;
  name: string;
  short_spec: string;
  image_url: string;
  in_stock: boolean;
  visible: boolean;
  category: Category;
  categoryLabel: string;
  isCustom: boolean;
  isDirty: boolean;
}

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState("");

  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [selectedCat, setSelectedCat] = useState<Category>(CATEGORIES[0].id);
  const [search, setSearch] = useState("");

  const [saving, setSaving] = useState<Set<string>>(new Set());
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [deleting, setDeleting] = useState<string | null>(null);

  // Add product form
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState("");
  const [newSpec, setNewSpec] = useState("");
  const [newImage, setNewImage] = useState("");
  const [adding, setAdding] = useState(false);
  const [addedMsg, setAddedMsg] = useState("");

  // Expanded image rows
  const [expandedImage, setExpandedImage] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!authed) return;
    loadData();
  }, [authed]);

  const loadData = async () => {
    const { data } = await supabase.from("products_override").select("*");
    if (!data) return;

    const overrideMap: Record<string, any> = {};
    data.filter((d) => !d.is_custom).forEach((d) => (overrideMap[d.id] = d));

    const hardcoded: AdminProduct[] = PRODUCTS.map((p) => {
      const o = overrideMap[p.id];
      return {
        id: p.id,
        name: o?.name ?? p.name,
        short_spec: o?.short_spec ?? p.shortSpec,
        image_url: o?.image_url ?? "",
        in_stock: o === undefined ? true : (o.in_stock ?? true),
        visible: o === undefined ? true : (o.visible ?? true),
        category: p.category,
        categoryLabel: p.categoryLabel,
        isCustom: false,
        isDirty: false,
      };
    });

    const custom: AdminProduct[] = data
      .filter((d) => d.is_custom)
      .map((d) => {
        const parts = d.id.split("_");
        const categoryId = (parts[1] as Category) ?? "hinges";
        const catInfo = CATEGORIES.find((c) => c.id === categoryId);
        return {
          id: d.id,
          name: d.name ?? "",
          short_spec: d.short_spec ?? "",
          image_url: d.image_url ?? "",
          in_stock: d.in_stock ?? true,
          visible: d.visible ?? true,
          category: categoryId,
          categoryLabel: d.category_label ?? catInfo?.label ?? categoryId,
          isCustom: true,
          isDirty: false,
        };
      });

    setProducts([...hardcoded, ...custom]);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwError(""); }
    else setPwError("Wrong password.");
  };

  const updateField = (id: string, field: keyof AdminProduct, value: any) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value, isDirty: true } : p))
    );
  };

  const handleSave = async (product: AdminProduct) => {
    setSaving((s) => new Set(s).add(product.id));
    await supabase.from("products_override").upsert({
      id: product.id,
      name: product.name,
      category: product.category,
      category_label: product.categoryLabel,
      short_spec: product.short_spec,
      image_url: product.image_url || null,
      in_stock: product.in_stock,
      visible: product.visible,
      is_custom: product.isCustom,
      updated_at: new Date().toISOString(),
    });
    setProducts((prev) => prev.map((p) => p.id === product.id ? { ...p, isDirty: false } : p));
    setSaving((s) => { const n = new Set(s); n.delete(product.id); return n; });
    setSaved((s) => new Set(s).add(product.id));
    setTimeout(() => setSaved((s) => { const n = new Set(s); n.delete(product.id); return n; }), 2000);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Remove this product?")) return;
    setDeleting(id);
    await supabase.from("products_override").delete().eq("id", id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    setAdding(true);
    const id = `custom_${selectedCat}_${Date.now()}`;
    const cat = CATEGORIES.find((c) => c.id === selectedCat)!;
    await supabase.from("products_override").upsert({
      id,
      name: newName.trim(),
      category: selectedCat,
      category_label: cat.label,
      short_spec: newSpec.trim(),
      image_url: newImage.trim() || null,
      in_stock: true,
      visible: true,
      is_custom: true,
      updated_at: new Date().toISOString(),
    });
    setProducts((prev) => [...prev, {
      id,
      name: newName.trim(),
      short_spec: newSpec.trim(),
      image_url: newImage.trim(),
      in_stock: true,
      visible: true,
      category: selectedCat,
      categoryLabel: cat.label,
      isCustom: true,
      isDirty: false,
    }]);
    setAdding(false);
    setNewName(""); setNewSpec(""); setNewImage("");
    setShowAddForm(false);
    setAddedMsg(`✓ "${newName.trim()}" added`);
    setTimeout(() => setAddedMsg(""), 3000);
  };

  const toggleImage = (id: string) =>
    setExpandedImage((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });

  // Products for selected category, filtered by search
  const visibleProducts = useMemo(() => {
    return products
      .filter((p) => p.category === selectedCat)
      .filter((p) =>
        search.trim() === "" ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.short_spec.toLowerCase().includes(search.toLowerCase())
      );
  }, [products, selectedCat, search]);

  const catCounts = useMemo(() => {
    const map: Record<string, number> = {};
    products.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, [products]);

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-background">
        <div className="w-full max-w-sm">
          <div className="mb-8"><GripstaLogo /></div>
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
            {pwError && <p className="text-xs text-red-500">{pwError}</p>}
            <button className="btn-primary w-full justify-center">Enter →</button>
          </form>
        </div>
      </div>
    );
  }

  const selectedCatInfo = CATEGORIES.find((c) => c.id === selectedCat)!;

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Admin Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0f0f] border-b border-border h-16 flex items-center px-6 justify-between">
        <GripstaLogo />
        <div className="flex items-center gap-6">
          <Link to="/products" target="_blank" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Products ↗
          </Link>
          <Link to="/" target="_blank" className="text-xs uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors">
            Live Site ↗
          </Link>
        </div>
      </header>

      <div className="flex flex-1 pt-16">

        {/* ── Left: Categories ── */}
        <aside className="w-64 shrink-0 border-r border-border bg-[#0a0a0a] fixed top-16 bottom-0 left-0 overflow-y-auto">
          <div className="p-4">
            <p className="label-accent mb-4 px-2">Categories</p>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const count = catCounts[cat.id] ?? PRODUCTS.filter((p) => p.category === cat.id).length;
                const isActive = selectedCat === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCat(cat.id); setShowAddForm(false); setSearch(""); }}
                    className={`w-full text-left px-3 py-2.5 flex items-center justify-between gap-2 transition-colors rounded-sm ${
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-foreground/70 hover:text-foreground hover:bg-surface"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{cat.icon}</span>
                      <span className="text-sm font-medium">{cat.label}</span>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isActive ? "bg-primary/20 text-primary" : "bg-surface text-muted-foreground"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </aside>

        {/* ── Right: Products ── */}
        <main className="ml-64 flex-1 p-8">

          {/* Header row */}
          <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{selectedCatInfo.icon}</span>
              <div>
                <h1 className="font-display text-3xl">{selectedCatInfo.label}</h1>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {visibleProducts.length} product{visibleProducts.length !== 1 ? "s" : ""}
                  {search && " matching search"}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {addedMsg && (
                <span className="text-sm text-green-500 font-medium">{addedMsg}</span>
              )}
              <button
                onClick={() => { setShowAddForm((v) => !v); setNewName(""); setNewSpec(""); setNewImage(""); }}
                className={`text-xs px-5 py-2.5 border transition-colors uppercase tracking-widest ${
                  showAddForm
                    ? "border-primary text-primary bg-primary/5"
                    : "btn-primary"
                }`}
              >
                {showAddForm ? "Cancel" : "+ Add Product"}
              </button>
            </div>
          </div>

          {/* Add product form */}
          {showAddForm && (
            <form onSubmit={handleAddProduct} className="mb-6 bg-surface border-2 border-primary/30 p-5 space-y-4">
              <p className="label-accent text-xs">New {selectedCatInfo.label} Product</p>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
                    Product Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    autoFocus
                    placeholder={`e.g. SS ${selectedCatInfo.label} 75mm`}
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">Short Spec</label>
                  <input
                    type="text"
                    placeholder="e.g. 75mm · SS304 · Soft Close"
                    value={newSpec}
                    onChange={(e) => setNewSpec(e.target.value)}
                    className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
              <div>
                <label className="text-[10px] uppercase tracking-widest text-muted-foreground block mb-1">
                  Image URL <span className="text-muted-foreground normal-case tracking-normal font-normal">(optional — paste later)</span>
                </label>
                <input
                  type="text"
                  placeholder="https://... leave empty for now"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
                />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={adding} className="btn-primary px-8">
                  {adding ? "Adding..." : `Add to ${selectedCatInfo.label} →`}
                </button>
              </div>
            </form>
          )}

          {/* Search bar */}
          <div className="mb-5">
            <input
              type="text"
              placeholder={`Search in ${selectedCatInfo.label}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-surface border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary"
            />
          </div>

          {/* Product list */}
          <div className="space-y-2">
            {visibleProducts.length === 0 && (
              <div className="text-center py-16 text-muted-foreground text-sm border border-border">
                {search ? "No products match your search." : "No products yet. Click + Add Product to get started."}
              </div>
            )}

            {visibleProducts.map((p) => {
              const isSaving = saving.has(p.id);
              const isSaved = saved.has(p.id);
              const isImgOpen = expandedImage.has(p.id);

              return (
                <div key={p.id} className="border border-border bg-surface overflow-hidden">
                  <div className="flex items-center gap-3 px-4 py-3">

                    {/* Status dots */}
                    <div className="flex gap-1.5 shrink-0">
                      <span
                        title={p.in_stock ? "In Stock" : "Out of Stock"}
                        className={`w-2 h-2 rounded-full ${p.in_stock ? "bg-green-500" : "bg-red-500/40"}`}
                      />
                      <span
                        title={p.visible ? "Visible" : "Hidden"}
                        className={`w-2 h-2 rounded-full ${p.visible ? "bg-primary" : "bg-border"}`}
                      />
                    </div>

                    {/* Editable name + spec */}
                    <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                      <input
                        type="text"
                        value={p.name}
                        onChange={(e) => updateField(p.id, "name", e.target.value)}
                        className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-sm py-0.5 w-full font-medium"
                        placeholder="Product name"
                      />
                      <input
                        type="text"
                        value={p.short_spec}
                        onChange={(e) => updateField(p.id, "short_spec", e.target.value)}
                        className="bg-transparent border-b border-transparent hover:border-border focus:border-primary focus:outline-none text-xs text-muted-foreground py-0.5 w-full"
                        placeholder="Short spec"
                      />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-2 shrink-0">

                      {/* Stock toggle */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Stock</span>
                        <button
                          onClick={() => updateField(p.id, "in_stock", !p.in_stock)}
                          className={`w-9 h-5 rounded-full transition-colors relative ${p.in_stock ? "bg-green-600" : "bg-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.in_stock ? "left-[18px]" : "left-0.5"}`} />
                        </button>
                      </div>

                      {/* Visible toggle */}
                      <div className="flex flex-col items-center gap-0.5">
                        <span className="text-[9px] uppercase tracking-widest text-muted-foreground">Show</span>
                        <button
                          onClick={() => updateField(p.id, "visible", !p.visible)}
                          className={`w-9 h-5 rounded-full transition-colors relative ${p.visible ? "bg-primary" : "bg-border"}`}
                        >
                          <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${p.visible ? "left-[18px]" : "left-0.5"}`} />
                        </button>
                      </div>

                      {/* Image toggle */}
                      <button
                        onClick={() => toggleImage(p.id)}
                        title="Add/edit image URL"
                        className={`text-xs px-2 py-1 border transition-colors ${
                          isImgOpen ? "border-primary text-primary" : "border-border text-muted-foreground hover:border-primary"
                        }`}
                      >
                        🖼
                      </button>

                      {/* Save */}
                      <button
                        onClick={() => handleSave(p)}
                        disabled={isSaving}
                        className={`text-xs px-4 py-1.5 border transition-colors min-w-[52px] text-center uppercase tracking-widest ${
                          isSaved
                            ? "border-green-600 text-green-600"
                            : p.isDirty
                            ? "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                            : "border-border text-muted-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {isSaving ? "…" : isSaved ? "✓" : "Save"}
                      </button>

                      {/* Delete (custom only) */}
                      {p.isCustom && (
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          title="Remove product"
                          className="text-xs px-2 py-1.5 border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          {deleting === p.id ? "…" : "✕"}
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Image URL row */}
                  {isImgOpen && (
                    <div className="px-4 py-3 bg-background border-t border-border flex items-center gap-3">
                      <label className="text-[10px] uppercase tracking-widest text-muted-foreground shrink-0">Image URL</label>
                      <input
                        type="text"
                        value={p.image_url}
                        onChange={(e) => updateField(p.id, "image_url", e.target.value)}
                        placeholder="https://..."
                        className="flex-1 bg-surface border border-border px-3 py-1.5 text-xs focus:outline-none focus:border-primary"
                      />
                      {p.image_url && (
                        <img
                          src={p.image_url}
                          alt=""
                          className="w-10 h-10 object-cover border border-border shrink-0"
                          onError={(e) => (e.currentTarget.style.display = "none")}
                        />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
