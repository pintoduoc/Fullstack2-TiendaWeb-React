import React from "react";

const Cart = ({ isOpen, onClose, cart, removeFromCart, updateQuantity }) => {
  // ✅ Evita errores si el carrito está vacío o indefinido
  const total = cart && cart.length > 0 
    ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;

  if (!isOpen) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-modal">
        {/* 🔹 HEADER */}
        <div className="cart-header">
          <h2>Tu Carrito</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* 🔹 ITEMS */}
        <div className="cart-items">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-img" />

                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Precio unitario: ${item.price.toFixed(2)}</p>
                  <p>
                    Subtotal: <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      item.quantity > 1 && updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                    +
                  </button>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </div>
            ))
          )}
        </div>

        {/* 🔹 FOOTER */}
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <strong>Total a pagar: ${total.toFixed(2)}</strong>
            </div>
            <button className="checkout-btn">Proceder al Pago</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
