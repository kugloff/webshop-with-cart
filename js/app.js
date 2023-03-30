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
                            button.addEventListener('click', ()=>{
                                if (cart[button.dataset.productId] === undefined) {
                                    cart[button.dataset.productId] = 1;
                                } else {
                                    cart[button.dataset.productId]++;
                                }
                                updateCart(cart, data.products);
                                allQty++;
                                totalQty.innerText = `(${allQty})`;
                            })
                        }

                            function updateCart(cart, categoryProducts) {
                                miniCartProducts.innerHTML = '';
                                let total = 0;
                              
                                for (const id in cart) {
                                  let price = categoryProducts.find(product => product.id == id).price;
                                  let productName = categoryProducts.find(product => product.id == id).title;
                                  let subTotal = price * cart[id];
                                  total += subTotal;
                                  miniCartProducts.innerHTML += `
                                    <div>
                                      <h2>${productName}</h2>
                                      <p>Price: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)}</p>
                                      <p>Subtotal: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subTotal)}</p>
                                      <button class="increase-button" data-product-id="${id}"> + </button> 
                                      <span>${cart[id]}</span>
                                      <button class="decrease-button" data-product-id="${id}"> - </button> 
                                      <hr>
                                    </div>`
                                }

                                miniCartProducts.innerHTML += `<h4> Total: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(total)}</h4>`;
                              
                                //increaseAmount();
                                //decreaseAmount();
                            }               
                            
                            const increaseButton = document.getElementsByClassName('increase-button');
                            const decreaseButton = document.getElementsByClassName('decrease-button');

                            /*function increaseAmount(){
                                for (let i = 0; i < increaseButton.length; i++) {
                                    increaseButton[i].addEventListener("click", function (event) {
                                        if (cart[event.target.dataset.productId] === undefined) {
                                        cart[event.target.dataset.productId] = 1;
                                        } else {
                                        cart[event.target.dataset.productId]++;
                                        }
                                        allQty++;
                                        totalQty.innerText = `(${allQty})`;
                                        //updateCart(cart, categoryProducts);
                                    })
                                }
                            }

                            function decreaseAmount(){
                                for (let i = 0; i < decreaseButton.length; i++) {
                                    decreaseButton[i].addEventListener("click", function (event) {
                                        if (cart[event.target.dataset.productId] <= 1) {
                                        delete cart[event.target.dataset.productId];
                                        } else {
                                        cart[event.target.dataset.productId]--;
                                        }
                                        allQty--;
                                        totalQty.innerText = `(${allQty})`;
                                        //updateCart(cart, categoryProducts);
                                    })
                                }
                            }*/
                    })
                })
        })                
    })
    .catch(error => console.log(error));
    
miniCartButton.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})

miniCartClose.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})
