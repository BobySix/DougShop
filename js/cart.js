let carts = document.querySelectorAll('.add-cart');

let products = [{
        name: 'Camisa Nike Corinthians II 2021/22',
        tag: 'camisaNike',
        price: 249,
        inCart: 0
    },

    {
        name: 'AirJordan 1 - OG',
        tag: 'tenisNike',
        price: 1.000,
        inCart: 0
    },

    {
        name: 'Camiseta Nike Liverpool II 2021/22',
        tag: 'camisaNike2',
        price: 299.99,
        inCart: 0
    },
]

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if (productNumbers) {
        document.querySelectorAll('.cart span').textContent = productNumbers;
        productNumbers;
    }
}

function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        // document.querySelectorAll('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        // document.querySelectorAll('.cart span').textContent = 1;
    }

    setItems(product);
}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }
        }
        cartItems[product.tag].inCart += 1;
    } else {
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems))
}

function totalCost(product) {
    // console.log('aaaaa', product.price);
    let cartCost = localStorage.getItem('totalCost');

    console.log('AAA', cartCost);
    console.log(typeof cartCost);

    if (cartCost != null) {
        cartCost = parseFloat(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }
}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector('.products');
    let cartCost = localStorage.getItem('totalCost');

    console.log(cartItems);
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <div class="product">
                    <i class="fas fa-times-circle"></i>
                    <img src="./img/${item.tag}.jpg">
                    <span>${item.name}M</span>
                </div>

                <div class="price">R$ ${item.price},00</div>

                <div class="quantity">
                    <i class="fas fa-arrow-circle-left"></i>
                    <span>${item.inCart}</span>
                    <i class="fas fa-arrow-circle-right"></i>
                </div>

                <div class="total">
                    R$${item.inCart + item.price},00
                </div>
            `;
        });
        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Total</h4>
                <h4 class="basketTotal">R$ ${cartCost},00</h4>      
            </div> 
        `
    }
}

onLoadCartNumbers();
displayCart();