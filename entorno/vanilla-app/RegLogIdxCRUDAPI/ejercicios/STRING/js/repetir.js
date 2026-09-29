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
  // 1) Elegir operación aleatoria distinta a la previa
  let op = aleatorio(1, 10);    
  while (op === anterior) {
    op = aleatorio(1, 10);
  }

  // 2) Simular la pulsación del botón correspondiente
  switch (op) {
    case 1: todoMayusculas(); break;
    case 2: todoMinusculas(); break;
    case 3: primeraMayuscula(); break;
    case 4: ultimaMayuscula(); break;
    case 5: primeraMinuscula(); break;
    case 6: ultimaMinuscula(); break;
    case 7: vocalesMayusculas(); break;
    case 8: vocalesMinusculas(); break;
    case 9: consonantesMayusculas(); break;
    case 10: consonantesMinusculas(); break;
    default: console.warn("Operación no válida");
  }

  anterior = op;
}
