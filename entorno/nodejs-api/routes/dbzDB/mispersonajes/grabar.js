// ============================
// 📄 routes/dbzDB/mispersonajes/grabar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../../config/db.config");

router.post("/grabar", (req, res) => {
  const { name, ki, race, gender, affiliation, image_url } = req.body;

  const connection = mysql.createConnection(dbConfig.dbz);

  const sql = `
    INSERT INTO MisPersonajes (name, ki, race, gender, affiliation, image_url)
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  const values = [name, ki, race, gender, affiliation, image_url];

  connection.query(sql, values, (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al grabar personaje ${name}:`, error.sqlMessage);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;
