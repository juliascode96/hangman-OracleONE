var palabras = [
    "python",
	"javascript",
	"java",
	"html",
	"css",
	"kotlin",
	"php",
	"ruby"
]

const canvas = document.getElementById('ahorcado');
canvas.width = 300;
canvas.height = 300;
const context = canvas.getContext("2d");

let respuesta = "";
let maximoErrores = 6;
let errores = 0;
let adivinadas = [];
let estadoPalabra = null;

function agregarPalabra() {
    palabras.push(document.getElementById('palabra').value);
    document.getElementById('palabra').value = "";
    console.log(palabras);
}

function elegirPalabra(){
    respuesta = palabras[Math.floor(Math.random() * palabras.length)];
}

function generarTeclado() {
    let botonesHTML = "qwertyuiopasdfghjklñzxcvbnm".split('').map(letra =>
        `
        <button
          class="btn btn-lg btn-info m-2"
          id='` + letra + `'
          onClick="adivinar('` + letra + `')"
        >
          ` + letra + `
        </button>
      `).join('');

      document.getElementById('teclado').innerHTML = botonesHTML;
}

function dibujarCabeza() {
    context.lineWidth = 5;
    context.beginPath();
    context.arc(100, 50, 25, 0, Math.PI*2, true);
    context.closePath();
    context.stroke();
}

function dibujarLinea(c1, c2, c3, c4) {
    context.beginPath();
    context.moveTo(c1, c2);
    context.lineTo(c3, c4);
    context.stroke();
}

function dibujar(nError) {
    switch(nError) {
        case 1: dibujarCabeza();
        break;
        case 2: dibujarLinea(100, 75, 100, 140);
        break;
        case 3: dibujarLinea(100, 85, 140, 100);
        break;
        case 4: dibujarLinea(100, 85, 60, 100);
        break;
        case 5: dibujarLinea(100, 140, 125, 190);
        break;
        case 6: dibujarLinea(100, 140, 80, 190);
        break;

    }
}


function adivinar(letra) {
    adivinadas.indexOf(letra) === -1 ? adivinadas.push(letra) : null;
    document.getElementById(letra).setAttribute('disabled', true);

    if(respuesta.indexOf(letra)>= 0) {
        palabraAdivinada();
        ganar();
    } else if (respuesta.indexOf(letra)=== -1) {
        errores++;
        actualizarErrores();
        perder();
    }
}

function ganar() {
    if(estadoPalabra === respuesta) {
        document.getElementById('teclado').innerHTML = '¡Yay!';
    }
}

function perder() {
    if(errores === maximoErrores) {
        document.getElementById('teclado').innerHTML = 'Buuuu';
    }
}


function palabraAdivinada() {
    estadoPalabra = respuesta.split('').map(letra => (adivinadas.indexOf(letra) >= 0 ? letra : " _ ")).join('');

    document.getElementById('palabraAdivinar').innerHTML = estadoPalabra;
}

function actualizarErrores(){
    document.getElementById('errores').innerHTML = errores;
    dibujar(errores);
}

function dibujarAltar() {
    context.strokeStyle = '#444';
        context.lineWidth = 10; 
        context.beginPath();
        context.moveTo(175, 225);
        context.lineTo(5, 225);
        context.moveTo(40, 225);
        context.lineTo(25, 5);
        context.lineTo(100, 5);
        context.lineTo(100, 25);
        context.stroke();
}

function nuevoJuego() {    
    context.clearRect(0, 0, canvas.width, canvas.height)
    document.getElementById('maximo').innerHTML = maximoErrores;
    dibujarAltar();  
    errores = 0;
    adivinadas = [];

    elegirPalabra();
    palabraAdivinada();
    actualizarErrores();
    generarTeclado();
}

document.getElementById('agregar').addEventListener('click', agregarPalabra);
nuevoJuego();