import PizzaCard from "./PizzaCard";
import "./pizza.css";

function PizzaSection({ pizzas, addToCart }) {
  return (
    <section className="pizza-section">

      {/* Decorative Top Line */}
      <div className="decor-line top-line"></div>

      {/* ===== OUR PIZZA TOP ===== */}
      <div className="our-pizza-wrapper">

        <h2 className="section-title">Our Pizza</h2>

        <div className="top-content">

          <div className="left-img">
            <img src="/media/main-pizza.webp" alt="Main Pizza" />
          </div>

          <div className="right-text">
            <p className="description">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit,
              sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>

            <div className="ingredients-list">
              <ul>
                <li>Mozzarella</li>
                <li>Goat cheese</li>
                <li>Canadian cheddar</li>
                <li>Formaggio blend</li>
              </ul>

              <ul>
                <li>Feta cheese</li>
                <li>Cheddar cheese</li>
                <li>Blue cheese</li>
                <li>Parmigiano cheese</li>
              </ul>
            </div>

            <button className="more-btn">MORE ABOUT US</button>
          </div>

          <img src="/media/cutter.png" className="cutter" alt="Cutter" />
        </div>
      </div>

      {/* ===== ORDER ONLINE ===== */}
      <div className="order-wrapper">
        <h2 className="section-title">Order Online</h2>

        <img src="/media/slices.png" className="slice-left" alt="slice" />
        <img src="/media/slices.png" className="slice-right" alt="slice" />

        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              addToCart={addToCart}
            />
          ))}
        </div>
      </div>

      {/* Decorative Bottom Line */}
      <div className="decor-line bottom-line"></div>

    </section>
  );
}

export default PizzaSection;