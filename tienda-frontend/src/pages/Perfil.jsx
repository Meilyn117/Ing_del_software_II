import { useEffect, useState } from "react";
import { getSession, logout } from "../api/auth";

export default function Perfil() {
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
      <h2>{usuario ? `Hola, ${usuario.nombre}` : "Perfil"}</h2>
      {usuario && <p>Rol: {usuario.rol}</p>}
      <button onClick={onLogout} style={{ marginTop: 12 }}>Cerrar sesión</button>
    </div>
  );
}
