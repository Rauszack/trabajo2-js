const productos = [];
let todosLosProductos = [];

const contenedorCarrito = document.querySelector(".contenedor-carrito");
const contenedor = document.querySelector("div#contenedor");
const botonCarrito = document.querySelector("#imgCarro"); 
const contadorProducto = document.querySelector("#contador-productos"); 
const contenedorCarritoProductos = document.querySelector(".contenedor-carrito-productos");
const carritoProductos = document.querySelector(".carrito-productos");
const rowProductos = document.querySelector(".row-productos");
const totalCarrito = document.querySelector(".total-pagar");
const contadorProductos = document.querySelector("#contador-productos");

botonCarrito.addEventListener('click', () => {
    contenedorCarritoProductos.classList.toggle("ocultar-carrito"); 
});

async function obtenerProductos() {
    try {
        const response = await fetch('productos.json');
        if (response.ok) {
            const data = await response.json();
            productos.push(...data);
            cargarProductos(productos);
        } else {
            throw new Error("No se pudieron cargar los productos");
        }
    } catch (error) {
        console.error(error);
    }
}
obtenerProductos();

function cargarProductos(array) {
    contenedor.innerHTML = "";
    if (array.length > 0) {
        array.forEach((producto) => {
            contenedor.innerHTML += retornarCarritoHTML(producto);
        });
        activarClickEnBotones();
    }
}

function activarClickEnBotones() {
    const botonesComprar = document.querySelectorAll("button.button-add");
    for (let boton of botonesComprar) {
        boton.addEventListener("click", () => {
            const productoSeleccionado = productos.find((producto) => parseInt(producto.id) === parseInt(boton.id));
            const existeEnCarrito = todosLosProductos.findIndex((producto) => parseInt(producto.id) === parseInt(productoSeleccionado.id));
            if (existeEnCarrito === -1) {
                const productoNuevo = retornoProductoNuevo(productoSeleccionado);
                todosLosProductos.push(productoNuevo); 
            } else {
                todosLosProductos[existeEnCarrito].cantidad++; 
            }
            mostrarHTML();
        });
    }
}

function retornarCarritoHTML({ id, imagen, nombre, precio }) {
    return `
            <img class=" producto producto__imagen" src="${imagen}" alt="imagen ${nombre}">
            <div class="producto producto__informacion">
                <p class="producto__nombre">${nombre}</p>
                <p class="producto__precio"><b>$${precio}</b></p>
                <button id="${id}" class="button button-add pointer" title="Pulsa para comprar">COMPRAR</button>
            </div>
        `;
}

function retornoProductoNuevo(productoSeleccionado) {
    return {
        id: productoSeleccionado.id,
        imagen: productoSeleccionado.imagen,
        nombre: productoSeleccionado.nombre,
        cantidad: 1,
        precio: productoSeleccionado.precio,
    };
}

document.querySelectorAll('.cerrar-icono').forEach(icono => {
    icono.addEventListener('click', (event) => {
        const nombreProducto = event.target.parentElement.querySelector('.titulo-producto-carrito').textContent;
        todosLosProductos = todosLosProductos.filter(producto => producto.nombre !== nombreProducto);
        guardarCarrito();
        mostrarHTML();
    });
});



const mostrarHTML = () => {
    if (!todosLosProductos.length) {
        rowProductos.classList.add('ocultar'); 
        totalCarrito.classList.add('ocultar'); 
    } else {
        rowProductos.classList.remove('ocultar'); 
        totalCarrito.classList.remove('ocultar'); 
    }
    document.querySelectorAll('.cerrar-icono').forEach(icono => {
        icono.addEventListener('click', (event) => {
            const nombreProducto = event.target.parentElement.querySelector('.titulo-producto-carrito').textContent;
            todosLosProductos = todosLosProductos.filter(producto => producto.nombre !== nombreProducto);
            guardarCarrito();
            mostrarHTML();
        });
    });

    rowProductos.innerHTML = '';

    let total = 0;
    let totalDeLosProductos = 0;

    todosLosProductos.forEach(producto => {
        const contenedorProductos = document.createElement('div');
        contenedorProductos.classList.add('carrito-productos');

        contenedorProductos.innerHTML = `
            <div class="info-carrito-producto">
                <span class="cantidad-producto-carrito">${producto.cantidad}</span>
                <p class="titulo-producto-carrito">${producto.nombre}</p>
                <span class="precio-producto-carrito">${producto.precio}</span>
            </div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="cerrar-icono"
                width="25"
                height="25">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

        rowProductos.append(contenedorProductos);

        total = total + parseInt(producto.cantidad * producto.precio.slice(1));
        totalDeLosProductos = totalDeLosProductos + producto.cantidad;
    });

    totalCarrito.innerText = `$${total}`; 
    contadorProductos.innerText = totalDeLosProductos;
};
