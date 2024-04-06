function guardarCarrito() {
   localStorage.setItem("miCarrito", JSON.stringify(todosLosProductos));
}

function recuperarCarrito() {
   return JSON.parse(localStorage.getItem("miCarrito")) || [];
}

function eliminarCarrito() {
   localStorage.removeItem("miCarrito");
}

const todosLosProductos = recuperarCarrito();
