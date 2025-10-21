import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = ({ onClose, switchToLogin }) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = register(formData);
    if (result?.success) {
      onClose();
    } else {
      setError(result?.message || "❌ Error al registrar usuario");
    }
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Crear Cuenta</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Registrarme
          </button>
        </form>

        <p className="auth-switch">
          ¿Ya tienes cuenta?
          <button className="switch-btn" onClick={switchToLogin}>
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
