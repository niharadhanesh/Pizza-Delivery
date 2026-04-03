import "./App.css";
import PizzaSection from "./components/PizzaSection";
import GalleryContactSection from "./components/GalleryContactSection";
import pizzas from "./data/pizzas";
import { useEffect, useState, useRef } from "react";

/* ── Count-up on mount ── */
function CountUp({ to, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.disconnect();
      const start = performance.now();
      const run = (now) => {
        const p = Math.min((now - start) / 1600, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setVal(Math.floor(ease * to));
        if (p < 1) requestAnimationFrame(run);
        else setVal(to);
      };
      requestAnimationFrame(run);
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── Marquee ── */
function Marquee() {
  const items = ["Dine In", "Take Away", "Home Delivery", "Book a Table", "Open 7 Days", "30 Min Delivery", "Walk-ins Welcome", "Private Events"];
  const all = [...items, ...items, ...items];
  return (
    <div style={{ overflow: "hidden" }}>
      <div className="marquee-inner">
        {all.map((t, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span className="marquee-item">{t}</span>
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Star rating display ── */
function Stars({ n = 5 }) {
  return (
    <span style={{ color: "orange", fontSize: "13px", letterSpacing: "2px" }}>
      {"★".repeat(n)}
    </span>
  );
}

export default function App() {
  const [vis, setVis] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);   // ← add this
  const addToCart = (pizza) => console.log("Added:", pizza.name);

  useEffect(() => {
    const t = setTimeout(() => setVis(true), 80);
    return () => clearTimeout(t);
  }, []);

  const fd = (delay, dir = "up") => ({
    opacity: vis ? 1 : 0,
    transform: vis ? "none"
      : dir === "right" ? "translateX(40px)"
      : dir === "left"  ? "translateX(-40px)"
      : "translateY(24px)",
    transition: `opacity 0.9s ease ${delay}s, transform 0.9s cubic-bezier(0.16,1,0.3,1) ${delay}s`,
  });

  const reviews = [
    { name: "Arjun M.", text: "Best Margherita I've had outside Naples.", stars: 5 },
    { name: "Priya K.", text: "Crispy crust, perfect char. Absolutely loved it.", stars: 5 },
  ];

  return (
    <>
      <div className="hero-wrapper">

        {/* ── NAVBAR ── */}
      <nav className="navbar">
  <div className="logo">
    <svg width="26" height="26" viewBox="0 0 28 28" fill="none"
      style={{ marginRight: "9px", verticalAlign: "middle", flexShrink: 0 }}>
      <circle cx="14" cy="14" r="13" stroke="orange" strokeWidth="1.5" />
      <path d="M14 5 L22 19 L6 19 Z" fill="none" stroke="orange" strokeWidth="1.3" strokeLinejoin="round" />
      <circle cx="14" cy="11" r="1.3" fill="orange" />
      <circle cx="10" cy="17" r="1.3" fill="orange" />
      <circle cx="18" cy="17" r="1.3" fill="orange" />
    </svg>
    YOU PIZZA
  </div>

  <div className="search-bar">
    <input type="text" placeholder="Search menu..." />
  </div>

  <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
    <span /><span /><span />
  </button>

  <ul className={`nav-links${menuOpen ? " nav-open" : ""}`}>
    <li className="active">HOME</li>
    <li>SPECIALTIES</li>
    <li>MENU</li>
    <li>CONTACT</li>
    <li>SIGN IN</li>
  </ul>
</nav>

        {/* ── HERO CONTENT ── */}
        <div className="hero-content">

          {/* ════ LEFT ════ */}
          <div className="left">

            {/* Eyebrow */}
            <div className="eyebrow" style={fd(0.1)}>
              <div className="eyebrow-line" />
              <span className="eyebrow-text">Naples · Est. 1998</span>
              <div className="live-badge">
                <div className="live-dot" />
                <span>OPEN NOW</span>
              </div>
            </div>

            <h2 style={fd(0.2)}>CHOOSE YOUR IDEAL<br />PORTION OR SIZE</h2>
            <h1 style={fd(0.3)}>30% OFF</h1>
            <div className="discount" style={fd(0.4)}>DISCOUNT ONLINE</div>

            <p style={fd(0.5)}>
              Dine in, take away, or get it delivered.
              Our kitchen is open seven days a week —
              book a table or just walk in.
            </p>

            <div className="delivery-cloud" style={fd(0.6)}>
              <span>DELIVERY</span>
              <p>+34 1980 2655</p>
            </div>

            <div style={{ display: "flex", gap: "14px", alignItems: "center", ...fd(0.7) }}>
              <button className="order-btn">ORDER NOW</button>
              <button className="book-btn">BOOK A TABLE</button>
            </div>

            {/* Quick stats row */}
            <div className="quick-stats" style={fd(0.85)}>
              {[
                { label: "Hours", value: "11am – 11pm" },
                { label: "Rating", value: "4.9 ★" },
                { label: "Delivery", value: "~30 min" },
              ].map(({ label, value }) => (
                <div className="quick-stat" key={label}>
                  <span className="qs-label">{label}</span>
                  <span className="qs-value">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ════ RIGHT ════ */}
          <div className="right-panel">

            {/* ── Stats card ── */}
            <div className="rcard stats-card" style={fd(0.35, "right")}>
              <p className="rcard-title">OUR NUMBERS</p>
              <div className="stats-grid">
                {[
                  { n: 25, suf: "+", label: "Years of Craft" },
                  { n: 50, suf: "k+", label: "Happy Customers" },
                  { n: 900, suf: "°F", label: "Oven Temperature" },
                  { n: 30, suf: "min", label: "Avg. Delivery" },
                ].map(({ n, suf, label }) => (
                  <div className="stat-item" key={label}>
                    <div className="stat-num"><CountUp to={n} suffix={suf} /></div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Today's Special ── */}
            <div className="rcard special-card" style={fd(0.5, "right")}>
              <div className="special-badge">TODAY'S SPECIAL</div>
              <div className="special-body">
                <div>
                  <div className="special-name">Truffle Burrata Pizza</div>
                  <div className="special-desc">Black truffle, burrata, wild rocket, EVOO</div>
                </div>
                <div className="special-price">
                  <span className="price-old">₹699</span>
                  <span className="price-new">₹489</span>
                </div>
              </div>
              <div className="special-timer">
                <div className="timer-dot" />
                <span>Available until midnight</span>
              </div>
            </div>

            {/* ── Reviews ── */}
            <div className="rcard reviews-card" style={fd(0.65, "right")}>
              <p className="rcard-title">WHAT PEOPLE SAY</p>
              <div className="reviews-list">
                {reviews.map((r) => (
                  <div className="review-item" key={r.name}>
                    <div className="review-avatar">{r.name[0]}</div>
                    <div className="review-body">
                      <div className="review-top">
                        <span className="review-name">{r.name}</span>
                        <Stars n={r.stars} />
                      </div>
                      <p className="review-text">"{r.text}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Promo pill ── */}
            <div className="promo-pill" style={fd(0.8, "right")}>
              <span className="promo-icon">🛵</span>
              <span className="promo-text">Free delivery on orders above <strong>₹499</strong></span>
              <span className="promo-arrow">→</span>
            </div>

          </div>
        </div>

        {/* Marquee */}
        <div className="hero-marquee">
          <Marquee />
        </div>
      </div>

      <PizzaSection pizzas={pizzas} addToCart={addToCart} />
      <GalleryContactSection />
    </>
  );
}