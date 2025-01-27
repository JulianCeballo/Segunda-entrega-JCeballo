// Elementos DOM
const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("total-carrito");


const eliminarCarritoBtn = document.querySelector("#eliminar-carrito");


let carritoStorage = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

// Función para renderizar el carrito
function renderizarCarrito(carritoItems) {
    carritoLista.innerHTML = ""; // Limpiar antes de renderizar
    let total = 0;

    carritoItems.forEach((articulo) => {
        const item = document.createElement("li");
        item.innerHTML = `<h3>${articulo.nombre}</h3>
                          <p>Precio: $${(articulo.precio * articulo.cantidad).toFixed(2)}</p>
                          <p>Cantidad: ${articulo.cantidad}</p>`;
        carritoLista.appendChild(item);
        total += articulo.precio * articulo.cantidad;
    });


    const totalEnPesos = total * precioDolar;
    carritoTotal.innerText = `Total U$: $${total.toFixed(2)} Pesos $${totalEnPesos.toFixed(2)}`;

    
}

console.log(carritoStorage);

// Evento para eliminar el carrito
 // Función para eliminar todo el carrito
 function eliminarTodoElCarrito() {
    carritoStorage.splice(0, carritoStorage.length); // Vaciar el array
    localStorage.setItem("carritoArticulos", JSON.stringify([])); // Actualizar el localStorage
    renderizarCarrito(carritoStorage); // Volver a renderizar el carrito
}

// Añadir evento de click al botón "Eliminar Carrito"
eliminarCarritoBtn.addEventListener("click", eliminarTodoElCarrito);





// Renderizar carrito al cargar la página
renderizarCarrito(carritoStorage);