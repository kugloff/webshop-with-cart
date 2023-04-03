const miniCartButton = document.getElementById('miniCartButton');
const totalQty = document.getElementById('totalQty');
const miniCartContent = document.getElementById('miniCartContent');
const miniCartClose = document.getElementById('miniCartClose');
const miniCartProducts = document.getElementById('miniCartProducts');
const miniCartTotal = document.getElementById('miniCartTotal');

const navCategories = document.getElementById('categories');
const categoriesContent = document.getElementById('categoriesContent');
const categoriesContainer = document.getElementById('categoriesContainer');

const productContainer = document.getElementById('productContainer');

let allQty = 0;
let cart = [];

navCategories.addEventListener('click', () => {
    categoriesContent.classList.toggle('active');
})

fetch('https://dummyjson.com/products?limit=5')
    .then(res => res.json())
    .then(data => {
        products = data.products;
        data.products.forEach(product => {
            cart['productId'] = product.id;
            cart.productId.product = product;
            cart.productId.quantity = 0;
        })
    }) 

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(data => {
        data.forEach(category => {
            categoriesContainer.innerHTML += 
            `<div id="${category}" class="categoryTitle">${category}</div>`;

            fetch(`https://dummyjson.com/products/category/${category}`)
                .then(res => res.json())
                .then(data => {
                    products = data.products;
                
                    const categoryTitle = document.getElementById(`${category}`);
                    categoryTitle.addEventListener('click', ()=>{
                        productContainer.innerHTML = "";
                        data.products.forEach(product => {
                            productContainer.innerHTML +=
                            `<div class="item">
                                <figure style="height=200px"><img src=${product.images[0]} alt=${product.title} class="productImg"></figure>
                                <h3 class="productTitle">${product.title}</h3>
                                <p>${product.description}</p>
                                <div class="price">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</div>
                                <button class="addToCartBtn" data-product-id="${product.id}">Add to cart</button>
                            </div>`
                    })
                    
                    data.products.forEach(product => {
                        const productItem = document.getElementsByClassName('item');
                        productItem.addEventListener('click', ()=>{
                            productContainer.innerHTML =
                            `<div class="clickedItem">
                                <figure style="height=200px"><img src=${product.images[0]} alt=${product.title}></figure>
                                <h3 class="productTitle">${product.title}</h3>
                                <p class="productDesc">${product.description}</p>
                                <div class="price">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</div>
                                <button class="addToCartBtn" data-product-id="${product.id}">Add to cart</button>
                            </div>`
                        })
                    })

                    let addToCartButtons = document.getElementsByClassName('addToCartBtn');
                    for (const button of addToCartButtons) {
                        button.addEventListener('click', (event) => {
                            const productId = event.target.dataset.productId;
                            console.log(cart[1].product)
                            if (cart[productId]) {
                                cart[productId].quantity++;
                            } else {
                                cart[productId] = { product: cart[productId].products.find(p => p.id === productId), quantity: 1 };
                            }
                            allQty++;
                            totalQty.innerText = `${allQty}`;
                            updateCart();
                        });
                    }        
                })
            })
        })             
    })
    .catch(error => console.log(error));
    

function increaseAmount() {
    const increaseButton = document.getElementsByClassName('increase-button');
    for (let i = 0; i < increaseButton.length; i++) {
        increaseButton[i].addEventListener('click', (event) => {
            const id = event.target.dataset.productId;
            cart[id].quantity++;
            allQty++;
            totalQty.innerText = `${allQty}`;
            updateCart();
        });
    }
}

function decreaseAmount() {
    const decreaseButton = document.getElementsByClassName('decrease-button');
    for (let i = 0; i < decreaseButton.length; i++) {
        decreaseButton[i].addEventListener('click', (event) => {
            const id = event.target.dataset.productId;
            if (cart[id].quantity > 1) {
                cart[id].quantity--;
                allQty--;
                totalQty.innerText = `(${allQty})`;
                updateCart();
            } else {
                delete cart[id];
                allQty--;
                totalQty.innerText = `(${allQty})`;
                updateCart();
            }
        });
    }
}
      
function updateCart() {
    miniCartProducts.innerHTML = '';
    let total = 0;
    let subTotal = 0;
    let price = 0;
    let title = "";
      
    for (const id in cart) {
        console.log(cart, cart[id], cart[id].product);
        const product = cart[id].product;
        const quantity = cart[id].quantity;
        price = cart[id].product.price;
        title = product.title;
        subTotal = price * quantity;
        total += subTotal;
    
        miniCartProducts.innerHTML +=
            `<div class="item" data-product-id="${id}">
                <h2>${title}</h2>
                <p>Price: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)}</p>
                <p>Subtotal: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subTotal)}</p>
                <button class="increase-button" data-product-id="${id}"> + </button> 
                <span class="quantity">${quantity}</span>
                <button class="decrease-button" data-product-id="${id}"> - </button> 
                <hr>
            </div>`;
    }    
      
    miniCartTotal.textContent = `Total: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(total)}`;
    increaseAmount();
    decreaseAmount();
}
      

miniCartButton.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})

miniCartClose.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})
