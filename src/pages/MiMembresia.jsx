import { useAuth } from "../context/AuthContext";

export default function MiMembresia() {
  const { user, cancelMembership } = useAuth();

  if (!user) {
    return (
      <div className="membership-container">
        <h2>⚠️ Debes iniciar sesión para ver tu membresía.</h2>
      </div>
    );
  }

  return (
    <div className="membership-container">
      <h1>💼 Mi Membresía</h1>

      {/* 🟢 Membresía activa */}
      {user.membership ? (
        <div className="membership-card">
          <h2>{user.membership.name}</h2>
          <p>{user.membership.description}</p>
          <p>
            <strong>Precio:</strong> ${user.membership.price}
          </p>
          <p>
            <strong>Expira el:</strong>{" "}
            {new Date(user.membership.expiresAt).toLocaleDateString("es-CL", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <button
            onClick={() => {
              if (
                window.confirm("¿Seguro que quieres cancelar tu membresía actual?")
              ) {
                cancelMembership();
              }
            }}
            className="cancel-btn"
          >
            ❌ Cancelar Membresía
          </button>
        </div>
      ) : (
        <div className="no-membership">
          <p>No tienes una membresía activa actualmente.</p>
        </div>
      )}

      {/* 🧾 Historial */}
      <div className="history-section">
        <h2>🧾 Historial de Actividad</h2>
        {user.history && user.history.length > 0 ? (
          <ul className="history-list">
            {user.history
              .slice()
              .reverse()
              .map((entry, index) => (
                <li key={index}>
                  {entry.action === "purchase" ? "💳 Compra" : "❌ Cancelación"} —{" "}
                  {entry.name} —{" "}
                  {new Date(entry.date).toLocaleDateString("es-CL", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </li>
              ))}
          </ul>
        ) : (
          <p>No tienes historial registrado aún.</p>
        )}
      </div>

      {/* 💰 Total Gastado */}
      <div className="total-spent">
        <h2>💰 Total Gastado</h2>
        <p className="total-amount">
          ${user.totalSpent ? user.totalSpent.toFixed(2) : "0.00"}
        </p>
      </div>
    </div>
  );
}
