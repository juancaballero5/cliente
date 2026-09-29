// ============================
// 📄 routes/dbzDB/transformaciones/leer.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.get("/leer", (req, res) => {
  const connection = mysql.createConnection(dbConfig.dbz);
  const sql = "SELECT * FROM transformaciones ORDER BY id_api ASC";

  connection.query(sql, (error, results) => {
    connection.end();

    if (error) {
      console.error("❌ Error al leer transformaciones:", error.sqlMessage || error);
      return res
        .status(500)
        .json({ success: false, mensaje: "Error al leer transformaciones DBZ" });
    }

    // ✅ Convertimos el BLOB a Base64
    const transformaciones = results.map(p => {
      let base64 = null;
      if (p.image_blob) {
        try {
          const buffer = Buffer.isBuffer(p.image_blob)
            ? p.image_blob
            : Buffer.from(p.image_blob.data);
          base64 = buffer.toString("base64");
        } catch (err) {
          console.warn(`⚠️ No se pudo convertir el BLOB de la transformación ${p.id_api}`);
        }
      }
      return { ...p, image_blob: base64 };
    });

    res.json(transformaciones);
  });
});

module.exports = router;
