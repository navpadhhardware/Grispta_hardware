import logo from "@/assets/gripsta-logo-v4.png.asset.json";

export function GripstaLogo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="Gripsta — Where Innovation meets Durability"
      className={`h-12 w-auto object-contain ${className}`}
    />
  );
}
