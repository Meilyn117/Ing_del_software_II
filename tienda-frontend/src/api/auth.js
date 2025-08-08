const API_URL = "http://localhost:3001/api";

export async function login(email, contrasena) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // importante para sesiones
    body: JSON.stringify({ email, contrasena }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.mensaje || "Error en login");
  }
  return res.json(); // { mensaje, usuario }
}

export async function getSession() {
  const res = await fetch(`${API_URL}/session`, {
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json(); // { usuario }
}

export async function logout() {
  const res = await fetch(`${API_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Error al cerrar sesión");
  return res.json(); // { mensaje }
}