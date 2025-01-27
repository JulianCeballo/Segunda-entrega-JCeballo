       
       
    // Artículos
const articulos = [
    { id: 1, nombre: "Teclado", precio: 120 },
    { id: 2, nombre: "Mouse", precio: 50 },
    { id: 3, nombre: "Parlantes", precio: 200 },
    { id: 4, nombre: "Micrófono", precio: 150 },
    { id: 5, nombre: "Motherboard", precio: 500 },
    { id: 6, nombre: "Notebook", precio: 1000 },
    { id: 7, nombre: "Computadora", precio: 2000 },
    { id: 8, nombre: "Pendrive", precio: 21 },
    { id: 9, nombre: "Cable HDMI", precio: 15 }
];


// Elementos DOM

let carritoArticulos = []

const productosSection = document.getElementById("productos-section");

const precioDolar = 1067
const precioDolarElement = document.getElementById("precio-dolar");
const cotizacion = document.getElementById("cotizacion");
cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar}`;




// Función para renderizar artículos
function renderizarArticulos(articulosArray) {
    articulosArray.forEach((articulos) => {
        const card = document.createElement("div");
        card.innerHTML = `<h3>${articulos.nombre}</h3>
                          <p>$${(articulos.precio * precioDolar).toFixed(2)}</p> 
                          <button class="articulosagregar" id="${articulos.id}">Agregar al carrito</button>`;
        productosSection.appendChild(card)
    });
    addcartButton()
}

console.log(articulos)

// Inicializar renderizado de artículos
renderizarArticulos(articulos);

console.log(articulos)

// Agregar evento a los botones de agregar al carrito
function addcartButton () {

    addcartButton = document.querySelectorAll( ".articulosagregar")
    addcartButton.forEach(button => {
        button.onclick = (e)=> {
            const articuloId = e.currentTarget.id
            const seleccionArticulo = articulos.find( articulos => articulos.id == articuloId)
            carritoArticulos.push(seleccionArticulo)
            
            localStorage.setItem("carritoArticulos",JSON.stringify(carritoArticulos) )
       




        }
    
    })

 }







   