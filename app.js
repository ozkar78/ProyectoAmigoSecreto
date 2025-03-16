// 1. Inicialización de la matriz vacía para almacenar los nombres de los amigos
let amigos = [];

// 2. Función para agregar un amigo a la matriz
function agregarAmigo() {
    // Obtener el valor del input del nombre
    const input = document.getElementById("amigo");
    const nombre = input.value.trim();

    // Validar que el nombre solo contenga letras y tenga al menos dos caracteres
    const nombreValido = /^[A-Za-zÁáÉéÍíÓóÚúÑñ]{2,}( [A-Za-zÁáÉéÍíÓóÚúÑñ]{2,})*$/.test(nombre);

    if (!nombreValido) {
        // Mostrar alerta si el nombre no es válido
        alert("Por favor, ingresa un nombre válido (solo letras, sin espacios ni números).");
        input.value = ""; // Limpiar el campo de entrada
        return;
    }

    // Verificar si el nombre ya existe en la lista
    if (isNombreRepetido(nombre)) {
        alert("Este nombre ya está en la lista.");
        input.value = ""; // Limpiar el campo de entrada
        return;
    }

    // Agregar el nombre a la matriz
    amigos.push(nombre);

    // Actualizar el grid con la nueva lista de amigos
    actualizarGrid();

    // Limpiar el campo de entrada
    input.value = "";
}

// 3. Función para verificar si un nombre ya está en la matriz
function isNombreRepetido(nombre) {
    return amigos.includes(nombre);
}

// 4. Función para actualizar el grid con los nombres de la matriz
function actualizarGrid() {
    const nameGrid = document.getElementById("name-grid");
    nameGrid.innerHTML = ""; // Limpiar el contenido del grid

    // Iterar sobre el arreglo de amigos y mostrar cada nombre en el grid
    for (let i = 0; i < amigos.length; i++) {
        const div = document.createElement("div");
        div.classList.add("name-item");
        div.textContent = amigos[i];

        // Crear el botón de eliminar
        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "❌";
        botonEliminar.classList.add("btn-eliminar");

        // Asignar la función de eliminación del amigo
        botonEliminar.onclick = function() {
            eliminarAmigo(i); // Eliminar el amigo por su índice
        };

        div.appendChild(botonEliminar); // Agregar el botón al div
        nameGrid.appendChild(div); // Agregar el div al grid
    }

    // Si la lista tiene más de 12 amigos, mostrar advertencia
    if (amigos.length >= 12) {
        alert("La matriz está llena. No puedes agregar más nombres.");
    }
}

// 5. Función para eliminar un amigo de la lista por su índice
function eliminarAmigo(index) {
    amigos.splice(index, 1); // Eliminar el amigo del arreglo
    actualizarGrid(); // Actualizar el grid
}

// 6. Función para sortear un amigo secreto aleatoriamente
function sortearAmigo() {
    // Verificar si hay amigos en la lista
    if (amigos.length === 0) {
        alert("La lista está vacía. Agrega al menos un nombre antes de sortear.");
        return;
    }

    // Obtener un índice aleatorio dentro de la lista de amigos
    const indiceAleatorio = Math.floor(Math.random() * amigos.length);
    const amigoSorteado = amigos[indiceAleatorio];

    // Mostrar el resultado del sorteo
    const resultado = document.getElementById("resultado");
    resultado.innerHTML = `<li>🎉 ${amigoSorteado} es el amigo secreto! 🎉</li>`;
}

// 7. Función para limpiar la lista y reiniciar el juego
function limpiarLista() {
    amigos = []; // Reiniciar el arreglo de amigos
    document.getElementById("name-grid").innerHTML = ""; // Limpiar el grid
    document.getElementById("resultado").innerHTML = ""; // Limpiar el resultado del sorteo
    document.getElementById("amigo").value = ""; // Limpiar el campo de entrada
}

// 8. Asociamos el botón de limpiar con la función 'limpiarLista'
document.getElementById("btnLimpiar").addEventListener("click", limpiarLista);
