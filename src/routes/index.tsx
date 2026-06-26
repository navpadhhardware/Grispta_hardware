import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { CATEGORIES, PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Gripsta — Built to Last. Premium Hardware for Modern Interiors" },
      { name: "description", content: "Premium hinges, drawer systems, drywall screws and architectural hardware — engineered for precision and built for modern interiors." },
      { property: "og:title", content: "Gripsta — Built to Last" },
      { property: "og:description", content: "Premium architectural & furniture hardware." },
    ],
  }),
  component: Home,
});

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const dur = 1400;
      const step = (t: number) => {
        const p = Math.min((t - start) / dur, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref} className="font-display text-4xl md:text-5xl text-foreground">{n.toLocaleString()}{suffix}</span>;
}

function Home() {
  const featured = PRODUCTS.slice(0, 8);
  const applications = [
    { name: "Modern Kitchens", desc: "Soft-close drawers, premium hinges", img: "linear-gradient(135deg,#1a1a1a,#2a1a1a)" },
    { name: "Wardrobes", desc: "Heavy-duty hinges in multiple finishes", img: "linear-gradient(135deg,#181818,#241a1a)" },
    { name: "Office Interiors", desc: "Contract-grade hardware", img: "linear-gradient(135deg,#1c1c1c,#1c1010)" },
    { name: "Living Room Furniture", desc: "Lid stays & gas springs", img: "linear-gradient(135deg,#1a1a1a,#221818)" },
  
  ];

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="hero-glow" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <span className="label-accent">Premium Hardware · Est. for Modern Interiors</span>
          <h1 className="font-display text-7xl md:text-8xl lg:text-[8rem] leading-[0.9] mt-6">
            BUILT TO<br />
            <span className="text-primary">LAST.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Premium hinges, drawer systems, channels and architectural hardware — engineered for precision and built for modern interiors.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/products" className="btn-primary">Explore Products →</Link>
          </div>

          <div className="mt-16 pt-10 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl">
            {[
              { v: 80000, s: "+", l: "Installations" },
              { v: 50000, s: "+", l: "Cycle Tested" },
              { v: 80,    s: "+", l: "Products" },
              { v: 48,    s: "+", l: "Hrs Salt Spray Tested" },
            ].map(s => (
              <div key={s.l}>
                <Counter to={s.v} suffix={s.s} />
                <div className="label-accent !text-muted-foreground mt-2">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
        {/* <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="w-px h-12 bg-primary" style={{ animation: "scrollBounce 2s ease-in-out infinite" }} />
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        </div>
      </section> */}
        <div className="absolute bottom-8 right-8 z-0 pointer-events-none">
          {/* <div className="w-px h-12 bg-primary" style={{ animation: "scrollBounce 2s ease-in-out infinite" }} /> */}
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground">SCROLL</span>
        </div>
      </section>

      {/* CATEGORIES */}
      <section id="categories" className="bg-surface py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Browse by Category</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">PRODUCT CATEGORIES</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {CATEGORIES.map((c, i) => (
              <Reveal key={c.id} delay={i * 80}>
                <Link to="/products" search={{ cat: c.id }} className="category-card block group">
                  <div className="flex items-start justify-between">
                    <div className="text-5xl mb-6">{c.icon}</div>
                    <span className="text-2xl text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all">→</span>
                  </div>
                  <h3 className="font-display text-3xl">{c.label}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.desc}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <div className="flex items-end justify-between flex-wrap gap-4">
              <div>
                <span className="label-accent">Best Sellers</span>
                <h2 className="font-display text-5xl md:text-6xl mt-3">FEATURED PRODUCTS</h2>
              </div>
              <Link to="/products" className="btn-outline">View All →</Link>
            </div>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 50}><ProductCard product={p} /></Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHY GRIPSTA */}
      <section className="relative bg-[#1a1a1a] py-24 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[20vw] text-foreground/[0.02] leading-none">GRIPSTA</span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Engineering Promise</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">WHY CHOOSE GRIPSTA</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { i: "🛡️", t: "Premium SS Material", d: "Corrosion-resistant stainless steel with ISI marking — built to last in every environment." },
              { i: "🔄", t: "50,000+ Cycle Tested", d: "Every product survives 50,000 open/close cycles before leaving our facility." },
              { i: "🧂", t: "48+ Hrs Salt Spray Tested", d: "Tested against corrosion in harsh salt-spray conditions for guaranteed long-term protection." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="bg-surface border border-border p-8 hover:border-border-hover transition-colors h-full">
                  <div className="text-4xl mb-4">{c.i}</div>
                  <h3 className="font-display text-2xl">{c.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* APPLICATIONS */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Designed For</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">MADE FOR EVERY SPACE</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {applications.map((a, i) => (
              <Reveal key={a.name} delay={i * 50}>
                <div className="relative aspect-[4/3] border border-border overflow-hidden group cursor-pointer" style={{ background: a.img }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-2 group-hover:translate-y-0 transition-transform">
                    <span className="label-accent">Application</span>
                    <h3 className="font-display text-2xl mt-1">{a.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT STRIP */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-10 items-center">
          <Reveal>
            <span className="label-accent">Talk to Us</span>
            <h2 className="font-display text-5xl mt-3">FASTEST WAY TO REACH US</h2>
            <div className="mt-8 space-y-3 text-foreground/90">
              <div className="flex gap-3 items-start">
                <span className="text-primary mt-0.5">📞</span>
                <a href="tel:+917995955787" className="hover:text-primary transition-colors">+91 79959 55787</a>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-primary mt-0.5">✉️</span>
                <a href="mailto:info@gripsta.in" className="hover:text-primary transition-colors">info@gripsta.in</a>
              </div>
              <div className="flex gap-3 items-start">
                <span className="text-primary mt-0.5">📍</span>
                <span>Aghapura, Backside of Mahalaksmi Tiffin Center, Hyderabad 500001</span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <a href="https://wa.me/917995955787" target="_blank" rel="noreferrer" className="block bg-whatsapp text-white p-10 hover:bg-whatsapp-dark transition-colors">
              <div className="text-4xl">💬</div>
              <h3 className="font-display text-3xl mt-4">CHAT ON WHATSAPP</h3>
              <p className="text-sm opacity-90 mt-2">Fastest way to reach us — pricing, enquiries, and product info, instantly.</p>
              <span className="inline-flex items-center gap-2 mt-6 font-semibold uppercase tracking-widest text-sm">Open WhatsApp →</span>
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
