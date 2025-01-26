let carriSeleccion = document.getElementById("carrito-contenido")


let carritoStorage = localStorage.getItem("carritoArticulos")


const carritoLista = document.getElementById("carrito-lista");
const carritoTotal = document.getElementById("total-carrito");




carritoStorage = JSON.parse(carritoStorage)

function renderizarcarrito ( carritoItems) {
    carritoItems.forEach(articulos => {
        const carri = document.createElement("div")
        carri.innerHTML = `<h3>$ {articulos.nombre}</h3>`
                         `<p> $ {articulos.precio}</p>`   
                             
        carriSeleccion.appendChild(carri)
    });

}
renderizarcarrito(carritoStorage)