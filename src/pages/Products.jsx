import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

export default function Products({ addToCart }) {
 const [products, setProducts] = useState([])
 useEffect(()=>{
  fetch("http://localhost:4000/api/productos")
  .then((response)=>response.json())
  .then((data)=> setProducts (data))
 },
[])

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
