import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a Nuestra Tienda</h1>
          <p>Descubre los mejores productos al mejor precio</p>
          
          {!user && (
            <div className="auth-section">
              <p>¡Únete a nuestra comunidad y disfruta de beneficios exclusivos!</p>
              <div className="auth-buttons-hero">
                <Link to="/productos" className="cta-button">
                  Explorar Productos
                </Link>
                <button className="cta-button secondary" onClick={() => document.querySelector('.login-btn')?.click()}>
                  Iniciar Sesión
                </button>
              </div>
              <p className="register-prompt">
                ¿No tienes cuenta? <span>¡Regístrate y obtén un 10% de descuento!</span>
              </p>
            </div>
          )}

          {user && (
            <div className="welcome-user">
              <p>¡Hola de nuevo, {user.name}! ¿Listo para seguir comprando?</p>
              <Link to="/productos" className="cta-button">
                Continuar Comprando
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="featured-products">
        <h2>Productos Destacados</h2>
        <div className="products-grid">
          <div className="featured-placeholder">
            <p>Próximamente: productos destacados</p>
          </div>
        </div>
      </section>

      <section className="benefits">
        <h2>Beneficios de Registrarte</h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <div className="benefit-icon">🎁</div>
            <h3>10% de Descuento</h3>
            <p>En tu primera compra al registrarte</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">🚚</div>
            <h3>Envío Gratis</h3>
            <p>En compras mayores a $50</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">⭐</div>
            <h3>Ofertas Exclusivas</h3>
            <p>Acceso a promociones especiales</p>
          </div>
          <div className="benefit-card">
            <div className="benefit-icon">📱</div>
            <h3>Historial de Pedidos</h3>
            <p>Sigue todos tus pedidos fácilmente</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home