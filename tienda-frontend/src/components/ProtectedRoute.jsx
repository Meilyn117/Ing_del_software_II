import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ allowedRoles, children }) {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  useEffect(() => {
    async function check() {
      try {
        const res = await fetch("http://localhost:3001/api/session", {
          credentials: "include",
        });
        if (!res.ok) {
          setSession(null);
        } else {
          const data = await res.json();
          setSession(data.usuario); // { id, nombre, rol }
        }
      } catch {
        setSession(null);
      } finally {
        setLoading(false);
      }
    }
    check();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Cargando…</div>;
  if (!session) return <Navigate to="/" replace />;

  if (allowedRoles && !allowedRoles.includes(session.rol)) {
    // Si no tiene permiso, lo mandamos a su landing natural
    return session.rol === "admin" ? <Navigate to="/dashboard" replace /> : <Navigate to="/perfil" replace />;
  }

  return children;
}