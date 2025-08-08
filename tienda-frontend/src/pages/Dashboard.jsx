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
    <div style={{ padding: 24, fontFamily: "sans-serif" }}>
      <h2>{usuario?.rol === "admin" ? "Hola, admin" : "Dashboard"}</h2>
      {usuario && <p>Bienvenido: {usuario.nombre}</p>}
      <button onClick={onLogout} style={{ marginTop: 12 }}>Cerrar sesión</button>
    </div>
  );
}
