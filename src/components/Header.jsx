import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Cart from "./Cart";
import Login from "./login";
import Register from "./Register";

const Header = ({ cart, removeFromCart, updateQuantity }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const { user, logout } = useAuth();
  const navigate = useNavigate();

    const [welcomeMessage, setWelcomeMessage] = useState("");

  // 🪄 Mostrar mensaje de bienvenida cuando se inicia sesión
  if (user && !welcomeMessage) {
    setWelcomeMessage(`👋 Bienvenido, ${user.name}`);
    setTimeout(() => setWelcomeMessage(""), 4000); // desaparece en 4 segundos
  }


  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const handleLoginClick = () => {
    setAuthMode("login");
    setIsAuthModalOpen(true);
  };

  const handleRegisterClick = () => {
    setAuthMode("register");
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const switchToRegister = () => setAuthMode("register");
  const switchToLogin = () => setAuthMode("login");
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <header className="header">
      <nav className="navbar">
              {welcomeMessage && (
        <div className="welcome-banner">
          {welcomeMessage}
        </div>
      )}

        <div className="nav-brand">
          <Link to="/">
            <img src="images/ChileHub_Logo.png" alt="ChileHub" />
          </Link>
        </div>

        <ul className="nav-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>

          {/* 🔒 Visible solo si es admin */}
          {user && user.role === "admin" && (
            <li>
              <Link to="/admin" className="admin-btn">🛠️ Panel Admin</Link>
            </li>
          )}

          {/* 💼 Visible para cualquier usuario logueado (no admin) */}
          {user && user.role !== "admin" && (
            <li>
              <Link to="/membresia" className="membership-btn">
                💳 Mi Membresía
              </Link>
            </li>
          )}
        </ul>

        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <span className="welcome-msg">Hola, {user.name}</span>
              <button className="logout-btn" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <button className="login-btn" onClick={handleLoginClick}>
                Iniciar Sesión
              </button>
              <button className="register-btn" onClick={handleRegisterClick}>
                Registrarse
              </button>
            </div>
          )}

          <button className="cart-button" onClick={() => setIsCartOpen(true)}>
            🛒 ({totalItems})
          </button>
        </div>
      </nav>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />

      {isAuthModalOpen && (
        <>
          {authMode === "login" ? (
            <Login onClose={closeAuthModal} switchToRegister={switchToRegister} />
          ) : (
            <Register onClose={closeAuthModal} switchToLogin={switchToLogin} />
          )}
        </>
      )}
    </header>
  );
};

export default Header;
