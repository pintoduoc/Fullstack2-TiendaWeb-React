import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>Bienvenido a ChileHub</h1>
          <p>Descubre el mejor contenido SFW, a solo una subscripcion</p>
          <Link to="/productos" className="cta-button">
            Ver Productos
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home