// ============================
// 📄 routes/superheroDB/grabar.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const fetch = require("node-fetch");
const router = express.Router();
const dbConfig = require("../config/db.config");

router.post("/grabar", async (req, res) => {
  const { id, name, powerstats, biography, appearance, work, connections, image } = req.body;

  const connection = mysql.createConnection(dbConfig.superheroDB);

  // Intentar descargar imagen (si falla, continuar sin ella)
  let imgBlob = null;
  try {
    const imgResponse = await fetch(image.url);
    const imgBuffer = await imgResponse.buffer();
    imgBlob = imgBuffer;
  } catch {
    console.warn(`⚠️ Imagen no disponible para ${name}`);
  }

  const values = [
    parseInt(id),
    name,
    powerstats.intelligence,
    powerstats.strength,
    powerstats.speed,
    powerstats.durability,
    powerstats.power,
    powerstats.combat,
    biography["full-name"],
    biography["alter-egos"],
    JSON.stringify(biography.aliases),
    biography["place-of-birth"],
    biography["first-appearance"],
    biography.publisher,
    biography.alignment,
    appearance.gender,
    appearance.race,
    JSON.stringify(appearance.height),
    JSON.stringify(appearance.weight),
    appearance["eye-color"],
    appearance["hair-color"],
    work.occupation,
    work.base,
    connections["group-affiliation"],
    connections.relatives,
    image.url || null,
    imgBlob
  ];

  const sql = `
    INSERT INTO personajes (
      id_api, name, intelligence, strength, speed, durability, power, combat,
      full_name, alter_egos, aliases, place_of_birth, first_appearance,
      publisher, alignment, gender, race, height, weight,
      eye_color, hair_color, occupation, base_personaje, group_affiliation,
      relatives, image_url, image_blob
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE name = VALUES(name);
  `;

  connection.query(sql, values, (error) => {
    connection.end();
    if (error) {
      console.error(`❌ Error al grabar ${name}:`, error.sqlMessage);
      return res.status(500).json({ success: false });
    }
    res.json({ success: true });
  });
});

module.exports = router;
