// export type Category =
//   | "hinges"
//   | "channel"
//   | "tandem"
//   | "pullout"
//   | "bottle-pullout"
//   | "pantry"
//   | "s-corner"
//   | "umc"
//   | "sky-wheel";

// export interface Product {
//   id: string;
//   name: string;
//   category: Category;
//   categoryLabel: string;
//   price: number;
//   unit: string;
//   shortSpec: string;
//   description: string;
//   finishes?: string[];
//   sizes?: string[];
//   specs: Record<string, string>;
//   applications: string[];
//   install: string;
//   badge?: string;
// }

// export const FINISH_COLORS: Record<string, string> = {
//   "Matt Silver": "#C0C0C0",
//   "Glossy": "#E8E8E8",
//   "Antique": "#8B6F47",
//   "Matt Black": "#1a1a1a",
//   "Antique Matt": "#6B5333",
//   "Satin": "#A8A8A8",
//   "Rose Gold": "#B76E79",
//   "Blackening": "#222",
//   "Nickel": "#C0C0C0",
// };

// const ALL_HINGE_FINISHES = ["Matt Silver", "Glossy", "Antique", "Matt Black", "Antique Matt", "Satin", "Rose Gold"];

// export const PRODUCTS: Product[] = [
//   // HINGES
//   { id: "hinge-75-13", name: "SS Butt Hinge 75×13×19mm", category: "hinges", categoryLabel: "Hinges", price: 38, unit: "pc",
//     shortSpec: "1.5mm thick · 45g · 6 finishes",
//     description: "Premium stainless steel butt hinge with smooth pivot action. Ideal for light to medium-duty cabinet and wardrobe doors.",
//     finishes: ["Matt Silver","Glossy","Antique","Matt Black","Antique Matt","Satin"],
//     specs: { Material: "SS 304", Thickness: "1.5mm", Weight: "45g", Size: "75×13×19mm", Pivot: "Steel pin" },
//     applications: ["Cabinets", "Wardrobes", "Light doors"],
//     install: "Mark hinge positions, drill pilot holes, fix with countersunk screws (sold separately)." },
//   { id: "hinge-75-3-14", name: "SS Butt Hinge 75×3×14mm", category: "hinges", categoryLabel: "Hinges", price: 43, unit: "pc",
//     shortSpec: "1.8mm thick · 70g · 7 finishes",
//     description: "Heavier-gauge 75mm hinge for medium-weight doors. Smooth, silent operation tested to 50,000 cycles.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "70g", Size: "75×3×14mm" },
//     applications: ["Wardrobes","Cabinet doors"], install: "Standard butt-hinge install — recess into door edge for flush fit." },
//   { id: "hinge-100", name: "SS Butt Hinge 100×4×14mm", category: "hinges", categoryLabel: "Hinges", price: 70, unit: "pc",
//     shortSpec: "1.8mm · 110g · Heavy Duty", badge: "Heavy Duty",
//     description: "Heavy-duty 100mm hinge engineered for larger wardrobe and room doors.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "110g", Size: "100×4×14mm" },
//     applications: ["Room doors","Heavy wardrobes"], install: "Use 3 hinges per door for doors above 1.8m height." },
//   { id: "hinge-125", name: "SS Butt Hinge 125×5×14mm", category: "hinges", categoryLabel: "Hinges", price: 88, unit: "pc",
//     shortSpec: "1.8mm · 155g · 7 finishes",
//     description: "Large 125mm hinge for premium interior doors. Precision-engineered pivot for whisper-quiet motion.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "155g", Size: "125×5×14mm" },
//     applications: ["Interior doors","Premium wardrobes"], install: "Recommend 3 hinges per door for loads above 25kg." },
//   { id: "hinge-150", name: "SS Butt Hinge 150×6×10mm", category: "hinges", categoryLabel: "Hinges", price: 220, unit: "pc",
//     shortSpec: "3.0mm · 375g · Extra Heavy", badge: "Extra Heavy",
//     description: "The flagship 150mm 3mm-thick hinge for the heaviest applications — entry doors, hotel rooms, contract installs.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "3.0mm", Weight: "375g", Size: "150×6×10mm" },
//     applications: ["Entry doors","Hotels","Contract"], install: "Use 4 hinges for doors over 2.1m. Pre-drill pilot holes." },

//   // CHANNEL
//   { id: "channel-18", name: 'Telescopic Channel 18"', category: "channel", categoryLabel: "Channel", price: 450, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
//     specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
//   { id: "channel-24", name: 'Telescopic Channel 24"', category: "channel", categoryLabel: "Channel", price: 650, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
//     specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

//   // TANDEM
//   { id: "tandem-450", name: "Tandem Box System 450mm", category: "tandem", categoryLabel: "Tandem", price: 1200, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "Premium tandem box drawer system with integrated soft-close and tool-free assembly.",
//     specs: { Length: "450mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Modular kitchens","Premium wardrobes"], install: "Clip side panels onto runner, adjust height with integrated screw." },
//   { id: "tandem-500", name: "Tandem Box System 500mm", category: "tandem", categoryLabel: "Tandem", price: 1350, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "500mm tandem box for wider kitchen drawers with full extension and damped closure.",
//     specs: { Length: "500mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Kitchen drawers","Storage cabinets"], install: "Standard tandem install — use provided jig for consistent positioning." },

//   // PULLOUT
//   { id: "pullout-single", name: "Single Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 780, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg",
//     description: "Stainless steel wire pullout basket for kitchen base cabinets. Full extension with smooth glide.",
//     specs: { Material: "SS", Layers: "1", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Storage"], install: "Fix channel to cabinet side walls at desired height." },
//   { id: "pullout-double", name: "Double Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 1100, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg", badge: "Popular",
//     description: "Double-layer pullout basket maximising vertical space in base cabinets.",
//     specs: { Material: "SS", Layers: "2", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Pantry units"], install: "Mount both layers on the same channel frame; adjust spacing as needed." },

//   // BOTTLE PULLOUT
//   { id: "bottle-pullout-300", name: "Bottle Pullout 300mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 950, unit: "pc",
//     shortSpec: "300mm wide · SS wire · Full extension",
//     description: "Dedicated bottle pullout organiser for 300mm narrow base cabinets. Stores bottles upright with secure wire partitions.",
//     specs: { Width: "300mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Narrow kitchen cabinets","Bar units"], install: "Mount channel rails to cabinet sides. Ensure level for smooth glide." },
//   { id: "bottle-pullout-450", name: "Bottle Pullout 450mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 1150, unit: "pc",
//     shortSpec: "450mm wide · SS wire · Full extension",
//     description: "Wider bottle pullout for larger base cabinets. Fits standard wine and water bottles.",
//     specs: { Width: "450mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Kitchen cabinets","Pantry"], install: "Align rails precisely for smooth full-extension pull." },

//   // PANTRY
//   { id: "pantry-tall", name: "Tall Pantry Unit System", category: "pantry", categoryLabel: "Pantry", price: 4500, unit: "set",
//     shortSpec: "Full height · Multi-tier · Soft close",
//     description: "Complete tall pantry pull-out system with multi-tier wire baskets and soft-close mechanism for full-height cabinets.",
//     specs: { Type: "Tall Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Tall kitchen cabinets","Pantry units"], install: "Fix upper and lower runners to cabinet. Hang basket frame and adjust levellers." },
//   { id: "pantry-half", name: "Half Height Pantry System", category: "pantry", categoryLabel: "Pantry", price: 3200, unit: "set",
//     shortSpec: "Half height · Multi-tier · Soft close",
//     description: "Half-height pantry system for under-counter or mid-height cabinet storage.",
//     specs: { Type: "Half Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Under-counter cabinets","Storage"], install: "Standard pantry install — use provided drilling template." },

//   // S CORNER
//   { id: "s-corner-800", name: "S Corner Unit 800×800mm", category: "s-corner", categoryLabel: "S Corner", price: 3800, unit: "set",
//     shortSpec: "800×800mm · Full rotation · SS",
//     description: "Kidney-shaped S-corner rotating unit for L-shaped corner cabinets. Full rotation for maximum accessibility.",
//     specs: { Size: "800×800mm", Material: "SS", Type: "Rotating" },
//     applications: ["L-shaped kitchens","Corner cabinets"], install: "Fix central pole to top and bottom of cabinet. Mount shelves at desired heights." },
//   { id: "s-corner-900", name: "S Corner Unit 900×900mm", category: "s-corner", categoryLabel: "S Corner", price: 4200, unit: "set",
//     shortSpec: "900×900mm · Full rotation · SS", badge: "Popular",
//     description: "Larger S-corner unit for wider corner cabinets. Smooth bearing rotation with high load capacity.",
//     specs: { Size: "900×900mm", Material: "SS", Type: "Rotating" },
//     applications: ["Large corner cabinets","Premium kitchens"], install: "Ensure cabinet is perfectly square before installation." },

