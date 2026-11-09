"use strict";

// ⏱️ Estado del repetidor
let repite = null;
let tiempo = 500;   // ms por ciclo
let anterior = 0;   // última operación usada (1:+, 2:-, 3:*)

// ▶️ Iniciar
function empezar() {
  if (repite !== null) return;        // evita crear múltiples intervalos
  repite = setInterval(matrixHasYou, tiempo);
  console.log("▶️ Automatización iniciada cada", tiempo, "ms");
}

// ⏸️ Parar
function parar() {
  if (repite === null) return;
  clearInterval(repite);
  repite = null;
  console.log("⏸️ Automatización detenida");
}

// ⏩ Más rápido
function masRapido() {
  if (tiempo > 50) tiempo -= 50;      // límite inferior de seguridad
  reiniciarIntervalo();
  console.log("⏩ Nuevo intervalo:", tiempo, "ms");
}

// ⏪ Más lento
function masLento() {
  tiempo += 50;
  reiniciarIntervalo();
  console.log("⏪ Nuevo intervalo:", tiempo, "ms");
}

// ♻️ Reinicia setInterval con el nuevo 'tiempo'
function reiniciarIntervalo() {
  if (repite === null) return;        // solo si está en marcha
  clearInterval(repite);
  repite = setInterval(matrixHasYou, tiempo);
}

// 🧠 Ciclo automático: valores → generar → operación aleatoria (sin repetir)
function matrixHasYou() {
  // 1) Rellenar inputs con valores aleatorios razonables
  document.getElementById("valores").click();

  // 2) Generar matrices con esos valores
  document.getElementById("genera").click();

  // 3) Elegir operación aleatoria distinta a la previa
  let op = aleatorio(1, 3);           // (1:+, 2:-, 3:*)
  while (op === anterior) {
    op = aleatorio(1, 3);
  }

  // 4) Simular la pulsación del botón correspondiente
  if (op === 1) document.getElementById("suma").click();
  if (op === 2) document.getElementById("resta").click();
  if (op === 3) document.getElementById("multiplica").click();

  anterior = op;
}
