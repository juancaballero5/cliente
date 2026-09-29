"use strict"

const texto = document.getElementById("texto");

const botones = document.getElementsByClassName("boton");
document.querySelectorAll("input[type=button]").forEach(boton => {
  switch (boton.dataset.fn) {
    case "A-Z": boton.addEventListener("click", todoMayusculas); break;
    case "a-z": boton.addEventListener("click", todoMinusculas); break;
    case "A_": boton.addEventListener("click", primeraMayuscula); break;
    case "_Z": boton.addEventListener("click", ultimaMayuscula); break;
    case "a_": boton.addEventListener("click", primeraMinuscula); break;
    case "_z": boton.addEventListener("click", ultimaMinuscula); break;
    case "AEOIU": boton.addEventListener("click", vocalesMayusculas); break;
    case "aeiou": boton.addEventListener("click", vocalesMinusculas); break;
    case "BC": boton.addEventListener("click", consonantesMayusculas); break;
    case "bc": boton.addEventListener("click", consonantesMinusculas); break;
    case "🔁": boton.addEventListener("click", matrixHasYou); break;
    case "▶️": boton.addEventListener("click", empezar); break;
    case "⏹️": boton.addEventListener("click", parar); break;
    case "⏩": boton.addEventListener("click", masRapido); break;
    case "⏪": boton.addEventListener("click", masLento); break;
    case "⏬": boton.addEventListener("click", datosAPI); break;
  }
});

/* document.querySelectorAll("input[type=button]").forEach(boton => {
  switch (boton.id) {
    case "mayusculas":     boton.addEventListener("click", todasMayusculas); break;
    case "minusculas":     boton.addEventListener("click", todasMinusculas); break;
    case "primeraMay":     boton.addEventListener("click", primeraMay); break;
    case "ultimaMay":      boton.addEventListener("click", ultimaMay); break;
    case "primeraMin":     boton.addEventListener("click", primeraMin); break;
    case "ultimaMin":      boton.addEventListener("click", ultimaMin); break;
    case "vocalesMay":     boton.addEventListener("click", vocalesMay); break;
    case "vocalesMin":     boton.addEventListener("click", vocalesMin); break;
    case "consonantesMay": boton.addEventListener("click", consonantesMay); break;
    case "consonantesMin": boton.addEventListener("click", consonantesMin); break;
    case "aleatorio":      boton.addEventListener("click", empezar); break;
    case "parar":          boton.addEventListener("click", parar); break;
    case "rapido":         boton.addEventListener("click", rapido); break;
    case "lento":          boton.addEventListener("click", lento); break;
  }
}); */