//   // UMC
//   { id: "umc-standard", name: "UMC Under Mount Channel", category: "umc", categoryLabel: "UMC", price: 1800, unit: "pair",
//     shortSpec: "Under mount · Soft close · Concealed",
//     description: "Under-mount concealed drawer slide with integrated soft-close. Invisible from outside for clean aesthetics.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Visibility: "Concealed" },
//     applications: ["Premium kitchen drawers","Furniture"], install: "Mount to drawer bottom; clip into cabinet bracket. Adjust via 3-way adjustment screw." },
//   { id: "umc-heavy", name: "UMC Under Mount Channel Heavy", category: "umc", categoryLabel: "UMC", price: 2400, unit: "pair",
//     shortSpec: "Under mount · Soft close · 50kg", badge: "Heavy Duty",
//     description: "Heavy-duty under-mount channel for thick or heavy drawer boxes up to 50kg.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Load: "50kg" },
//     applications: ["Heavy kitchen drawers","Stone-top drawers"], install: "Same as standard UMC; verify cabinet floor can take added load." },

//   // SKY WHEEL
//   { id: "sky-wheel-600", name: "Sky Wheel Corner Unit 600mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 5500, unit: "set",
//     shortSpec: "600mm · Rotating shelves · Premium",
//     description: "Sky wheel rotating corner unit with butterfly-opening shelves. Full access to deep corner cabinet space.",
//     specs: { Width: "600mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Corner cabinets","Premium kitchens"], install: "Fix hinge arms to door panels. Attach shelf brackets to central runner." },
//   { id: "sky-wheel-700", name: "Sky Wheel Corner Unit 700mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 6200, unit: "set",
//     shortSpec: "700mm · Rotating shelves · Premium", badge: "Premium",
//     description: "Larger sky wheel unit for 700mm corner cabinets. Extra shelf depth for maximum storage.",
//     specs: { Width: "700mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Large corner cabinets","Luxury kitchens"], install: "Align door panels carefully before fixing shelf arms for smooth butterfly action." },
// ];

// export const CATEGORIES: { id: Category; label: string; desc: string; icon: string }[] = [
//   { id: "hinges",        label: "Hinges",         desc: "Premium SS butt hinges — precision-engineered for every door",     icon: "🔩" },
//   { id: "channel",       label: "Channel",        desc: "Telescopic drawer channels, full extension & soft close",          icon: "📐" },
//   { id: "tandem",        label: "Tandem",         desc: "Tandem box drawer systems with integrated soft-close",             icon: "🗂️" },
//   { id: "pullout",       label: "Pullout",        desc: "SS wire pullout baskets for kitchen base cabinets",               icon: "🧺" },
//   { id: "bottle-pullout",label: "Bottle Pull Out",desc: "Dedicated bottle organisers for narrow cabinet units",            icon: "🍶" },
//   { id: "pantry",        label: "Pantry",         desc: "Full & half height pantry pull-out systems with soft close",      icon: "🚪" },
//   { id: "s-corner",      label: "S Corner",       desc: "Rotating S-corner units for L-shaped corner cabinets",           icon: "🔄" },
//   { id: "umc",           label: "UMC",            desc: "Under-mount concealed channels — invisible, smooth, soft close",  icon: "⚙️" },
//   { id: "sky-wheel",     label: "Sky Wheel",      desc: "Sky wheel butterfly corner units for premium kitchens",           icon: "🌀" },
// ];

// export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }
// export type Category =
//   | "hinges"
//   | "channel"
//   | "tandem"
//   | "pullout"
//   | "bottle-pullout"
//   | "pantry"
//   | "s-corner"
//   | "umc"
//   | "sky-wheel";

// export interface Product {
//   id: string;
//   name: string;
//   category: Category;
//   categoryLabel: string;
//   price: number;
//   unit: string;
//   shortSpec: string;
//   description: string;
//   finishes?: string[];
//   sizes?: string[];
//   specs: Record<string, string>;
//   applications: string[];
//   install: string;
//   badge?: string;
// }

// export const FINISH_COLORS: Record<string, string> = {
//   "Matt Silver": "#C0C0C0",
//   "Glossy": "#E8E8E8",
//   "Antique": "#8B6F47",
//   "Matt Black": "#1a1a1a",
//   "Antique Matt": "#6B5333",
//   "Satin": "#A8A8A8",
//   "Rose Gold": "#B76E79",
//   "Blackening": "#222",
//   "Nickel": "#C0C0C0",
// };

// const ALL_HINGE_FINISHES = ["Matt Silver", "Glossy", "Antique", "Matt Black", "Antique Matt", "Satin", "Rose Gold"];

// export const PRODUCTS: Product[] = [
//   // HINGES
//   { id: "hinge-75-13", name: "SS Butt Hinge 75×13×19mm", category: "hinges", categoryLabel: "Hinges", price: 38, unit: "pc",
//     shortSpec: "1.5mm thick · 45g · 6 finishes",
//     description: "Premium stainless steel butt hinge with smooth pivot action. Ideal for light to medium-duty cabinet and wardrobe doors.",
//     finishes: ["Matt Silver","Glossy","Antique","Matt Black","Antique Matt","Satin"],
//     specs: { Material: "SS 304", Thickness: "1.5mm", Weight: "45g", Size: "75×13×19mm", Pivot: "Steel pin" },
//     applications: ["Cabinets", "Wardrobes", "Light doors"],
//     install: "Mark hinge positions, drill pilot holes, fix with countersunk screws (sold separately)." },
//   { id: "hinge-75-3-14", name: "SS Butt Hinge 75×3×14mm", category: "hinges", categoryLabel: "Hinges", price: 43, unit: "pc",
//     shortSpec: "1.8mm thick · 70g · 7 finishes",
//     description: "Heavier-gauge 75mm hinge for medium-weight doors. Smooth, silent operation tested to 50,000 cycles.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "70g", Size: "75×3×14mm" },
//     applications: ["Wardrobes","Cabinet doors"], install: "Standard butt-hinge install — recess into door edge for flush fit." },
//   { id: "hinge-100", name: "SS Butt Hinge 100×4×14mm", category: "hinges", categoryLabel: "Hinges", price: 70, unit: "pc",
//     shortSpec: "1.8mm · 110g · Heavy Duty", badge: "Heavy Duty",
//     description: "Heavy-duty 100mm hinge engineered for larger wardrobe and room doors.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "110g", Size: "100×4×14mm" },
//     applications: ["Room doors","Heavy wardrobes"], install: "Use 3 hinges per door for doors above 1.8m height." },
//   { id: "hinge-125", name: "SS Butt Hinge 125×5×14mm", category: "hinges", categoryLabel: "Hinges", price: 88, unit: "pc",
//     shortSpec: "1.8mm · 155g · 7 finishes",
//     description: "Large 125mm hinge for premium interior doors. Precision-engineered pivot for whisper-quiet motion.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "155g", Size: "125×5×14mm" },
//     applications: ["Interior doors","Premium wardrobes"], install: "Recommend 3 hinges per door for loads above 25kg." },
//   { id: "hinge-150", name: "SS Butt Hinge 150×6×10mm", category: "hinges", categoryLabel: "Hinges", price: 220, unit: "pc",
//     shortSpec: "3.0mm · 375g · Extra Heavy", badge: "Extra Heavy",
//     description: "The flagship 150mm 3mm-thick hinge for the heaviest applications — entry doors, hotel rooms, contract installs.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "3.0mm", Weight: "375g", Size: "150×6×10mm" },
//     applications: ["Entry doors","Hotels","Contract"], install: "Use 4 hinges for doors over 2.1m. Pre-drill pilot holes." },

//   // CHANNEL
//   { id: "channel-18", name: 'Telescopic Channel 18"', category: "channel", categoryLabel: "Channel", price: 450, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
//     specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
//   { id: "channel-24", name: 'Telescopic Channel 24"', category: "channel", categoryLabel: "Channel", price: 650, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
//     specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

//   // TANDEM
//   { id: "tandem-450", name: "Tandem Box System 450mm", category: "tandem", categoryLabel: "Tandem", price: 1200, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "Premium tandem box drawer system with integrated soft-close and tool-free assembly.",
//     specs: { Length: "450mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Modular kitchens","Premium wardrobes"], install: "Clip side panels onto runner, adjust height with integrated screw." },
//   { id: "tandem-500", name: "Tandem Box System 500mm", category: "tandem", categoryLabel: "Tandem", price: 1350, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "500mm tandem box for wider kitchen drawers with full extension and damped closure.",
//     specs: { Length: "500mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Kitchen drawers","Storage cabinets"], install: "Standard tandem install — use provided jig for consistent positioning." },

//   // PULLOUT
//   { id: "pullout-single", name: "Single Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 780, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg",
//     description: "Stainless steel wire pullout basket for kitchen base cabinets. Full extension with smooth glide.",
//     specs: { Material: "SS", Layers: "1", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Storage"], install: "Fix channel to cabinet side walls at desired height." },
//   { id: "pullout-double", name: "Double Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 1100, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg", badge: "Popular",
//     description: "Double-layer pullout basket maximising vertical space in base cabinets.",
//     specs: { Material: "SS", Layers: "2", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Pantry units"], install: "Mount both layers on the same channel frame; adjust spacing as needed." },

