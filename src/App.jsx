import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

// 🧩 Componentes globales
import Header from "./components/Header";
import Footer from "./components/Footer";

// 🏠 Páginas principales
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Contact from "./pages/Contact";

// 💼 Página de membresía del usuario
import MiMembresia from "./pages/MiMembresia";

// 🔒 Páginas del panel admin
import ProtectedAdmin from "./pages/Admin/ProtectedAdmin";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import UserManagement from "./pages/Admin/UserManagement";
import VideoManagement from "./pages/Admin/VideoManagement";

// 🎨 Estilos
import "./styles/App.css";
import "./styles/components.css";

function App() {
  const [cart, setCart] = useState([]);

  // 🛒 Funciones del carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity === 0) {
      removeFromCart(productId);
    } else {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        )
      );
    }
  };

  // 🚀 Render principal
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
          />

          <main>
            <Routes>
              {/* 🌍 Rutas públicas */}
              <Route path="/" element={<Home />} />
              <Route
                path="/productos"
                element={<Products addToCart={addToCart} />}
              />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />

              {/* 💼 Página del usuario: su membresía */}
              <Route path="/membresia" element={<MiMembresia />} />

              {/* 🔒 Rutas protegidas del panel admin */}
              <Route
                path="/admin"
                element={
                  <ProtectedAdmin>
                    <AdminDashboard />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/usuarios"
                element={
                  <ProtectedAdmin>
                    <UserManagement />
                  </ProtectedAdmin>
                }
              />
              <Route
                path="/admin/videos"
                element={
                  <ProtectedAdmin>
                    <VideoManagement />
                  </ProtectedAdmin>
                }
              />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
