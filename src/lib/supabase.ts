
// import { createClient } from "@supabase/supabase-js";

// const url = import.meta.env.VITE_SUPABASE_URL as string;
// const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(url, key);

// export interface ProductOverride {
//   id: string;
//   name: string | null;
//   short_spec: string | null;
//   description: string | null;
//   in_stock: boolean;
//   image_url: string | null;
//   visible: boolean;
//   updated_at: string;
// }


import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(url, key, {
  global: {
    fetch: (url, options) =>
      fetch(url, { ...options, cache: "no-store" }),
  },
});

export interface ProductOverride {
  id: string;
  name: string | null;
  short_spec: string | null;
  description: string | null;
  in_stock: boolean;
  image_url: string | null;
  visible: boolean;
  updated_at: string;
}