//   // BOTTLE PULLOUT
//   { id: "bottle-pullout-300", name: "Bottle Pullout 300mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 950, unit: "pc",
//     shortSpec: "300mm wide · SS wire · Full extension",
//     description: "Dedicated bottle pullout organiser for 300mm narrow base cabinets. Stores bottles upright with secure wire partitions.",
//     specs: { Width: "300mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Narrow kitchen cabinets","Bar units"], install: "Mount channel rails to cabinet sides. Ensure level for smooth glide." },
//   { id: "bottle-pullout-450", name: "Bottle Pullout 450mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 1150, unit: "pc",
//     shortSpec: "450mm wide · SS wire · Full extension",
//     description: "Wider bottle pullout for larger base cabinets. Fits standard wine and water bottles.",
//     specs: { Width: "450mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Kitchen cabinets","Pantry"], install: "Align rails precisely for smooth full-extension pull." },

//   // PANTRY
//   { id: "pantry-tall", name: "Tall Pantry Unit System", category: "pantry", categoryLabel: "Pantry", price: 4500, unit: "set",
//     shortSpec: "Full height · Multi-tier · Soft close",
//     description: "Complete tall pantry pull-out system with multi-tier wire baskets and soft-close mechanism for full-height cabinets.",
//     specs: { Type: "Tall Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Tall kitchen cabinets","Pantry units"], install: "Fix upper and lower runners to cabinet. Hang basket frame and adjust levellers." },
//   { id: "pantry-half", name: "Half Height Pantry System", category: "pantry", categoryLabel: "Pantry", price: 3200, unit: "set",
//     shortSpec: "Half height · Multi-tier · Soft close",
//     description: "Half-height pantry system for under-counter or mid-height cabinet storage.",
//     specs: { Type: "Half Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Under-counter cabinets","Storage"], install: "Standard pantry install — use provided drilling template." },

//   // S CORNER
//   { id: "s-corner-800", name: "S Corner Unit 800×800mm", category: "s-corner", categoryLabel: "S Corner", price: 3800, unit: "set",
//     shortSpec: "800×800mm · Full rotation · SS",
//     description: "Kidney-shaped S-corner rotating unit for L-shaped corner cabinets. Full rotation for maximum accessibility.",
//     specs: { Size: "800×800mm", Material: "SS", Type: "Rotating" },
//     applications: ["L-shaped kitchens","Corner cabinets"], install: "Fix central pole to top and bottom of cabinet. Mount shelves at desired heights." },
//   { id: "s-corner-900", name: "S Corner Unit 900×900mm", category: "s-corner", categoryLabel: "S Corner", price: 4200, unit: "set",
//     shortSpec: "900×900mm · Full rotation · SS", badge: "Popular",
//     description: "Larger S-corner unit for wider corner cabinets. Smooth bearing rotation with high load capacity.",
//     specs: { Size: "900×900mm", Material: "SS", Type: "Rotating" },
//     applications: ["Large corner cabinets","Premium kitchens"], install: "Ensure cabinet is perfectly square before installation." },

//   // UMC
//   { id: "umc-standard", name: "UMC Under Mount Channel", category: "umc", categoryLabel: "UMC", price: 1800, unit: "pair",
//     shortSpec: "Under mount · Soft close · Concealed",
//     description: "Under-mount concealed drawer slide with integrated soft-close. Invisible from outside for clean aesthetics.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Visibility: "Concealed" },
//     applications: ["Premium kitchen drawers","Furniture"], install: "Mount to drawer bottom; clip into cabinet bracket. Adjust via 3-way adjustment screw." },
//   { id: "umc-heavy", name: "UMC Under Mount Channel Heavy", category: "umc", categoryLabel: "UMC", price: 2400, unit: "pair",
//     shortSpec: "Under mount · Soft close · 50kg", badge: "Heavy Duty",
//     description: "Heavy-duty under-mount channel for thick or heavy drawer boxes up to 50kg.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Load: "50kg" },
//     applications: ["Heavy kitchen drawers","Stone-top drawers"], install: "Same as standard UMC; verify cabinet floor can take added load." },

//   // SKY WHEEL
//   { id: "sky-wheel-600", name: "Sky Wheel Corner Unit 600mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 5500, unit: "set",
//     shortSpec: "600mm · Rotating shelves · Premium",
//     description: "Sky wheel rotating corner unit with butterfly-opening shelves. Full access to deep corner cabinet space.",
//     specs: { Width: "600mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Corner cabinets","Premium kitchens"], install: "Fix hinge arms to door panels. Attach shelf brackets to central runner." },
//   { id: "sky-wheel-700", name: "Sky Wheel Corner Unit 700mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 6200, unit: "set",
//     shortSpec: "700mm · Rotating shelves · Premium", badge: "Premium",
//     description: "Larger sky wheel unit for 700mm corner cabinets. Extra shelf depth for maximum storage.",
//     specs: { Width: "700mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Large corner cabinets","Luxury kitchens"], install: "Align door panels carefully before fixing shelf arms for smooth butterfly action." },
// ];

// export const CATEGORIES: { id: Category; label: string; desc: string; icon: string }[] = [
//   { id: "hinges",         label: "Hinges",          desc: "Premium SS butt hinges — precision-engineered for every door",    icon: "🔩" },
//   { id: "channel",        label: "Channel",         desc: "Telescopic drawer channels, full extension & soft close",         icon: "📐" },
//   { id: "tandem",         label: "Tandem",          desc: "Tandem box drawer systems with integrated soft-close",            icon: "🗂️" },
//   { id: "pullout",        label: "Pullout",         desc: "SS wire pullout baskets for kitchen base cabinets",              icon: "🧺" },
//   { id: "bottle-pullout", label: "Bottle Pull Out", desc: "Dedicated bottle organisers for narrow cabinet units",           icon: "🍶" },
//   { id: "pantry",         label: "Pantry",          desc: "Full & half height pantry pull-out systems with soft close",     icon: "🚪" },
//   { id: "s-corner",       label: "S Corner",        desc: "Rotating S-corner units for L-shaped corner cabinets",          icon: "🔄" },
//   { id: "umc",            label: "UMC",             desc: "Under-mount concealed channels — invisible, smooth, soft close", icon: "⚙️" },
//   { id: "sky-wheel",      label: "Sky Wheel",       desc: "Sky wheel butterfly corner units for premium kitchens",          icon: "🌀" },
// ];

// export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }


// export type Category =
//   | "hinges"
//   | "channel"
//   | "tandem"
//   | "pullout"
//   | "bottle-pullout"
//   | "pantry"
//   | "s-corner"
//   | "umc"
//   | "sky-wheel";

// export interface Product {
//   id: string;
//   name: string;
//   category: Category;
//   categoryLabel: string;
//   price: number;
//   unit: string;
//   shortSpec: string;
//   description: string;
//   finishes?: string[];
//   sizes?: string[];
//   specs: Record<string, string>;
//   applications: string[];
//   install: string;
//   badge?: string;
// }

// export const FINISH_COLORS: Record<string, string> = {
//   "Matt Silver": "#C0C0C0",
//   "Glossy": "#E8E8E8",
//   "Antique": "#8B6F47",
//   "Matt Black": "#1a1a1a",
//   "Antique Matt": "#6B5333",
//   "Satin": "#A8A8A8",
//   "Rose Gold": "#B76E79",
//   "Blackening": "#222",
//   "Nickel": "#C0C0C0",
// };

// const ALL_HINGE_FINISHES = ["Matt Silver", "Glossy", "Antique", "Matt Black", "Antique Matt", "Satin", "Rose Gold"];

