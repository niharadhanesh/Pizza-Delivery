import { useState, useRef } from "react";

function PizzaCard({ pizza, addToCart, index = 0 }) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded]     = useState(false);
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const cardRef               = useRef(null);

  /* 3-D tilt on mouse move */
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);
    setTilt({ x: dy * -10, y: dx * 10 });
  };

  const handleMouseLeave = () => {
    setHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  const handleAdd = () => {
    addToCart(pizza);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <div
      ref={cardRef}
      className="relative cursor-pointer select-none"
      style={{
        perspective: "1000px",
        animation: `cardEntrance 0.7s cubic-bezier(0.16,1,0.3,1) ${index * 0.12}s both`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Glow blob behind card */}
      <div
        className="absolute inset-0 rounded-3xl transition-opacity duration-700 pointer-events-none -z-10"
        style={{
          background: "radial-gradient(ellipse at center, rgba(232,160,32,0.25) 0%, transparent 70%)",
          opacity: hovered ? 1 : 0,
          filter: "blur(20px)",
          transform: "scale(1.1)",
        }}
      />

      {/* Card body */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${hovered ? "translateZ(8px)" : "translateZ(0)"}`,
          transition: hovered ? "transform 0.1s ease" : "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
          background: hovered
            ? "linear-gradient(145deg, #2E2010 0%, #241C10 60%, #1C1610 100%)"
            : "linear-gradient(145deg, #241A0E 0%, #1E160A 60%, #181208 100%)",
          border: `1px solid ${hovered ? "rgba(232,160,32,0.5)" : "rgba(232,160,32,0.12)"}`,
          boxShadow: hovered
            ? "0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(232,160,32,0.3), inset 0 1px 0 rgba(232,160,32,0.1)"
            : "0 8px 32px rgba(0,0,0,0.4)",
          transition: "all 0.5s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Shine layer */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.y * 5}% ${50 + tilt.x * 5}%, rgba(255,255,255,0.06) 0%, transparent 60%)`,
            transition: "background 0.1s ease",
          }}
        />

        {/* Number tag */}
        <div
          className="absolute top-4 left-4 z-20 font-display italic text-3xl leading-none font-light"
          style={{
            color: hovered ? "rgba(232,160,32,0.9)" : "rgba(232,160,32,0.25)",
            transition: "color 0.5s ease",
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Top badge */}
        <div
          className="absolute top-4 right-4 z-20 text-[9px] tracking-[3px] uppercase px-3 py-1.5 rounded-full font-medium"
          style={{
            background: hovered ? "rgba(232,160,32,1)" : "rgba(232,160,32,0.1)",
            color: hovered ? "#1C1410" : "rgba(232,160,32,0.6)",
            border: "1px solid rgba(232,160,32,0.3)",
            transition: "all 0.4s ease",
          }}
        >
          Chef's Pick
        </div>

        {/* Pizza image */}
        <div className="relative h-52 overflow-hidden">
          {/* Gradient overlay on image */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: hovered
                ? "linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(28,20,10,0.95) 100%)"
                : "linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(28,20,10,1) 100%)",
              transition: "background 0.6s ease",
            }}
          />
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover"
            style={{
              transform: hovered ? "scale(1.12) rotate(-1deg)" : "scale(1) rotate(0deg)",
              transition: "transform 0.8s cubic-bezier(0.16,1,0.3,1)",
              filter: hovered ? "brightness(1.1) saturate(1.2)" : "brightness(0.85) saturate(1)",
            }}
          />
        </div>

        {/* Content */}
        <div className="px-6 pb-6 -mt-6 relative z-20">
          {/* Animated amber line */}
          <div className="overflow-hidden h-px mb-4">
            <div
              className="h-full"
              style={{
                background: "linear-gradient(90deg, var(--amber), var(--amber-lt), var(--amber))",
                backgroundSize: "200% auto",
                animation: hovered ? "shimmer 2s linear infinite" : "none",
                width: hovered ? "100%" : "32px",
                transition: "width 0.6s cubic-bezier(0.16,1,0.3,1)",
              }}
            />
          </div>

          <h3
            className="font-display text-2xl leading-tight mb-2"
            style={{
              color: hovered ? "#F5E6C8" : "rgba(245,230,200,0.85)",
              fontWeight: 600,
              letterSpacing: "0.02em",
              transition: "color 0.4s ease",
            }}
          >
            {pizza.name}
          </h3>

          <p
            className="text-xs leading-relaxed mb-5 tracking-wide"
            style={{
              color: hovered ? "rgba(245,230,200,0.6)" : "rgba(245,230,200,0.35)",
              transition: "color 0.4s ease",
            }}
          >
            {pizza.ingredients}
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-3 mb-5">
            {["Fresh", "Artisan", "Daily"].map((tag) => (
              <span
                key={tag}
                className="text-[9px] tracking-[2px] uppercase px-2 py-1 rounded"
                style={{
                  background: "rgba(232,160,32,0.08)",
                  border: "1px solid rgba(232,160,32,0.2)",
                  color: "rgba(232,160,32,0.7)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Price + Button */}
          <div className="flex items-center justify-between">
            <div>
              <span className="block text-[9px] tracking-[3px] uppercase" style={{ color: "rgba(138,122,104,0.8)" }}>
                Price
              </span>
              <span
                className="font-display text-3xl font-semibold"
                style={{ color: "var(--amber)", letterSpacing: "-0.01em" }}
              >
                ₹{pizza.price}
              </span>
            </div>

            <button
              onClick={handleAdd}
              className="relative overflow-hidden rounded-2xl text-[10px] tracking-[2px] uppercase font-semibold px-6 py-3"
              style={{
                background: added
                  ? "linear-gradient(135deg, #5A7A5A, #3d5e3d)"
                  : hovered
                  ? "linear-gradient(135deg, #E8A020, #B87818)"
                  : "transparent",
                color: added ? "#fff" : hovered ? "#1C1410" : "rgba(232,160,32,0.8)",
                border: `1px solid ${added ? "transparent" : "rgba(232,160,32,0.4)"}`,
                boxShadow: added
                  ? "0 0 20px rgba(90,122,90,0.5)"
                  : hovered
                  ? "0 8px 32px rgba(232,160,32,0.4)"
                  : "none",
                transition: "all 0.4s cubic-bezier(0.16,1,0.3,1)",
                transform: hovered && !added ? "scale(1.04)" : "scale(1)",
              }}
            >
              {/* Shimmer on hover */}
              {hovered && !added && (
                <span
                  className="absolute inset-0 -translate-x-full animate-[shimmerBtn_0.8s_ease_forwards]"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)", animationFillMode: "forwards" }}
                />
              )}
              <span className="relative z-10">{added ? "✓ Added!" : "Order Now"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;