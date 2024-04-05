const productos = []

const contenedorCarrito = document.querySelector(".contenedor-carrito")
const contenedor = document.querySelector("div#contenedor")
const botonCarrito = document.querySelector("div#imgCarro")
const contadorProducto = document.querySelector("div#imgCarro")
const contenedorCarritoProductos = document.querySelector(".contenedor-carrito-productos")
const carritoProductos = document.querySelector(".carrito-productos")
const rowProductos = document.querySelector(".row-productos")

botonCarrito.addEventListener('click', () => {
    contenedorCarritoProductos.classList.toggle(".ocultar-carrito")
})

//variable de arreglos de Productos
let todosLosProductos = []

const totalCarrito = document.querySelector(".total-pagar")
const contadorProductos = document.querySelector("#contador-productos")

listaProductos.addEventListener('click', e => {
    if(e.target.classList.contains('btn-add-cart')){
        const productos = e.target.parentElement

        const infoProductos = {
            cantidad: 1,
            nombre: productos.querySelector('h2').textContent,
            precio: productos.querySelector('p').textContent,
        }

        const existe = todosLosProductos.some(producto => productos.nombre === infoProductos.nombre)

        if (existe){
            const productos = todosLosProductos.map(producto => {
                if(producto.nombre === infoProductos.nombre){
                    producto.cantidad++;
                    return producto
                    } else {
                    return producto
                }
            })
            todosLosProductos = [...todosLosProductos]
        } else {
            todosLosProductos = [...todosLosProductos, infoProductos];
        }

      

        mostrarHTML();
    }
});

rowProductos.addEventListener('click', (e) => {
    if(e.target.classList.contains('cerrar-icono')){
    const producto = e.target.parentElement
    const nombre = producto.querySelector('p').textContent //produc cambia si tiene ID e iría id en vez de la p
   
    todosLosProductos =  todosLosProductos.filter(
        producto => producto.nombre !== nombre
    );
    mostrarHTML()
}
})

    //  AGREGAR PRODUCTOS
 
// productos
function retornarCarritoHTML({id, imagen, nombre, precio  }) {
        return `<div class="producto">            
                    <img class="producto__imagen" src="${imagen}" alt="imagen ${nombre}">
                    <div class="producto__informacion">
                        <p class="producto__nombre">${nombre}</p>
                        <p class="producto__precio"><b>$${precio}</b></p>
                        <button id="${id}" class="button button-add pointer" title="Pulsa para comprar">COMPRAR</button>
                    </div>
                    
                </div>`
    }

    

    function retornoProductoNuevo(productoSeleccionado) {
        return productoNuevo = {
            id: productoSeleccionado.id,
            imagen: productoSeleccionado.imagen,
            nombre: productoSeleccionado.nombre,
            cantidad: 1,
            precio: productoSeleccionado.precio,
        }
    }

    
// funcion de carga de productos
function cargarProductos(array) {
    contenedor.innerHTML = ""
    if (array.length > 0 ) {
            array.forEach((producto) => {
                    contenedor.innerHTML += retornarCarritoHTML(producto)
                })
                activarClickEnBotones()
            } 
}         
cargarProductos(productos)

const URL = 'js/productos.json'

async function obtenerProductos() {
try{
    const response = await fetch(URL)
    if(response.ok) {
        const data = await response.json()
        productos.push(...data)
    }else{
        throw new Error("No se pudo cargar los productos")
    }
                    
    cargarProductos(productos)
}
catch(error){
    console.error(error)
}
}
obtenerProductos()


//              ACTIVAR COMPRA


function activarClickEnBotones() { //Evento click en botones COMPRAR
    const botonesComprar = document.querySelectorAll("button.button-add")

    for (let boton of botonesComprar) {
        boton.addEventListener("click", ()=> {
            const productoSeleccionado = productos.find((producto)=>  parseInt(producto.id) === parseInt(boton.id))
            const existeEnCarrito = carrito.findIndex((producto)=> parseInt(producto.id) === parseInt(productoSeleccionado.id))
            if (existeEnCarrito === -1) {
                const productoNuevo = retornoProductoNuevo(productoSeleccionado)
                carrito.push(productoNuevo)
            } else {
                carrito[existeEnCarrito].cantidad++
            }
            guardarCarrito()
        })
    }
}
 

//funcion para mostrar html
const mostrarHTML = () => {
	if (!todosLosProductos.length) {
		carritoVacio.classList.remove('ocultar');
		rowProductos.classList.add('ocultar');
		totalCarrito.classList.add('ocultar');
	} else {
		carritoVacio.classList.add('ocultar');
		rowProductos.classList.remove('ocultar');
		totalCarrito.classList.remove('ocultar');
	}

    //limpiar HTML
	rowProductos.innerHTML = '';

	let total = 0;
	let totalDeLosProductos = 0;

	todosLosProductos.forEach(producto => {
		const contenedorProductos = document.createElement('div');
		contenedorProductos.classList.add('carrito-productos');

		containerProduct.innerHTML = `
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
                class="icono-cerrar"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        `;

		rowProductos.append(containerProduct);

		total =
			total + parseInt(producto.cantidad * producto.precio.slice(1));
            totalDeLosProductos = totalDeLosProductos + producto.cantidad;
	});

	valorTotal.innerText = `$${total}`;
	contadorProductos.innerText = totalDeLosProductos;
};


Toastify({

    text: "agregaste un producto al carrito",
    
    duration: 3000
    
});

showToast();