// export const PRODUCTS: Product[] = [
//   // HINGES
//   { id: "hinge-75-13", name: "SS Butt Hinge 75×13×19mm", category: "hinges", categoryLabel: "Hinges", price: 38, unit: "pc",
//     shortSpec: "1.5mm thick · 45g · 6 finishes",
//     description: "Premium stainless steel butt hinge with smooth pivot action. Ideal for light to medium-duty cabinet and wardrobe doors.",
//     finishes: ["Matt Silver","Glossy","Antique","Matt Black","Antique Matt","Satin"],
//     specs: { Material: "SS 304", Thickness: "1.5mm", Weight: "45g", Size: "75×13×19mm", Pivot: "Steel pin" },
//     applications: ["Cabinets", "Wardrobes", "Light doors"],
//     install: "Mark hinge positions, drill pilot holes, fix with countersunk screws (sold separately)." },
//   { id: "hinge-75-3-14", name: "SS Butt Hinge 75×3×14mm", category: "hinges", categoryLabel: "Hinges", price: 43, unit: "pc",
//     shortSpec: "1.8mm thick · 70g · 7 finishes",
//     description: "Heavier-gauge 75mm hinge for medium-weight doors. Smooth, silent operation tested to 50,000 cycles.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "70g", Size: "75×3×14mm" },
//     applications: ["Wardrobes","Cabinet doors"], install: "Standard butt-hinge install — recess into door edge for flush fit." },
//   { id: "hinge-100", name: "SS Butt Hinge 100×4×14mm", category: "hinges", categoryLabel: "Hinges", price: 70, unit: "pc",
//     shortSpec: "1.8mm · 110g · Heavy Duty", badge: "Heavy Duty",
//     description: "Heavy-duty 100mm hinge engineered for larger wardrobe and room doors.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "110g", Size: "100×4×14mm" },
//     applications: ["Room doors","Heavy wardrobes"], install: "Use 3 hinges per door for doors above 1.8m height." },
//   { id: "hinge-125", name: "SS Butt Hinge 125×5×14mm", category: "hinges", categoryLabel: "Hinges", price: 88, unit: "pc",
//     shortSpec: "1.8mm · 155g · 7 finishes",
//     description: "Large 125mm hinge for premium interior doors. Precision-engineered pivot for whisper-quiet motion.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "155g", Size: "125×5×14mm" },
//     applications: ["Interior doors","Premium wardrobes"], install: "Recommend 3 hinges per door for loads above 25kg." },
//   { id: "hinge-150", name: "SS Butt Hinge 150×6×10mm", category: "hinges", categoryLabel: "Hinges", price: 220, unit: "pc",
//     shortSpec: "3.0mm · 375g · Extra Heavy", badge: "Extra Heavy",
//     description: "The flagship 150mm 3mm-thick hinge for the heaviest applications — entry doors, hotel rooms, contract installs.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "3.0mm", Weight: "375g", Size: "150×6×10mm" },
//     applications: ["Entry doors","Hotels","Contract"], install: "Use 4 hinges for doors over 2.1m. Pre-drill pilot holes." },

//   // CHANNEL
//   { id: "channel-18", name: 'Telescopic Channel 18"', category: "channel", categoryLabel: "Channel", price: 450, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
//     specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
//   { id: "channel-24", name: 'Telescopic Channel 24"', category: "channel", categoryLabel: "Channel", price: 650, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
//     specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

//   // TANDEM
//   { id: "tandem-450", name: "Tandem Box System 450mm", category: "tandem", categoryLabel: "Tandem", price: 1200, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "Premium tandem box drawer system with integrated soft-close and tool-free assembly.",
//     specs: { Length: "450mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Modular kitchens","Premium wardrobes"], install: "Clip side panels onto runner, adjust height with integrated screw." },
//   { id: "tandem-500", name: "Tandem Box System 500mm", category: "tandem", categoryLabel: "Tandem", price: 1350, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "500mm tandem box for wider kitchen drawers with full extension and damped closure.",
//     specs: { Length: "500mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Kitchen drawers","Storage cabinets"], install: "Standard tandem install — use provided jig for consistent positioning." },

//   // PULLOUT
//   { id: "pullout-single", name: "Single Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 780, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg",
//     description: "Stainless steel wire pullout basket for kitchen base cabinets. Full extension with smooth glide.",
//     specs: { Material: "SS", Layers: "1", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Storage"], install: "Fix channel to cabinet side walls at desired height." },
//   { id: "pullout-double", name: "Double Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 1100, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg", badge: "Popular",
//     description: "Double-layer pullout basket maximising vertical space in base cabinets.",
//     specs: { Material: "SS", Layers: "2", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Pantry units"], install: "Mount both layers on the same channel frame; adjust spacing as needed." },

//   // BOTTLE PULLOUT
//   { id: "bottle-pullout-300", name: "Bottle Pullout 300mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 950, unit: "pc",
//     shortSpec: "300mm wide · SS wire · Full extension",
//     description: "Dedicated bottle pullout organiser for 300mm narrow base cabinets. Stores bottles upright with secure wire partitions.",
//     specs: { Width: "300mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Narrow kitchen cabinets","Bar units"], install: "Mount channel rails to cabinet sides. Ensure level for smooth glide." },
//   { id: "bottle-pullout-450", name: "Bottle Pullout 450mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 1150, unit: "pc",
//     shortSpec: "450mm wide · SS wire · Full extension",
//     description: "Wider bottle pullout for larger base cabinets. Fits standard wine and water bottles.",
//     specs: { Width: "450mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Kitchen cabinets","Pantry"], install: "Align rails precisely for smooth full-extension pull." },

//   // PANTRY
//   { id: "pantry-tall", name: "Tall Pantry Unit System", category: "pantry", categoryLabel: "Pantry", price: 4500, unit: "set",
//     shortSpec: "Full height · Multi-tier · Soft close",
//     description: "Complete tall pantry pull-out system with multi-tier wire baskets and soft-close mechanism for full-height cabinets.",
//     specs: { Type: "Tall Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Tall kitchen cabinets","Pantry units"], install: "Fix upper and lower runners to cabinet. Hang basket frame and adjust levellers." },
//   { id: "pantry-half", name: "Half Height Pantry System", category: "pantry", categoryLabel: "Pantry", price: 3200, unit: "set",
//     shortSpec: "Half height · Multi-tier · Soft close",
//     description: "Half-height pantry system for under-counter or mid-height cabinet storage.",
//     specs: { Type: "Half Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Under-counter cabinets","Storage"], install: "Standard pantry install — use provided drilling template." },

//   // S CORNER
//   { id: "s-corner-800", name: "S Corner Unit 800×800mm", category: "s-corner", categoryLabel: "S Corner", price: 3800, unit: "set",
//     shortSpec: "800×800mm · Full rotation · SS",
//     description: "Kidney-shaped S-corner rotating unit for L-shaped corner cabinets. Full rotation for maximum accessibility.",
//     specs: { Size: "800×800mm", Material: "SS", Type: "Rotating" },
//     applications: ["L-shaped kitchens","Corner cabinets"], install: "Fix central pole to top and bottom of cabinet. Mount shelves at desired heights." },
//   { id: "s-corner-900", name: "S Corner Unit 900×900mm", category: "s-corner", categoryLabel: "S Corner", price: 4200, unit: "set",
//     shortSpec: "900×900mm · Full rotation · SS", badge: "Popular",
//     description: "Larger S-corner unit for wider corner cabinets. Smooth bearing rotation with high load capacity.",
//     specs: { Size: "900×900mm", Material: "SS", Type: "Rotating" },
//     applications: ["Large corner cabinets","Premium kitchens"], install: "Ensure cabinet is perfectly square before installation." },

//   // UMC
//   { id: "umc-standard", name: "UMC Under Mount Channel", category: "umc", categoryLabel: "UMC", price: 1800, unit: "pair",
//     shortSpec: "Under mount · Soft close · Concealed",
//     description: "Under-mount concealed drawer slide with integrated soft-close. Invisible from outside for clean aesthetics.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Visibility: "Concealed" },
//     applications: ["Premium kitchen drawers","Furniture"], install: "Mount to drawer bottom; clip into cabinet bracket. Adjust via 3-way adjustment screw." },
//   { id: "umc-heavy", name: "UMC Under Mount Channel Heavy", category: "umc", categoryLabel: "UMC", price: 2400, unit: "pair",
//     shortSpec: "Under mount · Soft close · 50kg", badge: "Heavy Duty",
//     description: "Heavy-duty under-mount channel for thick or heavy drawer boxes up to 50kg.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Load: "50kg" },
//     applications: ["Heavy kitchen drawers","Stone-top drawers"], install: "Same as standard UMC; verify cabinet floor can take added load." },

//   // SKY WHEEL
//   { id: "sky-wheel-600", name: "Sky Wheel Corner Unit 600mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 5500, unit: "set",
//     shortSpec: "600mm · Rotating shelves · Premium",
//     description: "Sky wheel rotating corner unit with butterfly-opening shelves. Full access to deep corner cabinet space.",
//     specs: { Width: "600mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Corner cabinets","Premium kitchens"], install: "Fix hinge arms to door panels. Attach shelf brackets to central runner." },
//   { id: "sky-wheel-700", name: "Sky Wheel Corner Unit 700mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 6200, unit: "set",
//     shortSpec: "700mm · Rotating shelves · Premium", badge: "Premium",
//     description: "Larger sky wheel unit for 700mm corner cabinets. Extra shelf depth for maximum storage.",
//     specs: { Width: "700mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Large corner cabinets","Luxury kitchens"], install: "Align door panels carefully before fixing shelf arms for smooth butterfly action." },
// ];

