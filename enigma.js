
// Configuración estandar de una máquina Enigma
// el valor normalmente seria rotor = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
// pero gracias al cableado y tipo inicio cada letra cambia completamente
// solo sabiendo su patron de inicio y tipo de configuracion se podria decifrar
// simulando cada posicion siguiente seria como estos vectores

// rotorI = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const rotorI = "EKMFLGDQVZNTOWYHXUSPAIBRCJ";
// rotorII = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const rotorII = "AJDKSIRUXBLHWTMCQGZNPYFVOE";
// rotorIII = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const rotorIII = "BDFHJLCPRTXVZNYEIWGAKMUSQO";
// reflector = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
const reflector = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

// Posiciones iniciales de los rotores
let rotorPosition1 = 0;
let rotorPosition2 = 0;
let rotorPosition3 = 0;

// Función para avanzar la posición de los rotores
// deberia ser de 0 a 25 = 26 letras
// pero como entra siendo ya una letra y deberia cambiar luego
// de ingresar esa letra si debe incrementar por eso le aumento 1
// de 1 a 26 = 26 letras y cambia el rotor 1 aumenta en 1 posicion
// cuando llega a la ultima letra el siguiente rotor avanza 
// asi simulando el cambio de posicion de enigma
function avanzarRotores() {
  rotorPosition1 = (rotorPosition1 + 1) % 26;

  if (rotorPosition1 === (rotorPosition2 + 1) % 26) {
    rotorPosition2 = (rotorPosition2 + 1) % 26;

    if (rotorPosition2 === (rotorPosition3 + 1) % 26) {
      rotorPosition3 = (rotorPosition3 + 1) % 26;
    }
  }
}

// Función para cifrar una letra usando la máquina Enigma
function encriptarLetra(letra) {

  // Reiniciar las posiciones de los rotores
  rotorPosition1 = 0;
  rotorPosition2 = 0;
  rotorPosition3 = 0;
  // Convertir la letra a mayúsculas
  letra = letra.toUpperCase();

  // Solo cifrar letras del alfabeto
  if (letra.match(/[A-Z]/)) {
    // Obtener el índice de la letra en el alfabeto
    // si un texto = HOLA -> texto.charCodeAt(0) = H 
    const index = letra.charCodeAt(0) - 65;

    // Avanzar los rotores antes de cifrar la letra
    avanzarRotores();

    // Realizar el cifrado de sustitución a través de los rotores
    // usare console.log para mostrar por consola el proceso de encriptacion
    // claro que esto solo se vera en modo inspecion en una pagina web e ir a console
    let output = rotorIII[(index + rotorPosition3) % 26];
    console.log("rotor3",output);
    output = rotorII[((output.charCodeAt(0) - 65) + rotorPosition2) % 26];
    console.log("rotor2",output);
    output = rotorI[((output.charCodeAt(0) - 65) + rotorPosition1) % 26];
    console.log("rotor1",output);

    // Reflejar el cifrado a través del reflector
    output = reflector[output.charCodeAt(0) - 65];
    console.log("reflector",output);

    // Realizar el cifrado de sustitución inversa a través de los rotores
    output = String.fromCharCode((rotorI.indexOf(output) - rotorPosition1 + 26) % 26 + 65);
    console.log("rotor1",output);
    output = String.fromCharCode((rotorII.indexOf(output) - rotorPosition2 + 26) % 26 + 65);
    console.log("rotor2",output);
    output = String.fromCharCode((rotorIII.indexOf(output) - rotorPosition3 + 26) % 26 + 65);
    console.log("rotor3 letra encriptado :",output);
return output;

}


// Retornar cualquier otro carácter sin cifrar
return letra;
}

// Función para cifrar un mensaje
function cifrarMensaje() {
const mensaje = document.getElementById("mensaje").value;
let mensajeCifrado = "";

for (let i = 0; i < mensaje.length; i++) {
const letraCifrada = encriptarLetra(mensaje[i]);
mensajeCifrado += letraCifrada;
}

document.getElementById("mensajeCifrado").value = mensajeCifrado;

}

// Función para descifrar un mensaje
function descifrarMensaje() {
const mensajeCifrado = document.getElementById("mensajeACifrar").value;
let mensajeDescifrado = "";

// Reiniciar las posiciones de los rotores
rotorPosition1 = 0;
rotorPosition2 = 0;
rotorPosition3 = 0;

for (let i = 0; i < mensajeCifrado.length; i++) {
const letraDescifrada = encriptarLetra(mensajeCifrado[i]);
mensajeDescifrado += letraDescifrada;
}

document.getElementById("mensajeDescifrado").value = mensajeDescifrado;
}

function copiarMensajeCifrado() {
  // Obtener el contenido del elemento <p> por su id
  var mensajeCifrado = document.getElementById("mensajeCifrado").value;

  // Asignar el contenido al atributo 'value' del <input>
  document.getElementById("mensajeACifrar").value = mensajeCifrado;
}
