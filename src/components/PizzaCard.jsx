function PizzaCard({ pizza, addToCart }) {
  return (
    <div className="pizza-card">
      <img src={pizza.image} alt={pizza.name} className="pizza-img" />

      <h3 className="pizza-name">{pizza.name}</h3>

      <p className="ingredients">{pizza.ingredients}</p>

      <div className="bottom-row">
        <span className="price">₹{pizza.price}</span>
        <button
          className="add-btn"
          onClick={() => addToCart(pizza)}
        >
          Order Now
        </button>
      </div>
    </div>
  );
}

export default PizzaCard;