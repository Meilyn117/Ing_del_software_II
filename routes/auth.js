const express = require('express');
const bcrypt = require('bcrypt');
const mysql = require('mysql2');
const router = express.Router();
require('dotenv').config();

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Ruta de login
router.post('/login', (req, res) => {
  const { email, contrasena } = req.body;

  if (!email || !contrasena) {
    return res.status(400).json({ mensaje: 'Campos obligatorios' });
  }

  const sql = 'SELECT * FROM Usuario WHERE email = ?';
  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ mensaje: 'Error del servidor' });
    if (results.length === 0) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    const usuario = results[0];

    const validPassword = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!validPassword) return res.status(401).json({ mensaje: 'Credenciales inválidas' });

    // Guardar en sesión
    req.session.usuario = {
      id: usuario.idUsuario,
      nombre: usuario.nombre,
      rol: usuario.rol
    };

    res.json({
      mensaje: 'Login exitoso',
      usuario: req.session.usuario
    });
  });
});

// Ruta para verificar si hay sesión activa
router.get('/session', (req, res) => {
  if (req.session.usuario) {
    res.json({ usuario: req.session.usuario });
  } else {
    res.status(401).json({ mensaje: 'No autenticado' });
  }
});

// Ruta para cerrar sesión
router.post('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) return res.status(500).json({ mensaje: 'Error al cerrar sesión' });
    res.clearCookie('connect.sid');
    res.json({ mensaje: 'Sesión cerrada' });
  });
});

module.exports = router;