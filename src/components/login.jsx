import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

const Login = ({ onClose, switchToRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const { login } = useAuth()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulación de login - reemplaza con tu API real
    login({
      id: 1,
      name: 'Usuario Demo',
      email: formData.email
    })
    onClose()
  }

  return (
    <div className="auth-modal">
      <div className="auth-content">
        <button className="close-btn" onClick={onClose}>×</button>
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
          <button type="submit" className="submit-btn">Iniciar Sesión</button>
        </form>
        <p className="auth-switch">
          ¿No tienes cuenta? 
          <button className="switch-btn" onClick={switchToRegister}>
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  )
}

export default Login