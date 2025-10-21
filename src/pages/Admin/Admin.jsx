import { useAuth } from "../../context/AuthContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // 🔒 Redirección automática si no es admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);
  
  return (
    <div className="admin-container">
      <h1>Panel de Administración</h1>
      <p>Bienvenido al panel de control.</p>
    </div>
  );
}
