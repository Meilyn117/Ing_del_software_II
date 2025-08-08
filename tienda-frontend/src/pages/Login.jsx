import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getSession } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

  // Si ya hay sesión, redirige según rol
  useEffect(() => {
    (async () => {
      const s = await getSession();
      if (s?.usuario?.rol === "admin") navigate("/dashboard", { replace: true });
      else if (s?.usuario?.rol) navigate("/perfil", { replace: true });
      else setChecking(false);
    })();
  }, [navigate]);

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      const { usuario } = await login(email, contrasena);
      if (usuario.rol === "admin") navigate("/dashboard", { replace: true });
      else navigate("/perfil", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  if (checking) return <div style={{ padding: 24 }}>Verificando sesión…</div>;

  return (
    <div style={{ maxWidth: 360, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="correo@dominio.com"
            required
          />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Contraseña</label><br />
          <input
            type="password"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            placeholder="********"
            required
          />
        </div>
        {error && <div style={{ color: "crimson", marginTop: 8 }}>{error}</div>}
        <button type="submit" style={{ marginTop: 12 }}>Entrar</button>
      </form>
    </div>
  );
}