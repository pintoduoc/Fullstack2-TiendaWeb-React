import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedAdmin = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // 🔒 Solo deja pasar si hay usuario y es admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedAdmin;
