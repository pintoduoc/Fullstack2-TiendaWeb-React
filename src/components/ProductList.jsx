import ProductCard from './ProductCard'

const ProductList = ({ products, onAddToCart, loading = false }) => {
  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando productos...</p>
      </div>
    )
  }

  if (!products || products.length === 0) {
    return (
      <div className="no-products">
        <h3>No se encontraron productos</h3>
        <p>Intenta con otros términos de búsqueda.</p>
      </div>
    )
  }

  return (
    <div className="product-list">
      <div className="products-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductList