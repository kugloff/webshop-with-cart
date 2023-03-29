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
const addToCartButtons = document.getElementsByClassName('addToCartBtn');

let products;
let allQty = 0;

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
                            <button class="addToCartBtn">Add to cart</button>
                        </div>`
                    })

                    let productsObject = Object.assign({}, ...data.products.map(product => ({ [product.id]: 0 })));
                    for (const button of addToCartButtons){
                        button.addEventListener('click', ()=>{
                            if ((productsObject[button.dataset.productId]) === undefined){
                                productsObject[button.dataset.productId] = 1;
                            }
                            else{
                                productsObject[button.dataset.productId]++;
                            }
                            console.log(productsObject[button.dataset.productId])
                            updateCart(productsObject, products);
                            allQty++;
                            totalQty.innerText = `(${allQty})`
                        })
                    }

                    function updateCart(productsObject, products){
                        miniCartProducts.innerHTML='';
                        let total=0;
                    
                        for(const id in productsObject){
                            console.log(productsObject)
                            let price = data.products.find(p => p.id === id).price;
                            let productName = data.products.find(p => p.id === id).title;
                            let subTotal = price * productsObject[id];
                                total += subTotal;
                                miniCartProducts.innerHTML+=
                                `<div>
                                    <h2>${productName}</h2>
                                    <p>Price: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price)}</p>
                                    <p>Subtotal: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subTotal)}</p>
                                    <button class="increase-button" data-product-id="${id}"> + </button> 
                                    <span>${productsObject[id]}</span>
                                    <button class="decrease-button" data-product-id="${id}"> - </button> 
                                    <hr>
                                </div>`
                        }
                    
                        miniCartTotal.innerHTML = `<h4> Total: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(total)}</h4>`;
                    }
                })
            })
        });
    })
    .catch(error => console.log(error));





miniCartButton.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})

miniCartClose.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})
