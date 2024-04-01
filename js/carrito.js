let titulo = document.getElementById("titulo");
titulo.innerHTML = "Los Duendes del Amor"

let miparrafo1 = document.getElementById("miparrafo1")
miparrafo1.innerHTML = "Los Duendes dan amor, los duendes son amor"

let nuevoElemento = document.createElement("p")
nuevoElemento.innerHTML = "Solo puede ver la magia aquel que en ella cree"
document.body.appendChild(nuevoElemento)

const URL = 'js/productos.json'

const productos = []

// Después se declaran todas las funciones
function addToCart(productoId) {
  let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
  const producto = productos.find((p) => p.id === productoId);
  if (producto) {
      carritoItems.push(producto);
      localStorage.setItem("carrito", JSON.stringify(carritoItems));
      mostrarCarrito();
  }
}

function mostrarCarrito() {
  const carrito = document.getElementById("carrito");

  carrito.innerHTML = "";
  let carritoItems = JSON.parse(localStorage.getItem("carrito")) || [];
  if (carritoItems.length === 0) {
      // "cart" no está definido en ninguna parte del código, lo que genera
      // un error de cómputo ya que se intenta asignar un párrafo a un elemento
      // que no existe
      cart.innerHTML = "<p>El carrito está vacío.</p>";
  } else {
      const ul = document.createElement("ul");
      carritoItems.forEach((item) => {
          const li = document.createElement("li");
          li.textContent = `${item.nombre} - $${item.precio}`;
          ul.appendChild(li);
      });
      carrito.appendChild(ul);
  }
}

// Por último viene la ejecución del código
const productoLista = document.getElementById("producto-lista");

productos.forEach((producto) => {
  const li = document.createElement("li");
  li.innerHTML = `
    ${producto.nombre} - $${producto.precio}
    <button onclick="addToCart(${producto.id})">Agregar al Carrito</button>
  `;
  productoLista.appendChild(li);
});

mostrarCarrito();
