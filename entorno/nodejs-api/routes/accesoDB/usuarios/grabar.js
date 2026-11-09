// ============================
// 📄 routes/accesoDB/usuarios/grabar.js
//  Guarda el usuario. Si ya existe, lo sustituye (como put en IndexedDB).
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.post("/grabar", (req, res) => {
  const { usuario, password, nombre } = req.body;

  if (!usuario || !password || !nombre) {
    return res.status(400).json({ ok: false, mensaje: "Faltan datos" });
  }

  const direccion = req.body.direccion || {};
  const valores = [
    usuario,
    nombre,
    password,
    req.body.telefono || "5551234567",
    req.body.email || "sin-email@ejemplo.com",
    direccion.calle || "Sin calle",
    direccion.cp || "00000",
    direccion.ciudad || "Sin ciudad",
    direccion.provincia || "Sin provincia",
    req.body.imagen ?? "",
  ];

  const connection = mysql.createConnection(dbConfig.accesoDB);
  const sql = `
    INSERT INTO usuarios (
      usuario, nombre, password, telefono, email, calle, cp, ciudad, provincia, imagen
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) AS nuevo
    ON DUPLICATE KEY UPDATE
      nombre = nuevo.nombre,
      password = nuevo.password,
      telefono = nuevo.telefono,
      email = nuevo.email,
      calle = nuevo.calle,
      cp = nuevo.cp,
      ciudad = nuevo.ciudad,
      provincia = nuevo.provincia,
      imagen = nuevo.imagen
  `;

  connection.query(sql, valores, (error) => {
    connection.end();

    if (error) {
      console.error(`❌ Error al grabar usuario ${usuario}:`, error.sqlMessage || error);
      return res.status(500).json({ ok: false, mensaje: "Error del servidor" });
    }

    res.json({ ok: true });
  });
});

module.exports = router;
