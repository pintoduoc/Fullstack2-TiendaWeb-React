import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { vi, describe, it, beforeEach, expect } from 'vitest'
import { useAuth } from '../context/AuthContext'
import Home from './Home'

// 🔹 Mock del contexto de autenticación usando Vitest (vi.mock)
vi.mock('../context/AuthContext', () => ({
  useAuth: vi.fn(),
}))

describe('Componente Home', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    cleanup()
  })

  it('muestra el contenido principal y los beneficios', () => {
    useAuth.mockReturnValue({ user: null })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    // Hero principal
    expect(screen.getByText(/Bienvenido a ChileHub/i)).toBeTruthy()
    expect(screen.getByText(/Descubre el mejor contenido/i)).toBeTruthy()

    // Beneficios
    expect(screen.getByText(/10% de Descuento/i)).toBeTruthy()
    expect(screen.getByText(/Envío Gratis/i)).toBeTruthy()
    expect(screen.getByText(/Ofertas Exclusivas/i)).toBeTruthy()
    expect(screen.getByText(/Historial de Pedidos/i)).toBeTruthy()
  })

  it('muestra botones de login y registro si el usuario NO está autenticado', () => {
    useAuth.mockReturnValue({ user: null })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText(/Suscribete a ChileHub/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: /Explorar Productos/i })).toBeTruthy()
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeTruthy()
  })

  it('muestra saludo personalizado si el usuario está autenticado', () => {
    useAuth.mockReturnValue({ user: { name: 'Oscar' } })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    expect(screen.getByText(/Hola de nuevo, Oscar/i)).toBeTruthy()
    expect(screen.getByRole('link', { name: /Continuar Comprando/i })).toBeTruthy()
  })

  it('botón de iniciar sesión dispara el evento esperado', () => {
    useAuth.mockReturnValue({ user: null })

    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )

    const loginButton = screen.getByRole('button', { name: /Iniciar Sesión/i })

    // Simulamos que existe un botón .login-btn en el DOM
    const fakeLoginBtn = document.createElement('button')
    fakeLoginBtn.className = 'login-btn'
    document.body.appendChild(fakeLoginBtn)

    // 👇 usamos vi.spyOn en vez de jest.spyOn
    const clickSpy = vi.spyOn(fakeLoginBtn, 'click')

    fireEvent.click(loginButton)
    expect(clickSpy).toHaveBeenCalled()
  })
})
