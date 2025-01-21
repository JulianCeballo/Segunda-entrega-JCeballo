// Credenciales
const usuarioValido = { nombre: "julian", contraseña: "123" };

// Elementos DOM
const nombreInput = document.getElementById("nombre");
const contraseñaInput = document.getElementById("contraseña");
const btnIngresar = document.getElementById("btn-ingresar");
const errorMsgContainer = document.getElementById("error-mensaje");
const loginSection = document.getElementById("login-section");
const productosSection = document.getElementById("productos-section");
const listaArticulos = document.getElementById("lista-articulos");
const cotizacion = document.getElementById("cotizacion");
const carritoLista = document.getElementById("carrito-lista");
const totalCarrito = document.getElementById("total-carrito");
const precioDolar = 1059;

// artículos
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

// Carrito de compras (se inicializa con lo que haya en localStorage)
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Ingreso
btnIngresar.addEventListener("click", (e) => {
    e.preventDefault();
    errorMsgContainer.innerHTML = "";

    if (nombreInput.value === usuarioValido.nombre && contraseñaInput.value === usuarioValido.contraseña) {
        loginSection.style.display = "none";
        productosSection.style.display = "block";
        cotizacion.innerHTML = `Cotización del Dólar: $${precioDolar}`;
        renderizarArticulos(articulos);
    } else {
        errorMsgContainer.textContent = "Credenciales incorrectas.";
    }
});

// Renderizar Artículos
const renderizarArticulos = (items) => {
    listaArticulos.innerHTML = "";
    items.forEach(({ id, nombre, precio }) => {
        const articuloHTML = `
            <div class="articulo">
                <h3>${nombre}</h3>
                <p>Precio: $${(precio * precioDolar).toFixed(2)}</p>
                <button id="agregar-${id}" onclick="agregarAlCarrito(${id})">Añadir al carrito</button>
            </div>`;
        listaArticulos.innerHTML += articuloHTML;
    });
};

// Añadir al Carrito
const agregarAlCarrito = (id) => {
    const articulo = articulos.find((item) => item.id === id); // Encontrar ID
    const existente = carrito.find((item) => item.id === id);  // Verificar si ya está en el carrito

    if (existente) {
        existente.cantidad += 1; // Si ya existe, aumentar la cantidad
    } else {
        carrito.push({ ...articulo, cantidad: 1 }); // Si no existe, agregarlo con cantidad 1
    }

    // Actualizar carrito en el localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Mostrar mensaje en el DOM 
    const mensajeCarrito = document.getElementById('mensaje-carrito');
    mensajeCarrito.innerHTML = "Artículo añadido al carrito.";
    mensajeCarrito.style.display = "block"; // Mostrar el mensaje
    setTimeout(() => {
        mensajeCarrito.style.display = "none"; // Ocultar después de 2 segundos
    }, 2000);

    // Renderizar el carrito actualizado
    renderizarCarrito();
};

// Renderizar Carrito
const renderizarCarrito = () => {
    carritoLista.innerHTML = ""; // Limpiar el contenido del carrito
    let total = 0;

    carrito.forEach(({ nombre, precio, cantidad }) => {
        const itemHTML = `
            <li>
                <h4>${nombre}</h4>
                <p>Precio: $${(precio * precioDolar).toFixed(2)}</p>
                <p>Cantidad: ${cantidad}</p>
            </li>`;
        carritoLista.innerHTML += itemHTML;
        total += (precio * cantidad); // Calcular el total
    });

    totalCarrito.innerHTML = `Total: $${(total * precioDolar).toFixed(2)}`; // Mostrar total en el DOM
};
