import { useState, useRef, useEffect } from "react";

const galleryItems = [
  { src: "/media/gallery1.avif", label: "Stone Oven",   sub: "900°F fired",     size: "tall" },
  { src: "/media/gallery2.avif", label: "Fresh Dough",  sub: "48hr fermented",  size: "normal" },
  { src: "/media/gallery3.avif", label: "Toppings",     sub: "Locally sourced", size: "normal" },
  { src: "/media/gallery4.avif", label: "Cheese Pull",  sub: "100% Mozzarella", size: "wide" },
  { src: "/media/gallery5.avif", label: "Pepperoni",    sub: "Artisan cut",     size: "normal" },
  { src: "/media/gallery6.avif", label: "Bake Time",    sub: "90 sec perfection", size: "normal" },
];

const contactInfo = [
  { icon: "📍", label: "Visit Us",   value: "8901 Marmora Road, Glasgow, UK" },
  { icon: "📞", label: "Call Free",  value: "+1 800 234 567" },
  { icon: "☎️", label: "Direct",    value: "+1 900 234 567" },
  { icon: "✉️", label: "Email",     value: "hello@youpizza.com" },
  { icon: "🕐", label: "Hours",     value: "Mon–Sun · 11am – 11pm" },
];

const footerLinks = {
  "Explore": ["Our Menu", "Specialities", "Chef's Table", "Catering"],
  "Company": ["About Us", "Our Story", "Careers", "Press"],
  "Connect": ["Instagram", "Facebook", "WhatsApp", "Newsletter"],
};

/* ── hook: IntersectionObserver ── */
function useVisible(threshold = 0.1) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, vis];
}

