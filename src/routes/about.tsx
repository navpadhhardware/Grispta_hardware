import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gripsta" },
      { name: "description", content: "Gripsta brings premium-grade architectural hardware to every modern interior — ISI certified, 50,000-cycle tested, seven finishes." },
    ],
  }),
  component: About,
});

function About() {
  return (
    <>
      <section className="pt-32 pb-20">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Our Story</span>
          <h1 className="font-display text-5xl md:text-7xl mt-3">HARDWARE THAT MATTERS</h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Gripsta was founded with one mission: to bring premium-grade architectural hardware to every modern interior.
            We believe that the hardware behind your doors, drawers, and cabinets matters as much as the design in front of them.
          </p>
        </div>
      </section>

      <section id="why" className="bg-surface py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Why Choose Gripsta</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">ENGINEERING PROMISE</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-2 gap-5">
            {[
              { i: "🛡️", t: "Premium SS Material", d: "Corrosion-resistant stainless steel, ISI marked." },
              { i: "🔄", t: "50,000+ Cycle Tested", d: "Every product survives 50,000 open/close cycles before leaving our facility." },
              { i: "✨", t: "7 Premium Finishes", d: "Matt Silver, Glossy, Antique, Matt Black, Antique Matt, Satin, Rose Gold." },
              { i: "🤝", t: "Dealer Network Support", d: "Competitive pricing, fast dispatch, marketing material provided." },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 60}>
                <div className="bg-background border border-border p-8 h-full hover:border-border-hover transition-colors">
                  <div className="text-4xl mb-4">{c.i}</div>
                  <h3 className="font-display text-2xl">{c.t}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="applications" className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Where We Build</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">MADE FOR EVERY SPACE</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { name: "Modern Kitchens", desc: "Soft-close drawers, premium hinges" },
              { name: "Wardrobes", desc: "Heavy-duty hinges in 7 finishes" },
              { name: "Office Interiors", desc: "Contract-grade hardware" },
              { name: "Living Room Furniture", desc: "Lid stays & gas springs" },
              { name: "Hotels & Hospitality", desc: "50,000-cycle tested durability" },
              { name: "POP & Drywall", desc: "Bugle-head screws, 3 finishes" },
            ].map((a, i) => (
              <Reveal key={a.name} delay={i * 50}>
                <div className="relative aspect-[4/3] border border-border overflow-hidden group" style={{ background: "linear-gradient(135deg,#1a1a1a,#221818)" }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <span className="label-accent">Application</span>
                    <h3 className="font-display text-2xl mt-1">{a.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{a.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Built Right</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">QUALITY PROMISE</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              ["✓","ISI Certified Products"],
              ["✓","50,000 Cycle Tested"],
              ["✓","Stainless Steel Grade Material"],
              ["✓","7 Finish Options"],
            ].map(([i, t]) => (
              <div key={t} className="bg-background border border-border p-8">
                <div className="text-3xl text-primary">{i}</div>
                <h3 className="font-display text-xl mt-3">{t}</h3>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">T&C: All rates per packet, subject to change.</p>
          <div className="mt-10">
            <Link to="/dealer" className="btn-primary">Become a Dealer →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
