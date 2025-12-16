import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";

export default function Products({ addToCart }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Cargar productos desde el backend
    fetch("http://localhost:8080/products")
      .then((res) => res.json())
      .then((data) => {
        console.log("📦 Datos recibidos del backend:", data);
        const productsArray = data._embedded?.productList || [];
        console.log("✅ Productos procesados:", productsArray);
        setProducts(productsArray);
      })
      .catch((error) => console.error("❌ Error cargando productos:", error));
  }, []);

  return (
    <div className="products">
      <h1>Planes de Suscripción</h1>
      <div className="products-grid">
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