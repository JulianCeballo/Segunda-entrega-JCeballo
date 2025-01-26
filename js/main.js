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




let carritoArticulos = JSON.parse(localStorage.getItem("carritoArticulos")) || [];

const productosSection = document.getElementById("lista-articulos");


const cotizacion = document.getElementById("cotizacion");
const precioDolar = 1067;
cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar}`;



// funcion mostrar articulos renderizar

function renderizarArticulos(articulos) {
    productosSection.innerHTML = ""; // Limpiar antes de renderizar
    articulos.forEach((articulo) => {
        const card = document.createElement("div");
        card.className = "articulo";
        card.innerHTML = `<h3>${articulo.nombre}</h3>
                          <p>Precio: $${(articulo.precio * precioDolar).toFixed(2)}</p>
                        <button class="articulosagregar" id="${articulo.id}">Agregar al carrito</button>`;
        productosSection.appendChild(card);
    });
    addCartButton();
}


// Búsqueda
buscador.addEventListener("input", () => {
    const filtro = buscador.value.toLowerCase();  // Obtener el texto de la búsqueda
    const articulosFiltrados = articulos.filter(({ nombre }) => 
        nombre.toLowerCase().includes(filtro)  // Filtrar artículos que contengan el texto
    );
    renderizarArticulos(articulosFiltrados);  // Renderizar los artículos filtrados
});


console.log(carritoArticulos);

function addCartButton() {
    const buttons = document.querySelectorAll(".articulosagregar");
    buttons.forEach((button) => {
        button.onclick = (e) => {
            const articuloId = e.currentTarget.id;
            const articuloSeleccionado = articulos.find((art) => art.id == articuloId);
            carritoArticulos.push(articuloSeleccionado);

            localStorage.setItem("carritoArticulos", JSON.stringify(carritoArticulos));
          
        };
    });
}

renderizarArticulos(articulos);



   