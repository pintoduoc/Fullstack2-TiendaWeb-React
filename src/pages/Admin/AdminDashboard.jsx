import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

export default function AdminDashboard() {
  const {
    users,
    addUser,
    removeUser,
    toggleMembership,
    user,
  } = useAuth();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // Si el usuario actual no es admin, bloquear acceso (seguridad extra)
  if (!user || user.role !== "admin") {
    return <h2 style={{ textAlign: "center" }}>Acceso denegado ❌</h2>;
  }

  const handleAddUser = (e) => {
    e.preventDefault();
    if (!newUser.email || !newUser.name) return;
    addUser(newUser);
    setNewUser({ name: "", email: "", password: "" });
  };

  return (
    <div className="admin-dashboard" style={{ padding: "2rem" }}>
      <h1>Panel de Administración</h1>
      <p>Gestiona usuarios y sus membresías (productos activos)</p>

      {/* ➕ FORMULARIO PARA AGREGAR NUEVO USUARIO */}
      <form onSubmit={handleAddUser} className="add-user-form">
        <h2>Agregar Usuario</h2>
        <input
          type="text"
          placeholder="Nombre"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Correo electrónico"
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
        <button type="submit">Agregar Usuario</button>
      </form>

      {/* 📋 LISTA DE USUARIOS */}
      <div className="user-list" style={{ marginTop: "3rem" }}>
        <h2>Usuarios Registrados</h2>
        {users.length === 0 ? (
          <p>No hay usuarios registrados.</p>
        ) : (
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "1rem",
            }}
          >
            <thead>
              <tr style={{ background: "#eee" }}>
                <th style={th}>Nombre</th>
                <th style={th}>Email</th>
                <th style={th}>Rol</th>
                <th style={th}>Membresía</th>
                <th style={th}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, index) => (
                <tr key={index}>
                  <td style={td}>{u.name}</td>
                  <td style={td}>{u.email}</td>
                  <td style={td}>
                    {u.role === "admin" ? "Administrador" : "Usuario"}
                  </td>
                  <td style={td}>
                    {u.membership ? "✅ Activa" : "❌ No activa"}
                  </td>
                  <td style={td}>
                    {u.role !== "admin" && (
                      <>
                        <button
                          onClick={() => toggleMembership(u.email)}
                          style={{
                            marginRight: "0.5rem",
                            background: u.membership ? "#d9534f" : "#5cb85c",
                            color: "white",
                            border: "none",
                            padding: "0.3rem 0.7rem",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          {u.membership ? "Quitar" : "Activar"}
                        </button>
                        <button
                          onClick={() => removeUser(u.email)}
                          style={{
                            background: "#dc3545",
                            color: "white",
                            border: "none",
                            padding: "0.3rem 0.7rem",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                        >
                          Eliminar
                        </button>
                      </>
                    )}
                    {u.role === "admin" && (
                      <span style={{ color: "gray" }}>Admin protegido</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

const th = {
  border: "1px solid #ccc",
  padding: "0.5rem",
  textAlign: "left",
};

const td = {
  border: "1px solid #ddd",
  padding: "0.5rem",
};
