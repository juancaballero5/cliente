"use strict";

// Elementos principales
const pantalla = document.getElementById("pantalla");
const estado = document.getElementById("estado");
const selector = document.getElementById("selector");
const botonera = document.getElementById("botonera");

// Variables de estado
let operandoA = null;
let operacion = null;
let memoria = 0;

// Inicializar
cambiarTipo(); // Oculta o muestra botones según el selector

// EVENTO CAMBIO DE TIPO DE CALCULADORA
selector.addEventListener("change", cambiarTipo);

// MOSTRAR / OCULTAR BOTONES POR CLASE
function cambiarTipo() {
    const mostrarBasica = selector.value === "basica" || selector.value === "cientifica";
    const mostrarCientifica = selector.value === "cientifica";

    mostrarClase("basica", mostrarBasica);
    mostrarClase("cientifica", mostrarCientifica);

    ajustarAnchoPantalla();
}

function ajustarAnchoPantalla() {
    const mostrarCientifica = selector.value === "cientifica";
    const ancho = mostrarCientifica ? "378px" : "245px";
    pantalla.style.maxWidth = ancho;
    estado.style.maxWidth = ancho;
}

// FUNCIONES PARA MOSTRAR U OCULTAR BOTONES
function mostrarClase(clase, mostrar) {
    const botones = document.getElementsByClassName(clase);
    for (let boton of botones) {
        boton.style.display = mostrar ? "inline-block" : "none";
    }
}

// ASOCIAR BOTONES NUMÉRICOS
for (let i = 0; i <= 9; i++) {
    document.getElementById(i.toString()).addEventListener("click", () => {
        pantalla.value += i.toString();
    });
}

// COMA DECIMAL
document.getElementById("coma").addEventListener("click", () => {
    if (!pantalla.value.includes(".")) {
        pantalla.value += ".";
    }
});

// BORRAR ÚLTIMO CARÁCTER
document.getElementById("borrar").addEventListener("click", () => {
    pantalla.value = pantalla.value.slice(0, -1);
});

// LIMPIAR PANTALLA
document.getElementById("limpiar").addEventListener("click", () => {
    pantalla.value = "";
});

// RESETEAR TODO
document.getElementById("resetear").addEventListener("click", () => {
    pantalla.value = "";
    estado.value = "";
    operandoA = null;
    operacion = null;
});

// GUARDAR EN MEMORIA / RECUPERAR
document.getElementById("memo").addEventListener("click", () => {
    if (operacion === null) {
        memoria = parseFloat(pantalla.value);
        estado.value = "M";
        pantalla.value = "";
    } else {
        pantalla.value = memoria.toString();
    }
});

// OPERACIONES BÁSICAS
["sumar", "restar", "multiplicar", "dividir", "porcentaje", "mod"].forEach(id => {
    document.getElementById(id).addEventListener("click", () => {
        operandoA = parseFloat(pantalla.value);
        operacion = document.getElementById(id).value;
        pantalla.value = "";
    });
});

// CAMBIO DE SIGNO
document.getElementById("signo").addEventListener("click", () => {
    pantalla.value = (parseFloat(pantalla.value) * -1).toString();
});

// INVERSO
document.getElementById("inv").addEventListener("click", () => {
    pantalla.value = (1 / parseFloat(pantalla.value)).toString();
});

// RAÍZ CUADRADA
document.getElementById("raiz").addEventListener("click", () => {
    pantalla.value = Math.sqrt(parseFloat(pantalla.value)).toString();
});

// FACTORIAL
document.getElementById("factorial").addEventListener("click", () => {
    const n = parseInt(pantalla.value);
    pantalla.value = (n < 0) ? "❌" : factorial(n).toString();
});

function factorial(n) {
    let resultado = 1;
    for (let i = 1; i <= n; i++) resultado *= i;
    return resultado;
}

// CONSTANTES
document.getElementById("pi").addEventListener("click", () => {
    pantalla.value = Math.PI.toString();
});

document.getElementById("e").addEventListener("click", () => {
    pantalla.value = Math.E.toString();
});

// POTENCIA 2
document.getElementById("pot2").addEventListener("click", () => {
    pantalla.value = Math.pow(parseFloat(pantalla.value), 2).toString();
});

// POTENCIA a^b
document.getElementById("pow").addEventListener("click", () => {
    operandoA = parseFloat(pantalla.value);
    operacion = "^";
    pantalla.value = "";
});

// LOGARITMOS
document.getElementById("log10").addEventListener("click", () => {
    pantalla.value = Math.log10(parseFloat(pantalla.value)).toString();
});

document.getElementById("ln").addEventListener("click", () => {
    pantalla.value = Math.log(parseFloat(pantalla.value)).toString();
});

// ALEATORIO
document.getElementById("aleatorio").addEventListener("click", () => {
    pantalla.value = Math.random().toString();
});

// TRIGONOMÉTRICAS
document.getElementById("sen").addEventListener("click", () => {
    pantalla.value = Math.sin(parseFloat(pantalla.value)).toString();
});

document.getElementById("cos").addEventListener("click", () => {
    pantalla.value = Math.cos(parseFloat(pantalla.value)).toString();
});

document.getElementById("tan").addEventListener("click", () => {
    pantalla.value = Math.tan(parseFloat(pantalla.value)).toString();
});

// IGUAL (=)
document.getElementById("igual").addEventListener("click", () => {
    const b = parseFloat(pantalla.value);
    let resultado;

    switch (operacion) {
        case "+": resultado = operandoA + b; break;
        case "-": resultado = operandoA - b; break;
        case "*": resultado = operandoA * b; break;
        case "/": resultado = b !== 0 ? operandoA / b : "❌"; break;
        case "%": resultado = operandoA * (b / 100); break;
        case "mod": resultado = operandoA % b; break;
        case "^": resultado = Math.pow(operandoA, b); break;
        default: resultado = pantalla.value;
    }

    pantalla.value = resultado.toString();
    operacion = null;
});
