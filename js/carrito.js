// Elementos del DOM
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("total-carrito");
const eliminarCarritoBtn = document.querySelector("#eliminar-carrito");
const finalizarCompraBtn = document.querySelector("#finalizar-compra");

let carritoStorage = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

// Función para renderizar el carrito
function renderizarCarrito() {
    carritoLista.innerHTML = ""; // Limpiar antes de renderizar
    let total = 0;

    if (carritoStorage.length === 0) {
        carritoLista.innerHTML = "<p>El carrito está vacío.</p>";
        carritoTotal.innerText = "Total: $0.00";
        return;
    }

    carritoStorage.forEach((articulo) => {
        const item = document.createElement("li");
        item.innerHTML = `
            <h3>${articulo.nombre}</h3>
            <img src="${articulo.imagenes}" alt="${articulo.nombre}" style="width: 100px; height: 100px;">
            <p>Precio: $${(articulo.precio * articulo.cantidad).toFixed(2)}</p>
            <p>Cantidad: ${articulo.cantidad}</p>
            <button class="eliminar-articulo" data-id="${articulo.id}">Eliminar</button>
        `;

        carritoLista.appendChild(item);
        total += articulo.precio * articulo.cantidad;
    });

    carritoTotal.innerText = `Total U$: $${total.toFixed(2)} | Pesos $${(total * precioDolar).toFixed(2)}`;

    // Agregar eventos a los botones de eliminar
    document.querySelectorAll(".eliminar-articulo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            eliminarArticulo(e.target.dataset.id);
        });
    });
}

// Función para eliminar un solo artículo del carrito
function eliminarArticulo(id) {
    carritoStorage = carritoStorage.filter((articulo) => articulo.id != id);
    localStorage.setItem("carritoArticulos", JSON.stringify(carritoStorage));
    renderizarCarrito();
}

// Función para eliminar todo el carrito
function eliminarTodoElCarrito() {

    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡Esta acción vaciará todo el carrito!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, vaciar carrito',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            carritoStorage = [];
            localStorage.setItem("carritoArticulos", JSON.stringify(carritoStorage));
            renderizarCarrito();
            Swal.fire(
                'Carrito vaciado',
                'Tu carrito ha sido vaciado.',
                'success'
            );
        }
    });
}




 
// Función para finalizar la compra
function finalizarCompra() {
    carritoTotal.innerText = "Gracias por tu compra";

    Swal.fire({
        icon: 'success',
        title: 'Compra realizada',
        text: 'Gracias por tu compra',
        timer: 3000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = "../index.html";
    });
}


   

// Eventos
eliminarCarritoBtn.addEventListener("click", eliminarTodoElCarrito);
finalizarCompraBtn.addEventListener("click", finalizarCompra);

// Renderizar carrito al cargar la página
renderizarCarrito();