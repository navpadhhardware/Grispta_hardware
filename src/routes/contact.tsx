import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gripsta" },
      { name: "description", content: "Get product info, pricing and dealer support. WhatsApp, phone or email — we respond fast." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <>
      <section className="pt-32 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Get in Touch</span>
          <h1 className="font-display text-5xl md:text-7xl mt-3">CONTACT US</h1>
        </div>
      </section>

      <section className="pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid md:grid-cols-3 gap-5">
          {[
            { i: "📞", l: "Phone", v: "+91 XXXXX XXXXX" },
            { i: "✉️", l: "Email", v: "info@gripsta.in" },
            { i: "📍", l: "Address", v: "India" },
          ].map(c => (
            <div key={c.l} className="bg-surface border border-border p-8">
              <div className="text-3xl">{c.i}</div>
              <span className="label-accent block mt-4">{c.l}</span>
              <p className="font-display text-2xl mt-1">{c.v}</p>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-5">
          <div className="bg-surface border border-border p-8">
            <span className="label-accent">Instagram</span>
            <a href="https://instagram.com/gripsta_1401" target="_blank" rel="noreferrer" className="block font-display text-2xl mt-1 hover:text-primary">@gripsta_1401</a>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer"
            className="block bg-whatsapp text-white p-12 md:p-16 hover:bg-whatsapp-dark transition-colors text-center">
            <div className="text-6xl">💬</div>
            <h2 className="font-display text-4xl md:text-5xl mt-6">CHAT ON WHATSAPP</h2>
            <p className="opacity-90 mt-3">Get product info, pricing, and dealer support instantly.</p>
            <span className="inline-flex items-center gap-2 mt-8 font-bold uppercase tracking-widest border-2 border-white px-8 py-4">Open WhatsApp →</span>
          </a>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Send a Message</span>
          <h2 className="font-display text-4xl mt-3">DROP US A LINE</h2>
          {sent ? (
            <div className="mt-10 bg-surface border border-primary/30 p-10 text-center">
              <div className="text-5xl">✓</div>
              <h3 className="font-display text-2xl mt-4">MESSAGE SENT</h3>
              <p className="text-muted-foreground mt-2">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSent(true); }} className="mt-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" />
                <Field label="Phone" type="tel" />
              </div>
              <Field label="Email" type="email" />
              <div>
                <label className="label-accent block mb-2">Subject</label>
                <select className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary">
                  <option>Product enquiry</option>
                  <option>Dealer enquiry</option>
                  <option>Bulk order</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="label-accent block mb-2">Message</label>
                <textarea rows={5} className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
              </div>
              <button className="btn-primary w-full justify-center">Send Message →</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="label-accent block mb-2">{label}</label>
      <input type={type} required className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary" />
    </div>
  );
}
