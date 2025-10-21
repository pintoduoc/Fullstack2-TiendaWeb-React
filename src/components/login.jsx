import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = ({ onClose, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const result = login(formData.email, formData.password);
    if (!result?.success) {
      setError(result?.message || "❌ Credenciales incorrectas");
      return;
    }

    onClose(); // cerrar modal
  };

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Iniciar Sesión</h2>

        <form onSubmit={handleSubmit}>
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
            Iniciar Sesión
          </button>
        </form>

        <p className="auth-switch">
          ¿No tienes cuenta?
          <button className="switch-btn" onClick={switchToRegister}>
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
