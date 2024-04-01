let titulo = document.getElementById("titulo");
titulo.innerHTML = "Los Duendes del Amor"

let miparrafo1 = document.getElementById("miparrafo1")
miparrafo1.innerHTML = "Los Duendes dan amor, los duendes son amor"

let nuevoElemento = document.createElement("p")
nuevoElemento.innerHTML = "Solo puede ver la magia aquel que en ella cree"
document.body.appendChild(nuevoElemento)

const URL = 'js/productos.json'

const productos = []

  //  AGREGAR PRODUCTOS
 
// productos
function retornarCardHTML({ imagen, nombre, precio, id }) {
        return `<div class="producto">            
                  <img class="producto__imagen" src="${imagen}" alt="imagen ${nombre}">
                  <div class="producto__informacion">
                      <p class="producto__nombre">${nombre}</p>
                      <p class="producto__precio"><b>$${precio}</b></p>
                      <button id="${id}" class="button button-add pointer" title="Pulsa para comprar">COMPRAR</button>
                  </div>
                  
              </div>`                
}

// Después se declaran todas las funciones
function agregarAlCarrito(productoId) {
  let carritoItems = JSON.parse(localStorage.getItem("miCarrito")) || [];
  const producto = productos.find((p) => p.id === productoId);
  if (producto) {
      carritoItems.push(producto);
      localStorage.setItem("miCarrito", JSON.stringify(carritoItems));
      mostrarCarrito();
  }
}

function mostrarCarrito() {
  const carrito = document.getElementById("miCarrito");

  carrito.innerHTML = "";
  let carritoItems = JSON.parse(localStorage.getItem("miCarrito")) || [];
  if (carritoItems.length === 0) {    
      carrito.innerHTML = "<p>El carrito está vacío.</p>";
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
  ${producto.imagen} - ${producto.nombre} - $${producto.precio}
    <button onclick="addToCart(${producto.id})">Agregar al Carrito</button>
  `;
  productoLista.appendChild(li);
});

mostrarCarrito();
