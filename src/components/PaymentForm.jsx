import React, { useState } from "react";

const PaymentForm = ({ total, onClose, onConfirm }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    paymentMethod: "tarjeta",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(formData);
  };

  return (
    <div className="payment-overlay">
      <div className="payment-modal">
        <h2>Detalles de Pago</h2>
        <button className="close-btn" onClick={onClose}>×</button>

        <form onSubmit={handleSubmit} className="payment-form">
          <label>
            Nombre Completo:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Método de Pago:
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
            >
              <option value="tarjeta">Tarjeta de Crédito</option>
              <option value="debito">Tarjeta de Débito</option>
              <option value="transferencia">Transferencia Bancaria</option>
            </select>
          </label>

          <div className="payment-total">
            <strong>Total a pagar: ${total.toFixed(2)}</strong>
          </div>

          <button type="submit" className="confirm-btn">
            Confirmar Pago
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
