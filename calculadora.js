// Variables para manejar la calculadora 
let pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll(".boton");

// Variables para manejar lo que ocurre en la calculadora 
let operacionActual = "";
let primerNumero = null;
let segundoNumero = null;
let operador = null;

// Funciones para operar
function sumar(a, b) {
  return a + b;
}

function restar(a, b) {
  return a - b;
}

function multiplicar(a, b) {
  return a * b;
}

function dividir(a, b) {
  if (b === 0) {
    return "ERROR!"; 
  }
  return a / b;
}

// Función para limpiar la pantalla
function limpiarPantalla() {
  pantalla.value = "0";
  operacionActual = "";
  primerNumero = null;
  segundoNumero = null;
  operador = null;
}

// Función para seleccionar el operador
function seleccionarOperador(op) {
  if (operacionActual === "") return;

  if (primerNumero === null) {
    primerNumero = parseFloat(operacionActual);
  } else if (operador) {
    segundoNumero = parseFloat(operacionActual);
    primerNumero = realizarOperacion(primerNumero, segundoNumero, operador);
    pantalla.value = primerNumero
  }
  
  operador = op;
  operacionActual = "";
  pantalla.value = op;
}

// Función para calcular
function calcular() {
  if (operador && operacionActual !== "") {
    segundoNumero = parseFloat(operacionActual);
    const resultado = realizarOperacion(primerNumero, segundoNumero, operador);
    pantalla.value = resultado;
    primerNumero = resultado;
    operacionActual = "";
    operador = null;
  }
}

// Función a realizar cuando se ha sellecionado un operador
function realizarOperacion(a, b, operador) {
  switch (operador) {
    case "+":
      return sumar(a, b);
    case "-":
      return restar(a, b);
    case "*":
      return multiplicar(a, b);
    case "/":
      return dividir(a, b);
    default:
      return b;
  }
}

// Funciones de botones que no son operadores ni tampoco números
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const botonApretado = boton.textContent;

    if (boton.id === "c") {
      limpiarPantalla();
      return;
    }

    if (boton.id === "borrar") {
      if (pantalla.value.length === 1 || pantalla.value === "ERROR!") {
        pantalla.value = "0";
      } else {
        pantalla.value = pantalla.value.slice(0, -1);
      }
      operacionActual = pantalla.value;
      return;
    }

    if (boton.id === "igual") {
      calcular();
      return;
    }

    if (boton.id === "punto") {
      if (pantalla.value === "0" || operacionActual === "") {
        operacionActual = "0.";
      } else if (!operacionActual.includes(".")) {
        operacionActual += ".";
      }
      pantalla.value = operacionActual;
      return;
    }

    if (["+", "-", "*", "/"].includes(botonApretado)) {
      seleccionarOperador(botonApretado);
    } else {
      if (pantalla.value === "0" || pantalla.value === "ERROR!") {
        operacionActual = botonApretado;
      } else {
        operacionActual += botonApretado;
      }
      pantalla.value = operacionActual;
    }
  });
});