import { useState, useRef, useEffect } from "react";
import PizzaCard from "./PizzaCard";

/* ── Animated number counter ── */
function CountUp({ end, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick  = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.floor(p * p * end)); // ease-in-quad
        if (p < 1) requestAnimationFrame(tick);
        else setVal(end);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [end, duration]);
  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/* ── SVG decorative divider ── */
function WaveDivider({ flip = false }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "60px", display: "block" }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="rgba(232,160,32,0.06)" />
        <path d="M0,40 C480,10 960,55 1440,25 L1440,60 L0,60 Z" fill="rgba(232,160,32,0.04)" />
      </svg>
    </div>
  );
}

/* ── Ingredient feature card ── */
function IngCard({ icon, title, desc, delay }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.2 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(46,40,32,0.8) 0%, rgba(28,20,10,0.9) 100%)",
        border: "1px solid rgba(232,160,32,0.1)",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(232,160,32,0.4)"; e.currentTarget.style.boxShadow = "0 16px 48px rgba(232,160,32,0.12), 0 4px 24px rgba(0,0,0,0.3)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(232,160,32,0.1)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.3)"; }}
    >
      <div className="text-3xl mb-3">{icon}</div>
      <h4 className="font-display text-lg mb-1.5" style={{ color: "var(--cream)", fontWeight: 600 }}>{title}</h4>
      <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{desc}</p>
      <div className="absolute bottom-0 left-6 right-6 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(232,160,32,0.4), transparent)", opacity: 0, transition: "opacity 0.4s" }} />
    </div>
  );
}

/* ── Stat block ── */
function Stat({ value, suffix, label }) {
  return (
    <div className="text-center">
      <div className="font-display text-5xl lg:text-6xl font-semibold" style={{ color: "var(--amber)", letterSpacing: "-0.02em" }}>
        <CountUp end={value} suffix={suffix} />
      </div>
      <div className="text-xs tracking-[3px] uppercase mt-2" style={{ color: "var(--muted)" }}>{label}</div>
    </div>
  );
}

