// Credenciales
const usuarioValido = {
    nombre: "julian",
    contraseña: "123"
};

// Capturar elementos del DOM
const nombreInput = document.getElementById("nombre");
const contraseñaInput = document.getElementById("contraseña");

const btnIngresar = document.getElementById("btn-ingresar");
const errorMsg = document.getElementById("error-mensaje");
const loginSection = document.getElementById("login-section");
const carritoSection = document.getElementById("carrito-section");
const listaArticulos = document.getElementById("lista-articulos");
const cotizacion = document.getElementById("cotizacion"); // Capturar el elemento para la cotización

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

// Evento para manejar el ingreso
btnIngresar.addEventListener("click", (event) => {
    event.preventDefault(); // Prevenir el envío del formulario
    errorMsg.style.display = "none"; // Ocultar mensaje de error al intentar iniciar sesión
    const nombre = nombreInput.value.trim();
    const contraseña = contraseñaInput.value.trim();

    if (nombre === usuarioValido.nombre && contraseña === usuarioValido.contraseña) {
        // Mostrar el carrito y ocultar el login
        loginSection.style.display = "none";
        carritoSection.style.display = "block";

        // Mostrar la cotización del dólar
        cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar.toFixed(2)}`;

        // Renderizar los artículos en el carrito
        renderizarArticulos();
    } else {
        // Mostrar mensaje de error
        errorMsg.style.display = "block";
    }
});

// Renderizar artículos en el DOM
const renderizarArticulos = () => {
    listaArticulos.innerHTML = ""; // Limpiar contenido previo

    articulos.forEach(articulo => {
        // Calcular el precio en pesos
        const precioEnPesos = articulo.precio * precioDolar;

        // Crear un elemento para cada artículo
        const articuloElement = document.createElement("div");
        articuloElement.classList.add("articulo");
        articuloElement.innerHTML = `
            <h3>${articulo.nombre}</h3>
            <p>Precio: $${precioEnPesos.toFixed(2)}</p> <!-- Mostrar el precio en pesos -->
        `;
        listaArticulos.appendChild(articuloElement); // Agregar el artículo al contenedor
    });
};