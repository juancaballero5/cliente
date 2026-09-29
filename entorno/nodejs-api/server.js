// ============================
//  server.js — API del curso
//  Arranca Express y monta las rutas de cada base de datos.
// ============================
"use strict";

const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Login / registro (accesoDB)
const accesoDBRoutes = require("./routes/accesoDB/mysql");
app.use("/accesoDB", accesoDBRoutes);

// Superhéroes
const superheroDBRoutes = require("./routes/superheroDB/mysql");
app.use("/superheroDB", superheroDBRoutes);

// Dragon Ball
const dbzPersonajesRoutes = require("./routes/dbzDB/personajes/mysql");
app.use("/dbzDB/personajes", dbzPersonajesRoutes);

const dbzPlanetasRoutes = require("./routes/dbzDB/planetas/mysql");
app.use("/dbzDB/planetas", dbzPlanetasRoutes);

const dbzTransformacionesRoutes = require("./routes/dbzDB/transformaciones/mysql");
app.use("/dbzDB/transformaciones", dbzTransformacionesRoutes);

const dbzMisPersonajesRoutes = require("./routes/dbzDB/mispersonajes/mysql");
app.use("/dbzDB/mispersonajes", dbzMisPersonajesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API en http://localhost:" + PORT);
  console.log("Rutas: /accesoDB  /superheroDB  /dbzDB/...");
});
