export default function Login() {
  return (
    <div style={{ maxWidth: 360, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h2>Iniciar sesión</h2>
      <form>
        <div>
          <label>Email</label><br />
          <input type="email" placeholder="correo@dominio.com" />
        </div>
        <div style={{ marginTop: 8 }}>
          <label>Contraseña</label><br />
          <input type="password" placeholder="********" />
        </div>
        <button type="submit" style={{ marginTop: 12 }}>Entrar</button>
      </form>
    </div>
  );
}