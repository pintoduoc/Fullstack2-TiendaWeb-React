// src/setupTests.js

// Extiende las funciones de expect() con los matchers de Testing Library
import '@testing-library/jest-dom'

// Este archivo se ejecuta automáticamente antes de cada test
// Puedes agregar configuraciones globales o mocks aquí si los necesitas más adelante.

// Ejemplo opcional (por si algún componente usa scrollTo o localStorage):
// window.scrollTo = vi.fn()
// global.localStorage = {
//   getItem: vi.fn(),
//   setItem: vi.fn(),
//   removeItem: vi.fn(),
// }