// export const CATEGORIES: { id: Category; label: string; desc: string; icon: string }[] = [
//   { id: "hinges",        label: "Hinges",         desc: "Premium SS butt hinges — precision-engineered for every door",     icon: "🔩" },
//   { id: "channel",       label: "Channel",        desc: "Telescopic drawer channels, full extension & soft close",          icon: "📐" },
//   { id: "tandem",        label: "Tandem",         desc: "Tandem box drawer systems with integrated soft-close",             icon: "🗂️" },
//   { id: "pullout",       label: "Pullout",        desc: "SS wire pullout baskets for kitchen base cabinets",               icon: "🧺" },
//   { id: "bottle-pullout",label: "Bottle Pull Out",desc: "Dedicated bottle organisers for narrow cabinet units",            icon: "🍶" },
//   { id: "pantry",        label: "Pantry",         desc: "Full & half height pantry pull-out systems with soft close",      icon: "🚪" },
//   { id: "s-corner",      label: "S Corner",       desc: "Rotating S-corner units for L-shaped corner cabinets",           icon: "🔄" },
//   { id: "umc",           label: "UMC",            desc: "Under-mount concealed channels — invisible, smooth, soft close",  icon: "⚙️" },
//   { id: "sky-wheel",     label: "Sky Wheel",      desc: "Sky wheel butterfly corner units for premium kitchens",           icon: "🌀" },
// ];

// // export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }
// export type Category =
//   | "hinges"
//   | "channel"
//   | "tandem"
//   | "pullout"
//   | "bottle-pullout"
//   | "pantry"
//   | "s-corner"
//   | "umc"
//   | "sky-wheel";

// export interface Product {
//   id: string;
//   name: string;
//   category: Category;
//   categoryLabel: string;
//   price: number;
//   unit: string;
//   shortSpec: string;
//   description: string;
//   finishes?: string[];
//   sizes?: string[];
//   specs: Record<string, string>;
//   applications: string[];
//   install: string;
//   badge?: string;
// }

// export const FINISH_COLORS: Record<string, string> = {
//   "Matt Silver": "#C0C0C0",
//   "Glossy": "#E8E8E8",
//   "Antique": "#8B6F47",
//   "Matt Black": "#1a1a1a",
//   "Antique Matt": "#6B5333",
//   "Satin": "#A8A8A8",
//   "Rose Gold": "#B76E79",
//   "Blackening": "#222",
//   "Nickel": "#C0C0C0",
// };

// const ALL_HINGE_FINISHES = ["Matt Silver", "Glossy", "Antique", "Matt Black", "Antique Matt", "Satin", "Rose Gold"];

// export const PRODUCTS: Product[] = [
//   // HINGES
//   { id: "hinge-75-13", name: "SS Butt Hinge 75×13×19mm", category: "hinges", categoryLabel: "Hinges", price: 38, unit: "pc",
//     shortSpec: "1.5mm thick · 45g · 6 finishes",
//     description: "Premium stainless steel butt hinge with smooth pivot action. Ideal for light to medium-duty cabinet and wardrobe doors.",
//     finishes: ["Matt Silver","Glossy","Antique","Matt Black","Antique Matt","Satin"],
//     specs: { Material: "SS 304", Thickness: "1.5mm", Weight: "45g", Size: "75×13×19mm", Pivot: "Steel pin" },
//     applications: ["Cabinets", "Wardrobes", "Light doors"],
//     install: "Mark hinge positions, drill pilot holes, fix with countersunk screws (sold separately)." },
//   { id: "hinge-75-3-14", name: "SS Butt Hinge 75×3×14mm", category: "hinges", categoryLabel: "Hinges", price: 43, unit: "pc",
//     shortSpec: "1.8mm thick · 70g · 7 finishes",
//     description: "Heavier-gauge 75mm hinge for medium-weight doors. Smooth, silent operation tested to 50,000 cycles.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "70g", Size: "75×3×14mm" },
//     applications: ["Wardrobes","Cabinet doors"], install: "Standard butt-hinge install — recess into door edge for flush fit." },
//   { id: "hinge-100", name: "SS Butt Hinge 100×4×14mm", category: "hinges", categoryLabel: "Hinges", price: 70, unit: "pc",
//     shortSpec: "1.8mm · 110g · Heavy Duty", badge: "Heavy Duty",
//     description: "Heavy-duty 100mm hinge engineered for larger wardrobe and room doors.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "110g", Size: "100×4×14mm" },
//     applications: ["Room doors","Heavy wardrobes"], install: "Use 3 hinges per door for doors above 1.8m height." },
//   { id: "hinge-125", name: "SS Butt Hinge 125×5×14mm", category: "hinges", categoryLabel: "Hinges", price: 88, unit: "pc",
//     shortSpec: "1.8mm · 155g · 7 finishes",
//     description: "Large 125mm hinge for premium interior doors. Precision-engineered pivot for whisper-quiet motion.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "155g", Size: "125×5×14mm" },
//     applications: ["Interior doors","Premium wardrobes"], install: "Recommend 3 hinges per door for loads above 25kg." },
//   { id: "hinge-150", name: "SS Butt Hinge 150×6×10mm", category: "hinges", categoryLabel: "Hinges", price: 220, unit: "pc",
//     shortSpec: "3.0mm · 375g · Extra Heavy", badge: "Extra Heavy",
//     description: "The flagship 150mm 3mm-thick hinge for the heaviest applications — entry doors, hotel rooms, contract installs.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "3.0mm", Weight: "375g", Size: "150×6×10mm" },
//     applications: ["Entry doors","Hotels","Contract"], install: "Use 4 hinges for doors over 2.1m. Pre-drill pilot holes." },

//   // CHANNEL
//   { id: "channel-18", name: 'Telescopic Channel 18"', category: "channel", categoryLabel: "Channel", price: 450, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
//     specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
//   { id: "channel-24", name: 'Telescopic Channel 24"', category: "channel", categoryLabel: "Channel", price: 650, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
//     specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

//   // TANDEM
//   { id: "tandem-450", name: "Tandem Box System 450mm", category: "tandem", categoryLabel: "Tandem", price: 1200, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "Premium tandem box drawer system with integrated soft-close and tool-free assembly.",
//     specs: { Length: "450mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Modular kitchens","Premium wardrobes"], install: "Clip side panels onto runner, adjust height with integrated screw." },
//   { id: "tandem-500", name: "Tandem Box System 500mm", category: "tandem", categoryLabel: "Tandem", price: 1350, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "500mm tandem box for wider kitchen drawers with full extension and damped closure.",
//     specs: { Length: "500mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Kitchen drawers","Storage cabinets"], install: "Standard tandem install — use provided jig for consistent positioning." },

//   // PULLOUT
//   { id: "pullout-single", name: "Single Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 780, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg",
//     description: "Stainless steel wire pullout basket for kitchen base cabinets. Full extension with smooth glide.",
//     specs: { Material: "SS", Layers: "1", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Storage"], install: "Fix channel to cabinet side walls at desired height." },
//   { id: "pullout-double", name: "Double Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 1100, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg", badge: "Popular",
//     description: "Double-layer pullout basket maximising vertical space in base cabinets.",
//     specs: { Material: "SS", Layers: "2", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Pantry units"], install: "Mount both layers on the same channel frame; adjust spacing as needed." },

//   // BOTTLE PULLOUT
//   { id: "bottle-pullout-300", name: "Bottle Pullout 300mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 950, unit: "pc",
//     shortSpec: "300mm wide · SS wire · Full extension",
//     description: "Dedicated bottle pullout organiser for 300mm narrow base cabinets. Stores bottles upright with secure wire partitions.",
//     specs: { Width: "300mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Narrow kitchen cabinets","Bar units"], install: "Mount channel rails to cabinet sides. Ensure level for smooth glide." },
//   { id: "bottle-pullout-450", name: "Bottle Pullout 450mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 1150, unit: "pc",
//     shortSpec: "450mm wide · SS wire · Full extension",
//     description: "Wider bottle pullout for larger base cabinets. Fits standard wine and water bottles.",
//     specs: { Width: "450mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Kitchen cabinets","Pantry"], install: "Align rails precisely for smooth full-extension pull." },

//   // PANTRY
//   { id: "pantry-tall", name: "Tall Pantry Unit System", category: "pantry", categoryLabel: "Pantry", price: 4500, unit: "set",
//     shortSpec: "Full height · Multi-tier · Soft close",
//     description: "Complete tall pantry pull-out system with multi-tier wire baskets and soft-close mechanism for full-height cabinets.",
//     specs: { Type: "Tall Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Tall kitchen cabinets","Pantry units"], install: "Fix upper and lower runners to cabinet. Hang basket frame and adjust levellers." },
//   { id: "pantry-half", name: "Half Height Pantry System", category: "pantry", categoryLabel: "Pantry", price: 3200, unit: "set",
//     shortSpec: "Half height · Multi-tier · Soft close",
//     description: "Half-height pantry system for under-counter or mid-height cabinet storage.",
//     specs: { Type: "Half Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Under-counter cabinets","Storage"], install: "Standard pantry install — use provided drilling template." },

