// Elementos DOM
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("total-carrito");
const eliminarCarritoBtn = document.querySelector("#eliminar-carrito");
const finalizarCompraBtn = document.querySelector("#finalizar-compra");
const mensajeCompra = document.getElementById("mensaje-compra");

let carritoStorage = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

// Función para renderizar el carrito
function renderizarCarrito() {
    carritoLista.innerHTML = ""; // Limpiar antes de renderizar
    let total = 0;

    carritoStorage.forEach((articulo) => {
        const item = document.createElement("li");
        item.innerHTML = `
            <h3>${articulo.nombre}</h3>
            <p>Precio: $${(articulo.precio * articulo.cantidad).toFixed(2)}</p>
            <p>Cantidad: ${articulo.cantidad}</p>`;
        carritoLista.appendChild(item);
        total += articulo.precio * articulo.cantidad;
    });

    const totalEnPesos = total * precioDolar;
    carritoTotal.innerText = `Total U$: $${total.toFixed(2)} Pesos $${totalEnPesos.toFixed(2)}`;
}

// Función para eliminar todo el carrito
function eliminarTodoElCarrito() {
    carritoStorage = []; // Vaciar el array
    localStorage.setItem("carritoArticulos", JSON.stringify(carritoStorage)); // Actualizar el localStorage
    renderizarCarrito(); // Volver a renderizar el carrito
}

// Función para finalizar la compra
function finalizarCompra() {

   
   
    // Mostrar mensaje de agradecimiento en el total del carrito
    carritoTotal.innerText = "Gracias por tu compra";

   

    // Redirigir a la página principal después de unos segundos
    setTimeout(() => {
        window.location.href = "../index.html"; // Redirigir a la página principal
    }, 3000); // 3 segundos
}



// Añadir eventos de click a los botones
eliminarCarritoBtn.addEventListener("click", eliminarTodoElCarrito);
finalizarCompraBtn.addEventListener("click", finalizarCompra);

// Renderizar carrito al cargar la página
renderizarCarrito();