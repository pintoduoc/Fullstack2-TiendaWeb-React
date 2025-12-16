import { useState } from "react";

export default function UserManagement() {
  // TODO: Implementar gestión de usuarios con el backend
  const users = [];
  const products = [];

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [selectedMembership, setSelectedMembership] = useState({});

  const handleAdd = (e) => {
    e.preventDefault();

    // 🚫 Evitar creación de administradores
    const adminEmails = [
      "adminhubbenjaminpinto@chilehub.com",
      "adminhuboscarsepulveda@chilehub.com",
    ];
    if (adminEmails.includes(newUser.email)) {
      alert("❌ No puedes crear un usuario administrador desde aquí.");
      return;
    }

    // TODO: Implementar con backend
    alert("⚠️ Función de agregar usuario en desarrollo");
    setNewUser({ name: "", email: "", password: "" });
  };

  const handleGiveMembership = (email) => {
    const productId = selectedMembership[email];
    if (!productId) return alert("Selecciona un tipo de membresía.");
    // TODO: Implementar con backend
    alert("⚠️ Función de asignar membresía en desarrollo");
  };

  return (
    <div className="admin-panel">
      <h1>👥 Gestión de Usuarios</h1>

      {/* ➕ Agregar nuevo usuario */}
      <form onSubmit={handleAdd} className="add-user-form">
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          required
        />
        <button type="submit">➕ Agregar Usuario</button>
      </form>

      {/* 🧾 Tabla de usuarios */}
      <table className="user-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Email</th>
            <th>Membresía</th>
            <th>Historial</th>
            <th>Total Gastado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 && (
            <tr>
              <td colSpan="6">No hay usuarios registrados.</td>
            </tr>
          )}
          {users.map((u) => (
            <tr key={u.email}>
              <td>{u.name}</td>
              <td>{u.email}</td>

              {/* 🏷️ Membresía actual */}
              <td>
                {u.membership
                  ? `${u.membership.name} (expira ${new Date(
                      u.membership.expiresAt
                    ).toLocaleDateString()})`
                  : "Sin membresía"}
              </td>

              {/* 📜 Historial */}
              <td>
                {u.history && u.history.length > 0 ? (
                  <ul className="history-list">
                    {u.history.map((item, idx) => (
                      <li key={idx}>
                        {item.action === "purchase" ? "🟢 Compra: " : "🔴 Cancelación: "}
                        {item.name} - {new Date(item.date).toLocaleDateString()}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "Sin historial"
                )}
              </td>

              {/* 💰 Total gastado */}
              <td>
                $
                {u.totalSpent
                  ? u.totalSpent.toFixed(2)
                  : "0.00"}
              </td>

              {/* ⚙️ Acciones */}
              <td>
                {!u.membership && (
                  <>
                    <select
                      onChange={(e) =>
                        setSelectedMembership({
                          ...selectedMembership,
                          [u.email]: e.target.value,
                        })
                      }
                    >
                      <option value="">Seleccionar membresía</option>
                      {products.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={() => handleGiveMembership(u.email)}>
                      ⭐ Dar Membresía
                    </button>
                  </>
                )}
                {u.membership && (
                  <button onClick={() => alert("⚠️ Función en desarrollo")}>
                    ❌ Quitar Membresía
                  </button>
                )}
                <button onClick={() => alert("⚠️ Función en desarrollo")}>🗑️ Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
