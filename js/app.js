const productContainer = document.getElementById('productContainer');
const navCategories = document.getElementById('categories');
const categoriesContent = document.getElementById('categoriesContent');
const categoriesContainer = document.getElementById('categoriesContainer');

const productInfo = document.getElementById('productInfo');
productsObject = {};

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
                productsObject = data.products;
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
                })
            })
        });
    })
    .catch(error => console.log(error));

const addToCartButtons = document.getElementsByClassName('addToCartBtn');
const miniCartButton = document.getElementById('miniCartButton');
const totalQty = document.getElementById('totalQty');
const miniCartContent = document.getElementById('miniCartContent');
const miniCartClose = document.getElementById('miniCartClose');
const miniCartProducts = document.getElementById('miniCartProducts');
const miniCartTotal = document.getElementById('miniCartTotal');

miniCartButton.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})

miniCartClose.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})
