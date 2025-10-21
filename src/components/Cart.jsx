import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import PaymentForm from "./PaymentForm";

const Cart = ({ isOpen, onClose, cart, removeFromCart, updateQuantity }) => {
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const { user, users, giveMembership, setUser } = useAuth();

  // Calcula el total
  const total =
    cart && cart.length > 0
      ? cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
      : 0;

  // Acción al confirmar pago
  const handlePaymentConfirm = (data) => {
    // Verificar si el email existe en la base de usuarios
    const account = users.find((u) => u.email === data.email);
    if (!account) {
      alert("❌ El correo ingresado no pertenece a una cuenta. Crea una cuenta o usa otro correo.");
      return;
    }

    // Otorgar membresía por cada item del carrito (cantidad veces si aplica)
    for (const item of cart) {
      // Si hay cantidades, podemos otorgar una sola vez por tipo (membresías normalmente no se acumulan)
      giveMembership(account.email, item.id);
    }

    // Si el correo de compra coincide con el usuario logueado, refrescar su estado local
    if (user && user.email === account.email) {
      // Encontrar el último producto comprado (si se compró más de uno, tomamos el primero del carrito)
      const purchased = cart[0];
      if (purchased) {
        const now = new Date();
        const durationDays = purchased.name.includes("Semanal")
          ? 7
          : purchased.name.includes("Mensual")
          ? 30
          : 365;
        const expirationDate = new Date(now);
        expirationDate.setDate(now.getDate() + durationDays);

        const updatedCurrent = {
          ...user,
          membership: {
            id: purchased.id,
            name: purchased.name,
            price: purchased.price,
            description: purchased.description,
            expiresAt: expirationDate.toISOString(),
          },
          history: [
            ...(user.history || []),
            {
              action: "purchase",
              name: purchased.name,
              date: new Date().toISOString(),
            },
          ],
          totalSpent: (user.totalSpent || 0) + purchased.price,
        };
        setUser(updatedCurrent);
        localStorage.setItem("user", JSON.stringify(updatedCurrent));
      }
    }

    alert(`✅ Pago confirmado por ${data.name} (${data.email}). Membresía asignada.`);

    // Vaciar carrito después del pago exitoso
    cart.forEach((item) => removeFromCart(item.id));

    setIsPaymentOpen(false);
    onClose(); // Cierra el carrito después del pago
  };

  // Si el carrito está cerrado, no se renderiza
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
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-img"
                />

                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Precio unitario: ${item.price.toFixed(2)}</p>
                  <p>
                    Subtotal:{" "}
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                  </p>
                </div>

                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      item.quantity > 1 &&
                      updateQuantity(item.id, item.quantity - 1)
                    }
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, item.quantity + 1)
                    }
                  >
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
            <button
              className="checkout-btn"
              onClick={() => setIsPaymentOpen(true)}
            >
              Proceder al Pago
            </button>
          </div>
        )}

        {/* 🔹 FORMULARIO DE PAGO */}
        {isPaymentOpen && (
          <PaymentForm
            total={total}
            onClose={() => setIsPaymentOpen(false)}
            onConfirm={handlePaymentConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
