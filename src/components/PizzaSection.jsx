import { useState, useRef, useEffect } from "react";
import PizzaCard from "./PizzaCard";

/* ══════════════════════════════════════
   FLOATING BACKGROUND PARTICLES
══════════════════════════════════════ */
function FloatingParticles() {
  const particles = [
    // [x%, y%, size, duration, delay, type]
    [8,  10, 60, 18, 0,   "slice"],
    [92, 15, 40, 22, 3,   "ring"],
    [18, 75, 30, 16, 1.5, "dot"],
    [78, 60, 50, 20, 5,   "slice"],
    [45, 88, 35, 24, 2,   "ring"],
    [5,  45, 25, 14, 4,   "dot"],
    [88, 85, 45, 19, 0.5, "slice"],
    [55, 5,  30, 17, 6,   "ring"],
    [30, 30, 20, 21, 3.5, "dot"],
    [70, 20, 55, 23, 1,   "slice"],
    [15, 55, 28, 15, 7,   "ring"],
    [60, 70, 22, 18, 2.5, "dot"],
  ];

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
      {particles.map(([x, y, size, dur, delay, type], i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: `${x}%`,
            top: `${y}%`,
            width: size,
            height: size,
            opacity: type === "slice" ? 0.045 : type === "ring" ? 0.07 : 0.06,
            animation: `particleFloat ${dur}s ease-in-out ${delay}s infinite alternate`,
          }}
        >
          {type === "slice" && (
            <svg viewBox="0 0 100 100" fill="none">
              <path d="M50 50 L50 5 A45 45 0 0 1 88 72 Z" fill="#E8A020" />
              <circle cx="50" cy="50" r="45" stroke="#E8A020" strokeWidth="2" fill="none" />
              <circle cx="62" cy="30" r="4" fill="#E8A020" />
              <circle cx="45" cy="38" r="3" fill="#E8A020" />
              <circle cx="70" cy="52" r="5" fill="#E8A020" />
            </svg>
          )}
          {type === "ring" && (
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="44" stroke="#E8A020" strokeWidth="2" fill="none" strokeDasharray="8 5" />
              <circle cx="50" cy="50" r="30" stroke="#E8A020" strokeWidth="1" fill="none" />
            </svg>
          )}
          {type === "dot" && (
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="30" fill="#E8A020" />
              <circle cx="50" cy="50" r="18" fill="#1C1410" />
            </svg>
          )}
        </div>
      ))}


    </div>
  );
}

