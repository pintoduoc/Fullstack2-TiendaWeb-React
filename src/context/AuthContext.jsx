import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

// 🛡️ Admins definidos en el código (solo editables aquí)
const ADMIN_CREDENTIALS = [
  {
    email: "adminhubbenjaminpinto@chilehub.com",
    password: "Benjamin123@", // 🔐 cámbialo solo aquí
    role: "admin",
    name: "Benjamin Pinto",
  },
  {
    email: "adminhuboscarsepulveda@chilehub.com",
    password: "Oscar123@",
    role: "admin",
    name: "Oscar Sepúlveda",
  },
];

export const AuthProvider = ({ children }) => {
  // 🔄 Cargar datos desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : [];
  });

  const [products, setProducts] = useState([]);
// 🔄 CARGAR PRODUCTOS DESDE SPRING BOOT
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/products");
        if (response.ok) {
          const data = await response.json();
          console.log("📦 Datos recibidos del backend:", data); // <--- AGREGADO PARA DEPURAR

          // INTENTO 1: Buscar en _embedded.productList
          let loadedProducts = [];
          if (data._embedded && data._embedded.productList) {
            loadedProducts = data._embedded.productList;
          } 
          // INTENTO 2: A veces Spring usa el nombre de la clase en plural o minúsculas
          else if (data._embedded && data._embedded.productModelList) {
            loadedProducts = data._embedded.productModelList;
          }
          // INTENTO 3: Si es un array directo (por si acaso cambiaste el controller)
          else if (Array.isArray(data)) {
            loadedProducts = data;
          }

          console.log("✅ Productos procesados:", loadedProducts); // <--- VERIFICA ESTO EN CONSOLA
          setProducts(loadedProducts);
        } else {
          console.error("❌ Error al cargar productos: Estado", response.status);
        }
      } catch (error) {
        console.error("❌ Error de conexión con el backend Java:", error);
      }
    };

    fetchProducts();
  }, []);

  // 🔄 Persistencia automática en localStorage
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // 🔐 LOGIN
  const login = (email, password) => {
    // 1️⃣ Verificar si es un admin
    const admin = ADMIN_CREDENTIALS.find((a) => a.email === email);
    if (admin) {
      if (password === admin.password) {
        setUser(admin);
        localStorage.setItem("user", JSON.stringify(admin));
        alert(`✅ Bienvenido administrador ${admin.name}`);
        return { success: true };
      } else {
        alert("❌ Contraseña de administrador incorrecta.");
        return { success: false };
      }
    }

    // 2️⃣ Usuarios normales
    const existingUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (existingUser) {
      setUser(existingUser);
      localStorage.setItem("user", JSON.stringify(existingUser));
      alert(`✅ Bienvenido ${existingUser.name}`);
      return { success: true };
    } else {
      alert("❌ Credenciales incorrectas.");
      return { success: false };
    }
  };

  // 🚪 LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  // 🆕 REGISTRO (desde el modal de registro)
  const register = (newUser) => {
    const adminEmails = ADMIN_CREDENTIALS.map((a) => a.email);
    if (adminEmails.includes(newUser.email)) {
      alert("❌ No puedes crear un usuario administrador desde aquí.");
      return;
    }

    if (users.some((u) => u.email === newUser.email)) {
      alert("❌ Ese correo ya está registrado.");
      return;
    }

    const newUserData = {
      ...newUser,
      role: "user",
      membership: null,
      history: [],
      totalSpent: 0,
    };

    setUsers([...users, newUserData]);
    alert("✅ Usuario registrado correctamente.");
  };

  // ➕ Agregar usuario desde el panel admin
  const addUser = (newUser) => {
    const adminEmails = ADMIN_CREDENTIALS.map((a) => a.email);
    if (adminEmails.includes(newUser.email)) {
      alert("❌ No puedes crear un usuario administrador desde aquí.");
      return;
    }

    if (users.some((u) => u.email === newUser.email)) {
      alert("❌ Ese usuario ya existe.");
      return;
    }

    const newUserData = {
      ...newUser,
      role: "user",
      membership: null,
      history: [],
      totalSpent: 0,
    };

    setUsers([...users, newUserData]);
    alert("✅ Usuario agregado correctamente.");
  };

  // ❌ Eliminar usuario
  const removeUser = (email) => {
    setUsers(users.filter((u) => u.email !== email));
  };

  // ⭐ Dar membresía (admin o compra)
  const giveMembership = (email, productId) => {
    const product = products.find((p) => p.id === Number(productId));
    
    if (!product) return;

    const durationDays = product.name.includes("Semanal") ? 7 : product.name.includes("Mensual") ? 30 : 365;
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + durationDays);

    const updatedUsers = users.map((u) =>
      u.email === email
        ? {
            ...u,
            membership: {
              id: product.id,
              name: product.name,
              price: product.price,
              description: product.description,
              expiresAt: expirationDate.toISOString(),
            },
            history: [
              ...(u.history || []),
              {
                action: "purchase",
                name: product.name,
                date: new Date().toISOString(),
              },
            ],
            totalSpent: (u.totalSpent || 0) + product.price,
          }
        : u
    );
    setUsers(updatedUsers);
  };

  // ❌ Quitar membresía
  const removeMembership = (email) => {
    const updatedUsers = users.map((u) =>
      u.email === email
        ? {
            ...u,
            membership: null,
            history: [
              ...(u.history || []),
              {
                action: "cancel",
                name: u.membership?.name || "Membresía",
                date: new Date().toISOString(),
              },
            ],
          }
        : u
    );
    setUsers(updatedUsers);

    // Si el usuario actual coincide, sincronizar también su estado local
    if (user && user.email === email) {
      const updatedCurrent = {
        ...user,
        membership: null,
        history: [
          ...(user.history || []),
          {
            action: "cancel",
            name: user.membership?.name || "Membresía",
            date: new Date().toISOString(),
          },
        ],
      };
      setUser(updatedCurrent);
      localStorage.setItem("user", JSON.stringify(updatedCurrent));
    }
  };

  // � Comprar membresía (usuario actual)
  const purchaseMembership = (product) => {
    if (!user) {
      alert("❌ Debes iniciar sesión para comprar una membresía.");
      return;
    }

    // Otorgar membresía al usuario actual
    giveMembership(user.email, product.id);

    // Alinear el estado del usuario actual (ya que se persiste por separado)
    const durationDays = product.name.includes("Semanal")
      ? 7
      : product.name.includes("Mensual")
      ? 30
      : 365;

    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + durationDays);

    const updatedCurrent = {
      ...user,
      membership: {
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        expiresAt: expirationDate.toISOString(),
      },
      history: [
        ...(user.history || []),
        {
          action: "purchase",
          name: product.name,
          date: new Date().toISOString(),
        },
      ],
      totalSpent: (user.totalSpent || 0) + product.price,
    };

    setUser(updatedCurrent);
    localStorage.setItem("user", JSON.stringify(updatedCurrent));
    alert(`✅ Has comprado la membresía ${product.name}. ¡Disfrútala!`);
  };

  // �🕓 Verificar expiración automática de membresías
  useEffect(() => {
    const now = new Date();
    const updated = users.map((u) => {
      if (u.membership && new Date(u.membership.expiresAt) < now) {
        return { ...u, membership: null };
      }
      return u;
    });
    setUsers(updated);
  }, []);

return (
    <AuthContext.Provider
      value={{
        user,
        users,
        login,
        logout,
        register,
        addUser,
        removeUser,
        giveMembership,
        removeMembership,
        purchaseMembership,
        setUsers,
        setUser,
        products,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};