export default function PizzaSection({ pizzas, addToCart }) {
  const [slide, setSlide] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [sectionVis, setSectionVis] = useState(false);
  const [heroVis, setHeroVis]       = useState(false);
  const sectionRef = useRef(null);
  const heroRef    = useRef(null);
  const trackRef   = useRef(null);

  const VISIBLE = 3;
  const maxSlide = Math.max(0, pizzas.length - VISIBLE);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSectionVis(true); obs1.disconnect(); } }, { threshold: 0.08 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeroVis(true);    obs2.disconnect(); } }, { threshold: 0.1 });
    if (sectionRef.current) obs1.observe(sectionRef.current);
    if (heroRef.current)    obs2.observe(heroRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  /* Touch / drag support */
  const onDragStart = (e) => {
    setDragging(true);
    setDragStart(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };
  const onDragEnd = (e) => {
    if (!dragging) return;
    const end  = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 50) setSlide(s => Math.min(maxSlide, Math.max(0, s + (diff > 0 ? 1 : -1))));
    setDragging(false);
  };

  const ingredients = [
    { icon: "🌾", title: "48hr Fermented Dough", desc: "Cold-fermented for 48 hours developing complex flavour and perfect texture.", delay: 0.1 },
    { icon: "🍅", title: "San Marzano Tomatoes", desc: "Imported directly from Campania, Italy — sweet, low-acid perfection.", delay: 0.2 },
    { icon: "🧀", title: "Hand-pulled Mozzarella", desc: "Made fresh every morning in our kitchen from whole milk curds.", delay: 0.3 },
    { icon: "🔥", title: "Wood-fired at 900°F", desc: "Our stone oven reaches 900°F giving you a blistered, airy crust in 90 seconds.", delay: 0.4 },
  ];

  return (
    <div style={{ background: "linear-gradient(180deg, #110C08 0%, #1C1410 20%, #141008 80%, #0E0A06 100%)" }}>

     

      {/* ══ OUR PIZZA — EDITORIAL HERO ══ */}
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{ padding: "100px 0 80px" }}
      >
        {/* Large background text watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          style={{ opacity: 0.03 }}
        >
          <span
            className="font-display font-semibold"
            style={{ fontSize: "clamp(120px, 20vw, 220px)", color: "var(--amber)", whiteSpace: "nowrap", letterSpacing: "-0.04em" }}
          >
            PIZZA
          </span>
        </div>

        {/* Radial glow */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(232,160,32,0.08) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Section label row */}
          <div
            className="flex items-center gap-4 mb-6"
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(20px)", transition: "all 0.8s ease" }}
          >
            <div style={{ height: "1px", width: "48px", background: "linear-gradient(90deg, transparent, var(--amber))" }} />
            <span className="text-[10px] tracking-[5px] uppercase" style={{ color: "var(--amber)" }}>Artisan Since 1998</span>
          </div>

          {/* GIANT headline */}
          <div
            style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateY(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.1s" }}
          >
            <h2
              className="font-display leading-none mb-10"
              style={{ fontSize: "clamp(56px, 9vw, 110px)", color: "var(--cream)", fontWeight: 700, letterSpacing: "-0.02em" }}
            >
              Our{" "}
              <span
                className="italic"
                style={{ color: "var(--amber)", WebkitTextStroke: "0px", textShadow: "0 0 80px rgba(232,160,32,0.4)" }}
              >
                Pizza
              </span>
            </h2>
          </div>

          {/* Two column content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">

            {/* LEFT — description + stats */}
            <div
              style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateX(-40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.25s" }}
            >
              <p className="text-base leading-relaxed mb-8" style={{ color: "rgba(245,230,200,0.65)", maxWidth: "460px" }}>
                Every pizza begins with our <em style={{ color: "var(--amber-lt)", fontStyle: "italic" }}>48-hour cold-fermented dough</em>,
                hand-stretched over our marble counter. We use only San Marzano tomatoes, sourced directly
                from Campania, and fresh mozzarella pulled every morning in our kitchen.
                The result? A pizza that is as beautiful as it is delicious.
              </p>

              {/* Ingredient chips */}
              <div className="flex flex-wrap gap-2 mb-10">
                {["Mozzarella", "Goat Cheese", "Parmigiano", "Feta", "Gorgonzola", "Burrata", "Ricotta", "Cheddar"].map((ing, i) => (
                  <span
                    key={ing}
                    className="text-[10px] tracking-wide px-3 py-1.5 rounded-full cursor-default transition-all duration-300"
                    style={{
                      border: "1px solid rgba(232,160,32,0.25)",
                      color: "rgba(232,160,32,0.75)",
                      background: "rgba(232,160,32,0.05)",
                      animationDelay: `${i * 0.05}s`,
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,160,32,0.18)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.7)"; e.currentTarget.style.color = "var(--amber-lt)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(232,160,32,0.05)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.25)"; e.currentTarget.style.color = "rgba(232,160,32,0.75)"; e.currentTarget.style.transform = "none"; }}
                  >
                    {ing}
                  </span>
                ))}
              </div>

              <button
                className="group relative overflow-hidden rounded-2xl font-semibold text-[11px] tracking-[3px] uppercase px-8 py-4"
                style={{ background: "linear-gradient(135deg, #E8A020, #B87818)", color: "#1C1410", boxShadow: "0 8px 32px rgba(232,160,32,0.35)", transition: "all 0.4s ease" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 16px 56px rgba(232,160,32,0.55)"; e.currentTarget.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(232,160,32,0.35)"; e.currentTarget.style.transform = "none"; }}
              >
                <span className="relative z-10">Explore Our Story</span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 skew-x-12" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)" }} />
              </button>
            </div>

            {/* RIGHT — pizza image with rings */}
            <div
              className="flex justify-center"
              style={{ opacity: heroVis ? 1 : 0, transform: heroVis ? "none" : "translateX(40px)", transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.35s" }}
            >
              <div className="relative" style={{ width: "360px", height: "360px" }}>

                {/* Ping rings */}
                {[0, 0.8, 1.6].map((d, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full border"
                    style={{
                      inset: `${-i * 22}px`,
                      borderColor: "rgba(232,160,32,0.12)",
                      animation: `pingScale ${2.5 + i * 0.5}s ease-out ${d}s infinite`,
                    }}
                  />
                ))}

                {/* Spinning dashed ring */}
                <div
                  className="absolute rounded-full border border-dashed"
                  style={{
                    inset: "-16px",
                    borderColor: "rgba(232,160,32,0.2)",
                    animation: "spinSlow 24s linear infinite",
                  }}
                >
                  <div
                    className="absolute rounded-full"
                    style={{ width: "14px", height: "14px", background: "var(--amber)", top: "-7px", left: "50%", marginLeft: "-7px", boxShadow: "0 0 16px rgba(232,160,32,0.8)", animation: "pulseGlow 2s ease-in-out infinite" }}
                  />
                </div>

                {/* Counter ring */}
                <div
                  className="absolute rounded-full border"
                  style={{ inset: "12px", borderColor: "rgba(232,160,32,0.08)", animation: "counterSpin 18s linear infinite" }}
                />

                {/* Main pizza circle */}
                <div
                  className="absolute rounded-full overflow-hidden"
                  style={{
                    inset: "24px",
                    boxShadow: "0 0 80px rgba(232,160,32,0.3), 0 32px 80px rgba(0,0,0,0.6)",
                    border: "2px solid rgba(232,160,32,0.25)",
                    animation: "pulseGlow 4s ease-in-out infinite",
                  }}
                >
                  <img src="/media/main-pizza.webp" alt="Main Pizza" className="w-full h-full object-cover" style={{ filter: "brightness(1.05) saturate(1.1)" }} />
                </div>

                {/* Floating badge 1 */}
                <div
                  className="absolute rounded-2xl px-4 py-2.5 text-center"
                  style={{
                    right: "-28px", top: "20px",
                    background: "linear-gradient(135deg, #E8A020, #C88010)",
                    color: "#1C1410",
                    boxShadow: "0 8px 32px rgba(232,160,32,0.5)",
                    animation: "floatY 3.5s ease-in-out infinite",
                    "--rot": "-2deg",
                  }}
                >
                  <div className="text-[10px] tracking-[2px] uppercase font-semibold whitespace-nowrap">🔥 Stone Fired</div>
                </div>

                {/* Floating badge 2 */}
                <div
                  className="absolute rounded-2xl px-4 py-2.5"
                  style={{
                    left: "-32px", bottom: "24px",
                    background: "rgba(28,20,10,0.92)",
                    border: "1px solid rgba(232,160,32,0.3)",
                    backdropFilter: "blur(12px)",
                    color: "var(--cream)",
                    boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                    animation: "floatY 4s ease-in-out 1.5s infinite",
                    "--rot": "2deg",
                  }}
                >
                  <div className="text-[10px] tracking-[2px] uppercase font-semibold whitespace-nowrap" style={{ color: "var(--amber)" }}>⏱ 90 Sec Bake</div>
                </div>

                {/* Floating badge 3 */}
                <div
                  className="absolute rounded-2xl px-3 py-2"
                  style={{
                    left: "-16px", top: "30px",
                    background: "rgba(90,122,90,0.9)",
                    backdropFilter: "blur(8px)",
                    color: "#fff",
                    boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
                    animation: "floatY 3.2s ease-in-out 0.8s infinite",
                  }}
                >
                  <div className="text-[10px] tracking-[2px] uppercase font-semibold whitespace-nowrap">🌿 100% Fresh</div>
                </div>
              </div>
            </div>
          </div>

          {/* ── 4-card ingredient features ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
            {ingredients.map((c) => <IngCard key={c.title} {...c} />)}
          </div>

          {/* ── Stats row ── */}
          <div
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 rounded-3xl p-10"
            style={{
              background: "linear-gradient(135deg, rgba(46,40,32,0.6) 0%, rgba(28,20,10,0.8) 100%)",
              border: "1px solid rgba(232,160,32,0.12)",
              backdropFilter: "blur(12px)",
            }}
          >
            <Stat value={25}  suffix="+"  label="Years of Craft" />
            <Stat value={48}  suffix="hr" label="Dough Fermented" />
            <Stat value={900} suffix="°F" label="Oven Temperature" />
            <Stat value={50}  suffix="k+" label="Happy Customers" />
          </div>
        </div>
      </section>

      <WaveDivider />

      {/* ══ ORDER ONLINE ══ */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden"
        style={{ padding: "80px 0 100px" }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 60% at 80% 50%, rgba(232,160,32,0.06) 0%, transparent 70%)" }} />

        <div className="max-w-6xl mx-auto px-6 lg:px-12">

          {/* Heading row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
            <div
              style={{ opacity: sectionVis ? 1 : 0, transform: sectionVis ? "none" : "translateY(28px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div style={{ height: "1px", width: "40px", background: "linear-gradient(90deg, transparent, var(--amber))" }} />
                <span className="text-[10px] tracking-[5px] uppercase" style={{ color: "var(--amber)" }}>Order Online</span>
              </div>
              <h2
                className="font-display leading-none"
                style={{ fontSize: "clamp(44px, 7vw, 80px)", color: "var(--cream)", fontWeight: 700, letterSpacing: "-0.02em" }}
              >
                Pick Your <br />
                <span className="italic" style={{ color: "var(--amber)" }}>Favourite</span>
              </h2>
            </div>

            <div
              style={{ opacity: sectionVis ? 1 : 0, transition: "all 0.9s ease 0.2s" }}
            >
              <p className="text-sm leading-relaxed text-right" style={{ color: "var(--muted)", maxWidth: "280px" }}>
                Delivered hot to your door.<br />
                <span style={{ color: "var(--amber-lt)" }}>Free delivery</span> on orders above ₹499.
              </p>
            </div>
          </div>

          {/* Slider */}
          <div className="relative">
            <div
              className="overflow-hidden rounded-3xl"
              ref={trackRef}
              onMouseDown={onDragStart}
              onMouseUp={onDragEnd}
              onTouchStart={onDragStart}
              onTouchEnd={onDragEnd}
              style={{ cursor: dragging ? "grabbing" : "grab" }}
            >
              <div
                className="flex gap-6 transition-transform duration-600 ease-out"
                style={{ transform: `translateX(calc(-${slide * (100 / VISIBLE)}% - ${slide * 24 / VISIBLE}px))` }}
              >
                {pizzas.map((pizza, i) => (
                  <div
                    key={pizza.id}
                    className="flex-shrink-0"
                    style={{ width: `calc(${100 / VISIBLE}% - ${(VISIBLE - 1) * 24 / VISIBLE}px)` }}
                  >
                    <PizzaCard pizza={pizza} addToCart={addToCart} index={i} />
                  </div>
                ))}
              </div>
            </div>

            {/* Arrow controls */}
            <div className="flex items-center justify-between mt-10">
              <div className="flex gap-2">
                {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlide(i)}
                    className="rounded-full transition-all duration-400"
                    style={{
                      height: "3px",
                      width: i === slide ? "36px" : "10px",
                      background: i === slide ? "linear-gradient(90deg, #E8A020, #F5C060)" : "rgba(138,122,104,0.3)",
                      boxShadow: i === slide ? "0 0 10px rgba(232,160,32,0.5)" : "none",
                    }}
                  />
                ))}
              </div>

              <div className="flex gap-3">
                {[
                  { dir: -1, icon: "←", dis: slide === 0 },
                  { dir:  1, icon: "→", dis: slide >= maxSlide },
                ].map(({ dir, icon, dis }) => (
                  <button
                    key={icon}
                    onClick={() => setSlide(s => Math.min(maxSlide, Math.max(0, s + dir)))}
                    disabled={dis}
                    className="w-12 h-12 rounded-2xl font-semibold text-sm transition-all duration-300 disabled:opacity-20"
                    style={{
                      background: "rgba(46,40,32,0.8)",
                      border: "1px solid rgba(232,160,32,0.2)",
                      color: "var(--amber)",
                      backdropFilter: "blur(8px)",
                    }}
                    onMouseEnter={e => { if (!dis) { e.currentTarget.style.background = "rgba(232,160,32,0.9)"; e.currentTarget.style.color = "#1C1410"; e.currentTarget.style.borderColor = "transparent"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(232,160,32,0.4)"; e.currentTarget.style.transform = "scale(1.08)"; } }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(46,40,32,0.8)"; e.currentTarget.style.color = "var(--amber)"; e.currentTarget.style.borderColor = "rgba(232,160,32,0.2)"; e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaveDivider flip />
    </div>
  );
}