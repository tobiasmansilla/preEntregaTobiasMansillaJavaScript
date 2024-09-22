// guardar datos de usuario en ls y mostrar mensaje de bienvenida
function obtenerDatosUsuario() {
    const nombreCompleto = document.getElementById("nombreCompleto").value;
    const edad = document.getElementById("edad").value;

    const usuario = { nombre: nombreCompleto, edad: edad };
    localStorage.setItem('usuario', JSON.stringify(usuario));

    const primerNombre = nombreCompleto.split(' ')[0];
    const mensajeBienvenida = document.getElementById("mensajeBienvenida");

    if (mensajeBienvenida) {
        mensajeBienvenida.textContent = `¡Bienvenido, ${primerNombre}!`;
    }
}

function crearArtista() {
    const artistaSeleccionado = document.getElementById("nombreArtista").value;

    const artista = { nombre: artistaSeleccionado };
    localStorage.setItem('artista', JSON.stringify(artista));

    const tituloProductos = document.getElementById("tituloProductos");
    if (tituloProductos) {
        tituloProductos.textContent = `Productos disponibles: ${artistaSeleccionado}`;
    }
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
    if (contenidoCarrito) {
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
}}

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
        const mensajeBienvenida = document.getElementById("mensajeBienvenida");

        if (mensajeBienvenida) {
            mensajeBienvenida.textContent = `¡Bienvenido, ${primerNombre}!`;
        }
    }

    const artista = JSON.parse(localStorage.getItem('artista'));
    if (artista) {
        const tituloProductos = document.getElementById("tituloProductos");
        if (tituloProductos) {
            tituloProductos.textContent = `Productos disponibles: ${artista.nombre}`;
        }
    }

    if (document.getElementById("contenidoCarrito")) {
        mostrarCarrito();
    }

    // evento botón de compra
    const botonComprar = document.getElementById("comprar");
if (botonComprar) {
    botonComprar.addEventListener("click", realizarCompra);
};

document.addEventListener('DOMContentLoaded', (event) => {
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
})
}
document.getElementById('load-artists').addEventListener('click', fetchArtists);
//itunes api
function fetchArtists() {
    fetch('https://itunes.apple.com/search?term=rock&media=music&limit=5')
        .then(response => response.json())
        .then(data => {
            renderArtists(data.results);
        })
        .catch(error => {
            console.error('Error al cargar los artistas:', error);
        });
}

// render artistas en el DOM
function renderArtists(artists) {
    const artistsContainer = document.getElementById('artists-container');
    artistsContainer.innerHTML = '';

    artists.forEach(artist => {
        const artistCard = document.createElement('div');
        artistCard.classList.add('artist-card');

        artistCard.innerHTML = `
            <img src="${artist.artworkUrl100}" alt="${artist.artistName}">
            <h3>${artist.artistName}</h3>
            <p>${artist.collectionName}</p>
            <a href="${artist.collectionViewUrl}" target="_blank">Escuchar en iTunes</a>
        `;

        artistsContainer.appendChild(artistCard);
    });
    //animacion
    anime({
        targets: '.artist',
        opacity: [0, 1],
        translateY: [-30, 0],
        easing: 'easeOutExpo',
        duration: 1000,
        delay: anime.stagger(100)
    });
}
// Spotify API Token (Ensure it's dynamically generated in production)
const token = 'BQDl1neSYtOVXd5La5gP8lpy7l9rxIDALH82Qc5kv6hD_6A3H7BUUqnpRVLy2xGwk-0gA83_3qX9iHp4tGwzxM1J76AzVmDtfz-BjVenEEOLpm45dnFEMB04rTu40AZ2ItmFDfzhT6JIYTtRAS_Uou8ysxqPAOMi9KQBlcWJQERivmHA_SrCU2df23KyiBnnQhk_IMTvFiwFE0IpgocLzAyOO_8XVF7K7KmguxMU8ap7VjCsO6kuGCSGwrwVmPbXrlmY0n_SaQ'; // mi token de spotify para dar uso al simulacro
// Helper function to fetch from Spotify's Web API
async function fetchSpotifyApi(endpoint, method, body = null) {
    const res = await fetch(`https://api.spotify.com/${endpoint}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        method,
        body: body ? JSON.stringify(body) : null,
    });
    return await res.json();
}

// Handle Spotify Login (Redirect to Spotify login page)
document.getElementById('spotify-login').addEventListener('click', () => {
    const clientId = '9bf7b8d6ca66465387f3e8ab544336af';
    const redirectUri = 'https://tobiasmansilla.github.io/preEntregaTobiasMansillaJavaScript/pages/tienda.html';
    const scope = 'user-top-read playlist-modify-private';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&redirect_uri=${redirectUri}&scope=${scope}`;
    window.location.href = authUrl;
});

