function mostrarMensajeBienvenida() {
    alert("¡Bienvenido a Music Store Argentina!");
    console.warn("Nuevo ingreso!");
}

function obtenerDatosUsuario() {
    let nombreCompleto = prompt("Ingrese sus datos: (Nombre + Apellido)");
    console.log("Se ha registrado a: " + nombreCompleto);
    
    let edad = prompt("¿Cuál es tu edad?");
    if (edad >= 18) {
        console.log(nombreCompleto + " es mayor de edad." + " (" + edad + " años.)");
    } else {
        console.log(nombreCompleto + " es menor de edad." + " (" + edad + " años.)");
    }
    
    return nombreCompleto;
}

mostrarMensajeBienvenida();
obtenerDatosUsuario();

let nombreDelArtista = (prompt("Ingrese el nombre del artista"));
console.log(nombreDelArtista);

const merchandising = 30000;
const vinilos = 15000;
const streaming = 3500;
const conciertos = 4500;
let eDSMerchandising = 0;
let eDSVinilos = 0;
let eDSStreaming = 0;
let eDSConciertos = 0;
let eleccionDeSeccion = "0";
while(eleccionDeSeccion !== "6") {
    eleccionDeSeccion = prompt("Qué formato quisiera visualizar? \n1 - PRECIOS!\n2 - Vinilos\n3 - Streaming\n4 - Conciertos\n5 - Merchandising\n6 - Comprar");
    switch(eleccionDeSeccion) {
        case "1":
            alert('Precios:\nMerchandising: ' + merchandising + '\nVinilos: ' + vinilos + '\nStreaming: ' + streaming + '\nConciertos: ' + conciertos + '');
            break;
        case "2":
            eDSVinilos = parseInt(prompt("¿Cuántas unidades de vinilos de " + nombreDelArtista + " desea comprar?"));
            break;
        case "3":
            eDSStreaming = parseInt(prompt("En nuestra plataforma de streaming, contamos con la discografia entera de " + nombreDelArtista + " y muchos más! ¿Desea acceder a una subscripción mensual de nuestra plataforma de streaming?\nEscriba la cantidad de meses a elegir. Primer mes sin cargo!"));
            break;
        case "4":
            eDSConciertos = prompt("Contamos con EXCLUSIVIDAD en la venta de entradas de futuros conciertos de artistas varios, incluido: " + nombreDelArtista + "! ¿Desea subscribirse y asegurarse una entrada para su próximo concierto?\nEscriba la cantidad de meses a elegir. Primer mes sin cargo!");
            break;
        case "5":
            eDSMerchandising = parseInt(prompt("¿Cuántas 'Mystery box' de " + nombreDelArtista + " desea comprar?"));
            break;
        case "6":
            break;
        default:
            alert("No eligió una opción válida.");
    }
}

const eDSTotal = 
    eDSMerchandising * merchandising
    +
    eDSVinilos * vinilos
    +
    eDSStreaming * streaming
    +
    eDSConciertos * conciertos;
    alert("Su compra tiene el precio de: " + eDSTotal);

    let cuota2 = eDSTotal / 2;
    let cuota3 = eDSTotal / 3;
    let cuota4 = (eDSTotal * 1.10) / 4;
    let cuota5 = (eDSTotal * 1.10) / 5;
    let cuota6 = (eDSTotal * 1.10) / 6;
    
    let cuotas = prompt("¿Desea hacerlo en cuotas?");
    if (cuotas === "si") {
        let cuotas = parseInt(prompt(
        "Cantidad de cuotas:\n" +
        "1 Cuota de $" + eDSTotal + "\n" +
        "2 Cuotas de $" + cuota2 + "\n" +
        "3 Cuotas de $" + cuota3 + "\n" +
        "4 Cuotas de $" + Math.round(cuota4) + " (10% de interés)\n" +
        "5 Cuotas de $" + Math.round(cuota5) + " (10% de interés)\n" +
        "6 Cuotas de $" + Math.round(cuota6) + " (10% de interés)\n" +
        "Por favor elija un número de cuotas, de lo contrario, no podrá hacer la compra!"
        ));
    alert("Transacción realizada. ¡Gracias por su compra realizada en " + cuotas + " cuotas!");
    console.log("Transacción realizada en " + cuotas + " cuotas.");
    } else {
        alert("Gracias por su compra. Transacción realizada!");
    console.log("Transacción realizada en un pago.");
}