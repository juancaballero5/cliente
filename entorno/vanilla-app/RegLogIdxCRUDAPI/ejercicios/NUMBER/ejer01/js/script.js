"use strict"

const [op1, op2] = document.getElementsByClassName("operando");

const btnoperaciones = document.getElementsByClassName("btn-operacion");
for (let btnoperacion of btnoperaciones) {
  btnoperacion.addEventListener("click", () => {
    console.log(btnoperacion.value);
    realizarOperacion(btnoperacion.dataset.op);
  });
}

const texto = document.getElementById("texto");
const resultado = document.getElementById("resultado");

function realizarOperacion(id) {
  switch (id) {
    case "+":
      if (!validarOperandos()) return;
      texto.innerHTML = 'El resultado de la suma es: ';
      resultado.innerHTML = parseFloat(op1.value) + parseFloat(op2.value);
      break;

    case "-":
      if (!validarOperandos()) return;
      texto.innerHTML = 'El resultado de la resta es: ';
      resultado.innerHTML = parseFloat(op1.value) - parseFloat(op2.value);
      break;

    case "*":
      if (!validarOperandos()) return;
      texto.innerHTML = 'El resultado de la multiplicación es: ';
      resultado.innerHTML = parseFloat(op1.value) * parseFloat(op2.value);
      break;

    case "/":
      if (!validarOperandos()) return;
      texto.innerHTML = 'El resultado de la división es: ';
      resultado.innerHTML = parseFloat(op1.value) / parseFloat(op2.value);
      break;

    case "entera":
      if (!validarResultado()) return;

      const parteEntera = resultado.innerHTML.toString().split(".");
      op1.value = parteEntera[0] ? parseFloat(parteEntera[0]) : 0;
      break;

    case "decimal":
      if (!validarResultado()) return;

      const parteDecimal = resultado.innerHTML.toString().split(".");
      op2.value = parteDecimal[1] ? parseFloat("0." + parteDecimal[1]) : 0;
      break;

    case "raiz":
      if (!validarResultado()) return;

      const valorRaiz = parseFloat(resultado.innerHTML);
      texto.innerHTML = "✅ Raíz cuadrada:";
      resultado.innerHTML = Math.sqrt(valorRaiz);
      break;

    case "log10":
      if (!validarResultado()) return;

      const valorLog10 = parseFloat(resultado.innerHTML);
      texto.innerHTML = "✅ Logaritmo base 10: ";
      resultado.innerHTML = Math.log10(valorLog10);
      break;

    case "loge":
      if (!validarResultado()) return;

      const valorLoge = parseFloat(resultado.innerHTML);
      texto.innerHTML = "✅ Logaritmo base e: ";
      resultado.innerHTML = Math.log(valorLoge);
      break;

    case "logn":
      if (!validarLogN()) return;

      texto.innerHTML = `✅ Logaritmo base ${op2.value}: `;
      resultado.innerHTML = Math.log(parseFloat(op1.value)) / Math.log(parseFloat(op2.value));
      break;

    case "aleatorio":
      texto.innerHTML = "✅ Número aleatorio entre 0 y 1: ";
      resultado.innerHTML = Math.random();
      break;

    case "aleatorio_rango":
      if (!validarRango()) return;

      const min = parseFloat(op1.value);
      const max = parseFloat(op2.value);

      const aleatorio = Math.random() * (max - min) + min;
      texto.innerHTML = `✅ Aleatorio entre ${min} y ${max}: `;
      resultado.innerHTML = aleatorio.toFixed(0); // quitamos los decimales
      break;

    case "intercambiar":
      let temporal;
      temporal = op1.value;
      op1.value = op2.value;
      op2.value = temporal;
      break;

    case "aleatorio_letraM":
      const codigoM = aleatorioLetraM();
      const letraM = String.fromCharCode(codigoM);
      texto.innerHTML = `✅ Letra aleatoria generada: `;
      resultado.innerHTML = letraM;
      break;

    case "aleatorio_letram":
      const codigom = aleatorioLetram();
      const letram = String.fromCharCode(codigom);
      texto.innerHTML = `✅ Letra aleatoria generada: `;
      resultado.innerHTML = letram;
      break;

    default:
      texto.innerHTML = "❌ Operación no reconocida.";
      resultado.innerHTML = "";
  }
}

// Función base reutilizable
const aleatorioRango = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// Nueva función con exclusiones
const aleatorioLetraM = () => {
  return aleatorioRango(65, 90);;
};

// Nueva función con exclusiones
const aleatorioLetram = () => {
  return aleatorioRango(97, 122);;
};

