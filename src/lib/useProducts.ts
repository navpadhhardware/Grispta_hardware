// import { useEffect, useState, useCallback } from "react";
// import { supabase } from "./supabase";
// import { PRODUCTS, CATEGORIES, type Product, type Category } from "./products";

// export interface MergedProduct extends Product {
//   inStock: boolean;
//   imageUrl: string | null;
//   visible: boolean;
// }

// export function useProducts() {
//   const [products, setProducts] = useState<MergedProduct[]>([]);
//   const [loading, setLoading] = useState(true);

//   const fetchProducts = useCallback(async () => {
//     setLoading(true);

//     console.log("Supabase URL:", import.meta.env.VITE_SUPABASE_URL);

//     const { data, error } = await supabase
//       .from("products_override")
//       .select("*");

//     console.log("Supabase data:", data);
//     console.log("Supabase error:", error);

//     const rows = data ?? [];

//     const overrideMap: Record<string, any> = {};
//     rows.filter((d) => !d.is_custom).forEach((d) => (overrideMap[d.id] = d));

//     const hardcoded: MergedProduct[] = PRODUCTS.map((p) => {
//       const o = overrideMap[p.id];
//       return {
//         ...p,
//         inStock: o === undefined ? true : (o.in_stock ?? true),
//         imageUrl: o?.image_url ?? null,
//         visible: o === undefined ? true : (o.visible ?? true),
//       };
//     });

//     const custom: MergedProduct[] = rows
//       .filter((d) => d.is_custom && d.visible)
//       .map((d) => {
//         const parts = d.id.split("_");
//         const categoryId = (parts[1] as Category) ?? "hinges";
//         const catInfo = CATEGORIES.find((c) => c.id === categoryId);
//         return {
//           id: d.id,
//           name: d.name,
//           category: categoryId,
//           categoryLabel: d.category_label ?? catInfo?.label ?? categoryId,
//           price: 0,
//           unit: "pc",
//           shortSpec: d.short_spec ?? "",
//           description: "",
//           specs: {},
//           applications: [],
//           install: "",
//           inStock: d.in_stock ?? true,
//           imageUrl: d.image_url ?? null,
//           visible: d.visible ?? true,
//         };
//       });

//     setProducts([
//       ...hardcoded.filter((p) => p.visible),
//       ...custom,
//     ]);

//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     fetchProducts();
//     const interval = setInterval(fetchProducts, 30000);
//     return () => clearInterval(interval);
//   }, [fetchProducts]);

//   return { products, loading, refetch: fetchProducts };
// }


import { useEffect, useState, useCallback } from "react";
import { supabase } from "./supabase";
import { PRODUCTS, CATEGORIES, type Product, type Category } from "./products";

export interface MergedProduct extends Product {
  inStock: boolean;
  imageUrl: string | null;
  visible: boolean;
}

export function useProducts() {
  const [products, setProducts] = useState<MergedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async (isInitial = false) => {
    if (isInitial) setLoading(true);

    const { data, error } = await supabase
      .from("products_override")
      .select("*");

    const rows = data ?? [];

    const overrideMap: Record<string, any> = {};
    rows.filter((d) => !d.is_custom).forEach((d) => (overrideMap[d.id] = d));

    const hardcoded: MergedProduct[] = PRODUCTS.map((p) => {
      const o = overrideMap[p.id];
      return {
        ...p,
        inStock: o === undefined ? true : (o.in_stock ?? true),
        imageUrl: o?.image_url ?? null,
        visible: o === undefined ? true : (o.visible ?? true),
      };
    });

    const custom: MergedProduct[] = rows
      .filter((d) => d.is_custom && d.visible)
      .map((d) => {
        const parts = d.id.split("_");
        const categoryId = (parts[1] as Category) ?? "hinges";
        const catInfo = CATEGORIES.find((c) => c.id === categoryId);
        return {
          id: d.id,
          name: d.name,
          category: categoryId,
          categoryLabel: d.category_label ?? catInfo?.label ?? categoryId,
          price: 0,
          unit: "pc",
          shortSpec: d.short_spec ?? "",
          description: "",
          specs: {},
          applications: [],
          install: "",
          inStock: d.in_stock ?? true,
          imageUrl: d.image_url ?? null,
          visible: d.visible ?? true,
        };
      });

    setProducts([
      ...hardcoded.filter((p) => p.visible),
      ...custom,
    ]);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts(true);
    const interval = setInterval(() => fetchProducts(false), 30000);
    return () => clearInterval(interval);
  }, [fetchProducts]);

  return { products, loading, refetch: fetchProducts };
}
