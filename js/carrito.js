let carriSeleccion = document.getElementById("carrito-contenido")
let carritoStorage = localStorage.getItem("carritoArticulos")
carritoStorage = JSON.parse(carritoStorage)

function renderizarcarrito ( carritoItems) {
    carritoItem.forEach(articulos => {
        const carri = document.createElement("div")
        carri.innerHTML = `<h3>$ {articulos.nombre}</h3>`
                         `<p> $ {articulos.precio}</p>`   
                             
        carriSeleccion.appendChild(carri)
    });

}
renderizarcarrito(carritoStorage)