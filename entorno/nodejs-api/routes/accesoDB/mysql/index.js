// ============================
// 📄 routes/accesoDB/mysql/index.js
// ============================
"use strict";

const express = require("express");
const router = express.Router();

// Importar rutas individuales
const usuarios = require("../usuarios");
const sesion = require("../sesion");

router.use("/usuarios", usuarios);
router.use("/sesion", sesion);

module.exports = router;