/* ── Gallery item ── */
function GalleryItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, vis] = useVisible(0.1);
  return (
    <div
      ref={ref}
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{
        gridRow: item.size === "tall" ? "span 2" : "span 1",
        gridColumn: item.size === "wide" ? "span 2" : "span 1",
        opacity: vis ? 1 : 0,
        transform: vis ? "scale(1)" : "scale(0.93)",
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s`,
        boxShadow: hovered
          ? "0 24px 80px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(232,160,32,0.4)"
          : "0 8px 32px rgba(0,0,0,0.4)",
        border: `1px solid ${hovered ? "rgba(232,160,32,0.35)" : "rgba(232,160,32,0.06)"}`,
        transition: `opacity 0.8s ease ${index * 0.1}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${index * 0.1}s, box-shadow 0.5s ease, border-color 0.5s ease`,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={item.src}
        alt={item.label}
        className="w-full h-full object-cover"
        style={{
          transform: hovered ? "scale(1.1)" : "scale(1.01)",
          filter: hovered ? "brightness(0.75) saturate(1.2)" : "brightness(0.6) saturate(1)",
          transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)",
          minHeight: item.size === "tall" ? "400px" : "200px",
        }}
      />
      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: hovered
            ? "linear-gradient(160deg, rgba(232,160,32,0.12) 0%, rgba(28,20,10,0.85) 100%)"
            : "linear-gradient(160deg, rgba(0,0,0,0.05) 0%, rgba(28,20,10,0.7) 100%)",
          transition: "background 0.6s ease",
        }}
      />
      {/* Label */}
      <div
        className="absolute bottom-0 left-0 right-0 p-5"
        style={{
          transform: hovered ? "translateY(0)" : "translateY(8px)",
          opacity: hovered ? 1 : 0.7,
          transition: "all 0.5s ease",
        }}
      >
        <div className="flex items-end justify-between">
          <div>
            <p
              className="font-display text-xl font-semibold mb-0.5"
              style={{ color: "var(--cream)", letterSpacing: "0.02em" }}
            >
              {item.label}
            </p>
            <p className="text-[10px] tracking-[2px] uppercase" style={{ color: "rgba(232,160,32,0.8)" }}>
              {item.sub}
            </p>
          </div>
          {hovered && (
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{ background: "rgba(232,160,32,0.9)", color: "#1C1410", animation: "fadeIn 0.3s ease" }}
            >
              ↗
            </div>
          )}
        </div>
        {/* Underline sweep */}
        <div className="mt-3 h-px overflow-hidden">
          <div
            style={{
              height: "1px",
              background: "linear-gradient(90deg, var(--amber), var(--amber-lt))",
              width: hovered ? "100%" : "0%",
              transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default function GalleryContactSection() {
  const [formState, setFormState] = useState({ name: "", email: "", phone: "", message: "", subject: "general" });
  const [submitted, setSubmitted] = useState(false);
  const [focused,   setFocused]   = useState(null);
  const [galRef,    galVis]       = useVisible(0.05);
  const [ctaRef,    ctaVis]       = useVisible(0.2);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setFormState({ name:"", email:"", phone:"", message:"", subject:"general" }); }, 4000);
  };

  const inp = (field) => ({
    width: "100%",
    background: focused === field ? "rgba(46,36,24,0.9)" : "rgba(30,22,12,0.7)",
    border: `1px solid ${focused === field ? "rgba(232,160,32,0.6)" : "rgba(232,160,32,0.1)"}`,
    borderRadius: "12px",
    padding: "13px 16px",
    color: "var(--cream)",
    fontSize: "13px",
    fontFamily: "Outfit, sans-serif",
    outline: "none",
    boxShadow: focused === field ? "0 0 24px rgba(232,160,32,0.1), inset 0 1px 0 rgba(232,160,32,0.06)" : "none",
    transition: "all 0.35s ease",
  });

  return (
    <div style={{ background: "linear-gradient(180deg, #0E0A06 0%, #1C1410 20%, #141008 80%, #0E0A06 100%)" }}>

      {/* ══ GALLERY ══ */}
      <section
        ref={galRef}
        className="relative overflow-hidden"
        style={{ padding: "100px 0" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 50%, rgba(232,160,32,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Heading */}
          <div
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14"
            style={{ opacity: galVis ? 1 : 0, transform: galVis ? "none" : "translateY(28px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, var(--amber))" }} />
                <span className="text-[10px] tracking-[5px] uppercase" style={{ color: "var(--amber)" }}>Visual Stories</span>
              </div>
              <h2
                className="font-display leading-none"
                style={{ fontSize: "clamp(44px, 7vw, 80px)", color: "var(--cream)", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Our{" "}
                <span className="italic" style={{ color: "var(--amber)" }}>Gallery</span>
              </h2>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)", maxWidth: "260px" }}>
              A window into our craft — from raw ingredients to the perfect bake.
            </p>
          </div>

          {/* Masonry-style grid */}
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "200px",
            }}
          >
            {galleryItems.map((item, i) => (
              <GalleryItem key={i} item={item} index={i} />
            ))}
          </div>

          {/* View all button */}
          <div
            className="flex justify-center mt-12"
            style={{ opacity: galVis ? 1 : 0, transition: "opacity 1s ease 0.5s" }}
          >
            <button
              className="group relative overflow-hidden rounded-2xl text-[11px] tracking-[3px] uppercase font-semibold px-10 py-4"
              style={{ border: "1px solid rgba(232,160,32,0.3)", color: "rgba(232,160,32,0.85)", background: "rgba(232,160,32,0.05)", transition: "all 0.4s ease" }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,160,32,0.1)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.6)"; e.currentTarget.style.color = "var(--amber-lt)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,160,32,0.15)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,160,32,0.05)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.3)"; e.currentTarget.style.color = "rgba(232,160,32,0.85)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              View Full Gallery ↗
            </button>
          </div>
        </div>
      </section>

      {/* ══ FULL-WIDTH CTA BAND ══ */}
      <div
        ref={ctaRef}
        className="relative overflow-hidden"
        style={{ padding: "72px 0", background: "linear-gradient(135deg, #241A08 0%, #2E2010 50%, #201808 100%)", borderTop: "1px solid rgba(232,160,32,0.12)", borderBottom: "1px solid rgba(232,160,32,0.12)" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 100% at 50% 50%, rgba(232,160,32,0.07) 0%, transparent 70%)" }} />
        <div
          className="max-w-4xl mx-auto px-6 text-center"
          style={{ opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(24px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1)" }}
        >
          <p className="text-[10px] tracking-[5px] uppercase mb-4" style={{ color: "var(--amber)" }}>Limited Time</p>
          <h2
            className="font-display mb-4"
            style={{ fontSize: "clamp(36px, 6vw, 68px)", color: "var(--cream)", fontWeight: 700, lineHeight: 1.1 }}
          >
            Get <span className="italic" style={{ color: "var(--amber)" }}>30% Off</span><br />Your First Order
          </h2>
          <p className="text-sm mb-8" style={{ color: "var(--muted)" }}>
            Use code <strong style={{ color: "var(--amber-lt)", letterSpacing: "0.1em" }}>YOUPIZZA30</strong> at checkout
          </p>
          <button
            className="group relative overflow-hidden rounded-2xl font-semibold text-[11px] tracking-[3px] uppercase px-10 py-4"
            style={{ background: "linear-gradient(135deg, #E8A020, #B87818)", color: "#1C1410", boxShadow: "0 8px 40px rgba(232,160,32,0.4)", transition: "all 0.4s ease" }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 56px rgba(232,160,32,0.6)"; e.currentTarget.style.transform = "translateY(-3px) scale(1.02)"; }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,160,32,0.4)"; e.currentTarget.style.transform = "none"; }}
          >
            <span className="relative z-10">Order Now & Save</span>
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
          </button>
        </div>
      </div>

      {/* ══ CONTACT ══ */}
      <section className="relative overflow-hidden" style={{ padding: "100px 0" }}>
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 30%, rgba(232,160,32,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Heading */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-3">
              <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, var(--amber))" }} />
              <span className="text-[10px] tracking-[5px] uppercase" style={{ color: "var(--amber)" }}>Reach Out</span>
            </div>
            <h2
              className="font-display leading-none"
              style={{ fontSize: "clamp(44px, 7vw, 80px)", color: "var(--cream)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Let's <span className="italic" style={{ color: "var(--amber)" }}>Connect</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* LEFT 2/5 — contact details */}
            <div className="lg:col-span-2 space-y-1">
              <h3 className="font-display text-2xl mb-6" style={{ color: "var(--cream)", fontWeight: 600 }}>Find Us</h3>

              {contactInfo.map(({ icon, label, value }, i) => (
                <div
                  key={i}
                  className="group flex items-start gap-4 py-4"
                  style={{ borderBottom: "1px solid rgba(232,160,32,0.06)", transition: "border-color 0.3s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderBottomColor = "rgba(232,160,32,0.2)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderBottomColor = "rgba(232,160,32,0.06)"; }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base flex-shrink-0 transition-all duration-300"
                    style={{ background: "rgba(46,40,32,0.8)", border: "1px solid rgba(232,160,32,0.12)" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,160,32,0.5)"; e.currentTarget.style.boxShadow = "0 0 20px rgba(232,160,32,0.2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,160,32,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {icon}
                  </div>
                  <div>
                    <p className="text-[9px] tracking-[2px] uppercase mb-1" style={{ color: "var(--muted)" }}>{label}</p>
                    <p className="text-sm" style={{ color: "rgba(245,230,200,0.85)" }}>{value}</p>
                  </div>
                </div>
              ))}

              {/* Map */}
              <div
                className="rounded-2xl overflow-hidden mt-6 transition-all duration-400"
                style={{ height: "200px", border: "1px solid rgba(232,160,32,0.1)", boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,160,32,0.35)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(232,160,32,0.12)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,160,32,0.1)"; e.currentTarget.style.boxShadow = "0 8px 40px rgba(0,0,0,0.4)"; }}
              >
                <iframe
                  src="https://www.google.com/maps?q=Glasgow&output=embed"
                  width="100%" height="100%"
                  style={{ border: 0, filter: "sepia(0.4) hue-rotate(5deg) brightness(0.75) contrast(1.1)" }}
                  allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="map"
                />
              </div>
            </div>

            {/* RIGHT 3/5 — form */}
            <div className="lg:col-span-3">
              <div
                className="rounded-3xl p-8 lg:p-10"
                style={{ background: "linear-gradient(145deg, rgba(46,40,32,0.5) 0%, rgba(28,20,10,0.7) 100%)", border: "1px solid rgba(232,160,32,0.1)", backdropFilter: "blur(12px)" }}
              >
                {submitted ? (
                  <div className="flex flex-col items-center justify-center gap-5 py-16">
                    <div
                      className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
                      style={{ background: "linear-gradient(135deg, rgba(90,122,90,0.3), rgba(60,100,60,0.2))", border: "1px solid rgba(90,122,90,0.4)", animation: "successPop 0.7s cubic-bezier(0.16,1,0.3,1)" }}
                    >
                      ✅
                    </div>
                    <div className="text-center">
                      <p className="font-display text-2xl mb-2" style={{ color: "var(--cream)", fontWeight: 600 }}>Message Sent!</p>
                      <p className="text-sm" style={{ color: "var(--muted)" }}>We'll get back to you within 24 hours.</p>
                    </div>
                    {/* Sound wave bars */}
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="w-1 rounded-full" style={{ height: "24px", background: "var(--sage)", animation: `waveBar 1s ease-in-out ${i * 0.15}s infinite` }} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h3 className="font-display text-2xl mb-1" style={{ color: "var(--cream)", fontWeight: 600 }}>Send a Message</h3>
                    <p className="text-xs mb-8 tracking-wide" style={{ color: "var(--muted)" }}>We reply within 24 hours. No spam, ever.</p>

                    {/* Subject selector */}
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {[
                        { val: "general",  label: "General" },
                        { val: "order",    label: "Order Help" },
                        { val: "catering", label: "Catering" },
                        { val: "feedback", label: "Feedback" },
                      ].map(({ val, label }) => (
                        <button
                          key={val}
                          type="button"
                          onClick={() => setFormState(s => ({ ...s, subject: val }))}
                          className="text-[10px] tracking-[2px] uppercase px-4 py-2 rounded-xl transition-all duration-300"
                          style={{
                            background: formState.subject === val ? "linear-gradient(135deg, #E8A020, #B87818)" : "rgba(46,40,32,0.6)",
                            color: formState.subject === val ? "#1C1410" : "var(--muted)",
                            border: `1px solid ${formState.subject === val ? "transparent" : "rgba(232,160,32,0.15)"}`,
                            fontFamily: "Outfit, sans-serif",
                            fontWeight: 600,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Name + Email */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {[
                        { f: "name",  label: "Full Name",  type: "text",  ph: "John Doe" },
                        { f: "email", label: "Email",      type: "email", ph: "you@email.com" },
                      ].map(({ f, label, type, ph }) => (
                        <div key={f}>
                          <label
                            className="block text-[9px] tracking-[2px] uppercase mb-2"
                            style={{ color: focused === f ? "var(--amber)" : "var(--muted)", transition: "color 0.3s" }}
                          >
                            {label}
                          </label>
                          <input
                            type={type} placeholder={ph} value={formState[f]} required
                            onChange={e => setFormState(s => ({ ...s, [f]: e.target.value }))}
                            onFocus={() => setFocused(f)} onBlur={() => setFocused(null)}
                            style={inp(f)}
                          />
                        </div>
                      ))}
                    </div>

                    {/* Phone */}
                    <div className="mb-4">
                      <label
                        className="block text-[9px] tracking-[2px] uppercase mb-2"
                        style={{ color: focused === "phone" ? "var(--amber)" : "var(--muted)", transition: "color 0.3s" }}
                      >
                        Phone (optional)
                      </label>
                      <input
                        type="tel" placeholder="+1 234 567 890" value={formState.phone}
                        onChange={e => setFormState(s => ({ ...s, phone: e.target.value }))}
                        onFocus={() => setFocused("phone")} onBlur={() => setFocused(null)}
                        style={inp("phone")}
                      />
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <label
                        className="block text-[9px] tracking-[2px] uppercase mb-2"
                        style={{ color: focused === "message" ? "var(--amber)" : "var(--muted)", transition: "color 0.3s" }}
                      >
                        Your Message
                      </label>
                      <textarea
                        placeholder="Tell us how we can help you..." value={formState.message} required rows={4}
                        onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                        onFocus={() => setFocused("message")} onBlur={() => setFocused(null)}
                        style={{ ...inp("message"), resize: "none" }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="group relative w-full overflow-hidden rounded-2xl font-semibold text-[11px] tracking-[3px] uppercase py-4"
                      style={{ background: "linear-gradient(135deg, #E8A020, #B87818)", color: "#1C1410", boxShadow: "0 8px 32px rgba(232,160,32,0.4)", transition: "all 0.4s ease", fontFamily: "Outfit, sans-serif" }}
                      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 56px rgba(232,160,32,0.6)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,160,32,0.4)"; e.currentTarget.style.transform = "none"; }}
                    >
                      <span className="relative z-10">Send Message →</span>
                      <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer style={{ background: "#080502", borderTop: "1px solid rgba(232,160,32,0.1)", padding: "72px 0 32px" }}>
        {/* Top glow line */}
        <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.5) 30%, rgba(232,160,32,0.5) 70%, transparent)", marginBottom: "64px" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-16">

            {/* Brand col */}
            <div className="lg:col-span-2">
              <div
                className="font-display text-4xl mb-3"
                style={{ color: "var(--cream)", fontWeight: 700, letterSpacing: "-0.02em", textShadow: "0 0 40px rgba(232,160,32,0.3)" }}
              >
                You<span style={{ color: "var(--amber)" }}>Pizza</span>
              </div>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--muted)", maxWidth: "280px" }}>
                Crafting extraordinary pizzas since 1998. Every bite tells the story of our passion for Italian culinary tradition.
              </p>
              {/* Social icons */}
              <div className="flex gap-3">
                {["📸", "👍", "💬", "🐦"].map((icon, i) => (
                  <button
                    key={i}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base transition-all duration-300"
                    style={{ background: "rgba(46,40,32,0.6)", border: "1px solid rgba(232,160,32,0.1)" }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,160,32,0.15)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.4)"; e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,160,32,0.2)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(46,40,32,0.6)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.1)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Link cols */}
            {Object.entries(footerLinks).map(([group, links]) => (
              <div key={group}>
                <h4 className="text-[10px] tracking-[3px] uppercase mb-5 font-semibold" style={{ color: "var(--amber)" }}>{group}</h4>
                <ul className="space-y-3">
                  {links.map(link => (
                    <li key={link}>
                      <span
                        className="text-sm cursor-pointer transition-all duration-300"
                        style={{ color: "var(--muted)" }}
                        onMouseEnter={e => { e.currentTarget.style.color = "var(--cream)"; e.currentTarget.style.paddingLeft = "8px"; }}
                        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.paddingLeft = "0"; }}
                      >
                        {link}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(232,160,32,0.08)" }}>
            <p className="text-xs" style={{ color: "rgba(138,122,104,0.5)" }}>© 2026 YouPizza. All rights reserved.</p>
            <div className="flex gap-6">
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
                <span key={l} className="text-xs cursor-pointer transition-colors duration-300" style={{ color: "rgba(138,122,104,0.5)" }}
                  onMouseEnter={e => { e.currentTarget.style.color = "var(--muted)"; }}
                  onMouseLeave={e => { e.currentTarget.style.color = "rgba(138,122,104,0.5)"; }}
                >
                  {l}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}