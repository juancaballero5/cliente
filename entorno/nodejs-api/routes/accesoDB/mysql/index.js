// ============================
// 📄 routes/accesoDB/mysql/index.js
// ============================
"use strict";

const express = require("express");
const router = express.Router();

// Importar rutas individuales
const grabar = require("../grabar");
const leer = require("../leer");

// Asociar rutas activas
router.use("/", grabar);
router.use("/", leer);

module.exports = router;
