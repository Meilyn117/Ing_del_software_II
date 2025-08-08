import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";

// Importa tus iconos propios
import iconSearch from "../assets/icons/search.svg";
import iconUser from "../assets/icons/user.svg";
import iconCart from "../assets/icons/cart.svg";

export default function Header() {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

  return (
    <header className="header" data-testid="header">
      {/* Izquierda: Search con icono */}
      <div className="header-left">
        <div className="search-wrap">
          <img
            src={iconSearch}
            alt=""
            aria-hidden="true"
            className="search-icon"
            data-testid="nav-search-icon"
          />
          <input
            data-testid="nav-search"
            className="search-input"
            type="search"
            placeholder="Buscar productos…"
            aria-label="Buscar productos"
          />
        </div>
      </div>

      {/* Derecha: iconos */}
      <div className="header-right">
        {/* Ícono usuario */}
        <button
          type="button"
          data-testid="nav-login-icon"
          className="icon-btn"
          aria-label="Abrir login"
          onClick={() => setShowLogin(v => !v)}
        >
          <img src={iconUser} alt="" aria-hidden="true" className="icon" />
        </button>

        {/* Ícono carrito (no funcional) */}
        <button
          type="button"
          data-testid="nav-cart-icon"
          className="icon-btn"
          aria-label="Carrito (no funcional)"
        >
          <img src={iconCart} alt="" aria-hidden="true" className="icon" />
        </button>

        {/* Globito de login */}
        {showLogin && (
          <div className="login-popover" data-testid="login-bubble">
            <div className="login-popover-arrow" />
            <h3 className="popover-title">Iniciar sesión</h3>
            <form data-testid="login-form" onSubmit={onSubmit}>
              <label htmlFor="login-email" className="label">Email</label>
              <input
                id="login-email"
                data-testid="login-email"
                type="email"
                className="input"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="correo@dominio.com"
                required
              />

              <label htmlFor="login-password" className="label">Contraseña</label>
              <input
                id="login-password"
                data-testid="login-password"
                type="password"
                className="input"
                value={contrasena}
                onChange={e => setContrasena(e.target.value)}
                placeholder="********"
                required
              />

              {error && (
                <div data-testid="login-error" className="error-message">
                  {error}
                </div>
              )}

              <button
                data-testid="login-submit"
                type="submit"
                className="btn-primary"
              >
                Entrar
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
}
