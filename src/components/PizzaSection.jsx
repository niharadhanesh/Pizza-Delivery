import "./PizzaSection.css";

export default function PizzaSection() {
  return (
    <section className="pizza-section">

      {/* ===== OUR PIZZA TOP SECTION ===== */}
      <div className="our-pizza">
        <div className="pizza-left">
          <img
            src="https://images.unsplash.com/photo-1601924582971-bc1c6c34d6a1"
            alt="Pizza"
          />
        </div>

        <div className="pizza-right">
          <h2>Our Pizza</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>

          <div className="ingredients">
            <ul>
              <li>Mozzarella</li>
              <li>Goat cheese</li>
              <li>Cheddar</li>
              <li>Formaggio blend</li>
            </ul>
            <ul>
              <li>Feta cheese</li>
              <li>Blue cheese</li>
              <li>Parmigiano</li>
            </ul>
          </div>

          <button className="outline-btn">MORE ABOUT US</button>
        </div>
      </div>

      {/* ===== ORDER ONLINE SECTION ===== */}
      <div className="order-section">
        <h2 className="order-title">Order Online</h2>

        <div className="pizza-cards">
          <div className="pizza-card">
            <img src="https://images.unsplash.com/photo-1594007654729-407eedc4be65" />
            <h3>Margherita</h3>
            <p className="toppings">Tomatoes • Parmesan • Basil</p>
            <p className="desc">
              Ut enim ad minim veniam quis nostrud exercitation.
            </p>
            <div className="card-bottom">
              <span>$14,50</span>
              <button>Order Now</button>
            </div>
          </div>

          <div className="pizza-card">
            <img src="https://images.unsplash.com/photo-1548365328-9f547fb0953d" />
            <h3>Parmio</h3>
            <p className="toppings">Tomatoes • Parma Ham • Rucola</p>
            <p className="desc">
              Ut enim ad minim veniam quis nostrud exercitation.
            </p>
            <div className="card-bottom">
              <span>$14,50</span>
              <button>Order Now</button>
            </div>
          </div>

          <div className="pizza-card">
            <img src="https://images.unsplash.com/photo-1604382355076-af4b0eb60143" />
            <h3>Quattro Stagioni</h3>
            <p className="toppings">Tomatoes • Cheese • Mushroom</p>
            <p className="desc">
              Ut enim ad minim veniam quis nostrud exercitation.
            </p>
            <div className="card-bottom">
              <span>$14,50</span>
              <button>Order Now</button>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}