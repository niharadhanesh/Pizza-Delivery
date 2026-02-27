import pizzas from "./data/pizzas"
import PizzaCard from "./components/PizzaCard"
import "./App.css"

function App() {

  const addToCart = (pizza) => {
    alert(`${pizza.name} added to cart!`)
  }

  return (
    <>
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">🍕 PizzaHub</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Menu</li>
          <li>Contact</li>
        </ul>
      </nav>

      {/* HERO SECTION */}
      <header className="hero">
        <h1>Delicious Pizzas Delivered Fast</h1>
        <p>Fresh • Hot • Tasty</p>
      </header>

      {/* PIZZA SECTION */}
      <section className="container">
        <h2 className="section-title">Our Menu</h2>

        <div className="pizza-grid">
          {pizzas.map((pizza) => (
            <PizzaCard
              key={pizza.id}
              pizza={pizza}
              addToCart={addToCart}
            />
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p>© 2026 PizzaHub | All Rights Reserved</p>
      </footer>
    </>
  )
}

export default App