import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { PRODUCTS, CATEGORIES, type Product, type Category } from "./products";

export interface MergedProduct extends Product {
  inStock: boolean;
  imageUrl: string | null;
  visible: boolean;
}

export function useProducts() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("products_override").select("*").then(({ data }) => {
      if (data) setData(data);
      setLoading(false);
    });
  }, []);

  // Map of overrides for hardcoded products
  const overrideMap: Record<string, any> = {};
  data.filter((d) => !d.is_custom).forEach((d) => (overrideMap[d.id] = d));

  // Hardcoded products merged with overrides
  const hardcoded: MergedProduct[] = PRODUCTS.map((p) => {
    const o = overrideMap[p.id];
    return {
      ...p,
      inStock: o === undefined ? true : (o.in_stock ?? true),
      imageUrl: o?.image_url ?? null,
      visible: o === undefined ? true : (o.visible ?? true),
    };
  });

  // Custom products added from admin — parse category from id format: custom_{category}_{timestamp}
  const custom: MergedProduct[] = data
    .filter((d) => d.is_custom)
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
        description: d.description ?? "",
        specs: {},
        applications: [],
        install: "",
        inStock: d.in_stock ?? true,
        imageUrl: d.image_url ?? null,
        visible: d.visible ?? true,
      };
    });

  const all = [
    ...hardcoded.filter((p) => p.visible),
    ...custom.filter((p) => p.visible),
  ];

  return { products: all, loading };
}