//   // S CORNER
//   { id: "s-corner-800", name: "S Corner Unit 800×800mm", category: "s-corner", categoryLabel: "S Corner", price: 3800, unit: "set",
//     shortSpec: "800×800mm · Full rotation · SS",
//     description: "Kidney-shaped S-corner rotating unit for L-shaped corner cabinets. Full rotation for maximum accessibility.",
//     specs: { Size: "800×800mm", Material: "SS", Type: "Rotating" },
//     applications: ["L-shaped kitchens","Corner cabinets"], install: "Fix central pole to top and bottom of cabinet. Mount shelves at desired heights." },
//   { id: "s-corner-900", name: "S Corner Unit 900×900mm", category: "s-corner", categoryLabel: "S Corner", price: 4200, unit: "set",
//     shortSpec: "900×900mm · Full rotation · SS", badge: "Popular",
//     description: "Larger S-corner unit for wider corner cabinets. Smooth bearing rotation with high load capacity.",
//     specs: { Size: "900×900mm", Material: "SS", Type: "Rotating" },
//     applications: ["Large corner cabinets","Premium kitchens"], install: "Ensure cabinet is perfectly square before installation." },

//   // UMC
//   { id: "umc-standard", name: "UMC Under Mount Channel", category: "umc", categoryLabel: "UMC", price: 1800, unit: "pair",
//     shortSpec: "Under mount · Soft close · Concealed",
//     description: "Under-mount concealed drawer slide with integrated soft-close. Invisible from outside for clean aesthetics.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Visibility: "Concealed" },
//     applications: ["Premium kitchen drawers","Furniture"], install: "Mount to drawer bottom; clip into cabinet bracket. Adjust via 3-way adjustment screw." },
//   { id: "umc-heavy", name: "UMC Under Mount Channel Heavy", category: "umc", categoryLabel: "UMC", price: 2400, unit: "pair",
//     shortSpec: "Under mount · Soft close · 50kg", badge: "Heavy Duty",
//     description: "Heavy-duty under-mount channel for thick or heavy drawer boxes up to 50kg.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Load: "50kg" },
//     applications: ["Heavy kitchen drawers","Stone-top drawers"], install: "Same as standard UMC; verify cabinet floor can take added load." },

//   // SKY WHEEL
//   { id: "sky-wheel-600", name: "Sky Wheel Corner Unit 600mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 5500, unit: "set",
//     shortSpec: "600mm · Rotating shelves · Premium",
//     description: "Sky wheel rotating corner unit with butterfly-opening shelves. Full access to deep corner cabinet space.",
//     specs: { Width: "600mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Corner cabinets","Premium kitchens"], install: "Fix hinge arms to door panels. Attach shelf brackets to central runner." },
//   { id: "sky-wheel-700", name: "Sky Wheel Corner Unit 700mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 6200, unit: "set",
//     shortSpec: "700mm · Rotating shelves · Premium", badge: "Premium",
//     description: "Larger sky wheel unit for 700mm corner cabinets. Extra shelf depth for maximum storage.",
//     specs: { Width: "700mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Large corner cabinets","Luxury kitchens"], install: "Align door panels carefully before fixing shelf arms for smooth butterfly action." },
// ];

// export const CATEGORIES: { id: Category; label: string; desc: string; icon: string; img?: string }[] = [
//   { id: "hinges",         label: "Hinges",          desc: "Premium SS butt hinges — precision-engineered for every door",    icon: "🔩", img: "/categories/hinges.jpg" },
//   { id: "channel",        label: "Channel",         desc: "Telescopic drawer channels, full extension & soft close",         icon: "📐", img: "/categories/channel.jpg" },
//   { id: "tandem",         label: "Tandem",          desc: "Tandem box drawer systems with integrated soft-close",            icon: "🗂️", img: "/categories/tandem.jpg" },
//   { id: "pullout",        label: "Pullout",         desc: "SS wire pullout baskets for kitchen base cabinets",              icon: "🧺", img: "/categories/pullout.jpg" },
//   { id: "bottle-pullout", label: "Bottle Pull Out", desc: "Dedicated bottle organisers for narrow cabinet units",           icon: "🍶", img: "/categories/bottle-pullout.jpg" },
//   { id: "pantry",         label: "Pantry",          desc: "Full & half height pantry pull-out systems with soft close",     icon: "🚪", img: "/categories/pantry.jpg" },
//   { id: "s-corner",       label: "S Corner",        desc: "Rotating S-corner units for L-shaped corner cabinets",          icon: "🔄", img: "/categories/s-corner.jpg" },
//   { id: "umc",            label: "UMC",             desc: "Under-mount concealed channels — invisible, smooth, soft close", icon: "⚙️", img: "/categories/umc.jpg" },
//   { id: "sky-wheel",      label: "Sky Wheel",       desc: "Sky wheel butterfly corner units for premium kitchens",          icon: "🌀", img: "/categories/sky-wheel.jpg" },
// ];

// export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }
// export type Category =
//   | "hinges"
//   | "channel"
//   | "tandem"
//   | "pullout"
//   | "bottle-pullout"
//   | "pantry"
//   | "s-corner"
//   | "umc"
//   | "sky-wheel";

// export interface Product {
//   id: string;
//   name: string;
//   category: Category;
//   categoryLabel: string;
//   price: number;
//   unit: string;
//   shortSpec: string;
//   description: string;
//   finishes?: string[];
//   sizes?: string[];
//   specs: Record<string, string>;
//   applications: string[];
//   install: string;
//   badge?: string;
// }

// export const FINISH_COLORS: Record<string, string> = {
//   "Matt Silver": "#C0C0C0",
//   "Glossy": "#E8E8E8",
//   "Antique": "#8B6F47",
//   "Matt Black": "#1a1a1a",
//   "Antique Matt": "#6B5333",
//   "Satin": "#A8A8A8",
//   "Rose Gold": "#B76E79",
//   "Blackening": "#222",
//   "Nickel": "#C0C0C0",
// };

// const ALL_HINGE_FINISHES = ["Matt Silver", "Glossy", "Antique", "Matt Black", "Antique Matt", "Satin", "Rose Gold"];

// export const PRODUCTS: Product[] = [
//   // HINGES
//   { id: "hinge-75-13", name: "SS Butt Hinge 75×13×19mm", category: "hinges", categoryLabel: "Hinges", price: 38, unit: "pc",
//     shortSpec: "1.5mm thick · 45g · 6 finishes",
//     description: "Premium stainless steel butt hinge with smooth pivot action. Ideal for light to medium-duty cabinet and wardrobe doors.",
//     finishes: ["Matt Silver","Glossy","Antique","Matt Black","Antique Matt","Satin"],
//     specs: { Material: "SS 304", Thickness: "1.5mm", Weight: "45g", Size: "75×13×19mm", Pivot: "Steel pin" },
//     applications: ["Cabinets", "Wardrobes", "Light doors"],
//     install: "Mark hinge positions, drill pilot holes, fix with countersunk screws (sold separately)." },
//   { id: "hinge-75-3-14", name: "SS Butt Hinge 75×3×14mm", category: "hinges", categoryLabel: "Hinges", price: 43, unit: "pc",
//     shortSpec: "1.8mm thick · 70g · 7 finishes",
//     description: "Heavier-gauge 75mm hinge for medium-weight doors. Smooth, silent operation tested to 50,000 cycles.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "70g", Size: "75×3×14mm" },
//     applications: ["Wardrobes","Cabinet doors"], install: "Standard butt-hinge install — recess into door edge for flush fit." },
//   { id: "hinge-100", name: "SS Butt Hinge 100×4×14mm", category: "hinges", categoryLabel: "Hinges", price: 70, unit: "pc",
//     shortSpec: "1.8mm · 110g · Heavy Duty", badge: "Heavy Duty",
//     description: "Heavy-duty 100mm hinge engineered for larger wardrobe and room doors.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "110g", Size: "100×4×14mm" },
//     applications: ["Room doors","Heavy wardrobes"], install: "Use 3 hinges per door for doors above 1.8m height." },
//   { id: "hinge-125", name: "SS Butt Hinge 125×5×14mm", category: "hinges", categoryLabel: "Hinges", price: 88, unit: "pc",
//     shortSpec: "1.8mm · 155g · 7 finishes",
//     description: "Large 125mm hinge for premium interior doors. Precision-engineered pivot for whisper-quiet motion.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "1.8mm", Weight: "155g", Size: "125×5×14mm" },
//     applications: ["Interior doors","Premium wardrobes"], install: "Recommend 3 hinges per door for loads above 25kg." },
//   { id: "hinge-150", name: "SS Butt Hinge 150×6×10mm", category: "hinges", categoryLabel: "Hinges", price: 220, unit: "pc",
//     shortSpec: "3.0mm · 375g · Extra Heavy", badge: "Extra Heavy",
//     description: "The flagship 150mm 3mm-thick hinge for the heaviest applications — entry doors, hotel rooms, contract installs.",
//     finishes: ALL_HINGE_FINISHES,
//     specs: { Material: "SS 304", Thickness: "3.0mm", Weight: "375g", Size: "150×6×10mm" },
//     applications: ["Entry doors","Hotels","Contract"], install: "Use 4 hinges for doors over 2.1m. Pre-drill pilot holes." },

