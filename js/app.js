const productContainer = document.getElementById('productContainer');
const navCategories = document.getElementById('categories');
const categoriesContent = document.getElementById('categoriesContent');
const categoriesContainer = document.getElementById('categoriesContainer');

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
                const categoryTitle = document.getElementById(`${category}`);
                categoryTitle.addEventListener('click', ()=>{
                    productContainer.innerHTML = "";
                    products = data.products;
                    data.products.forEach(product => {
                        productContainer.innerHTML +=
                        `<div>${product.title}</div>`
                    })
                })
            })
        });
    })
    .catch(error => console.log(error));

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