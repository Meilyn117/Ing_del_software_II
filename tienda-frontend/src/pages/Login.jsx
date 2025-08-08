import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, getSession } from "../api/auth";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(true);

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

  if (checking) {
    return (
      <div data-testid="login-loading" style={{ padding: 24 }}>
        Verificando sesión…
      </div>
    );
  }

  return (
    <div 
    data-testid="login-page" 
    className="page-container">
      <h2 data-testid="login-title">Iniciar sesión</h2>

      <form data-testid="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="login-email">Email</label><br />
          <input
            id="login-email"
            data-testid="login-email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="correo@dominio.com"
            required
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <label htmlFor="login-password">Contraseña</label><br />
          <input
            id="login-password"
            data-testid="login-password"
            type="password"
            value={contrasena}
            onChange={e => setContrasena(e.target.value)}
            placeholder="********"
            required
          />
        </div>

        {error && (
          <div data-testid="login-error" style={{ color: "crimson", marginTop: 8 }}>
            {error}
          </div>
        )}

        <button data-testid="login-submit" type="submit" style={{ marginTop: 12 }}>
          Entrar
        </button>
      </form>
    </div>
  );
}