import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, type ProductOverride } from "@/lib/supabase";
import { PRODUCTS } from "@/lib/products";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Gripsta" }] }),
  component: AdminPage,
});

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string;

const CATEGORIES = [
  "Hinges",
  "Handles",
  "Locks",
  "Channels",
  "Brackets",
  "Fasteners",
  "Other",
];

type LocalProduct = ProductOverride & {
  categoryLabel?: string;
  isCustom?: boolean;
};

const emptyNew = (): Partial<LocalProduct> => ({
  name: "",
  short_spec: "",
  description: "",
  image_url: "",
  in_stock: true,
  visible: true,
  categoryLabel: "Other",
  isCustom: true,
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [error, setError] = useState("");

  // existing product overrides from supabase
  const [overrides, setOverrides] = useState<Record<string, LocalProduct>>({});

  // custom products (added via admin, not in PRODUCTS array)
  const [customProducts, setCustomProducts] = useState<LocalProduct[]>([]);

  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  // "Add new product" drawer state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<LocalProduct>>(emptyNew());
  const [addError, setAddError] = useState("");
  const [adding, setAdding] = useState(false);

  // Expanded cards
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!authed) return;
    supabase.from("products_override").select("*").then(({ data }) => {
      if (data) {
        const map: Record<string, LocalProduct> = {};
        const knownIds = new Set(PRODUCTS.map((p) => p.id));
        const customs: LocalProduct[] = [];

        data.forEach((d) => {
          if (knownIds.has(d.id)) {
            map[d.id] = d;
          } else {
            customs.push({ ...d, isCustom: true });
          }
        });

        setOverrides(map);
        setCustomProducts(customs);
      }
    });
  }, [authed]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setError("");
    } else {
      setError("Wrong password.");
    }
  };

  const getField = (id: string, field: keyof ProductOverride, fallback: any) =>
    overrides[id]?.[field] ?? fallback;

  const setField = (id: string, field: keyof ProductOverride, value: any) => {
    setOverrides((prev) => ({
      ...prev,
      [id]: { ...prev[id], id, in_stock: true, visible: true, ...prev[id], [field]: value },
    }));
  };

  const setCustomField = (id: string, field: keyof LocalProduct, value: any) => {
    setCustomProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const handleSave = async (id: string) => {
    setSaving(id);
    const product = PRODUCTS.find((p) => p.id === id);
    const o = overrides[id] ?? { id };
    const payload = {
      id,
      name: o.name ?? product?.name ?? "",
      short_spec: o.short_spec ?? product?.shortSpec ?? "",
      description: o.description ?? product?.description ?? "",
      in_stock: o.in_stock ?? true,
      image_url: o.image_url ?? null,
      visible: o.visible ?? true,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("products_override").upsert(payload);
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleSaveCustom = async (p: LocalProduct) => {
    setSaving(p.id);
    const payload = {
      id: p.id,
      name: p.name ?? "",
      short_spec: p.short_spec ?? "",
      description: p.description ?? "",
      in_stock: p.in_stock ?? true,
      image_url: p.image_url ?? null,
      visible: p.visible ?? true,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("products_override").upsert(payload);
    setSaving(null);
    setSaved(p.id);
    setTimeout(() => setSaved(null), 2000);
  };

  const handleDeleteCustom = async (id: string) => {
    if (!confirm("Remove this product? This cannot be undone.")) return;
    setDeleting(id);
    await supabase.from("products_override").delete().eq("id", id);
    setCustomProducts((prev) => prev.filter((p) => p.id !== id));
    setDeleting(null);
  };

  const handleAddProduct = async () => {
    if (!newProduct.name?.trim()) {
      setAddError("Product name is required.");
      return;
    }
    setAdding(true);
    setAddError("");
    const id = `custom_${Date.now()}`;
    const payload = {
      id,
      name: newProduct.name!.trim(),
      short_spec: newProduct.short_spec?.trim() ?? "",
      description: newProduct.description?.trim() ?? "",
      in_stock: newProduct.in_stock ?? true,
      image_url: newProduct.image_url?.trim() || null,
      visible: newProduct.visible ?? true,
      updated_at: new Date().toISOString(),
    };
    await supabase.from("products_override").upsert(payload);
    setCustomProducts((prev) => [...prev, { ...payload, isCustom: true, categoryLabel: newProduct.categoryLabel }]);
    setAdding(false);
    setShowAddForm(false);
    setNewProduct(emptyNew());
  };

  const toggleExpand = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  // ─── Login Screen ───────────────────────────────────────────────────────────
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

  // ─── Admin Panel ────────────────────────────────────────────────────────────
  const allProducts = [
    ...PRODUCTS.map((p) => ({ ...p, isCustom: false })),
    ...customProducts.map((p) => ({ id: p.id, name: p.name ?? "", categoryLabel: p.categoryLabel ?? "Custom", shortSpec: p.short_spec ?? "", description: p.description ?? "", isCustom: true, _custom: p })),
  ];

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 flex items-end justify-between gap-4 flex-wrap">
          <div>
            <span className="label-accent">Admin Panel</span>
            <h1 className="font-display text-5xl mt-1">MANAGE PRODUCTS</h1>
            <p className="text-muted-foreground text-sm mt-2">
              {allProducts.length} products · Changes reflect live on the site.
            </p>
          </div>
          <button
            onClick={() => { setShowAddForm(true); setNewProduct(emptyNew()); setAddError(""); }}
            className="btn-primary flex items-center gap-2 px-6 py-3"
          >
            <span className="text-lg leading-none">+</span> Add Product
          </button>
        </div>
      </section>

      {/* Add Product Drawer / Modal */}
      {showAddForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 px-4">
          <div className="bg-surface border border-border w-full max-w-lg p-6 sm:p-8 space-y-5 relative">
            <button
              onClick={() => setShowAddForm(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-xl leading-none"
            >
              ✕
            </button>

            <div>
              <span className="label-accent">New Product</span>
              <h2 className="font-display text-2xl mt-1">Add to Catalogue</h2>
            </div>

            {/* Name — required */}
            <div>
              <label className="label-accent block mb-1">
                Product Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Heavy Duty Butt Hinge"
                value={newProduct.name ?? ""}
                onChange={(e) => setNewProduct((p) => ({ ...p, name: e.target.value }))}
                className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Category */}
            <div>
              <label className="label-accent block mb-1">Category</label>
              <select
                value={newProduct.categoryLabel ?? "Other"}
                onChange={(e) => setNewProduct((p) => ({ ...p, categoryLabel: e.target.value }))}
                className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Short spec */}
            <div>
              <label className="label-accent block mb-1">Short Spec</label>
              <input
                type="text"
                placeholder="e.g. 100mm · SS304 · 2 per pack"
                value={newProduct.short_spec ?? ""}
                onChange={(e) => setNewProduct((p) => ({ ...p, short_spec: e.target.value }))}
                className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Image URL */}
            <div>
              <label className="label-accent block mb-1">Image URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={newProduct.image_url ?? ""}
                onChange={(e) => setNewProduct((p) => ({ ...p, image_url: e.target.value }))}
                className="w-full bg-background border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            {/* Toggles */}
            <div className="flex gap-8">
              <ToggleField
                label="In Stock"
                value={newProduct.in_stock ?? true}
                onChange={(v) => setNewProduct((p) => ({ ...p, in_stock: v }))}
              />
              <ToggleField
                label="Visible"
                value={newProduct.visible ?? true}
                onChange={(v) => setNewProduct((p) => ({ ...p, visible: v }))}
              />
            </div>

            {addError && <p className="text-xs text-red-500">{addError}</p>}

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowAddForm(false)}
                className="flex-1 border border-border px-4 py-2.5 text-sm hover:bg-surface transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddProduct}
                disabled={adding}
                className="btn-primary flex-1 justify-center"
              >
                {adding ? "Adding..." : "Add Product →"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Product List */}
      <section className="pb-24">
        <div className="max-w-5xl mx-auto px-6 lg:px-10 space-y-3">
          {allProducts.map((p) => {
            const isCustom = p.isCustom;
            const customData = isCustom ? (p as any)._custom as LocalProduct : null;
            const id = p.id;
            const isExpanded = !!expanded[id];
            const isSaving = saving === id;
            const isSaved = saved === id;
            const isDeleting = deleting === id;

            // helpers per row
            const gf = isCustom
              ? (field: keyof LocalProduct, fallback: any) => customData?.[field] ?? fallback
              : (field: keyof ProductOverride, fallback: any) => getField(id, field, fallback);

            const sf = isCustom
              ? (field: keyof LocalProduct, value: any) => setCustomField(id, field, value)
              : (field: keyof ProductOverride, value: any) => setField(id, field, value);

            return (
              <div key={id} className="bg-surface border border-border">
                {/* Collapsed row — always visible */}
                <div
                  className="flex items-center gap-4 px-5 py-4 cursor-pointer select-none"
                  onClick={() => toggleExpand(id)}
                >
                  {/* Status dots */}
                  <div className="flex gap-1.5 shrink-0">
                    <span
                      title="In Stock"
                      className={`w-2 h-2 rounded-full ${gf("in_stock", true) ? "bg-green-500" : "bg-border"}`}
                    />
                    <span
                      title="Visible"
                      className={`w-2 h-2 rounded-full ${gf("visible", true) ? "bg-primary" : "bg-border"}`}
                    />
                  </div>

                  {/* Name + category */}
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-sm truncate block">
                      {gf("name", p.name)}
                    </span>
                    <span className="text-xs text-muted-foreground">{p.categoryLabel}</span>
                  </div>

                  {/* Quick toggles (no expand needed) */}
                  <div className="flex items-center gap-4 shrink-0" onClick={(e) => e.stopPropagation()}>
                    <MiniToggle
                      label="Stock"
                      value={gf("in_stock", true) as boolean}
                      onChange={(v) => sf("in_stock" as any, v)}
                    />
                    <MiniToggle
                      label="Show"
                      value={gf("visible", true) as boolean}
                      onChange={(v) => sf("visible" as any, v)}
                    />
                    <button
                      onClick={() => isCustom ? handleSaveCustom(customData!) : handleSave(id)}
                      disabled={isSaving}
                      className={`text-xs px-4 py-1.5 border transition-colors ${
                        isSaved
                          ? "border-green-600 text-green-600"
                          : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                      }`}
                    >
                      {isSaving ? "…" : isSaved ? "✓" : "Save"}
                    </button>
                    {isCustom && (
                      <button
                        onClick={() => handleDeleteCustom(id)}
                        disabled={isDeleting}
                        className="text-xs px-3 py-1.5 border border-red-500/40 text-red-500 hover:bg-red-500/10 transition-colors"
                      >
                        {isDeleting ? "…" : "✕"}
                      </button>
                    )}
                  </div>

                  {/* Chevron */}
                  <span className={`text-muted-foreground text-xs transition-transform ${isExpanded ? "rotate-180" : ""}`}>
                    ▾
                  </span>
                </div>

                {/* Expanded edit fields */}
                {isExpanded && (
                  <div className="border-t border-border px-5 py-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div>
                        <label className="label-accent block mb-1">Product Name</label>
                        <input
                          type="text"
                          value={gf("name", p.name) as string}
                          onChange={(e) => sf("name" as any, e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>

                      {/* Short spec */}
                      <div>
                        <label className="label-accent block mb-1">Short Spec</label>
                        <input
                          type="text"
                          value={gf("short_spec", p.shortSpec) as string}
                          onChange={(e) => sf("short_spec" as any, e.target.value)}
                          className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>

                    {/* Image URL */}
                    <div>
                      <label className="label-accent block mb-1">Image URL</label>
                      <input
                        type="text"
                        placeholder="https://..."
                        value={gf("image_url", "") as string}
                        onChange={(e) => sf("image_url" as any, e.target.value)}
                        className="w-full bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary"
                      />
                    </div>

                    {/* Save (expanded) */}
                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => isCustom ? handleSaveCustom(customData!) : handleSave(id)}
                        disabled={isSaving}
                        className={`btn-primary text-xs px-8 py-2.5 ${isSaved ? "bg-green-600 border-green-600" : ""}`}
                      >
                        {isSaving ? "Saving..." : isSaved ? "✓ Saved" : "Save Changes"}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Empty state */}
          {allProducts.length === 0 && (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-4xl mb-4">📦</p>
              <p className="text-sm">No products yet. Add your first one above.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

// ─── Small helpers ───────────────────────────────────────────────────────────

function MiniToggle({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-[10px] text-muted-foreground uppercase tracking-widest">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-9 h-5 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}
      >
        <span
          className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${
            value ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}

function ToggleField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground uppercase tracking-widest">{label}</span>
      <button
        onClick={() => onChange(!value)}
        className={`w-12 h-6 rounded-full transition-colors relative ${value ? "bg-primary" : "bg-border"}`}
      >
        <span
          className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${
            value ? "left-7" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}
