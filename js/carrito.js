const carritoLista = document.getElementById("carrito-lista");

const carrito = document.getElementById("carrito-contenido");

const carritoTotal = document.getElementById("total-carrito");

let carritoStorage = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

function renderizarCarrito(carritoItems) {
    carritoLista.innerHTML = ""; // Limpiar antes de renderizar
    let total = 0;

    carritoItems.forEach((articulo) => {
        const item = document.createElement("li");
        item.innerHTML = `<h3>${articulo.nombre}</h3>
                            <p>Precio: $${articulo.precio}</p> `;
        carritoLista.appendChild(item);
        total += articulo.precio;
    });

    carritoTotal.innerText = `Total: $${total}`;
}

renderizarCarrito(carritoStorage);
