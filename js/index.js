function obtenerDatosUsuario() {
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const edad = document.getElementById("edad").value;

    const usuario = { nombre: nombreCompleto, edad: edad };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    const primerNombre = nombreCompleto.split(' ')[0];
    document.getElementById("mensajeBienvenida").textContent = `¡Bienvenido, ${primerNombre}!`;
}

function crearArtista() {
    const artistaSeleccionado = document.getElementById("nombreArtista").value;

    const artista = { nombre: artistaSeleccionado };
    localStorage.setItem('artista', JSON.stringify(artista));

    document.getElementById("tituloProductos").textContent = `Productos disponibles: ${artistaSeleccionado}`;
}

// productos / precios
const productos = [
    { nombre: "Merchandising", precio: 100 },
    { nombre: "Vinilos", precio: 200 },
    { nombre: "Streaming", precio: 50 },
    { nombre: "Conciertos", precio: 500 }
];

// carrito
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// mostrar precios
function mostrarPrecios() {
    const preciosProductos = document.getElementById("preciosProductos");
    preciosProductos.innerHTML = ""; // Limpiar contenido previo

    productos.forEach((producto, indice) => {
        const productoHTML = document.createElement("div");
        productoHTML.innerHTML = `
            <p>${producto.nombre}: $${producto.precio} 
            <button onclick="agregarProducto(${indice}, 1)">Agregar al carrito</button></p>
        `;
        preciosProductos.appendChild(productoHTML);
    });
}

// agregar prod
function agregarProducto(indiceProducto, cantidad = 1) {
    const producto = productos[indiceProducto];
    const itemCarrito = { ...producto, cantidad: cantidad };
    const index = carrito.findIndex(item => item.nombre === producto.nombre);
    if (index !== -1) {
        carrito[index].cantidad += cantidad;
    } else {
        carrito.push(itemCarrito);
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`${producto.nombre} agregado al carrito.`);
    mostrarCarrito();
}

// mostrar carrito
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const contenidoCarrito = document.getElementById("contenidoCarrito");
    contenidoCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        const productoHTML = document.createElement("div");
        productoHTML.innerHTML = `
            <p>${item.nombre} - Cantidad: ${item.cantidad} - Precio Total: $${item.precio * item.cantidad}</p>
            <button onclick="eliminarProducto(${index})">Eliminar</button>
            <button onclick="reducirCantidad(${index})">Reducir Cantidad</button>
            <button onclick="agregarCantidad(${index})">Agregar Cantidad</button>
        `;
        contenidoCarrito.appendChild(productoHTML);
    });

    if (carrito.length === 0) {
        contenidoCarrito.innerHTML = "<p>El carrito está vacío.</p>";
    }

    calcularTotalCompra();
}

function eliminarProducto(index) {
    carrito.splice(index, 1);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
function reducirCantidad(index) {
    if (carrito[index].cantidad > 1) {
        carrito[index].cantidad -= 1;
    } else {
        carrito.splice(index, 1);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}
function agregarCantidad(index) {
    carrito[index].cantidad += 1;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

//calcular el total
function calcularTotalCompra() {
    const totalCompra = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    document.getElementById("totalCompra").textContent = `Total de la Compra: $${totalCompra}`;
}

// cuotas
function manejarCuotas() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let totalPesos = 0;

    carrito.forEach(item => {
        totalPesos += item.precio * item.cantidad;
    });

    const cantidadCuotas = parseInt(document.getElementById("cantidadCuotas").value);
    if (cantidadCuotas > 0 && cantidadCuotas <= 12) {
        const totalCuotas = totalPesos / cantidadCuotas;
        document.getElementById("resultadoCuotas").textContent = `El total por cuota es: $${totalCuotas.toFixed(2)} en ${cantidadCuotas} cuotas.`;
    } else {
        document.getElementById("resultadoCuotas").textContent = "Por favor, ingrese una cantidad de cuotas válida (1-12).";
    }
}
function realizarCompra() {
    const totalCompra = carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
    const cantidadCuotas = parseInt(document.getElementById("cantidadCuotas").value);

    if (totalCompra > 0) {
        let mensajeCompra = `¡Compra realizada por un total de $${totalCompra}!`;

        if (cantidadCuotas > 0 && cantidadCuotas <= 12) {
            const totalPorCuota = (totalCompra / cantidadCuotas).toFixed(2);
            mensajeCompra += `\nCompraste en ${cantidadCuotas} cuotas de $${totalPorCuota}.`;
        } else {
            mensajeCompra += `\nHas comprado en una sola cuota de $${totalCompra}.`;
        }

        alert(mensajeCompra + "\n¡Gracias por tu compra!");

        localStorage.setItem('ultimaCompra', JSON.stringify({
            carrito: carrito,
            total: totalCompra,
            fecha: new Date().toISOString()
        }));

        localStorage.removeItem('carrito');
        mostrarCarrito();
    } else {
        alert("El carrito está vacío. No hay nada que comprar.");
    }
}
// datos del usuario y artista al inicio
window.onload = function () {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
        const primerNombre = usuario.nombre.split(' ')[0];
        document.getElementById("mensajeBienvenida").textContent = `¡Bienvenido, ${primerNombre}!`;
    }

    const artista = JSON.parse(localStorage.getItem('artista'));
    if (artista) {
        document.getElementById("tituloProductos").textContent = `Productos disponibles: ${artista.nombre}`;
    }

    mostrarCarrito();

    // evento botón de compra
    document.getElementById("comprar").addEventListener("click", realizarCompra);
};

document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});