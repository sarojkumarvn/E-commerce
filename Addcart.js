let total_price = document.querySelector(".total-price");

let total_price_storage = []; //storing the value 

document.addEventListener("DOMContentLoaded", function () {
  let parentCartItem = document.querySelector(".cart-item-secondary");
  let cart = JSON.parse(localStorage.getItem("product_arr")) || [];

  function renderCart() {
    if (cart.length === 0) {
      parentCartItem.innerHTML = "<p>Your cart is empty!</p>";
      document.querySelector(".total-price").textContent = "0.00";
      return;
    }

    parentCartItem.innerHTML = cart
      .map((elem, index) => {
        return `
                    <div class="cart-item" data-index="${index}">
                        <div class="item-image">
                            <img src="${elem.image}" alt="">
                        </div>
                        <div class="item-details">
                            <p class="item-name">${elem.title}</p>
                            <p class="item-price">${elem.price}</p>
                        </div>
                        <div class="quantity-controls">
                            <button class="quantity-btn decrease">-</button>
                            <input type="number" class="quantity-input" value="${elem.quantity}" min="1">
                            <button class="quantity-btn increase">+</button>
                        </div>
                        <div class="remove-item">
                            <i class="fas fa-trash"></i>
                        </div>
                    </div>
                `;
      })
      .join("");

    attachEventListeners();
    updateTotals();
  }

  // events of increase , decrease , remove quantity

  function attachEventListeners() {
    document.querySelectorAll(".decrease").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateQuantity(this, -1); //used to decrease the value
      });
    });

    //increasing the value
    document.querySelectorAll(".increase").forEach((btn) => {
      btn.addEventListener("click", function () {
        updateQuantity(this, 1);
      });
    });
    //removing the item
    document.querySelectorAll(".remove-item").forEach((btn) => {
      btn.addEventListener("click", function () {
        removeItem(this);
      });
    });
  }

  function updateQuantity(button, change) {
    const itemElement = button.closest(".cart-item");
    const itemIndex = itemElement.dataset.index;
    const input = itemElement.querySelector(".quantity-input");

    let newValue = parseInt(input.value) + change;
    if (newValue < 1) newValue = 1;
    input.value = newValue;

    cart[itemIndex].quantity = newValue;
    localStorage.setItem("product_arr", JSON.stringify(cart));

    updateTotals();
  }

  function removeItem(button) {
    const itemElement = button.closest(".cart-item");
    const itemIndex = itemElement.dataset.index;

    cart.splice(itemIndex, 1);
    localStorage.setItem("product_arr", JSON.stringify(cart));
    renderCart();
  }

  function updateTotals() {
    let total = 1;
    document.querySelectorAll(".cart-item").forEach((item) => {
      const price = parseFloat(item.querySelector(".item-price").textContent);
      const quantity = parseInt(item.querySelector(".quantity-input").value);
      total += price * quantity;
    });

    total_price.textContent = `${total.toFixed(1)}`;
  }

  renderCart();
});







// Adding functionalities to checkout btn

let checkout_btn = document.querySelector(".checkout-btn");

checkout_btn.addEventListener("click", (event) => {
let price = parseFloat(total_price.textContent) //converting it into a number
  if (price >= 1) {
    event.preventDefault();
    localStorage.setItem("total_price_storage", price);
 
    
    window.location.href = "payment/payment.html";
  } else {
    alert("Enter atlest one product to the cart to proceed");
  }
});
