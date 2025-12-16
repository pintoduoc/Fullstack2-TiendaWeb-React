import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

// ⬅️ AGREGAR ESTE HOOK
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // 📝 Registro
  const register = async (email, password, name) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      console.log("📝 Intentando registrar:", { email: cleanEmail, name });
      
      const response = await fetch("http://localhost:8080/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password, name }),
      });

      console.log("Respuesta registro:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Usuario registrado:", data);
        return { success: true, user: data };
      } else {
        const errorText = await response.text();
        console.error("❌ Error en registro:", errorText);
        return { success: false, message: errorText };
      }
    } catch (error) {
      console.error("❌ Error de red en registro:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  // 🔐 Login
  const login = async (email, password) => {
    try {
      const cleanEmail = email.trim().toLowerCase();
      console.log("🔐 Intentando login:", cleanEmail);
      
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: cleanEmail, password }),
      });

      console.log("Respuesta login:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ Login exitoso:", data);
        
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        setUser(data.user);
        
        return { success: true };
      } else {
        const errorText = await response.text();
        console.error("❌ Error en login:", errorText);
        return { success: false, message: errorText };
      }
    } catch (error) {
      console.error("❌ Error de red en login:", error);
      return { success: false, message: "Error de conexión" };
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};