// ============================
// 📄 routes/superheroDB/leer.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../config/db.config");

router.get("/leer", (req, res) => {
  const connection = mysql.createConnection(dbConfig.superheroDB);
  const sql = "SELECT * FROM personajes ORDER BY id_api ASC";

  connection.query(sql, (error, results) => {
    connection.end();

    if (error) {
      console.error("❌ Error al leer héroes:", error.sqlMessage || error);
      return res.status(500).json({ success: false, mensaje: "Error al leer héroes" });
    }

    // ✅ Convertimos el BLOB a Base64
    const heroes = results.map(h => {
      let base64 = null;
      if (h.image_blob) {
        try {
          const buffer = Buffer.isBuffer(h.image_blob)
            ? h.image_blob
            : Buffer.from(h.image_blob.data);
          base64 = buffer.toString("base64");
        } catch (err) {
          console.warn(`⚠️ No se pudo convertir el BLOB del héroe ${h.id_api}`);
        }
      }
      return { ...h, image_blob: base64 };
    });

    res.json(heroes);
  });
});

module.exports = router;
