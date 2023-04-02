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
const productInfo = document.getElementById('productInfo');

let allQty = 0;
let cart = {};

navCategories.addEventListener('click', () => {
    categoriesContent.classList.toggle('active');
})

fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(data => {
        data.forEach(category => {
            categoriesContainer.innerHTML += 
            `<div id="${category}">${category}</div>`;

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
                                <figure style="height=200px"><img src=${product.images[0]} alt=${product.title}></figure>
                                <h3>${product.title}</h3>
                                <p>${product.description}</p>
                                <div class="price">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</div>
                                <button class="addToCartBtn" data-product-id="${product.id}">Add to cart</button>
                            </div>`
                        })

                        let addToCartButtons = document.getElementsByClassName('addToCartBtn')
                        for (const button of addToCartButtons){
                            button.addEventListener('click', () => {
                                const productId = button.dataset.productId;
                                if (cart[productId] === undefined) {
                                    cart[productId] = 1;
                                } else {
                                    cart[productId]++;
                                }
                              
                                allQty++;
                                totalQty.innerText = `(${allQty})`;
                              
                                updateCart(cart, data.products);
                            }); 
                        }
                    })
                })
        })                
    })
    .catch(error => console.log(error));
    

function updateCart(cart, categoryProducts) {
    miniCartProducts.innerHTML = '';
    let total = 0;
    let subTotal = 0;
    let price = 0;
    let title = "";

    for (const id in cart){
        for (const product of categoryProducts) {
            if (product.id == id) {
                price = product.price;
                title = product.title;
                subTotal = price * cart[id];
                total += subTotal;
                break;
            }
        }

        miniCartProducts.innerHTML += 
        `<div class="item" data-product-id="${id}">
            <h2>${title}</h2>
            <p>Price: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)}</p>
            <p>Subtotal: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subTotal)}</p>
            <button class="increase-button" data-product-id="${id}"> + </button> 
            <span class="quantity">${cart[id]}</span>
            <button class="decrease-button" data-product-id="${id}"> - </button> 
            <hr>
        </div>`;
    }

    miniCartTotal.textContent = `Total: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(total)}`;

    function increaseAmount() {
        const increaseButton = document.getElementsByClassName('increase-button');
        for (let i = 0; i < increaseButton.length; i++) {
            increaseButton[i].addEventListener('click', (event) => {
                const id = event.target.dataset.productId;
                cart[id]++;
                allQty++;
                totalQty.innerText = `(${allQty})`;
                updateCart(cart, categoryProducts);
            });
        }
    }      
      
    function decreaseAmount() {
        const decreaseButton = document.getElementsByClassName('decrease-button');
        for (let i = 0; i < decreaseButton.length; i++) {
            decreaseButton[i].addEventListener('click', (event) => {
                const id = event.target.dataset.productId;
                if (cart[id] > 1) {
                    cart[id]--;
                    allQty--;
                    totalQty.innerText = `(${allQty})`;
                    updateCart(cart, categoryProducts);
                } else {
                    delete cart[id];
                    allQty--;
                    totalQty.innerText = `(${allQty})`;
                    updateCart(cart, categoryProducts);
                }
            });
        }
    }

    increaseAmount();
    decreaseAmount();
}

miniCartButton.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})

miniCartClose.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})
