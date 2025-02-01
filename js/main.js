const articulos = []; 

let carritoArticulos = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

const productosSection = document.getElementById("lista-articulos");
const cotizacion = document.getElementById("cotizacion");
const precioDolar = 1067;
cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar}`;

// ✅ Cargamos productos desde JSON
fetch("db/data.json")
    .then(response => response.json())
    .then(data => {
        // Actualizamos la variable `articulos` con los datos del `fetch`
        articulos.push(...data);
        renderizarArticulos(articulos);  // Renderizamos los productos cargados en el DOM
    })
    .catch(error => {
        // Mostrar un mensaje en el DOM si hay error al cargar los productos
        productosSection.innerHTML = "<p>Hubo un error al cargar los productos. Intenta de nuevo más tarde.</p>";
    });

// Función para renderizar artículos
function renderizarArticulos(articulos) {
    productosSection.innerHTML = ""; // Limpiar antes de renderizar
    articulos.forEach((articulo) => {
        const card = document.createElement("div");
        card.className = "articulo";
        card.innerHTML = `<h3>${articulo.nombre}</h3>
                          <img src="${articulo.imagenes}" alt="${articulo.nombre}" style="width: 100px; height: 100px;">
                          <p>Precio: $${(articulo.precio * precioDolar).toFixed(2)}</p>
                          <button class="articulosagregar" id="${articulo.id}">Agregar al carrito</button>`;
        productosSection.appendChild(card);
    });
    addCartButton();
}

// Búsqueda
const buscador = document.getElementById("buscador");
buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();  // Obtener el texto de la búsqueda
    const articulosFiltrados = articulos.filter(({ nombre }) => 
        nombre.toLowerCase().includes(filtro)  // Filtrar artículos que contengan el texto
    );
    renderizarArticulos(articulosFiltrados);  // Renderizar los artículos filtrados
});

// Función para agregar eventos a los botones de agregar al carrito
function addCartButton() {
    const buttons = document.querySelectorAll(".articulosagregar");
    buttons.forEach((button) => {
        button.onclick = (e) => {
            const articuloId = e.currentTarget.id;
            const articuloSeleccionado = articulos.find((art) => art.id == articuloId);
            const articuloEnCarrito = carritoArticulos.find((art) => art.id == articuloId);

            if (articuloEnCarrito) {
                articuloEnCarrito.cantidad++;
            } else {
                carritoArticulos.push({ ...articuloSeleccionado, cantidad: 1 });
            }

            localStorage.setItem("carritoArticulos", JSON.stringify(carritoArticulos));
            mostrarMensajeCarrito();
        };
    });
}

// Función para mostrar un mensaje cuando se añade un artículo al carrito
function mostrarMensajeCarrito() {
    const mensajeCarrito = document.getElementById("mensaje-carrito");
    mensajeCarrito.style.display = "block";
    mensajeCarrito.innerHTML = "Artículo añadido al carrito.";
    setTimeout(() => {
        mensajeCarrito.style.display = "none";
    }, 2000);
}
