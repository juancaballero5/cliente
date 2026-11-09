// ============================
// 📄 routes/superheroDB/actualizarImagen.js
// ============================
"use strict";

const express = require("express");
const mysql = require("mysql2");
const router = express.Router();
const dbConfig = require("../config/db.config");

// PUT binario: Content-Type: application/octet-stream
router.put("/actualizarImagen/:id_api",
    express.raw({ type: "application/octet-stream", limit: "20mb" }),
    (req, res) => {
        const { id_api } = req.params;
        const buffer = req.body;

        if (!Buffer.isBuffer(buffer) || buffer.length === 0) {
            return res.status(400).json({ success: false, mensaje: "Archivo vacío o inválido" });
        }

        const connection = mysql.createConnection(dbConfig.superheroDB);
        const sql = "UPDATE personajes SET image_blob = ? WHERE id_api = ?";

        connection.query(sql, [buffer, id_api], (error, results) => {
            connection.end();

            if (error) {
                console.error(`❌ Error al actualizar imagen (${id_api}):`, error.sqlMessage || error);
                return res.status(500).json({ success: false, mensaje: "Error al actualizar imagen" });
            }

            if (results.affectedRows === 0) {
                return res.status(404).json({ success: false, mensaje: "Héroe no encontrado" });
            }

            res.json({ success: true, mensaje: `🖼️ Imagen del héroe ${id_api} actualizada` });
        });
    }
);

module.exports = router;

