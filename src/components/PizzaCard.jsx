function PizzaCard({ pizza, addToCart }) {
  return (
    <div className="pizza-card">
      <img src={pizza.image} alt={pizza.name} className="pizza-img" />
      <h3>{pizza.name}</h3>
      <p className="price">₹{pizza.price}</p>
      <button
        className="add-btn"
        onClick={() => addToCart(pizza)}
      >
        Add to Cart
      </button>
    </div>
  )
}

export default PizzaCard