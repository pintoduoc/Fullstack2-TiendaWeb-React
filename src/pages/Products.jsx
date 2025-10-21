import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Products({ addToCart }) {
  return (
    <div className="products">
      <h1>Planes de Suscripción</h1>
      <div className="products-grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
        ))}
      </div>
    </div>
  );
}
