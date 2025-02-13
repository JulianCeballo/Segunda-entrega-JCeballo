    // inicio de secion , sin condiciones para navegar en la tienda y efectuar la compra  
    // usuario : julian    contraseña : 123
    
    document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const loginBtn = document.getElementById("login-btn");
    const logoutBtn = document.getElementById("logout-btn");
    const loginFormContainer = document.getElementById("login-form-container");
    const mensajeLogin = document.createElement("div");
    mensajeLogin.id = "mensaje-login";
    loginFormContainer.appendChild(mensajeLogin);

    // Verificar si hay una sesión guardada
    const usuarioGuardado = localStorage.getItem("usuario");

    if (usuarioGuardado) {
        actualizarUI(usuarioGuardado);
    }

    // Mostrar/ocultar el formulario de inicio de sesión
    loginBtn.addEventListener("click", () => {
        loginFormContainer.classList.toggle("d-none");
    });

    // Evento para iniciar sesión
    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const nombre = document.getElementById("nombre").value;
        const contraseña = document.getElementById("contraseña").value;
        
        // Simulación de autenticación (puedes modificar esto con lógica real)
        if (nombre === "julian" && contraseña === "123") {
            // Guardamos el usuario en localStorage
            localStorage.setItem("usuario", nombre);
            // Actualizar UI
            actualizarUI(nombre);
            mostrarMensaje("Inicio de sesión exitoso", "exito");
        } else {
            mostrarMensaje("Usuario o contraseña incorrectos ❌", "error");
        }
    });

    // Evento para cerrar sesión
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("usuario");
        loginBtn.textContent = "Iniciar Sesión";
        logoutBtn.classList.add("d-none");
        loginFormContainer.classList.add("d-none");
        document.getElementById("login-form").style.display = "block"; // Mostrar formulario de inicio de sesión
        mostrarMensaje("Sesión cerrada exitosamente", "exito");
    });

    // Función para actualizar la UI
    function actualizarUI(usuario) {
        loginBtn.textContent = `Hola, ${usuario}`;
        logoutBtn.classList.remove("d-none");
        loginFormContainer.classList.add("d-none");
        document.getElementById("login-form").style.display = "none"; // Ocultar formulario de inicio de sesión
    }

    // Función para mostrar mensajes al usuario
    function mostrarMensaje(mensaje, tipo) {
        mensajeLogin.textContent = mensaje;
        mensajeLogin.className = tipo === "exito" ? "mensaje-exito" : "mensaje-error";
        mensajeLogin.style.display = "block";
        setTimeout(() => {
            mensajeLogin.style.display = "none";
        }, 3000);
    }
});