class Producto {
    constructor(id, nombre, precio, img){
        this.id = id;
        this.nombre = nombre; 
        this.precio = precio;
        this.img = img; 
        this.cantidad = 1;
    }
}

const airmax97 = new Producto(1, "Nike Air Max 97", 53000, "img/airmax97.jpg");
const uptempo = new Producto(2, "Air More Uptempo '96", 78000, "img/uptempo.jpg");
const airmax90 = new Producto(3, "Air Max 90 Se", 48000, "img/airmax90.jpg");
const airmax97c = new Producto(4, "Nike Air Max 97", 55000, "img/airmax97colores.jpg");
const Af1 = new Producto(5, "Af1 Pixel", 51500, "img/af1.jpg");
const airmax95 = new Producto(6, "Air Max 95 Se", 73000, "img/airmax95.jpg");
const air1lowse = new Producto(7, "Air 1 Low Se", 49000, "img/air1lowse.jpg")
const jordanair1 = new Producto(8, "Jordan air 1", 80000, "img/jordanair1.jpg") 

const productos = [airmax97, uptempo, airmax90, airmax97c, Af1, airmax95, air1lowse, jordanair1];

let carrito = [];

if(localStorage.getItem("carrito")){
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

const contenedorProductos = document.getElementById("contenedorProductos");

const verProductos = () => {
    productos.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5 class="text-center"> ${producto.nombre} </h5>
                                <p class="text-center "> ${producto.precio} </p>
                                <button class = "btn btn-dark btn-outline-ligth fw-bold" id="boton${producto.id}" > Agregar al Carrito </button>
                            </div>
                        </div>
                        `
      contenedorProductos.appendChild(card);
      
        const boton = document.getElementById(`boton${producto.id}`);
        boton.addEventListener("click", () => {
            agregarAlCarrito(producto.id);
        })
    })
}

verProductos();

const agregarAlCarrito = (id) => {
    const productoEnCarrito = carrito.find(producto => producto.id === id);
    if(productoEnCarrito) {
        productoEnCarrito.cantidad++;
    } else {
        const producto = productos.find(producto => producto.id === id);
        carrito.push(producto);
    }
    calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

const contenedorCarrito = document.getElementById("contenedorCarrito");
const verCarrito = document.getElementById("verCarrito");

verCarrito.addEventListener("click", () => {
    mostrarCarrito();
})

const mostrarCarrito = () => {
    contenedorCarrito.innerHTML = "";
    carrito.forEach(producto => {
        const card = document.createElement("div");
        card.classList.add("col-xl-3", "col-md-6", "col-sm-12");
        card.innerHTML = `
                        <div class ="card">
                            <img src = "${producto.img}" class = "card-img-top imgProductos" alt = "${producto.nombre}">
                            <div>
                                <h5> ${producto.nombre} </h5>
                                <p> ${producto.precio} </p>
                                
                                <button class = "btn btn-dark btn-outline-ligth fw-bold" id="eliminar${producto.id}" > - </button>
                                <button type="button" class="btn btn-dark btn-outline-light fw-bold"> ${producto.cantidad}</button>

                                <button class = "btn btn-dark btn-outline-ligth fw-bold" id="agregar${producto.id}" > + </button>
                            </div>
                        </div>
                        `
        contenedorCarrito.appendChild(card);
        const boton = document.getElementById(`eliminar${producto.id}`);
        boton.addEventListener("click", () => {
            eliminarDelCarrito(producto.id);
        })
       
    })
    calcularTotal();
}


const eliminarDelCarrito = (id) => {
     const producto = carrito.find(producto => producto.id === id);
    const indice = carrito.indexOf(producto);
  if (producto.cantidad === 1) {
      carrito.splice(indice, 1)
  } else {
    producto.cantidad--
  }
  
  mostrarCarrito();
  
    localStorage.setItem("carrito", JSON.stringify(carrito));
}


const total = document.getElementById("total");

const calcularTotal = () => {
    let totalCompra = 0; 
    carrito.forEach(producto => {
        totalCompra += producto.precio * producto.cantidad;
       
    })
    total.innerHTML = `Total: $${totalCompra}`;
}



const vaciarCarrito = document.getElementById("vaciarCarrito");

vaciarCarrito.addEventListener("click", () => {
    carritoVacio();
})

const carritoVacio = () => {
    carrito = []; 
   mostrarCarrito();

    
    localStorage.clear();
}