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

               const carritoItem = {...Storage.getProductos(id), cantidad: 1}

                //Agregando el producto al carrito
                carrito = [...carrito, carritoItem]

                //Guardar el carrito en el localstorage
                Storage.saveCart(carrito)

                //set cart values
                this.setItemValues(carrito)
                this.addCarritoItem(carritoItem)

                // Mostrar el carrito

            });
        });
    }

    SetItemValues(carrito){
        let tempTotal = 0;
        let itemTotal = 0;
        carrito.map(item => {
            tempTotal += item.price * item.cantidad;
            itemTotal += item.cantidad;
        });
        carritoTotal.innerText = parseFloat(tempTotal.toFixed(2));
        itemTotales = innerText = itemTotal
    }

    addCarritoItem({image, price, title, id}){
        const div = document.createElement("div")
        div.classList.add("carrito__item")

        div.innerHTML = `
        <div class="carrito__item">
                  <img src=${image} alt=${title}>
                  <div>
                    <h3>${title}</h3>
                    <p class="price">$${price}</p>
                  </div>
                  <div>
                    <span class= "increase" data-id=${id}>
                      <i class="bx bxs-up-arrow"></i>
                    </span>
                    <p class="item__cantidad">1</p>
                    <span class= "decrease" data-id=${id}>
                      <i class="bx bxs-down-arrow"></i>
                    </span>
                  </div>
                  <div>
                    <span class="remove__item" data-id=${id}>
                      <i class="bx bx-trash"></i>
                    </span>
                  </div>
        `
        carrito__center.appendChild(div)
    }
    show(){
        carritoDOM.classList.add("show")
        overlay.classList.add("show")
    }
    setAPP(){
        carrito = Storage.getCart()
        this.setItemValues(carrito)
        this.populate(carrito)

        openCarrito.addEventListener("click", this.show)
        closeCarrito.addEventListener("click", this.hide)

        populate(carrito){
            carrito.forEach(item => this.addCarritoItem(item))
        }
        carritoCenter.addEventListener("click", e =>{
			const target = e.target.closest("span")
			const targetElement = target.classList.contains("remove__item");
			console.log(target)
			console.log(targetElement)
			if(!target) return
			if(targetElement){
				const id = parseInt(target.dataset.id);
				this.removeItem(id)
				carritoCenter.removeChild(target.parentElement.parentElement)
			}else if(target.classList.contains("increase")){
				const id = parseInt(target.dataset.id, 10);
				let tempItem = carrito.find(item => item.id === id);
				tempItem.cantidad++;
				Storage.saveCart(carrito)
				this.setItemValues(carrito)
				target.nextElementSibling.innerText = tempItem.cantidad
			}else if(target.classList.contains("decrease")){
				const id = parseInt(target.dataset.id, 10);
				let tempItem = carrito.find(item => item.id === id);
				tempItem.cantidad--;

				if(tempItem.cantidad > 0){
					Storage.saveCart(carrito);
					this.setItemValues(carrito);
					target.previousElementSibling.innerText = tempItem.cantidad;
				}else{
					this.removeItem(id);
					carritoCenter.removeChild(target.parentElement.parentElement)
				}
			}
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
    static getCart(){
        return localStorage.getItem("carrito") ? JSON.parse(localStorage.getItem("carrito")) : [];
    }
}




