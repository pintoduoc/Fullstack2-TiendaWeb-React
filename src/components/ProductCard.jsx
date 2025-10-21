const ProductCard = ({ product, onAddToCart }) => {

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <h2>{product.name}</h2>
        <p className="product-price">${product.price}</p>
        <p className="product-description">{product.description}</p>
        {onAddToCart && (
          <button
            className="add-to-cart-btn"
            onClick={() => onAddToCart(product)}
          >
            Agregar al Carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;