/* ══════════════════════════════════════
   INGREDIENT IMAGE STRIP
══════════════════════════════════════ */
function IngredientStrip({ visible }) {
  const items = [
    { img: "https://www.contadina.com/sites/default/files/Contadina_Pizza.jpg",  label: "San Marzano",    sub: "Imported from Campania" },
    { img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=220&q=80", label: "Burrata",       sub: "Hand-pulled daily" },
    { img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=220&q=80", label: "48hr Dough",    sub: "Cold fermented" },
    { img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=220&q=80",  label: "Stone Oven",     sub: "900°F wood fire" },
    { img: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=220&q=80", label: "Extra Virgin",  sub: "First cold press" },
    { img: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?w=220&q=80", label: "Fresh Basil",   sub: "Grown in-house" },
  ];

  return (
    <div style={{
      display: "flex", gap: "28px", alignItems: "center",
      padding: "32px 0 44px", overflowX: "auto",
      scrollbarWidth: "none", msOverflowStyle: "none",
    }}>
      {items.map((item, i) => (
        <div
          key={item.label}
          style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            gap: "10px", flexShrink: 0, cursor: "default",
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: `opacity 0.7s ease ${0.1 + i * 0.08}s, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${0.1 + i * 0.08}s`,
          }}
        >
          {/* Circular image */}
          <div style={{
            width: "90px", height: "90px", borderRadius: "50%",
            overflow: "hidden", position: "relative",
            border: "2px solid rgba(232,160,32,0.2)",
            boxShadow: "0 8px 28px rgba(0,0,0,0.4)",
            transition: "all 0.4s ease",
          }}
            onMouseEnter={e => {
              e.currentTarget.style.border = "2px solid rgba(232,160,32,0.7)";
              e.currentTarget.style.boxShadow = "0 12px 40px rgba(232,160,32,0.25), 0 8px 28px rgba(0,0,0,0.4)";
              e.currentTarget.style.transform = "scale(1.1) translateY(-4px)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.border = "2px solid rgba(232,160,32,0.2)";
              e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.4)";
              e.currentTarget.style.transform = "none";
            }}
          >
            <img src={item.img} alt={item.label}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) saturate(1.15)" }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
            {/* Amber ring shimmer on hover */}
            <div style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(232,160,32,0.15), transparent 60%)",
            }} />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "1.5px", color: "var(--cream)", textTransform: "uppercase" }}>{item.label}</div>
            <div style={{ fontSize: "9px", letterSpacing: "1px", color: "var(--muted)", marginTop: "2px" }}>{item.sub}</div>
          </div>
        </div>
      ))}

      {/* Divider dots between items */}
      <style>{`.ing-strip::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}

/* ══════════════════════════════════════
   ANIMATED COUNT UP
══════════════════════════════════════ */
function CountUp({ end, suffix = "", duration = 1800 }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        setVal(Math.floor(p * p * end));
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

/* ══════════════════════════════════════
   WAVE DIVIDER
══════════════════════════════════════ */
function WaveDivider({ flip = false }) {
  return (
    <div style={{ lineHeight: 0, transform: flip ? "scaleY(-1)" : "none" }}>
      <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg"
        style={{ width: "100%", height: "60px", display: "block" }}>
        <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="rgba(232,160,32,0.06)" />
        <path d="M0,40 C480,10 960,55 1440,25 L1440,60 L0,60 Z" fill="rgba(232,160,32,0.04)" />
      </svg>
    </div>
  );
}

/* ══════════════════════════════════════
   INGREDIENT FEATURE CARD
══════════════════════════════════════ */
function IngCard({ icon, title, desc, delay, img }) {
  const [vis, setVis] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        borderRadius: "20px",
        overflow: "hidden",
        position: "relative",
        cursor: "default",
        opacity: vis ? 1 : 0,
        transform: vis ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s ease ${delay}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
        boxShadow: "0 4px 32px rgba(0,0,0,0.4)",
        border: "1px solid rgba(232,160,32,0.1)",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.border = "1px solid rgba(232,160,32,0.45)";
        e.currentTarget.style.boxShadow = "0 20px 60px rgba(232,160,32,0.15), 0 4px 32px rgba(0,0,0,0.4)";
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.transition = "all 0.4s cubic-bezier(0.16,1,0.3,1)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.border = "1px solid rgba(232,160,32,0.1)";
        e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,0,0,0.4)";
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.transition = "all 0.4s cubic-bezier(0.16,1,0.3,1)";
      }}
    >
      {/* Background image */}
      {img && (
        <div style={{
          position: "absolute", inset: 0,
          background: `url(${img}) center/cover no-repeat`,
          opacity: 0.12, filter: "blur(1px) saturate(0.6)",
        }} />
      )}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(46,40,32,0.92) 0%, rgba(20,14,6,0.97) 100%)",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, padding: "28px 24px" }}>
        <div style={{ fontSize: "32px", marginBottom: "14px" }}>{icon}</div>
        <h4 style={{ color: "var(--cream)", fontWeight: 700, fontSize: "15px", letterSpacing: "0.5px", marginBottom: "8px" }}>{title}</h4>
        <p style={{ color: "var(--muted)", fontSize: "12px", lineHeight: 1.7, margin: 0 }}>{desc}</p>
        <div style={{
          marginTop: "18px", height: "2px", width: "32px",
          background: "linear-gradient(90deg, var(--amber), transparent)",
          borderRadius: "2px",
        }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   STAT BLOCK
══════════════════════════════════════ */
function Stat({ value, suffix, label, icon }) {
  return (
    <div className="text-center" style={{ position: "relative" }}>
      <div style={{ fontSize: "13px", marginBottom: "8px", opacity: 0.7 }}>{icon}</div>
      <div style={{
        fontFamily: "'Oswald', sans-serif",
        fontSize: "clamp(42px, 5vw, 58px)",
        fontWeight: 700,
        color: "var(--amber)",
        letterSpacing: "-0.03em",
        lineHeight: 1,
      }}>
        <CountUp end={value} suffix={suffix} />
      </div>
      <div style={{
        fontSize: "9px", letterSpacing: "3px", textTransform: "uppercase",
        color: "var(--muted)", marginTop: "8px",
      }}>{label}</div>
    </div>
  );
}

/* ══════════════════════════════════════
   AWARD BADGE
══════════════════════════════════════ */
function AwardBadge({ visible }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: "12px",
      background: "rgba(232,160,32,0.08)",
      border: "1px solid rgba(232,160,32,0.25)",
      borderRadius: "40px",
      padding: "10px 20px 10px 10px",
      marginBottom: "28px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: "opacity 0.8s ease 0.05s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.05s",
    }}>
      <div style={{
        width: "32px", height: "32px", borderRadius: "50%",
        background: "linear-gradient(135deg, #E8A020, #B87818)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "16px",
      }}>⭐</div>
      <div>
        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "var(--amber)", textTransform: "uppercase" }}>Best Pizzeria 2024</div>
        <div style={{ fontSize: "9px", color: "var(--muted)", letterSpacing: "1px" }}>Gourmet India Awards</div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════ */
export default function PizzaSection({ pizzas, addToCart }) {
  const [slide, setSlide]           = useState(0);
  const [dragging, setDragging]     = useState(false);
  const [dragStart, setDragStart]   = useState(0);
  const [sectionVis, setSectionVis] = useState(false);
  const [heroVis, setHeroVis]       = useState(false);
  const sectionRef = useRef(null);
  const heroRef    = useRef(null);
  const trackRef   = useRef(null);

  /* Responsive VISIBLE count */
  const [visibleCards, setVisibleCards] = useState(3);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      setVisibleCards(w < 600 ? 1 : w < 900 ? 2 : 3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const maxSlide = Math.max(0, pizzas.length - visibleCards);

  useEffect(() => {
    const obs1 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSectionVis(true); obs1.disconnect(); } }, { threshold: 0.06 });
    const obs2 = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setHeroVis(true);    obs2.disconnect(); } }, { threshold: 0.08 });
    if (sectionRef.current) obs1.observe(sectionRef.current);
    if (heroRef.current)    obs2.observe(heroRef.current);
    return () => { obs1.disconnect(); obs2.disconnect(); };
  }, []);

  const onDragStart = (e) => {
    setDragging(true);
    setDragStart(e.type === "touchstart" ? e.touches[0].clientX : e.clientX);
  };
  const onDragEnd = (e) => {
    if (!dragging) return;
    const end  = e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX;
    const diff = dragStart - end;
    if (Math.abs(diff) > 40) setSlide(s => Math.min(maxSlide, Math.max(0, s + (diff > 0 ? 1 : -1))));
    setDragging(false);
  };

  const ingredients = [
    { icon: "🌾", title: "48hr Fermented Dough",    desc: "Cold-fermented for 48 hours developing complex flavour and a perfect open crumb.", delay: 0.1, img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=300&q=70" },
    { icon: "🍅", title: "San Marzano Tomatoes",     desc: "Imported directly from Campania, Italy — sweet, low-acid, and utterly perfect.", delay: 0.2, img: "https://images.unsplash.com/photo-1546470427-e26264be0b0d?w=300&q=70" },
    { icon: "🧀", title: "Hand-pulled Mozzarella",   desc: "Made fresh every morning in our kitchen using whole milk curds from local farms.", delay: 0.3, img: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=300&q=70" },
    { icon: "🔥", title: "Wood-fired at 900°F",      desc: "Our stone oven reaches 900°F giving you a blistered, airy crust in just 90 seconds.", delay: 0.4, img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=300&q=70" },
  ];

  return (
    <>
      {/* ── Keyframe injection ── */}
      <style>{`
        @keyframes particleFloat {
          0%   { transform: translateY(0px) rotate(0deg); }
          100% { transform: translateY(-28px) rotate(12deg); }
        }
        @keyframes orbitDot {
          0%   { transform: rotate(0deg) translateX(196px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(196px) rotate(-360deg); }
        }
        @keyframes orbitDot2 {
          0%   { transform: rotate(180deg) translateX(210px) rotate(-180deg); }
          100% { transform: rotate(540deg) translateX(210px) rotate(-540deg); }
        }
        @keyframes spinSlow    { to { transform: rotate(360deg); } }
        @keyframes counterSpin { to { transform: rotate(-360deg); } }
        @keyframes pingScale   { 0% { transform: scale(1); opacity: 0.5; } 80% { transform: scale(1.18); opacity: 0; } 100% { transform: scale(1.18); opacity: 0; } }
        @keyframes pulseGlow   { 0%, 100% { opacity: 1; } 50% { opacity: 0.72; } }
        @keyframes floatY      { 0%, 100% { transform: translateY(0) rotate(var(--rot, 0deg)); } 50% { transform: translateY(-10px) rotate(var(--rot, 0deg)); } }
        @keyframes shimmerSlide { 0% { transform: translateX(-100%) skewX(-12deg); } 100% { transform: translateX(300%) skewX(-12deg); } }
        @keyframes gradientShift { 0%, 100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes borderGlow  { 0%, 100% { border-color: rgba(232,160,32,0.15); } 50% { border-color: rgba(232,160,32,0.4); } }
        @keyframes countPulse  { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.04); } }
      `}</style>

      <div style={{
        background: "linear-gradient(180deg, #110C08 0%, #1A1208 15%, #141008 70%, #0E0A06 100%)",
        position: "relative",
      }}>

        {/* ══ OUR PIZZA — EDITORIAL HERO ══ */}
        <section
          ref={heroRef}
          style={{ padding: "110px 0 90px", position: "relative", overflow: "hidden" }}
        >
          <FloatingParticles />

          {/* Layered radial glows */}
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(232,160,32,0.09) 0%, transparent 65%)" }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 40% 40% at 75% 60%, rgba(232,100,20,0.05) 0%, transparent 60%)" }} />

          {/* PIZZA watermark */}
          <div style={{
            position: "absolute", inset: 0, display: "flex",
            alignItems: "center", justifyContent: "center",
            pointerEvents: "none", overflow: "hidden", opacity: 0.025,
          }}>
            <span style={{
              fontFamily: "'Oswald', sans-serif",
              fontSize: "clamp(130px, 22vw, 240px)",
              fontWeight: 700, color: "var(--amber)", whiteSpace: "nowrap",
              letterSpacing: "-0.04em",
            }}>PIZZA</span>
          </div>

          {/* ── CONTAINER ── */}
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

            {/* Award badge */}
            <AwardBadge visible={heroVis} />

            {/* Section label */}
            <div style={{
              display: "flex", alignItems: "center", gap: "16px", marginBottom: "10px",
              opacity: heroVis ? 1 : 0,
              transform: heroVis ? "none" : "translateY(20px)",
              transition: "all 0.8s ease 0.05s",
            }}>
              <div style={{ height: "1px", width: "56px", background: "linear-gradient(90deg, transparent, var(--amber))" }} />
              <span style={{ fontSize: "10px", letterSpacing: "5px", color: "var(--amber)", textTransform: "uppercase" }}>Artisan Since 1998</span>
              <div style={{ height: "1px", width: "56px", background: "linear-gradient(90deg, var(--amber), transparent)" }} />
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

            {/* Ingredient image strip */}
            <IngredientStrip visible={heroVis} />

            {/* Two-column content */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "80px",
              alignItems: "center",
              marginBottom: "80px",
            }}
              className="pizza-two-col"
            >
              {/* LEFT */}
              <div style={{
                opacity: heroVis ? 1 : 0,
                transform: heroVis ? "none" : "translateX(-40px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.28s",
              }}>
                <p style={{
                  fontSize: "16px", lineHeight: 1.85,
                  color: "rgba(245,230,200,0.65)", maxWidth: "520px", marginBottom: "28px",
                }}>
                  Every pizza begins with our{" "}
                  <em style={{ color: "var(--amber-lt)", fontStyle: "italic" }}>48-hour cold-fermented dough</em>,
                  hand-stretched over our marble counter. We source only San Marzano tomatoes
                  directly from Campania and pull fresh mozzarella every morning in our kitchen.
                  The result? A pizza that is as beautiful as it is delicious.
                </p>

                {/* Cheese chip tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "32px" }}>
                  {["Mozzarella", "Goat Cheese", "Parmigiano", "Feta", "Gorgonzola", "Burrata", "Ricotta", "Cheddar"].map((ing, i) => (
                    <span
                      key={ing}
                      style={{
                        fontSize: "10px", letterSpacing: "1px",
                        padding: "7px 14px", borderRadius: "20px",
                        border: "1px solid rgba(232,160,32,0.22)",
                        color: "rgba(232,160,32,0.72)",
                        background: "rgba(232,160,32,0.05)",
                        cursor: "default",
                        transition: "all 0.3s ease",
                        textTransform: "uppercase",
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = "rgba(232,160,32,0.18)";
                        e.currentTarget.style.borderColor = "rgba(232,160,32,0.7)";
                        e.currentTarget.style.color = "var(--amber-lt)";
                        e.currentTarget.style.transform = "translateY(-3px)";
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(232,160,32,0.05)";
                        e.currentTarget.style.borderColor = "rgba(232,160,32,0.22)";
                        e.currentTarget.style.color = "rgba(232,160,32,0.72)";
                        e.currentTarget.style.transform = "none";
                      }}
                    >{ing}</span>
                  ))}
                </div>

                {/* Delivery promise strip */}
                <div style={{
                  display: "flex", gap: "20px", marginBottom: "32px",
                  padding: "16px 20px",
                  background: "rgba(232,160,32,0.05)",
                  border: "1px solid rgba(232,160,32,0.12)",
                  borderRadius: "14px",
                  flexWrap: "wrap",
                }}>
                  {[
                    { icon: "🛵", text: "Free delivery ₹499+" },
                    { icon: "⏱", text: "30 min delivery" },
                    { icon: "🌿", text: "No preservatives" },
                  ].map(({ icon, text }) => (
                    <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "16px" }}>{icon}</span>
                      <span style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.5px" }}>{text}</span>
                    </div>
                  ))}
                </div>

                {/* CTA button */}
                <button
                  style={{
                    position: "relative", overflow: "hidden",
                    borderRadius: "16px", fontFamily: "'Oswald', sans-serif",
                    fontWeight: 600, fontSize: "12px", letterSpacing: "3px",
                    textTransform: "uppercase", padding: "16px 36px",
                    background: "linear-gradient(135deg, #E8A020, #B87818)",
                    color: "#1C1410", border: "none", cursor: "pointer",
                    boxShadow: "0 10px 40px rgba(232,160,32,0.38)",
                    transition: "all 0.4s ease",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = "0 18px 60px rgba(232,160,32,0.6)";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.querySelector(".shimmer").style.animation = "shimmerSlide 0.7s ease forwards";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = "0 10px 40px rgba(232,160,32,0.38)";
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.querySelector(".shimmer").style.animation = "none";
                  }}
                >
                  <span style={{ position: "relative", zIndex: 1 }}>Explore Our Story</span>
                  <span className="shimmer" style={{
                    position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                    transform: "translateX(-100%) skewX(-12deg)",
                  }} />
                </button>
              </div>

              {/* RIGHT — Enhanced pizza orb */}
              <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                opacity: heroVis ? 1 : 0,
                transform: heroVis ? "none" : "translateX(40px)",
                transition: "all 1s cubic-bezier(0.16,1,0.3,1) 0.38s",
              }}>
                <div style={{ position: "relative", width: "420px", height: "420px" }}>

                  {/* Outer glow rings */}
                  {[0, 0.7, 1.4, 2.1].map((d, i) => (
                    <div key={i} style={{
                      position: "absolute",
                      inset: `${-i * 24}px`,
                      borderRadius: "50%",
                      border: `1px solid rgba(232,160,32,${0.14 - i * 0.03})`,
                      animation: `pingScale ${2.8 + i * 0.5}s ease-out ${d}s infinite`,
                    }} />
                  ))}

                  {/* Slow spinning dashed ring */}
                  <div style={{
                    position: "absolute", inset: "-20px", borderRadius: "50%",
                    border: "1.5px dashed rgba(232,160,32,0.22)",
                    animation: "spinSlow 28s linear infinite",
                  }}>
                    {/* Orbiting amber dot */}
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: "10px", height: "10px", marginLeft: "-5px", marginTop: "-5px",
                      animation: "orbitDot 28s linear infinite",
                    }}>
                      <div style={{
                        width: "10px", height: "10px", borderRadius: "50%",
                        background: "var(--amber)",
                        boxShadow: "0 0 12px rgba(232,160,32,0.9)",
                      }} />
                    </div>
                  </div>

                  {/* Counter-spin ring with second orbiter */}
                  <div style={{
                    position: "absolute", inset: "10px", borderRadius: "50%",
                    border: "1px solid rgba(232,160,32,0.08)",
                    animation: "counterSpin 20s linear infinite",
                  }}>
                    <div style={{
                      position: "absolute", top: "50%", left: "50%",
                      width: "7px", height: "7px", marginLeft: "-3.5px", marginTop: "-3.5px",
                      animation: "orbitDot2 20s linear infinite",
                    }}>
                      <div style={{
                        width: "7px", height: "7px", borderRadius: "50%",
                        background: "rgba(232,160,32,0.6)",
                      }} />
                    </div>
                  </div>

                  {/* Main pizza circle */}
                  <div style={{
                    position: "absolute", inset: "28px", borderRadius: "50%",
                    overflow: "hidden",
                    border: "2.5px solid rgba(232,160,32,0.3)",
                    boxShadow: "0 0 100px rgba(232,160,32,0.35), 0 40px 100px rgba(0,0,0,0.7), inset 0 0 40px rgba(232,160,32,0.08)",
                    animation: "pulseGlow 4.5s ease-in-out infinite",
                  }}>
                    <img
                      src="/media/main-pizza.webp"
                      alt="Artisan Pizza"
                      style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(1.08) saturate(1.15)" }}
                    />
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "radial-gradient(circle at 30% 30%, rgba(232,160,32,0.1), transparent 55%)",
                    }} />
                  </div>

                  

                  {/* Floating badge — 90 Sec Bake */}
                  <div style={{
                    position: "absolute", left: "-44px", bottom: "32px",
                    background: "rgba(20,14,8,0.93)",
                    border: "1px solid rgba(232,160,32,0.35)",
                    backdropFilter: "blur(14px)",
                    color: "var(--cream)", borderRadius: "14px",
                    padding: "10px 16px",
                    boxShadow: "0 10px 36px rgba(0,0,0,0.5)",
                    animation: "floatY 4.2s ease-in-out 1.5s infinite",
                    "--rot": "2deg",
                  }}>
                    <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", whiteSpace: "nowrap", color: "var(--amber)" }}>⏱ 90 Sec Bake</div>
                  </div>

                  {/* Floating badge — 100% Fresh */}
                  <div style={{
                    position: "absolute", left: "-24px", top: "28px",
                    background: "rgba(60,100,60,0.92)",
                    backdropFilter: "blur(10px)",
                    color: "#fff", borderRadius: "12px",
                    padding: "9px 14px",
                    boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
                    animation: "floatY 3.2s ease-in-out 0.8s infinite",
                    border: "1px solid rgba(100,180,100,0.3)",
                  }}>
                    <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", whiteSpace: "nowrap" }}>🌿 100% Fresh</div>
                  </div>

                  {/* Floating badge — Rating */}
                  <div style={{
                    position: "absolute", right: "-20px", bottom: "60px",
                    background: "rgba(20,14,8,0.9)",
                    border: "1px solid rgba(232,160,32,0.25)",
                    backdropFilter: "blur(10px)",
                    borderRadius: "12px",
                    padding: "8px 14px",
                    animation: "floatY 5s ease-in-out 2.5s infinite",
                  }}>
                    <div style={{ fontSize: "10px", color: "#E8A020", letterSpacing: "1px", fontWeight: 700 }}>★ 4.9 Rating</div>
                    <div style={{ fontSize: "9px", color: "var(--muted)", letterSpacing: "0.5px" }}>50k+ Reviews</div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── 4-card ingredient features ── */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              marginBottom: "60px",
            }} className="ing-grid">
              {ingredients.map(c => <IngCard key={c.title} {...c} />)}
            </div>

            {/* ── Stats row with background image ── */}
            <div style={{
              position: "relative",
              borderRadius: "28px",
              overflow: "hidden",
              border: "1px solid rgba(232,160,32,0.15)",
              animation: "borderGlow 4s ease-in-out infinite",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(46,40,32,0.92) 0%, rgba(20,14,6,0.97) 100%)",
              }} />

              <div style={{
                position: "relative", zIndex: 1,
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
                gap: "32px", padding: "48px 52px",
              }} className="stats-row">
                <Stat value={25}  suffix="+"  label="Years of Craft"    icon="🏆" />
                <Stat value={48}  suffix="hr" label="Dough Fermented"   icon="🌾" />
                <Stat value={900} suffix="°F" label="Oven Temperature"  icon="🔥" />
                <Stat value={50}  suffix="k+" label="Happy Customers"   icon="😊" />
              </div>
            </div>
          </div>
        </section>

        <WaveDivider />

        {/* ══ ORDER ONLINE ══ */}
        <section
          ref={sectionRef}
          style={{ padding: "90px 0 110px", position: "relative", overflow: "hidden" }}
        >
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 65% 65% at 80% 50%, rgba(232,160,32,0.07) 0%, transparent 70%)",
          }} />
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none",
            background: "radial-gradient(ellipse 40% 40% at 15% 80%, rgba(180,80,10,0.04) 0%, transparent 60%)",
          }} />

          {/* Subtle grid pattern */}
          <div style={{
            position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.03,
            backgroundImage: `
              linear-gradient(rgba(232,160,32,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(232,160,32,0.5) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }} />

          {/* ── CONTAINER ── */}
          <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 40px", position: "relative", zIndex: 1 }}>

            {/* Heading row */}
            <div style={{
              display: "flex", flexWrap: "wrap",
              alignItems: "flex-end", justifyContent: "space-between",
              gap: "24px", marginBottom: "56px",
            }}>
              <div style={{
                opacity: sectionVis ? 1 : 0,
                transform: sectionVis ? "none" : "translateY(28px)",
                transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "10px" }}>
                  <div style={{ height: "1px", width: "44px", background: "linear-gradient(90deg, transparent, var(--amber))" }} />
                  <span style={{ fontSize: "10px", letterSpacing: "5px", color: "var(--amber)", textTransform: "uppercase" }}>Order Online</span>
                </div>
              <h2
              className="font-display leading-none mb-10"
              style={{
                fontSize: "clamp(56px, 9vw, 110px)",
                color: "var(--cream)",
                fontWeight: 700,
                letterSpacing: "-0.02em"
              }}
            >
              Pick Your <br />
              <span
                className="italic"
                style={{
                  color: "var(--amber)",
                  WebkitTextStroke: "0px",
                  textShadow: "0 0 80px rgba(232,160,32,0.4)"
                }}
              >
                Favourite
              </span>
            </h2>
              </div>

              <div style={{
                opacity: sectionVis ? 1 : 0,
                transition: "all 0.9s ease 0.22s",
              }}>
                <p style={{ fontSize: "14px", lineHeight: 1.8, textAlign: "right", color: "var(--muted)", maxWidth: "300px", margin: 0 }}>
                  Delivered hot to your door.<br />
                  <span style={{ color: "var(--amber-lt)" }}>Free delivery</span> on orders above ₹499.
                </p>

                {/* Icon badges */}
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "16px" }}>
                  {["🛵 Fast Delivery", "📦 Secure Packing", "♻️ Eco Boxes"].map(t => (
                    <span key={t} style={{
                      fontSize: "10px", padding: "5px 12px", borderRadius: "20px",
                      background: "rgba(232,160,32,0.07)",
                      border: "1px solid rgba(232,160,32,0.18)",
                      color: "var(--muted)", letterSpacing: "0.5px",
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Slider */}
            <div style={{ position: "relative" }}>
              <div
                ref={trackRef}
                style={{
                  overflow: "hidden", borderRadius: "24px",
                  cursor: dragging ? "grabbing" : "grab",
                }}
                onMouseDown={onDragStart}
                onMouseUp={onDragEnd}
                onTouchStart={onDragStart}
                onTouchEnd={onDragEnd}
              >
                <div style={{
                  display: "flex", gap: "20px",
                  transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                  transform: `translateX(calc(-${slide * (100 / visibleCards)}% - ${slide * 20 / visibleCards}px))`,
                }}>
                  {pizzas.map((pizza, i) => (
                    <div
                      key={pizza.id}
                      style={{
                        flexShrink: 0,
                        width: `calc(${100 / visibleCards}% - ${(visibleCards - 1) * 20 / visibleCards}px)`,
                      }}
                    >
                      <PizzaCard pizza={pizza} addToCart={addToCart} index={i} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Controls */}
              <div style={{
                display: "flex", alignItems: "center",
                justifyContent: "space-between", marginTop: "36px",
              }}>
                {/* Dot indicators */}
                <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                  {Array.from({ length: maxSlide + 1 }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSlide(i)}
                      style={{
                        height: "3px",
                        width: i === slide ? "40px" : "10px",
                        borderRadius: "2px",
                        border: "none",
                        cursor: "pointer",
                        background: i === slide
                          ? "linear-gradient(90deg, #E8A020, #F5C060)"
                          : "rgba(138,122,104,0.3)",
                        boxShadow: i === slide ? "0 0 12px rgba(232,160,32,0.55)" : "none",
                        transition: "all 0.4s ease",
                        padding: 0,
                      }}
                    />
                  ))}
                </div>

                {/* Arrow buttons */}
                <div style={{ display: "flex", gap: "10px" }}>
                  {[
                    { dir: -1, icon: "←", dis: slide === 0 },
                    { dir:  1, icon: "→", dis: slide >= maxSlide },
                  ].map(({ dir, icon, dis }) => (
                    <button
                      key={icon}
                      onClick={() => setSlide(s => Math.min(maxSlide, Math.max(0, s + dir)))}
                      disabled={dis}
                      style={{
                        width: "52px", height: "52px", borderRadius: "16px",
                        fontWeight: 700, fontSize: "16px",
                        background: "rgba(46,40,32,0.85)",
                        border: "1px solid rgba(232,160,32,0.22)",
                        color: "var(--amber)",
                        backdropFilter: "blur(10px)",
                        cursor: dis ? "not-allowed" : "pointer",
                        opacity: dis ? 0.2 : 1,
                        transition: "all 0.3s ease",
                        fontFamily: "sans-serif",
                      }}
                      onMouseEnter={e => {
                        if (!dis) {
                          e.currentTarget.style.background = "rgba(232,160,32,0.92)";
                          e.currentTarget.style.color = "#1C1410";
                          e.currentTarget.style.borderColor = "transparent";
                          e.currentTarget.style.boxShadow = "0 10px 30px rgba(232,160,32,0.45)";
                          e.currentTarget.style.transform = "scale(1.1)";
                        }
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = "rgba(46,40,32,0.85)";
                        e.currentTarget.style.color = "var(--amber)";
                        e.currentTarget.style.borderColor = "rgba(232,160,32,0.22)";
                        e.currentTarget.style.boxShadow = "none";
                        e.currentTarget.style.transform = "none";
                      }}
                    >{icon}</button>
                  ))}
                </div>
              </div>
            </div>

            {/* ── Bottom trust strip ── */}
            <div style={{
              display: "flex", gap: "0",
              marginTop: "64px",
              borderTop: "1px solid rgba(232,160,32,0.1)",
              paddingTop: "40px",
              flexWrap: "wrap",
            }}>
              {[
                { icon: "🏪", title: "Dine In",        desc: "Book your table" },
                { icon: "🛵", title: "Home Delivery",   desc: "Track in real-time" },
                { icon: "📦", title: "Take Away",       desc: "Ready in 15 min" },
                { icon: "🎉", title: "Private Events",  desc: "We cater for 10–200" },
              ].map(({ icon, title, desc }, i) => (
                <div key={title} style={{
                  flex: "1 1 180px",
                  padding: "20px 28px",
                  borderRight: i < 3 ? "1px solid rgba(232,160,32,0.08)" : "none",
                  transition: "all 0.35s ease",
                  cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(232,160,32,0.04)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "none"; }}
                >
                  <div style={{ fontSize: "22px", marginBottom: "10px" }}>{icon}</div>
                  <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--cream)", letterSpacing: "1px", textTransform: "uppercase", marginBottom: "4px" }}>{title}</div>
                  <div style={{ fontSize: "11px", color: "var(--muted)", letterSpacing: "0.5px" }}>{desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <WaveDivider flip />

        {/* Responsive overrides */}
        <style>{`
          @media (max-width: 1100px) {
            .pizza-two-col { grid-template-columns: 1fr !important; gap: 48px !important; }
            .ing-grid      { grid-template-columns: repeat(2, 1fr) !important; }
            .stats-row     { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 700px) {
            .ing-grid  { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
            .stats-row { grid-template-columns: repeat(2, 1fr) !important; padding: 28px 24px !important; gap: 20px !important; }
            .pizza-two-col { gap: 32px !important; }
          }
          @media (max-width: 480px) {
            .ing-grid  { grid-template-columns: 1fr !important; }
            .stats-row { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>
    </>
  );
}