//   // CHANNEL
//   { id: "channel-18", name: 'Telescopic Channel 18"', category: "channel", categoryLabel: "Channel", price: 450, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
//     specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
//   { id: "channel-24", name: 'Telescopic Channel 24"', category: "channel", categoryLabel: "Channel", price: 650, unit: "pair",
//     shortSpec: "Full extension · Soft close · 45kg",
//     description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
//     specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
//     applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

//   // TANDEM
//   { id: "tandem-450", name: "Tandem Box System 450mm", category: "tandem", categoryLabel: "Tandem", price: 1200, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "Premium tandem box drawer system with integrated soft-close and tool-free assembly.",
//     specs: { Length: "450mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Modular kitchens","Premium wardrobes"], install: "Clip side panels onto runner, adjust height with integrated screw." },
//   { id: "tandem-500", name: "Tandem Box System 500mm", category: "tandem", categoryLabel: "Tandem", price: 1350, unit: "set",
//     shortSpec: "Soft close · 40kg load · White",
//     description: "500mm tandem box for wider kitchen drawers with full extension and damped closure.",
//     specs: { Length: "500mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
//     applications: ["Kitchen drawers","Storage cabinets"], install: "Standard tandem install — use provided jig for consistent positioning." },

//   // PULLOUT
//   { id: "pullout-single", name: "Single Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 780, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg",
//     description: "Stainless steel wire pullout basket for kitchen base cabinets. Full extension with smooth glide.",
//     specs: { Material: "SS", Layers: "1", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Storage"], install: "Fix channel to cabinet side walls at desired height." },
//   { id: "pullout-double", name: "Double Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 1100, unit: "pc",
//     shortSpec: "SS wire · Full extension · 30kg", badge: "Popular",
//     description: "Double-layer pullout basket maximising vertical space in base cabinets.",
//     specs: { Material: "SS", Layers: "2", Load: "30kg", Type: "Full Extension" },
//     applications: ["Kitchen base cabinets","Pantry units"], install: "Mount both layers on the same channel frame; adjust spacing as needed." },

//   // BOTTLE PULLOUT
//   { id: "bottle-pullout-300", name: "Bottle Pullout 300mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 950, unit: "pc",
//     shortSpec: "300mm wide · SS wire · Full extension",
//     description: "Dedicated bottle pullout organiser for 300mm narrow base cabinets. Stores bottles upright with secure wire partitions.",
//     specs: { Width: "300mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Narrow kitchen cabinets","Bar units"], install: "Mount channel rails to cabinet sides. Ensure level for smooth glide." },
//   { id: "bottle-pullout-450", name: "Bottle Pullout 450mm", category: "bottle-pullout", categoryLabel: "Bottle Pull Out", price: 1150, unit: "pc",
//     shortSpec: "450mm wide · SS wire · Full extension",
//     description: "Wider bottle pullout for larger base cabinets. Fits standard wine and water bottles.",
//     specs: { Width: "450mm", Material: "SS", Type: "Full Extension" },
//     applications: ["Kitchen cabinets","Pantry"], install: "Align rails precisely for smooth full-extension pull." },

//   // PANTRY
//   { id: "pantry-tall", name: "Tall Pantry Unit System", category: "pantry", categoryLabel: "Pantry", price: 4500, unit: "set",
//     shortSpec: "Full height · Multi-tier · Soft close",
//     description: "Complete tall pantry pull-out system with multi-tier wire baskets and soft-close mechanism for full-height cabinets.",
//     specs: { Type: "Tall Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Tall kitchen cabinets","Pantry units"], install: "Fix upper and lower runners to cabinet. Hang basket frame and adjust levellers." },
//   { id: "pantry-half", name: "Half Height Pantry System", category: "pantry", categoryLabel: "Pantry", price: 3200, unit: "set",
//     shortSpec: "Half height · Multi-tier · Soft close",
//     description: "Half-height pantry system for under-counter or mid-height cabinet storage.",
//     specs: { Type: "Half Pantry", Feature: "Soft Close", Tiers: "Multi" },
//     applications: ["Under-counter cabinets","Storage"], install: "Standard pantry install — use provided drilling template." },

//   // S CORNER
//   { id: "s-corner-800", name: "S Corner Unit 800×800mm", category: "s-corner", categoryLabel: "S Corner", price: 3800, unit: "set",
//     shortSpec: "800×800mm · Full rotation · SS",
//     description: "Kidney-shaped S-corner rotating unit for L-shaped corner cabinets. Full rotation for maximum accessibility.",
//     specs: { Size: "800×800mm", Material: "SS", Type: "Rotating" },
//     applications: ["L-shaped kitchens","Corner cabinets"], install: "Fix central pole to top and bottom of cabinet. Mount shelves at desired heights." },
//   { id: "s-corner-900", name: "S Corner Unit 900×900mm", category: "s-corner", categoryLabel: "S Corner", price: 4200, unit: "set",
//     shortSpec: "900×900mm · Full rotation · SS", badge: "Popular",
//     description: "Larger S-corner unit for wider corner cabinets. Smooth bearing rotation with high load capacity.",
//     specs: { Size: "900×900mm", Material: "SS", Type: "Rotating" },
//     applications: ["Large corner cabinets","Premium kitchens"], install: "Ensure cabinet is perfectly square before installation." },

//   // UMC
//   { id: "umc-standard", name: "UMC Under Mount Channel", category: "umc", categoryLabel: "UMC", price: 1800, unit: "pair",
//     shortSpec: "Under mount · Soft close · Concealed",
//     description: "Under-mount concealed drawer slide with integrated soft-close. Invisible from outside for clean aesthetics.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Visibility: "Concealed" },
//     applications: ["Premium kitchen drawers","Furniture"], install: "Mount to drawer bottom; clip into cabinet bracket. Adjust via 3-way adjustment screw." },
//   { id: "umc-heavy", name: "UMC Under Mount Channel Heavy", category: "umc", categoryLabel: "UMC", price: 2400, unit: "pair",
//     shortSpec: "Under mount · Soft close · 50kg", badge: "Heavy Duty",
//     description: "Heavy-duty under-mount channel for thick or heavy drawer boxes up to 50kg.",
//     specs: { Type: "Under Mount", Feature: "Soft Close", Load: "50kg" },
//     applications: ["Heavy kitchen drawers","Stone-top drawers"], install: "Same as standard UMC; verify cabinet floor can take added load." },

//   // SKY WHEEL
//   { id: "sky-wheel-600", name: "Sky Wheel Corner Unit 600mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 5500, unit: "set",
//     shortSpec: "600mm · Rotating shelves · Premium",
//     description: "Sky wheel rotating corner unit with butterfly-opening shelves. Full access to deep corner cabinet space.",
//     specs: { Width: "600mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Corner cabinets","Premium kitchens"], install: "Fix hinge arms to door panels. Attach shelf brackets to central runner." },
//   { id: "sky-wheel-700", name: "Sky Wheel Corner Unit 700mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 6200, unit: "set",
//     shortSpec: "700mm · Rotating shelves · Premium", badge: "Premium",
//     description: "Larger sky wheel unit for 700mm corner cabinets. Extra shelf depth for maximum storage.",
//     specs: { Width: "700mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
//     applications: ["Large corner cabinets","Luxury kitchens"], install: "Align door panels carefully before fixing shelf arms for smooth butterfly action." },
// ];

// export const CATEGORIES: { id: Category; label: string; desc: string; icon: string }[] = [
//   { id: "hinges",        label: "Hinges",         desc: "Premium SS butt hinges — precision-engineered for every door",     icon: "🔩" },
//   { id: "channel",       label: "Channel",        desc: "Telescopic drawer channels, full extension & soft close",          icon: "📐" },
//   { id: "tandem",        label: "Tandem",         desc: "Tandem box drawer systems with integrated soft-close",             icon: "🗂️" },
//   { id: "pullout",       label: "Pullout",        desc: "SS wire pullout baskets for kitchen base cabinets",               icon: "🧺" },
//   { id: "bottle-pullout",label: "Bottle Pull Out",desc: "Dedicated bottle organisers for narrow cabinet units",            icon: "🍶" },
//   { id: "pantry",        label: "Pantry",         desc: "Full & half height pantry pull-out systems with soft close",      icon: "🚪" },
//   { id: "s-corner",      label: "S Corner",       desc: "Rotating S-corner units for L-shaped corner cabinets",           icon: "🔄" },
//   { id: "umc",           label: "UMC",            desc: "Under-mount concealed channels — invisible, smooth, soft close",  icon: "⚙️" },
//   { id: "sky-wheel",     label: "Sky Wheel",      desc: "Sky wheel butterfly corner units for premium kitchens",           icon: "🌀" },
// ];

