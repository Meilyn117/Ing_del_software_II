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
    <div data-testid="perfil-page" className="page-container">
      <h2 data-testid="perfil-greeting">
        {usuario ? `Hola, ${usuario.nombre}` : "Perfil"}
      </h2>

      {usuario && <p data-testid="perfil-role">Rol: {usuario.rol}</p>}

      <button data-testid="perfil-logout" onClick={onLogout} style={{ marginTop: 12 }}>
        Cerrar sesión
      </button>
    </div>
  );
}
