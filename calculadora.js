// Variables para manejar la calculadora 
let pantalla = document.getElementById("pantalla");
const botones = document.querySelectorAll(".boton");

// Variables para manejar lo que ocurre en la calculadora 
let operacionActual = "";
let primerNumero = null;
let segundoNumero = null;
let operador = null;
let resultadoMostrado = false;
const maxCaracteres = 14;

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

function porcentaje(a, b) {
  return (a * b) / 100;
}

function potencia(a, b) {
  return Math.pow(a, b);
}

function raizCuadrada(a) {
  if (a < 0) return "ERROR!";
  return Math.sqrt(a);
}

function inverso(a) {
  if (a === 0) return "ERROR!";
  return 1 / a;
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
    pantalla.value = primerNumero;
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
    pantalla.value = resultado.toString().slice(0, maxCaracteres); 
    operacionActual = "";
    operador = null;
  }
}

// Función a realizar cuando se ha seleccionado un operador
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
    case "%":
      return porcentaje(a, b);
    case "^":
      return potencia(a, b);
    case "√":
      return raizCuadrada(a);
    case "1/x":
      return inverso(a); 
    default:
      return b;
  }
}

// Funciones de botones que no son operadores ni tampoco números
botones.forEach(boton => {
  boton.addEventListener("click", () => {
    const botonApretado = boton.textContent;

    //Función para que si se acaba de mostrar un resultado la calculadora reinicie la operación actual
    if (resultadoMostrado && !["+", "-", "*", "/", "%", "^", "√", "1/x", "igual"].includes(boton.id)) {
      limpiarPantalla();
      resultadoMostrado = false;
    }

    // Función para que si la calculadora retorna error limpie el historial por completo antes de escribir otra operación
    if (pantalla.value ==="ERROR!") {
      limpiarPantalla();
    }
    
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
      resultadoMostrado = true;
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

    if (botonApretado === "%") {
      seleccionarOperador("%");
    } else if (botonApretado === "^") {
      seleccionarOperador("^");
    } else if (botonApretado === "√") {
      pantalla.value = raizCuadrada(parseFloat(pantalla.value)).toString().slice(0, maxCaracteres);
      operacionActual = pantalla.value;
    } else if (botonApretado === "1/x") {
      pantalla.value = inverso(parseFloat(pantalla.value)).toString().slice(0, maxCaracteres);
      operacionActual = pantalla.value;
    } else if (["+", "-", "*", "/"].includes(botonApretado)) {
      seleccionarOperador(botonApretado);
      resultadoMostrado = false;
    } else {
      if (operacionActual.length < maxCaracteres) {
        if (pantalla.value === "0" || pantalla.value === "ERROR!") {
          operacionActual = botonApretado;
        } else {
          operacionActual += botonApretado;
        }
        pantalla.value = operacionActual;
      }
    }
  });
});
