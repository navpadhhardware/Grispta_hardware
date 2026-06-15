import { Link, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { GripstaLogo } from "./GripstaLogo";
import { useCart } from "@/lib/cart";

const links = [
  { label: "Products", to: "/products" },
  { label: "Categories", to: "/products", hash: "categories" },
  { label: "Why Us", to: "/about", hash: "why" },
  { label: "Applications", to: "/about", hash: "applications" },
  { label: "Dealers", to: "/dealer" },
  { label: "Contact", to: "/contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { count, bumped } = useCart();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (y / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [router.state.location.pathname]);

  useEffect(() => {
    if (bumped === 0) return;
    setBump(true);
    const t = setTimeout(() => setBump(false), 400);
    return () => clearTimeout(t);
  }, [bumped]);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 h-[2px] z-[60] bg-transparent">
        <div className="h-full bg-primary transition-[width]" style={{ width: `${progress}%` }} />
      </div>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0f0f0f] border-b-2 border-primary/30 shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link to="/" className="shrink-0"><GripstaLogo /></Link>

          <div className="hidden lg:flex items-center gap-8">
            {links.map(l => (
              <Link
                key={l.label}
                to={l.to}
                hash={l.hash}
                className="text-sm font-medium uppercase tracking-widest text-foreground/80 hover:text-primary transition-colors"
              activeProps={{ className: l.hash ? "" : "text-primary" }}
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-2 hover:text-primary transition-colors" aria-label="Cart">
              <CartIcon />
              {count > 0 && (
                <span className={`absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center ${bump ? "cart-bump" : ""}`}>
                  {count}
                </span>
              )}
            </Link>
            <Link to="/contact" className="hidden sm:inline-flex btn-primary text-xs">Get Quote</Link>
            <button
              className="lg:hidden p-2 text-foreground"
              onClick={() => setOpen(o => !o)}
              aria-label="Menu"
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#0a0a0a] border-t border-border">
            <div className="flex flex-col p-6 gap-1">
              {links.map(l => (
                <Link
                  key={l.label}
                  to={l.to}
                  hash={l.hash}
                  className="py-3 text-base uppercase tracking-widest text-foreground hover:text-primary border-b border-border"
                >
                  {l.label}
                </Link>
              ))}
              <Link to="/contact" className="btn-primary justify-center mt-4">Get Quote</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}

function CartIcon() {
  return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3h2l2.4 12.5a2 2 0 0 0 2 1.5h9.7a2 2 0 0 0 2-1.6L23 6H6"/><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/></svg>);
}
function MenuIcon() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>); }
function CloseIcon() { return (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18"/></svg>); }
