// ============================
// 📄 routes/dbzDB/personajes/mysql/index.js
// ============================
"use strict";

const express = require("express");
const router = express.Router();

const crearTabla = require("../crearTabla");
const grabar = require("../grabar");
const leer = require("../leer");
const borrar = require("../borrar");

router.use("/", crearTabla);
router.use("/", grabar);
router.use("/", leer);
router.use("/", borrar);

module.exports = router;
