"use strict"

function esNumero(n) {
  return /^-?\d+(\.\d+)?$/.test(n.trim());
}

const validarOperandos = () => {
  const valor1 = op1.value.trim();
  const valor2 = op2.value.trim();

  if (!esNumero(valor1) || !esNumero(valor2)) {
    texto.innerHTML = "⚠️ Introduce dos números válidos.";
    resultado.innerHTML = "";
    return false;
  }

  return true;
};

const validarResultado = () => {
  if (resultado.innerHTML.trim() === "") {
    texto.innerHTML = "❌ No hay resultado anterior para aplicar la función.";
    return false;
  }

  return true;
};

const validarLogN = () => {
  if (!validarOperandos()) return false;

  const n = parseFloat(op1.value.trim());
  const base = parseFloat(op2.value.trim());

  if (n <= 0 || base <= 0 || base === 1) {
    texto.innerHTML = "⚠️ Valores no válidos. El número y la base deben ser > 0 y la base ≠ 1.";
    resultado.innerHTML = "";
    return false;
  }

  return true;
};

const validarRango = () => {
  if (!validarOperandos()) return false;

  const min = parseFloat(op1.value.trim());
  const max = parseFloat(op2.value.trim());

  if (min >= max) {
    texto.innerHTML = "⚠️ Rango no válido. El mínimo debe ser menor que el máximo.";
    resultado.innerHTML = "";
    return false;
  }

  return true;
};