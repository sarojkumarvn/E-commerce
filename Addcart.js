let total_price = document.querySelector(".total-price");
let parentCartItem = document.querySelector(".cart-item-secondary");

let platform_charge = 20; // fixed platform charge 
let cart = JSON.parse(localStorage.getItem("product_arr")) || []; 
document.addEventListener("DOMContentLoaded", renderCart);
console.log(cart);

function renderCart() { 
  if (cart.length === 0) { 
    parentCartItem.innerHTML = "<p>Your cart is empty!</p>"; 
    total_price.textContent = "0.00"; 
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
                <p class="item-price">₹ ${elem.price}</p>
            </div>
            <div class="quantity-controls">
                <button class="quantity-btn decrease">-</button>
                <input type="number" class="quantity-input" value="${elem.quantity || 1}" min="1">
                <button class="quantity-btn increase">+</button>
            </div>
            <div class="remove-item">
                <button class="delete_item">🚮</button>
            </div>
        </div>
      `;
    })
    .join("");

  requestAnimationFrame(() => {
    updateTotals();
  });
}

//creating event for controlling the quantity and deleting the item
parentCartItem.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.classList.contains("decrease")) { //if it contains decrease 
    updateQuantity(event.target, -1); // then update this 
  } else if (event.target.classList.contains("increase")) { 
    updateQuantity(event.target, 1);
  } else if (event.target.classList.contains("delete_item")) {
    removeItem(event.target);
  }
});

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
  let total = 0;
  document.querySelectorAll(".cart-item").forEach((item) => {
    const price = parseFloat(item.querySelector(".item-price").textContent.replace("₹ ", ""));
    const quantity = parseInt(item.querySelector(".quantity-input").value);
    total += price * quantity; 
  });

  total += platform_charge; 
  total_price.textContent = `${total.toFixed(2)}`;
  console.log("total price ", total_price.textContent);
}

renderCart();

// Accessing checkout button 
let checkout_btn = document.querySelector(".checkout-btn");

checkout_btn.addEventListener("click", (event) => {
  let price = parseFloat(total_price.textContent);
  if (price > 0) {
    event.preventDefault();
    localStorage.setItem("total_price_storage", price);
    window.location.href = "../chooseaddress/choose.html";
  } else {
    alert("Add at least one product to proceed.");
  }
});