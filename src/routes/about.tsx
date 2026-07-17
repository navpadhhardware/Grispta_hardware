import { createFileRoute } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Gripsta" },
      { name: "description", content: "Gripsta brings premium-grade architectural hardware to every modern interior — BSI certified, 50,000-cycle tested, 48+ hours salt spray tested." },
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

      {/* WHY US */}
      <section id="why" className="bg-surface py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Why Choose Gripsta</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">ENGINEERING PROMISE</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { i: "🛡️", t: "Premium SS Material", d: "Corrosion-resistant stainless steel with BIS marking — built for long-term durability in every environment." },
              { i: "🔄", t: "50,000+ Cycle Tested", d: "Every product survives 50,000 open/close cycles before leaving our facility." },
              { i: "🧂", t: "48 Hrs Salt Spray Tested", d: "Tested against corrosion in harsh salt-spray conditions for guaranteed long-term protection." },
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

      {/* APPLICATIONS */}
      <section id="applications" className="py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Where We Build</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">MADE FOR EVERY SPACE</h2>
          </Reveal>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {[
              { name: "Modern Kitchens", desc: "Soft-close drawers, premium hinges" },
              { name: "Wardrobes", desc: "Heavy-duty hinges, premium finishes" },
              { name: "Office Interiors", desc: "Contract-grade hardware" },
              { name: "Living Room Furniture", desc: "Lid stays & gas springs" },
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

      {/* QUALITY PROMISE */}
      <section className="bg-surface py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <Reveal>
            <span className="label-accent">Built Right</span>
            <h2 className="font-display text-5xl md:text-6xl mt-3">QUALITY PROMISE</h2>
          </Reveal>
          <div className="mt-12 grid sm:grid-cols-3 gap-5">
            {[
              // ["✓", "BIS Certified Products"],
              ["✓", "50,000 Cycle Tested"],
              ["✓", "Stainless Steel Grade Material"],
            ].map(([icon, text]) => (
              <Reveal key={text}>
                <div className="bg-background border border-border p-8">
                  <div className="text-3xl text-primary">{icon}</div>
                  <h3 className="font-display text-xl mt-3">{text}</h3>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">T&C: All rates per packet, subject to change.</p>
        </div>
      </section>
    </>
  );
}
