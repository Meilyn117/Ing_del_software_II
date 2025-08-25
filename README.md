# 🛒 Tienda Online - Proyecto Final del Curso Ingeniería del Software II
  
El sistema está construido bajo un modelo **SaaS**, con un **backend en Node.js/Express**, una **base de datos MySQL** (XAMPP), y un **frontend en React (Vite)**.  

En este MVP se implementarán las siguientes historias:
1. Autenticación básica (login de usuarios y administradores).
2. Carrito de compras (agregar, visualizar y modificar productos antes de generar un pedido). [Pendiente]
3. Administración de categorías (el administrador puede crear, editar y eliminar categorías). [Pendiente]
4. Visualización de pedidos (el administrador puede ver los pedidos realizados por los usuarios). [Pendiente]

---

## 🚀 Requisitos previos

Antes de correr el proyecto asegúrate de tener instalado:

- [XAMPP](https://www.apachefriends.org/) (MySQL encendido en puerto 3306 o 3307).  
- [Node.js v20.12.0](https://nodejs.org/) o superior.  
- [npm](https://www.npmjs.com/) (incluido con Node).  
- Un navegador compatible (**Google Chrome** o **Microsoft Edge**).  
- [Playwright](https://playwright.dev/) para pruebas end-to-end.  

### Instalación de Playwright y navegadores

En la carpeta del frontend:

```bash
npm i -D @playwright/test
npx playwright install
```

Esto instalará las dependencias y los binarios de navegadores.  
Para este proyecto se usarán específicamente **Chrome** y **Edge**.

---

## 🗄️ Base de datos

1. Abrir **XAMPP** y encender **MySQL**.  
2. Importar el script de la base de datos incluido en el proyecto (`script_tienda_online.sql`) usando **phpMyAdmin** o línea de comandos:

```sql
SOURCE sql/tienda_online.sql
```

3. Verifica que se haya creado la base `tienda_online` con sus tablas.

---

## 👥 Usuarios de prueba

Para ejecutar las pruebas funcionales es necesario contar con al menos un **usuario administrador** y un **usuario cliente** en la base de datos.  
Las contraseñas están encriptadas con **bcrypt** y corresponden a la clave en texto plano: `123456`.

Ejecuta estas sentencias SQL después de haber importado el script de la base:

```sql
INSERT INTO Usuario (nombre, email, contrasena, rol)
VALUES ('Meilyn Flores', 'meilyn@correo.com', '$2b$10$YXTTrIHBraMr0eTPtAvk8OIAQTZ7I3XTUtylPH3mpRKax3qzyWjK6', 'admin');

INSERT INTO Usuario (nombre, email, contrasena, rol)
VALUES ('Genesis Ramirez', 'genesis@correo.com', '$2b$10$YXTTrIHBraMr0eTPtAvk8OIAQTZ7I3XTUtylPH3mpRKax3qzyWjK6', 'cliente');
```

---

## ⚙️ Backend (API)

1. Abrir una terminal y moverse a la carpeta del backend:

```bash
cd tienda-backend
```

2. Instalar dependencias:

```bash
npm install
```

3. Crear un archivo `.env` en la raíz de `tienda-backend` con esta configuración (ajustar si tu MySQL usa contraseña o puerto distinto):

```env
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=tienda_online
DB_PORT=3306
SESSION_SECRET=clave_secreta_segura
```

4. Correr el servidor:

```bash
node server.js
```

Si todo está correcto deberías ver:

```
Servidor backend corriendo en http://localhost:3001
✅ Conexión a MySQL OK
```

---

## 💻 Frontend (React + Vite)

1. Abrir otra terminal y moverse a la carpeta del frontend:

```bash
cd tienda-frontend
```

2. Instalar dependencias:

```bash
npm install
```

3. Correr el servidor de desarrollo:

```bash
npm run dev
```

4. Abrir el navegador en:

```
http://localhost:5173/
```

---

## ✅ Checklist antes de correr

- MySQL encendido en XAMPP (puerto configurado en `.env`).  
- Base de datos `tienda_online` creada a partir del script.  
- Usuarios de prueba insertados en la tabla `Usuario`.  
- Dependencias instaladas tanto en **backend** como en **frontend**.  
- Backend corriendo en `http://localhost:3001`.  
- Frontend corriendo en `http://localhost:5173`.  

---

## 🧪 Ejecución de pruebas (Playwright)

Con backend y frontend corriendo:

```bash
npx playwright test
```

Para abrir el modo interactivo con interfaz gráfica:

```bash
npx playwright test --ui
```

El reporte HTML se genera en la carpeta `playwright-report/`.

---

## 📌 Notas

- Solo se garantiza compatibilidad en **Chrome** y **Edge**.  
- Este proyecto es una entrega académica, no una aplicación lista para producción.  