// Fetch Top 5 Tracks
async function getTopTracks() {
    const topTracks = await fetchSpotifyApi('v1/me/top/tracks?time_range=long_term&limit=5', 'GET');
    const tracksContainer = document.getElementById('top-tracks-container');
    tracksContainer.innerHTML = '';
    topTracks.items.forEach(track => {
        tracksContainer.innerHTML += `<p>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</p>`;
    });
}

document.getElementById('load-top-tracks').addEventListener('click', getTopTracks);

// Fetch Recommendations based on Top Tracks
async function getRecommendations() {
    const topTracksIds = ['30TcFxtFyju8isK6Hjo9KY', '5mCPDVBb16L4XQwDdbRUpz', '6P9fFbnwWYASamPwhfUunp', '3Y8Y9GWlUBTTEY6ydINRtx', '52SDL4dHqN4YtBslw8o49E'];
    const recommendations = await fetchSpotifyApi(`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`, 'GET');
    const recommendationsContainer = document.getElementById('recommendations-container');
    recommendationsContainer.innerHTML = '';
    recommendations.tracks.forEach(track => {
        recommendationsContainer.innerHTML += `<p>${track.name} by ${track.artists.map(artist => artist.name).join(', ')}</p>`;
    });
}

document.getElementById('load-recommendations').addEventListener('click', getRecommendations);

// Create a Playlist
async function createPlaylist() {
    const topTracksUris = [
        'spotify:track:30TcFxtFyju8isK6Hjo9KY', 'spotify:track:3ejvAIZxccW0Yio4a72ukg', 'spotify:track:5mCPDVBb16L4XQwDdbRUpz',
        'spotify:track:0k3FoQJouDmGRLEuDWwkM9', 'spotify:track:6P9fFbnwWYASamPwhfUunp', 'spotify:track:0oufSLnKQDoBFX5mgkDCgR',
        'spotify:track:3Y8Y9GWlUBTTEY6ydINRtx', 'spotify:track:5Oj1BiXYl0VIfozhu8Qd07', 'spotify:track:52SDL4dHqN4YtBslw8o49E', 'spotify:track:6Y28XrCPhKcBRoeCNrRJGg'
    ];

    const { id: user_id } = await fetchSpotifyApi('v1/me', 'GET');
    const playlist = await fetchSpotifyApi(`v1/users/${user_id}/playlists`, 'POST', {
        "name": "My Recommendation Playlist",
        "description": "Playlist created from top tracks and recommendations",
        "public": false,
    });
    
    await fetchSpotifyApi(`v1/playlists/${playlist.id}/tracks?uris=${topTracksUris.join(',')}`, 'POST');
    
    return playlist;
}

// Listen to Playlist
async function embedPlaylist() {
    const playlist = await createPlaylist();
    const playlistId = playlist.id;
    const playlistEmbed = `
        <iframe
          title="Spotify Playlist"
          src="https://open.spotify.com/embed/playlist/${playlistId}"
          width="100%" height="380" frameborder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy">
        </iframe>
    `;
    document.getElementById('spotify-playlist').innerHTML = playlistEmbed;
}

document.getElementById('load-recommendations').addEventListener('click', embedPlaylist);
