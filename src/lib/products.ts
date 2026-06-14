export type Category = "hinges" | "screws" | "channels" | "lid-support";

export interface Product {
  id: string;
  name: string;
  category: Category;
  categoryLabel: string;
  price: number;
  unit: string;
  shortSpec: string;
  description: string;
  finishes?: string[];
  sizes?: string[];
  specs: Record<string, string>;
  applications: string[];
  install: string;
  badge?: string;
}

export const FINISH_COLORS: Record<string, string> = {
  "Matt Silver": "#C0C0C0",
  "Glossy": "#E8E8E8",
  "Antique": "#8B6F47",
  "Matt Black": "#1a1a1a",
  "Antique Matt": "#6B5333",
  "Satin": "#A8A8A8",
  "Rose Gold": "#B76E79",
  "Blackening": "#222",
  "Nickel": "#C0C0C0",
};

const ALL_HINGE_FINISHES = ["Matt Silver", "Glossy", "Antique", "Matt Black", "Antique Matt", "Satin", "Rose Gold"];

export const PRODUCTS: Product[] = [
  { id: "hinge-75-13", name: "SS Butt Hinge 75×13×19mm", category: "hinges", categoryLabel: "Hinges", price: 38, unit: "pc",
    shortSpec: "1.5mm thick · 45g · 6 finishes",
    description: "Premium stainless steel butt hinge with smooth pivot action. Ideal for light to medium-duty cabinet and wardrobe doors.",
    finishes: ["Matt Silver","Glossy","Antique","Matt Black","Antique Matt","Satin"],
    specs: { Material: "SS 304", Thickness: "1.5mm", Weight: "45g", Size: "75×13×19mm", Pivot: "Steel pin" },
    applications: ["Cabinets", "Wardrobes", "Light doors"],
    install: "Mark hinge positions, drill pilot holes, fix with countersunk screws (sold separately)." },
  { id: "hinge-75-3-14", name: "SS Butt Hinge 75×3×14mm", category: "hinges", categoryLabel: "Hinges", price: 43, unit: "pc",
    shortSpec: "1.8mm thick · 70g · 7 finishes",
    description: "Heavier-gauge 75mm hinge for medium-weight doors. Smooth, silent operation tested to 50,000 cycles.",
    finishes: ALL_HINGE_FINISHES,
    specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "70g", Size: "75×3×14mm" },
    applications: ["Wardrobes","Cabinet doors"], install: "Standard butt-hinge install — recess into door edge for flush fit." },
  { id: "hinge-100", name: "SS Butt Hinge 100×4×14mm", category: "hinges", categoryLabel: "Hinges", price: 70, unit: "pc",
    shortSpec: "1.8mm · 110g · Heavy Duty", badge: "Heavy Duty",
    description: "Heavy-duty 100mm hinge engineered for larger wardrobe and room doors.",
    finishes: ALL_HINGE_FINISHES,
    specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "110g", Size: "100×4×14mm" },
    applications: ["Room doors","Heavy wardrobes"], install: "Use 3 hinges per door for doors above 1.8m height." },
  { id: "hinge-125", name: "SS Butt Hinge 125×5×14mm", category: "hinges", categoryLabel: "Hinges", price: 88, unit: "pc",
    shortSpec: "1.8mm · 155g · 7 finishes",
    description: "Large 125mm hinge for premium interior doors. Precision-engineered pivot for whisper-quiet motion.",
    finishes: ALL_HINGE_FINISHES,
    specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "155g", Size: "125×5×14mm" },
    applications: ["Interior doors","Premium wardrobes"], install: "Recommend 3 hinges per door for loads above 25kg." },
  { id: "hinge-150", name: "SS Butt Hinge 150×6×10mm", category: "hinges", categoryLabel: "Hinges", price: 220, unit: "pc",
    shortSpec: "3.0mm · 375g · Extra Heavy", badge: "Extra Heavy",
    description: "The flagship 150mm 3mm-thick hinge for the heaviest applications — entry doors, hotel rooms, contract installs.",
    finishes: ALL_HINGE_FINISHES,
    specs: { Material: "SS 304", Thickness: "3.0mm", Weight: "375g", Size: "150×6×10mm" },
    applications: ["Entry doors","Hotels","Contract"], install: "Use 4 hinges for doors over 2.1m. Pre-drill pilot holes." },

  { id: "screw-6-13-bl", name: "MS Phillips Screw 6×13mm Blackening", category: "screws", categoryLabel: "Drywall Screws", price: 242, unit: "pkt",
    shortSpec: "1000 pcs/pkt · Bugle Head",
    description: "Phillips bugle-head drywall screws with blackening finish. Self-countersinking, sharp point for clean drywall fixing.",
    finishes: ["Blackening"], sizes: ["6×13mm"],
    specs: { Material: "MS", Finish: "Blackening", Head: "Phillips Bugle", Quantity: "1000 pcs/pkt" },
    applications: ["POP","Drywall","Gypsum boards"], install: "Drive with Phillips bit at low speed until head sits flush." },
  { id: "screw-6-13-nk", name: "MS Phillips Screw 6×13mm Nickel", category: "screws", categoryLabel: "Drywall Screws", price: 279, unit: "pkt",
    shortSpec: "1000 pcs/pkt · Bugle Head", finishes: ["Nickel"], sizes: ["6×13mm"],
    description: "Nickel-plated drywall screws for added corrosion resistance.",
    specs: { Material: "MS", Finish: "Nickel", Head: "Phillips Bugle", Quantity: "1000 pcs/pkt" },
    applications: ["POP","Drywall"], install: "Phillips #2 bit. Avoid over-driving." },
  { id: "screw-6-13-an", name: "MS Phillips Screw 6×13mm Antique", category: "screws", categoryLabel: "Drywall Screws", price: 298, unit: "pkt",
    shortSpec: "1000 pcs/pkt · Bugle Head", finishes: ["Antique"], sizes: ["6×13mm"],
    description: "Antique-finish drywall screws for decorative exposed-fix applications.",
    specs: { Material: "MS", Finish: "Antique", Head: "Phillips Bugle", Quantity: "1000 pcs/pkt" },
    applications: ["Decorative POP","Drywall"], install: "Drive flush; avoid over-tightening to keep finish intact." },
  { id: "screw-8-25-bl", name: "MS Phillips Screw 8×25mm Blackening", category: "screws", categoryLabel: "Drywall Screws", price: 561, unit: "pkt",
    shortSpec: "1000 pcs/pkt · Bugle Head", finishes: ["Blackening"], sizes: ["8×25mm"],
    description: "Larger gauge 8×25mm drywall screw for heavier panel fixing.",
    specs: { Material: "MS", Finish: "Blackening", Quantity: "1000 pcs/pkt" },
    applications: ["Heavy panels","Drywall"], install: "Pre-drill in dense substrates." },
  { id: "screw-8-25-nk", name: "MS Phillips Screw 8×25mm Nickel", category: "screws", categoryLabel: "Drywall Screws", price: 625, unit: "pkt",
    shortSpec: "1000 pcs/pkt · Bugle Head", finishes: ["Nickel"], sizes: ["8×25mm"],
    description: "Nickel-plated 8×25mm screws for outdoor-adjacent and humid environments.",
    specs: { Material: "MS", Finish: "Nickel", Quantity: "1000 pcs/pkt" },
    applications: ["Drywall","Humid areas"], install: "Use Phillips #2 bit." },

  { id: "channel-18", name: 'Heavy Duty Telescopic Channel 18"', category: "channels", categoryLabel: "Drawer Channels", price: 450, unit: "pair",
    shortSpec: "Full extension · Soft close · 45kg",
    description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
    specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
    applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
  { id: "channel-24", name: 'Heavy Duty Telescopic Channel 24"', category: "channels", categoryLabel: "Drawer Channels", price: 650, unit: "pair",
    shortSpec: "Full extension · Soft close · 45kg",
    description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
    specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
    applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

  { id: "lid-80", name: "Cabinet Lid Support Gas Spring", category: "lid-support", categoryLabel: "Lid Support", price: 320, unit: "pc",
    shortSpec: "80N force · Silver finish",
    description: "Gas-spring lid stay providing controlled lift and hold for cabinet doors and overhead lids.",
    specs: { Force: "80N", Finish: "Silver", Type: "Gas Spring" },
    applications: ["Overhead cabinets","Storage lids"], install: "Mount at recommended angle (per included template) for full lift assist." },
  { id: "lid-120", name: "Cabinet Lid Support Gas Spring Heavy", category: "lid-support", categoryLabel: "Lid Support", price: 480, unit: "pc",
    shortSpec: "120N · For heavy doors", badge: "Heavy",
    description: "Heavy-duty 120N gas spring for thick or oversized cabinet doors.",
    specs: { Force: "120N", Finish: "Silver", Type: "Gas Spring" },
    applications: ["Heavy cabinet doors","Hotel storage"], install: "Use one per side for doors above 6kg." },
];

export const CATEGORIES: { id: Category; label: string; desc: string; icon: string }[] = [
  { id: "hinges", label: "Hinges", desc: "SS Butt Hinges in 7 premium finishes", icon: "🔩" },
  { id: "screws", label: "Drywall Screws", desc: "MS Phillips Bugle Head, 3 finishes, 20+ sizes", icon: "🪛" },
  { id: "channels", label: "Drawer Channels", desc: "Heavy duty telescopic, soft-close", icon: "📐" },
  { id: "lid-support", label: "Lid Support", desc: "Gas spring cabinet door support", icon: "⚙️" },
];

export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }
