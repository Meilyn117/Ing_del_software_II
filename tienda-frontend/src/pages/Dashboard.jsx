import { useEffect, useState } from "react";
import { getSession, logout } from "../api/auth";

export default function Dashboard() {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    (async () => {
      const s = await getSession();
    
      setUsuario(s?.usuario || null);
    })();
  }, []);

  async function onLogout() {
    await logout();
    window.location.href = "/";
  }

  return (
    <div data-testid="dash-page" style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2 data-testid="dash-title">
        {usuario?.rol === "admin" ? "Hola, admin" : "Dashboard"}
      </h2>

      {usuario && (
        <p data-testid="dash-user-welcome">Bienvenido: {usuario.nombre}</p>
      )}

      <button data-testid="dash-logout" onClick={onLogout} style={{ marginTop: 12 }}>
        Cerrar sesión
      </button>
    </div>
  );
}
