// popup.js

document.getElementById('load-products-btn').addEventListener('click', loadProducts);
document.getElementById('clear-basket-btn').addEventListener('click', clearBasket);

let basket = [];

function loadProducts() {
  fetch('http://your-backend-api-url.com/api/products')  // Replace with your backend API URL
    .then(response => response.json())
    .then(products => {
      displayProducts(products);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
    });
}

function displayProducts(products) {
  const productsUl = document.getElementById('products-ul');
  productsUl.innerHTML = '';

  products.forEach(product => {
    const li = document.createElement('li');
    li.textContent = `${product.name} - £${product.price}`;
    li.addEventListener('click', () => addToBasket(product));
    productsUl.appendChild(li);
  });
}

function addToBasket(product) {
  basket.push(product);
  updateBasketDisplay();
}

function updateBasketDisplay() {
  const basketList = document.getElementById('basket-list');
  basketList.innerHTML = '';

  basket.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - £${item.price}`;
    basketList.appendChild(li);
  });
}

function clearBasket() {
  basket = [];
  updateBasketDisplay();
}
