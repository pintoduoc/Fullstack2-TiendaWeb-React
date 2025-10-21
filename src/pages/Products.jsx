import { products } from "../data/products";
import { useAuth } from "../context/AuthContext";

export default function Products() {
  const { purchaseMembership } = useAuth();

  return (
    <div className="products">
      <h1>Planes de Suscripción</h1>
      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
            <button onClick={() => purchaseMembership(product)}>
              Comprar
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
