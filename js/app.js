const navCategories = document.getElementById('categories');
const categoriesContent = document.getElementById('categoriesContent');
const categoriesContainer = document.getElementById('categoriesContainer');

const miniCartButton = document.getElementById('miniCartButton');
const cart = {};
const totalQty = document.getElementById('totalQty');
const miniCartContent = document.getElementById('miniCartContent');
const miniCartProducts = document.getElementById('miniCartProducts');
const miniCartClose = document.getElementById('miniCartClose');
const miniCartTotal = document.getElementById('miniCartTotal');
let allQty = 0;

const productContainer = document.getElementById('productContainer');

navCategories.addEventListener('click', () => {
    categoriesContent.classList.toggle('active');
})
categoriesContent.addEventListener('mouseleave', ()=>{
    categoriesContent.classList.toggle('active');
})

productContainer.addEventListener('click', (event) =>{
    const productId = event.target.dataset.productId;
    if(event.target.classList.contains('addToCartBtn')||event.target.classList.contains('addToCartBtnProduct')){
        addToCart(productId);
    }
});

miniCartButton.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})
miniCartClose.addEventListener('click', () => {
    miniCartContent.classList.toggle('active');
})


fetch('https://dummyjson.com/products/categories')
    .then(res => res.json())
    .then(data => {
        data.forEach(category=>{
            fetch(`https://dummyjson.com/products/category/${category}`)
            .then(res => res.json())
            .then(data => {
                products = data.products;
                data.products.forEach(product => {
                    cart[product.id] = {
                        product: product,
                        quantity: 0
                    }
                })
            })
        })
    })
    .catch(error => console.log(error));
    console.log(cart)

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
                                <p class="productDesc">${product.description}</p>
                                <div class="price">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</div>
                                <button class="addToCartBtn" data-product-id="${product.id}">Add to cart</button>
                            </div>`
                        })
                    })

                    const productImages = document.getElementsByClassName('productImg');
                    for (let i = 0; i < productImages.length; i++) {
                        const product = data.products[i];
                        const productItem = productImages[i];
                        productItem.addEventListener('click', () => {
                            productContainer.innerHTML =
                            `<figure style="height=200px"><img src=${product.images[0]} alt=${product.title} class="productImg"></figure>
                            <div>
                                <h3 class="productTitle">${product.title}</h3>
                                <p class="productDesc">${product.description}</p>
                                <div class="price">${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</div>
                                <button class="addToCartBtnProduct" data-product-id="${product.id}">Add to cart</button>
                            </div>`
                        });
                    }                  
                })
        })             
    })
    .catch(error => console.log(error));

function addToCart(productId){
    if (cart[productId] && cart[productId].quantity > 0) {
        cart[productId].quantity++;
    } else {
        cart[productId] = { product: cart[productId]?.product, quantity: 1 };
    }                            
    allQty++;
    totalQty.innerText = `${allQty}`;
    updateCart();
}

function increaseAmount() {
    const increaseButton = document.getElementsByClassName('increaseButton');
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
    const decreaseButton = document.getElementsByClassName('decreaseButton');
    for (let i = 0; i < decreaseButton.length; i++) {
        decreaseButton[i].addEventListener('click', (event) => {
            const id = event.target.dataset.productId;
            if (cart[id].quantity > 1) {
                cart[id].quantity--;
                allQty--;
                totalQty.innerText = `${allQty}`;
                updateCart();
            }
            else {
                const cartItems = document.getElementsByClassName('cartItem');
                for(const cartItem of cartItems){
                    cartItem.addEventListener('click', ()=>{
                        cartItem.classList.toggle('active');
                    })
                }
                cart[id].quantity--;
                allQty--;
                totalQty.innerText = `${allQty}`;
                updateCart();
            }
        });
    }
}
      
function updateCart() {
    miniCartProducts.innerHTML = '';
    let total = 0;
    let subTotal = 0;
    let cartId;
      
    for (const id in cart) {
        cartId = cart[id];
        const product = cart[id].product;
        let quantity = cart[id].quantity;
    
        if (quantity > 0) {
            subTotal = product.price * quantity;
            total += subTotal;
    
            miniCartProducts.innerHTML +=
                `<div class="cartItem active" data-product-id="${id}">
                    <figure><img src="${product.images[0]}" alt="${product.title}"></figure>
                    <div class="cartItemDetails">
                        <h4 class="cartProductTitle">${product.title}</h4>
                        <p class="cartPrice">Price: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(product.price)}</p>
                        <p class="cartSubtotal">Subtotal: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(subTotal)}</p>
                        <span>Quantity:</span>
                        <button class="decreaseButton" data-product-id="${id}">-</button>
                        <span class="quantity">${quantity}</span>
                        <button class="increaseButton" data-product-id="${id}">+</button>
                    </div>
                </div>
                <hr>`;
        }
    }    
      
    miniCartTotal.textContent = `Total: ${new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(total)}`;
    increaseAmount();
    decreaseAmount();
}