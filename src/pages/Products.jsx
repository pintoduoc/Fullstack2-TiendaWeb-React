import ProductCard from "../components/ProductCard";
import { useAuth } from "../context/AuthContext";

export default function Products({ addToCart }) {
  // 2. Extraer los productos YA cargados del contexto (no usar useState ni useEffect aquí)
  const { products } = useAuth(); 

  return (
    <div className="products">
      <h1>Planes de Suscripción</h1>
      <div className="products-grid">
        {/* 3. Renderizar la lista que viene del contexto */}
        {products && products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={addToCart} />
          ))
        ) : (
          <p>Cargando productos...</p>
        )}
      </div>
    </div>
  );
}