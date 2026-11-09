// ============================
// 📄 routes/superheroDB/crearTabla.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../config/db.config");

router.get("/crear-tabla", (req, res) => {
  const connection = mysql.createConnection(dbConfig.superheroDB);

  const sql = `
    CREATE TABLE IF NOT EXISTS personajes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      id_api INT UNIQUE,              -- ✅ Clave única, evita duplicados
      name VARCHAR(100),
      intelligence VARCHAR(10),
      strength VARCHAR(10),
      speed VARCHAR(10),
      durability VARCHAR(10),
      power VARCHAR(10),
      combat VARCHAR(10),
      full_name VARCHAR(100),
      alter_egos VARCHAR(255),
      aliases TEXT,
      place_of_birth VARCHAR(255),
      first_appearance VARCHAR(255),
      publisher VARCHAR(100),
      alignment VARCHAR(50),
      gender VARCHAR(20),
      race VARCHAR(50),
      height TEXT,
      weight TEXT,
      eye_color VARCHAR(100),
      hair_color VARCHAR(100),
      occupation VARCHAR(255),
      base_personaje TEXT,
      group_affiliation TEXT,
      relatives TEXT,
      image_url TEXT,
      image_blob LONGBLOB
    );
  `;

  connection.query(sql, (error) => {
    connection.end();
    if (error) {
      console.error("❌ Error al crear tabla personajes:", error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al crear tabla personajes" });
    }
    res.json({ success: true, mensaje: "✅ Tabla personajes creada correctamente" });
  });
});

module.exports = router;