// export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }
export type Category =
  | "hinges"
  | "channel"
  | "tandem"
  | "pullout"
  | "pantry"
  | "s-corner"
  | "umc"
  | "sky-wheel";

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
  // HINGES
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

  // CHANNEL
  { id: "channel-18", name: 'Telescopic Channel 18"', category: "channel", categoryLabel: "Channel", price: 450, unit: "pair",
    shortSpec: "Full extension · Soft close · 45kg",
    description: "Full-extension telescopic drawer channels with smooth soft-close mechanism. Tested to 50,000 cycles.",
    specs: { Length: '18"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
    applications: ["Kitchen drawers","Office cabinets"], install: "Mount cabinet member to side wall, drawer member to drawer side. Align before final fix." },
  { id: "channel-24", name: 'Telescopic Channel 24"', category: "channel", categoryLabel: "Channel", price: 650, unit: "pair",
    shortSpec: "Full extension · Soft close · 45kg",
    description: "24-inch full-extension soft-close drawer slides for deep modular drawers.",
    specs: { Length: '24"', Load: "45kg", Type: "Full Extension", Feature: "Soft Close" },
    applications: ["Deep drawers","Modular kitchens"], install: "Ensure both rails are perfectly parallel before final fixing." },

  // TANDEM
  { id: "tandem-450", name: "Tandem Box System 450mm", category: "tandem", categoryLabel: "Tandem", price: 1200, unit: "set",
    shortSpec: "Soft close · 40kg load · White",
    description: "Premium tandem box drawer system with integrated soft-close and tool-free assembly.",
    specs: { Length: "450mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
    applications: ["Modular kitchens","Premium wardrobes"], install: "Clip side panels onto runner, adjust height with integrated screw." },
  { id: "tandem-500", name: "Tandem Box System 500mm", category: "tandem", categoryLabel: "Tandem", price: 1350, unit: "set",
    shortSpec: "Soft close · 40kg load · White",
    description: "500mm tandem box for wider kitchen drawers with full extension and damped closure.",
    specs: { Length: "500mm", Load: "40kg", Finish: "White", Type: "Tandem Box" },
    applications: ["Kitchen drawers","Storage cabinets"], install: "Standard tandem install — use provided jig for consistent positioning." },

  // PULLOUT
  { id: "pullout-single", name: "Single Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 780, unit: "pc",
    shortSpec: "SS wire · Full extension · 30kg",
    description: "Stainless steel wire pullout basket for kitchen base cabinets. Full extension with smooth glide.",
    specs: { Material: "SS", Layers: "1", Load: "30kg", Type: "Full Extension" },
    applications: ["Kitchen base cabinets","Storage"], install: "Fix channel to cabinet side walls at desired height." },
  { id: "pullout-double", name: "Double Layer Pullout Basket", category: "pullout", categoryLabel: "Pullout", price: 1100, unit: "pc",
    shortSpec: "SS wire · Full extension · 30kg", badge: "Popular",
    description: "Double-layer pullout basket maximising vertical space in base cabinets.",
    specs: { Material: "SS", Layers: "2", Load: "30kg", Type: "Full Extension" },
    applications: ["Kitchen base cabinets","Pantry units"], install: "Mount both layers on the same channel frame; adjust spacing as needed." },

  // PANTRY
  { id: "pantry-tall", name: "Tall Pantry Unit System", category: "pantry", categoryLabel: "Pantry", price: 4500, unit: "set",
    shortSpec: "Full height · Multi-tier · Soft close",
    description: "Complete tall pantry pull-out system with multi-tier wire baskets and soft-close mechanism for full-height cabinets.",
    specs: { Type: "Tall Pantry", Feature: "Soft Close", Tiers: "Multi" },
    applications: ["Tall kitchen cabinets","Pantry units"], install: "Fix upper and lower runners to cabinet. Hang basket frame and adjust levellers." },
  { id: "pantry-half", name: "Half Height Pantry System", category: "pantry", categoryLabel: "Pantry", price: 3200, unit: "set",
    shortSpec: "Half height · Multi-tier · Soft close",
    description: "Half-height pantry system for under-counter or mid-height cabinet storage.",
    specs: { Type: "Half Pantry", Feature: "Soft Close", Tiers: "Multi" },
    applications: ["Under-counter cabinets","Storage"], install: "Standard pantry install — use provided drilling template." },

  // S CORNER
  { id: "s-corner-800", name: "S Corner Unit 800×800mm", category: "s-corner", categoryLabel: "S Corner", price: 3800, unit: "set",
    shortSpec: "800×800mm · Full rotation · SS",
    description: "Kidney-shaped S-corner rotating unit for L-shaped corner cabinets. Full rotation for maximum accessibility.",
    specs: { Size: "800×800mm", Material: "SS", Type: "Rotating" },
    applications: ["L-shaped kitchens","Corner cabinets"], install: "Fix central pole to top and bottom of cabinet. Mount shelves at desired heights." },
  { id: "s-corner-900", name: "S Corner Unit 900×900mm", category: "s-corner", categoryLabel: "S Corner", price: 4200, unit: "set",
    shortSpec: "900×900mm · Full rotation · SS", badge: "Popular",
    description: "Larger S-corner unit for wider corner cabinets. Smooth bearing rotation with high load capacity.",
    specs: { Size: "900×900mm", Material: "SS", Type: "Rotating" },
    applications: ["Large corner cabinets","Premium kitchens"], install: "Ensure cabinet is perfectly square before installation." },

  // UMC
  { id: "umc-standard", name: "UMC Under Mount Channel", category: "umc", categoryLabel: "UMC", price: 1800, unit: "pair",
    shortSpec: "Under mount · Soft close · Concealed",
    description: "Under-mount concealed drawer slide with integrated soft-close. Invisible from outside for clean aesthetics.",
    specs: { Type: "Under Mount", Feature: "Soft Close", Visibility: "Concealed" },
    applications: ["Premium kitchen drawers","Furniture"], install: "Mount to drawer bottom; clip into cabinet bracket. Adjust via 3-way adjustment screw." },
  { id: "umc-heavy", name: "UMC Under Mount Channel Heavy", category: "umc", categoryLabel: "UMC", price: 2400, unit: "pair",
    shortSpec: "Under mount · Soft close · 50kg", badge: "Heavy Duty",
    description: "Heavy-duty under-mount channel for thick or heavy drawer boxes up to 50kg.",
    specs: { Type: "Under Mount", Feature: "Soft Close", Load: "50kg" },
    applications: ["Heavy kitchen drawers","Stone-top drawers"], install: "Same as standard UMC; verify cabinet floor can take added load." },

  // SKY WHEEL
  { id: "sky-wheel-600", name: "Sky Wheel Corner Unit 600mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 5500, unit: "set",
    shortSpec: "600mm · Rotating shelves · Premium",
    description: "Sky wheel rotating corner unit with butterfly-opening shelves. Full access to deep corner cabinet space.",
    specs: { Width: "600mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
    applications: ["Corner cabinets","Premium kitchens"], install: "Fix hinge arms to door panels. Attach shelf brackets to central runner." },
  { id: "sky-wheel-700", name: "Sky Wheel Corner Unit 700mm", category: "sky-wheel", categoryLabel: "Sky Wheel", price: 6200, unit: "set",
    shortSpec: "700mm · Rotating shelves · Premium", badge: "Premium",
    description: "Larger sky wheel unit for 700mm corner cabinets. Extra shelf depth for maximum storage.",
    specs: { Width: "700mm", Type: "Sky Wheel Rotating", Action: "Butterfly Open" },
    applications: ["Large corner cabinets","Luxury kitchens"], install: "Align door panels carefully before fixing shelf arms for smooth butterfly action." },
];

export const CATEGORIES: { id: Category; label: string; desc: string; icon: string; img?: string }[] = [
  { id: "hinges",         label: "Hinges",          desc: "Premium SS butt hinges — precision-engineered for every door",    icon: "🔩", img: "/categories/hinges.jpg" },
  { id: "channel",        label: "Channel",         desc: "Telescopic drawer channels, full extension & soft close",         icon: "📐", img: "/categories/channel.jpg" },
  { id: "tandem",         label: "Tandem",          desc: "Tandem box drawer systems with integrated soft-close",            icon: "🗂️", img: "/categories/tandem.jpg" },
  { id: "pullout",        label: "Pullout",         desc: "SS wire pullout baskets for kitchen base cabinets",              icon: "🧺", img: "/categories/pullout.jpg" },
  { id: "pantry",         label: "Pantry",          desc: "Full & half height pantry pull-out systems with soft close",     icon: "🚪", img: "/categories/pantry.jpg" },
  { id: "s-corner",       label: "S Corner",        desc: "Rotating S-corner units for L-shaped corner cabinets",          icon: "🔄", img: "/categories/s-corner.jpg" },
  { id: "umc",            label: "UMC",             desc: "Under-mount concealed channels — invisible, smooth, soft close", icon: "⚙️", img: "/categories/umc.jpg" },
  { id: "sky-wheel",      label: "Sky Wheel",       desc: "Sky wheel butterfly corner units for premium kitchens",          icon: "🌀", img: "/categories/sky-wheel.jpg" },
];

export function getProduct(id: string) { return PRODUCTS.find(p => p.id === id); }
