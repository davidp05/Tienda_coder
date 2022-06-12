class Productos{
    async getProductos(){
        try{
            const result = await fetch("productos.json");
            const data = await result.json()
            return data
        } catch(err){
            console.log(err);
        }
    }
}

const productoDOM = document.querySelector("productos__center");
const carritoDOM = document.querySelector("carrito");
const carrito__center = document.querySelector("carrito__center");
const openCarrito = document.querySelector("carrito__icon");
const closeCarrito = document.querySelector("close__carrito");
const overlay = document.querySelector("carrito__overlay");
const carritoTotal = document.querySelector("carrito__total");
const clearCarritoBtn = document.querySelector("clear__carrito");
const itemTotales = document.querySelector("item__total");
const detalles = document.getElementById('detalles');

let carrito = [];
let buttonDOM = [];

class UI {
    renderProductos(producto){
        let result = ""
        Productos.forEach(producto) =>{ result += `
            <div class="producto">
                <div class=${producto.image}>
                </div>
                <div class="producto__footer">
                    <h1>${producto.title}</h1>
                    <div class="rating">
                        <span>
                            <i class="bx bxs-star"></i>
                        </span>
                        <span>
                            <i class="bx bxs-star"></i>
                        </span>
                        <span>
                            <i class="bx bxs-star"></i>
                        </span>
                        <span>
                            <i class="bx bxs-star"></i>
                        </span>
                        <span>
                            <i class="bx bx-star"></i>
                        </span>
                    </div>
                    <div class="price">$${producto.price}</div>
                    <div class="button">
                        <div class="btn__group">
                            <a href="#" class="btn addToCart" data-id=${producto.id}>Añadir al carrito</a>
                            <a href="producto-detalles.html?id=${producto.id}" class="btn view">Vista</a>
                        </div>
                    </div>
                </div>
            </div>
            `
        };
        productoDOM.innerHTML = result;
    }

    getButtons(){
        const buttons = [...document.querySelectorAll(".addToCart")];
        buttonDOM = buttons;
        buttons.forEach(button => {
            const id = button.dataset.id;
            const inCart = carrito.find(item => id === parseInt(id, 10));

            if(inCart){
                button.innerHTML = "En el carrito"
                button.disabled = true
            }
            button.addEventListener("click", e => {
               e.preventDefault();
               e.target.innerHTML = "En el carrito"
               e.target.disabled = true

               //GET de los productos al carrito

               const carritoItem = {...Storage.ge}
            });
        });
    }
}

class Storage {
    static saveProduct(obj){
        localStorage.setItem("productos", JSON.stringify(obj))
    }
    static saveCart(carrito){
        localStorage.setItem("carrito", JSON.stringify(carrito))
    }
    static getProductos(id){
        const producto = JSON.parse(localStorage.getItem("productos"))
        return producto.find(product => product.id === parseFloat(id, 10))
    }

}




