import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Gripsta" },
      { name: "description", content: "Get product info, pricing and support. WhatsApp, phone or email — we respond fast." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "", subject: "Product enquiry", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = encodeURIComponent(
      `Name: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    const subject = encodeURIComponent(`[Gripsta] ${form.subject}`);
    // Opens mail client — replace with actual email once available
    window.location.href = `mailto:info@gripsta.in?subject=${subject}&body=${body}`;
    setSent(true);
  };

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
            { i: "📞", l: "Phone", v: "+91 79959 55787" },
            { i: "✉️", l: "Email", v: "info@gripsta.in" },
            { i: "📍", l: "Address", v: "Aghapura, Backside of Mahalaksmi Tiffin Center, Hyderabad 500001" },
          ].map(c => (
            <div key={c.l} className="bg-surface border border-border p-8">
              <div className="text-3xl">{c.i}</div>
              <span className="label-accent block mt-4">{c.l}</span>
              <p className="font-display text-2xl mt-1 leading-snug">{c.v}</p>
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
          <a href="https://wa.me/917995955787" target="_blank" rel="noreferrer"
            className="block bg-whatsapp text-white p-12 md:p-16 hover:bg-whatsapp-dark transition-colors text-center">
            <div className="text-6xl">💬</div>
            <h2 className="font-display text-4xl md:text-5xl mt-6">CHAT ON WHATSAPP</h2>
            <p className="opacity-90 mt-3">Get product info, pricing, and support instantly.</p>
            <span className="inline-flex items-center gap-2 mt-8 font-bold uppercase tracking-widest border-2 border-white px-8 py-4">Open WhatsApp →</span>
          </a>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <span className="label-accent">Suggestions & Feedback</span>
          <h2 className="font-display text-4xl mt-3">SHARE YOUR THOUGHTS</h2>
          <p className="mt-3 text-muted-foreground text-sm leading-relaxed">
            Have a product suggestion, feedback, or just want to say something? We'd love to hear from you. Every message is read by our team.
          </p>
          {sent ? (
            <div className="mt-10 bg-surface border border-primary/30 p-10 text-center">
              <div className="text-5xl">✓</div>
              <h3 className="font-display text-2xl mt-4">MESSAGE SENT</h3>
              <p className="text-muted-foreground mt-2">We'll get back to you shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <Field label="Name" name="name" value={form.name} onChange={handleChange} />
                <Field label="Phone" name="phone" type="tel" value={form.phone} onChange={handleChange} />
              </div>
              <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
              <div>
                <label className="label-accent block mb-2">Type of Feedback</label>
                <select
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary"
                >
                  <option>Product suggestion</option>
                  <option>Product enquiry</option>
                  <option>General feedback</option>
                  <option>Bulk order</option>
                  <option>Support</option>
                </select>
              </div>
              <div>
                <label className="label-accent block mb-2">Your Message</label>
                <textarea
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share your thoughts, suggestions, or questions here..."
                  className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary placeholder:text-muted-foreground/50"
                />
              </div>
              <button className="btn-primary w-full justify-center">Send Message →</button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", value, onChange,
}: {
  label: string; name: string; type?: string;
  value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div>
      <label className="label-accent block mb-2">{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required
        className="w-full bg-surface border border-border px-4 py-3 focus:outline-none focus:border-primary"
      />
    </div>
  );
}
