let titulo = document.getElementById("titulo");
titulo.innerHTML = "Los Duendes del Amor"

let miparrafo1 = document.getElementById("miparrafo1")
miparrafo1.innerHTML = "Los Duendes dan amor, los duendes son amor"

let nuevoElemento = document.createElement("p")
nuevoElemento.innerHTML = "Solo puede ver la magia aquel que en ella cree"
document.body.appendChild(nuevoElemento)

const URL = 'js/productos.json'

document.addEventListener("DOMContentLoaded", function() {
  const productoLista = document.getElementById("producto-lista");
  const carrito = document.getElementById("carrito");

  const productos = [
    { id: 1, nombre: "Producto 1", precio: 500},
    { id: 2, nombre: "Producto 2", precio: 500},
    { id: 3, nombre: "Producto 3", precio: 700},
    { id: 4, nombre: "Producto 4", precio: 700},
    { id: 5, nombre: "Producto 5", precio: 900},
    { id: 6, nombre: "Producto 6", precio: 900},
    { id: 7, nombre: "Producto 7", precio: 1000},
    { id: 8, nombre: "Producto 8", precio: 1000}
];

  productos.forEach(producto => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${producto.nombre} - $${producto.precio}
      <button onclick="addToCart(${producto.id})">Agregar al Carrito</button>
    `;
    productoLista.appendChild(li);
  });

  window.addToCart = function(productoId) {
    let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
    const producto = productos.find(p => p.id === productoId);
    if (producto) {
      carritoItems.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carritoItems));
      mostrarCarrito();
    }
  };

  function mostrarCarrito() {
    carrito.innerHTML = "";
    let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
    if (carritoItems.length === 0) {
      cart.innerHTML = "<p>El carrito está vacío.</p>";
    } else {
      const ul = document.createElement("ul");
      carritoItems.forEach(item => {
        const li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;
        ul.appendChild(li);
      });
      carrito.appendChild(ul);
    }
  }

  mostrarCarrito();
});