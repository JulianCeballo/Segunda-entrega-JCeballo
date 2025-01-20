// Credenciales
const usuarioValido = {
    nombre: "julian",
    contraseña: "123"
};

// Capturar elementos del DOM
const nombreInput = document.getElementById("nombre");
const contraseñaInput = document.getElementById("contraseña");
const btnIngresar = document.getElementById("btn-ingresar");
const errorMsgContainer = document.getElementById("error-mensaje"); // Contenedor para mensajes de error

const loginSection = document.getElementById("login-section");
const productosSection = document.getElementById("productos-section");
const listaArticulos = document.getElementById("lista-articulos");
const cotizacion = document.getElementById("cotizacion");
const carritoSection = document.getElementById("carrito-section");
const carritoLista = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("total-carrito");

const precioDolar = 1059;

// Array de artículos
const articulos = [
    { id: 1, nombre: "Teclado", precio: 120 },
    { id: 2, nombre: "Mouse", precio: 50 },
    { id: 3, nombre: "Parlantes", precio: 200 },
    { id: 4, nombre: "Micrófono", precio: 150 },
    { id: 5, nombre: "Motherboard", precio: 500 },
    { id: 6, nombre: "Notebook", precio: 1000 },
    { id: 7, nombre: "Computadora", precio: 2000 },
    { id: 8, nombre: "Pendrive", precio: 21 }
];

// Carrito de compras (se inicializa con lo que haya en localStorage)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Evento para manejar el ingreso
btnIngresar.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario

    // Limpiar mensajes de error anteriores
    errorMsgContainer.innerHTML = ""; // Limpiar el contenido del contenedor de errores

    const nombre = nombreInput.value.trim();
    const contraseña = contraseñaInput.value.trim();

    if (nombre === usuarioValido.nombre && contraseña === usuarioValido.contraseña) {
        // Mostrar la sección de productos y ocultar el login
        loginSection.style.display = "none";
        productosSection.style.display = "block";

        // Mostrar la cotización del dólar
        cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar.toFixed(2)}`;

        // Renderizar los artículos en la sección de productos
        renderizarArticulos();
    } else {
        // Crear un nuevo elemento para el mensaje de error
        const accesoIncorrecto = document.createElement("div");
        accesoIncorrecto.innerHTML = `<p>Usuario Incorrecto</p>`;
        errorMsgContainer.appendChild(accesoIncorrecto); // Agregar el mensaje al contenedor
    }
});

// Renderizar artículos en el DOM
const renderizarArticulos = () => {
    listaArticulos.innerHTML = ""; // Limpiar contenido previo

    articulos.forEach(articulo => {
        // Crear un elemento para cada artículo
        const articuloElement = document.createElement("div");
        articuloElement.innerHTML = `
            <h3>${articulo.nombre}</h3>
            <p>Precio: $${(articulo.precio * precioDolar).toFixed(2)}</p>
            <button id="btn-agregar-${articulo.id}">Añadir al carrito</button>
        `;
        listaArticulos.appendChild(articuloElement);

        // Agregar evento al botón de "Añadir al carrito"
        const btnAgregar = document.getElementById(`btn-agregar-${articulo.id}`);
        btnAgregar.addEventListener("click", () => {
            agregarAlCarrito(articulo.id);
        });
    });
};

// Función para agregar un artículo al carrito
const agregarAlCarrito = (idArticulo) => {
    // Buscar el artículo por ID
    const articulo = articulos.find(item => item.id === idArticulo);
    if (articulo) {
        // Verificar si el artículo ya está en el carrito
        const articuloEnCarrito = carrito.find(item => item.id === articulo.id);
        if (articuloEnCarrito) {
        }
    }
}
            // Si ya está, aumentar