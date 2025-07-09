document.addEventListener('DOMContentLoaded', function () {
  let cart = JSON.parse(localStorage.getItem('amobCart')) || [];

  const cartCountEl = document.querySelector('.cart-count');
  const openCartBtn = document.getElementById('openCart');
  const cartModal = document.getElementById('cartModal');
  const closeCartBtn = document.querySelector('.close');
  const cartItemsEl = document.getElementById('cartItems');
  const cartTotalEl = document.getElementById('cartTotal');
  const emptyCartEl = document.getElementById('emptyCart');
  const notificationEl = document.getElementById('notification');
  const addToCartBtns = document.querySelectorAll('.add-to-cart');

  function updateCartCount() {
    const total = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartCountEl.textContent = total;
  }

  function saveCart() {
    localStorage.setItem('amobCart', JSON.stringify(cart));
  }

  function addToCart(id, name, price) {
    const item = cart.find(item => item.id === id);
    if (item) item.quantity++;
    else cart.push({ id, name, price: parseFloat(price), quantity: 1 });
    saveCart();
    updateCartCount();
    showNotification(`${name} added to cart`);
  }

  function renderCart() {
    cartItemsEl.innerHTML = '';
    if (cart.length === 0) {
      emptyCartEl.style.display = 'block';
      return;
    }
    emptyCartEl.style.display = 'none';

    cart.forEach(item => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${item.name}</td>
        <td>$${item.price.toFixed(2)}</td>
        <td><input type="number" min="1" value="${item.quantity}" class="quantity-input" data-id="${item.id}"></td>
        <td>$${(item.price * item.quantity).toFixed(2)}</td>
        <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
      `;
      cartItemsEl.appendChild(row);
    });

    cartTotalEl.textContent = cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);

    document.querySelectorAll('.quantity-input').forEach(input => {
      input.addEventListener('change', function () {
        const item = cart.find(i => i.id === this.dataset.id);
        if (item) {
          item.quantity = parseInt(this.value);
          if (item.quantity <= 0) cart = cart.filter(i => i.id !== item.id);
          saveCart();
          renderCart();
          updateCartCount();
        }
      });
    });

    document.querySelectorAll('.remove-item').forEach(btn => {
      btn.addEventListener('click', function () {
        cart = cart.filter(i => i.id !== this.dataset.id);
        saveCart();
        renderCart();
        updateCartCount();
      });
    });
  }

  function showNotification(message) {
    notificationEl.textContent = message;
    notificationEl.style.display = 'block';
    setTimeout(() => (notificationEl.style.display = 'none'), 3000);
  }

  addToCartBtns.forEach(btn =>
    btn.addEventListener('click', () =>
      addToCart(btn.dataset.id, btn.dataset.name, btn.dataset.price)
    )
  );

  openCartBtn.addEventListener('click', e => {
    e.preventDefault();
    cartModal.style.display = 'block';
    renderCart();
  });

  closeCartBtn.addEventListener('click', () => {
    cartModal.style.display = 'none';
  });

  window.addEventListener('click', e => {
    if (e.target === cartModal) {
      cartModal.style.display = 'none';
    }
  });

  updateCartCount();
});
