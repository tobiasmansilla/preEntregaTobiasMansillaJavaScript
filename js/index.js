
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

// Funciones para cálculos de precio
function calcularIVA(precioBase) {
    return Math.round(precioBase * 1.21);
}

function calcularPrecioPais(precioBase) {
    return Math.round(precioBase * 1.08);
}

function convertirADolares(precioPesos) {
    return Math.round(precioPesos / 300); // Supongamos un tipo de cambio de 300 pesos por dólar
}

function formatearPrecio(precio) {
    return precio.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); // IA
}

// Definición de las clases
class Artista {
    constructor(nombre) {
        this.nombre = nombre;
    }
}

class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = 0;
    }

    agregarCantidad(cantidad) {
        this.cantidad += cantidad;
    }

    calcularTotal() {
        return this.precio * this.cantidad;
    }
}

// Crear un nuevo artista
let nombreDelArtista = prompt("Ingrese el nombre del artista");
const artista = new Artista(nombreDelArtista);
console.log("Artista seleccionado:", artista.nombre);

// Crear productos disponibles
const productos = [
    new Producto('Merchandising', 30000),
    new Producto('Vinilos', 15000),
    new Producto('Streaming', 3500),
    new Producto('Conciertos', 4500)
];

// Ciclo para manejar la elección de secciones
let eleccionDeSeccion = "0";
while (eleccionDeSeccion !== "6") {
    eleccionDeSeccion = prompt("¿Qué formato quisiera visualizar? \n1 - PRECIOS!\n2 - Vinilos\n3 - Streaming\n4 - Conciertos\n5 - Merchandising\n6 - Comprar");
    switch (eleccionDeSeccion) {
        case "1":
            alert('Precios:\n' + 
            productos.map(p => `${p.nombre}: $${formatearPrecio(p.precio)}`).join('\n'));
            break;
        case "2":
            productos[1].agregarCantidad(parseInt(prompt("¿Cuántas unidades de 'Vinilos' desea comprar?"))); // Vinilos
            break;
        case "3":
            productos[2].agregarCantidad(parseInt(prompt("¿Cuántos meses de 'Streaming' desea comprar?"))); // Streaming
            break;
        case "4":
            productos[3].agregarCantidad(parseInt(prompt("¿Cuántas entradas de 'Conciertos' desea comprar?"))); // Conciertos
            break;
        case "5":
            productos[0].agregarCantidad(parseInt(prompt("¿Cuántas unidades de 'Merchandising' desea comprar?"))); // Merchandising
            break;
        case "6":
            break;
        default:
            alert("No eligió una opción válida.");
    }
}

// Calcular el total de la compra
const eDSTotalPesos = productos.reduce((total, producto) => total + producto.calcularTotal(), 0);
const eDSTotalConIVA = calcularIVA(eDSTotalPesos);
const eDSTotalFinal = calcularPrecioPais(eDSTotalConIVA);
const eDSTotalDolares = convertirADolares(eDSTotalFinal);

console.log("Total de la compra en pesos:", formatearPrecio(eDSTotalFinal));
console.log("Total de la compra en dólares:", formatearPrecio(eDSTotalDolares));

// Calcular opciones de cuotas
let cuota2 = Math.round(eDSTotalFinal / 2);
let cuota3 = Math.round(eDSTotalFinal / 3);
let cuota4 = Math.round((eDSTotalFinal * 1.10) / 4);
let cuota5 = Math.round((eDSTotalFinal * 1.10) / 5);
let cuota6 = Math.round((eDSTotalFinal * 1.10) / 6);

let cuotas = prompt("¿Desea hacerlo en cuotas?");
if (cuotas === "si") {
    let cantidadCuotas = parseInt(prompt(
        "Cantidad de cuotas:\n" +
        "1 Cuota de $" + formatearPrecio(eDSTotalFinal) + "\n" +
        "2 Cuotas de $" + formatearPrecio(cuota2) + "\n" +
        "3 Cuotas de $" + formatearPrecio(cuota3) + "\n" +
        "4 Cuotas de $" + formatearPrecio(cuota4) + " (10% de interés)\n" +
        "5 Cuotas de $" + formatearPrecio(cuota5) + " (10% de interés)\n" +
        "6 Cuotas de $" + formatearPrecio(cuota6) + " (10% de interés)\n" +
        "Por favor elija un número de cuotas, de lo contrario, no podrá hacer la compra!"
    ));
    if (!isNaN(cantidadCuotas)) { //(!isNaN proveía un error y mostraba NaN al mostrar la cantidad de cuotas)
        alert("El precio final del producto es: $" + formatearPrecio(eDSTotalFinal) + " pesos (" + formatearPrecio(eDSTotalDolares) + " USD)");
        alert("Transacción realizada. ¡Gracias por su compra realizada en " + cantidadCuotas + " cuotas!");
        console.log("Transacción realizada en " + cantidadCuotas + " cuotas.");
    } else {
        alert("Número de cuotas no válido.");
    }
} else {
    alert("Gracias por su compra. Transacción realizada!");
    console.log("Transacción realizada en un pago.");
}
