const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Mi Tienda</h3>
          <p>Tu destino para los mejores productos al mejor precio.</p>
        </div>
        
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/productos">Productos</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>📧 info@chilehub.com</p>
          <p>📧 osca.sepulveda@duocuc.cl</p>
          <p>📧 be.pintor@duocuc.cl</p>
        </div>
        
        <div className="footer-section">
          <h4>Síguenos</h4>
          <div className="social-links">
            <a href="https://www.instagram.com/benja.pintor/" aria-label="Instagram 1">📷</a>
            <a href="https://www.instagram.com/noxtope/" aria-label="Instagram 2">📸</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 ChileHub. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer