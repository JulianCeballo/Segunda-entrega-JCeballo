const articulos = []; 

let carritoArticulos = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

const productosSection = document.getElementById("lista-articulos");
const cotizacion = document.getElementById("cotizacion");
const precioDolar = 1080;
cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar}`;

// Cargamos desde JSON , imagenes externas -
fetch("db/data.json")
    .then(response => response.json())
    .then(data => {
        // Actualizamos la variable `articulos` con datos `fetch`
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


// Función para agregar eventos , y agregar al carrito
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

            // Mostrar mensaje con Toastify
            Toastify({
                text: `🛒 ${articuloSeleccionado.nombre} añadido al carrito.`,
                duration: 3000,
                newWindow: true,
                close: false,
                gravity: "bottom", // `top` or `bottom`
                position: "center", // `left`, `center` o `right`
                stopOnFocus: false, // Previene que se cierre al hacer hover
                style: {
                    background: "linear-gradient(to right, #00b09b, #0069D9)",
                },
                onClick: function(){} // Callback después de click
            }).showToast();  
        };
    });
}









