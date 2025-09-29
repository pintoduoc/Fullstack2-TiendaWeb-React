import { useState } from 'react'
import { Link } from 'react-router-dom'
import Cart from './Cart'

const Header = ({ cart, removeFromCart, updateQuantity }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="header">
      <nav className="navbar">
        <div className="nav-brand">
          <Link to="/">ChileHub</Link>
        </div>
        <ul className="nav-menu">
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/productos">Productos</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <div className="nav-cart">
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
    </header>
  )
}

export default Header