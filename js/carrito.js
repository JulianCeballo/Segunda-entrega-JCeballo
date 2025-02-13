// Elementos del DOM
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("total-carrito");
const eliminarCarritoBtn = document.querySelector("#eliminar-carrito");
const finalizarCompraBtn = document.querySelector("#finalizar-compra");
const btnGenerarPDF = document.querySelector("#btn-generar-pdf");

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
            <p>Precio: $${(articulo.precio * articulo.cantidad).toFixed(2)}</p>
            <p>Cantidad: ${articulo.cantidad}</p>
            <button class="restar-articulo" data-id="${articulo.id}">Restar</button>
            <button class="sumar-articulo" data-id="${articulo.id}">Sumar</button> 
        `;

        carritoLista.appendChild(item);
        total += articulo.precio * articulo.cantidad;
    });

    carritoTotal.innerText = `Total U$: $${total.toFixed(2)} | Pesos $${(total * precioDolar).toFixed(2)}`;

    // Agregar eventos a los botones de restar y sumar
    document.querySelectorAll(".restar-articulo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            actualizarCantidadArticulo(e.target.dataset.id, -1);
        });
    });

    document.querySelectorAll(".sumar-articulo").forEach((btn) => {
        btn.addEventListener("click", (e) => {
            actualizarCantidadArticulo(e.target.dataset.id, 1);
        });
    });
}



// Función para actualizar la cantidad de un artículo en el carrito
function actualizarCantidadArticulo(id, cambio) {
    const articulo = carritoStorage.find((articulo) => articulo.id == id);
    if (articulo) {
        articulo.cantidad += cambio;
        if (articulo.cantidad <= 0) {
            // Si la cantidad es 0 o menor, eliminar el artículo del carrito
            carritoStorage = carritoStorage.filter((art) => art.id != id);
        }
        localStorage.setItem("carritoArticulos", JSON.stringify(carritoStorage));
        renderizarCarrito();
    }
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
        // Vaciar el carrito porque ya se realizó la compra
        carritoStorage = [];
        localStorage.setItem("carritoArticulos", JSON.stringify(carritoStorage));
        renderizarCarrito();
        window.location.href = "../index.html";
       
    });
}




// Función para generar el PDF
function generarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    let y = 10;

    doc.text("Detalle de la Compra Detodo Informatica" , 10, y);
    y += 10;

    const fechaActual = new Date().toLocaleDateString(); // Obtener la fecha actual
    doc.text(`Fecha de compra: ${fechaActual}`, 10, y);
    y += 10;


    carritoStorage.forEach((articulo, index) => {
        const texto = `${index + 1}. ${articulo.nombre} - $${articulo.precio.toFixed(2)} x ${articulo.cantidad}`;
        doc.text(texto, 10, y);
        y += 10;
          


    });

    const total = carritoStorage.reduce((sum, articulo) => sum + articulo.precio * articulo.cantidad, 0);
    doc.text(`Total U$: $${total.toFixed(2)}`, 10, y + 10);
    doc.text(`Total Pesos: $${(total * precioDolar).toFixed(2)}`, 10, y + 20);
    doc.text(`Cotización del dólar: $${precioDolar.toFixed(2)}`, 10, y + 30);

    doc.save("comprobante_compra.pdf");
}

// Eventos
eliminarCarritoBtn.addEventListener("click", eliminarTodoElCarrito);
finalizarCompraBtn.addEventListener("click", finalizarCompra);
btnGenerarPDF.addEventListener("click", generarPDF);



// Renderizar carrito al cargar la página
renderizarCarrito();