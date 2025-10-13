import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Cart from './Cart'
import Login from './login'
import Register from './Register'

const Header = ({ cart, removeFromCart, updateQuantity }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const { user, logout } = useAuth()

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  const handleLoginClick = () => {
    setAuthMode('login')
    setIsAuthModalOpen(true)
  }

  const handleRegisterClick = () => {
    setAuthMode('register')
    setIsAuthModalOpen(true)
  }

  const handleLogout = () => {
    logout()
  }

  const switchToRegister = () => {
    setAuthMode('register')
  }

  const switchToLogin = () => {
    setAuthMode('login')
  }

  const closeAuthModal = () => {
    setIsAuthModalOpen(false)
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/"><img src="public/images/ChileHub_Logo.png" alt="ChileHub" /></Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
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
          <button 
            className="cart-button"
            onClick={() => setIsCartOpen(true)}
          >
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
          {authMode === 'login' ? (
            <Login onClose={closeAuthModal} switchToRegister={switchToRegister} />
          ) : (
            <Register onClose={closeAuthModal} switchToLogin={switchToLogin} />
          )}
        </>
      )}
    </header>
  )
}

export default Header