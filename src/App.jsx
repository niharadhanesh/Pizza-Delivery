import "./App.css";

function App() {
  return (
    <div className="hero-wrapper">

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="logo">YOU PIZZA</div>

        <div className="search-bar">
          <input type="text" placeholder="Search..." />
        </div>

        <ul className="nav-links">
          <li className="active">HOME</li>
          <li>SPECIALTIES</li>
          <li>MENU</li>
          <li>CONTACT</li>
          <li>SIGN IN</li>
        </ul>
      </nav>

      {/* HERO CONTENT */}
      <div className="hero-content">
        <div className="left">
          <h2>CHOOSE YOUR IDEAL<br />PORTION OR SIZE</h2>

          <h1>30% OFF</h1>

          <div className="discount">DISCOUNT ONLINE</div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed diam nonummy nibh euismod tincidunt ut laoreet.
          </p>

         <div className="delivery-cloud">
  <span>DELIVERY</span>
  <p>+34 1980 2655</p>
</div>

          <button className="order-btn">ORDER NOW</button>
        </div>

        <div className="right">
          <img
           
          />
        </div>
      </div>
    </div>
  );
}

export default App;