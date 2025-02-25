// Retrieve total price from localStorage
let total_price_get = JSON.parse(localStorage.getItem("total_price_storage")) || 0;

// Update order summary values
let subtotal = document.querySelector(".subtotal");
subtotal.textContent = "₹" + total_price_get;

let tax = document.querySelector(".tax");
tax.textContent = "₹" + (total_price_get * 0.18).toFixed(2);

let totalPrice = document.querySelector(".total_price");
totalPrice.textContent = "₹" + (total_price_get + (total_price_get * 0.18)).toFixed(2);

// Update pay button text
let payBtn = document.querySelector(".pay-button");
payBtn.textContent = "Pay ₹" + (total_price_get + (total_price_get * 0.18)).toFixed(2);

// Select form fields
let cardNumberInput = document.querySelector(".input-field[placeholder='4242 4242 4242 4242']");
let expiryInput = document.querySelector(".input-field[placeholder='MM/YY']");
let cvvInput = document.querySelector(".input-field[placeholder='CVV']");
let nameInput = document.querySelector(".input-field[placeholder='John Doe']");
let paymentForm = document.getElementById("payment-form");

let paymentSuccess = false; // Track if payment is successful

// Custom Alert Show/Hide Functions
function showAlert(message) {
    const alertContainer = document.getElementById("custom-alert");
    const alertMessage = document.getElementById("alert-message");
    alertMessage.textContent = message;
    alertContainer.style.display = "flex";

    const closeButton = document.getElementById("close-alert");
    closeButton.addEventListener("click", () => {
        alertContainer.style.display = "none";
        if (message === "Order placed successfully!") {
            clearForm();
            window.location.href = "../index.html";
        } 
    });
}

// Track Order Button Functionality
document.getElementById("track-order").addEventListener("click", () => {
    if (paymentSuccess) {
        window.location.href = "../track/track.html";
    } else {
        showAlert("Please complete the payment first before tracking your order.");
    }
});

// Format card number (max 16 digits, auto space every 4 digits)
cardNumberInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 16) value = value.slice(0, 16);
    e.target.value = value.replace(/(\d{4})/g, "$1 ").trim();
});

// Validate expiry date (format MM/YY)
expiryInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 4) value = value.slice(0, 4);
    if (value.length >= 3) {
        value = value.slice(0, 2) + "/" + value.slice(2);
    }
    e.target.value = value;
});

// Validate CVV (only 3 digits)
cvvInput.addEventListener("input", function (e) {
    let value = e.target.value.replace(/\D/g, "");
    e.target.value = value.slice(0, 3);
});

// Form submission validation
paymentForm.addEventListener("submit", function (e) {
    e.preventDefault();
    
    let cardNumber = cardNumberInput.value.replace(/\s/g, "");
    let expiryDate = expiryInput.value;
    let cvv = cvvInput.value;
    let nameValue = nameInput.value;

    // Validate name (no numbers allowed)
    if (/\d/.test(nameValue)) {
        showAlert("Invalid Name! It should not contain numbers.");
        return;
    }

    // Validate card number (must be 16 digits)
    if (cardNumber.length !== 16) {
        showAlert("Invalid Card Number! Must be 16 digits.");
        return;
    }

    // Validate expiry date (MM/YY format)
    let expiryParts = expiryDate.split("/");
    let month = parseInt(expiryParts[0], 10);
    let year = parseInt(expiryParts[1], 10) + 2000;
    let currentYear = new Date().getFullYear();
    let currentMonth = new Date().getMonth() + 1;

    if (
        expiryParts.length !== 2 ||
        isNaN(month) || isNaN(year) ||
        month < 1 || month > 12 ||
        year < currentYear || (year === currentYear && month < currentMonth)
    ) {
        showAlert("Invalid Expiration Date! Use MM/YY format.");
        return;
    }

    // Validate CVV (must be 3 digits)
    if (cvv.length !== 3) {
        showAlert("Invalid CVV! Must be 3 digits.");
        return;
    }

    // If all validations pass
    paymentSuccess = true;
    showAlert("Order placed successfully!");
    
});

// Clear form and reset values after successful payment
function clearForm() {
    localStorage.setItem("total_price_storage", JSON.stringify(0));
    subtotal.textContent = "₹0.00";
    tax.textContent = "₹0.00";
    totalPrice.textContent = "₹0.00";
    payBtn.textContent = "Pay ₹0.00";

    cardNumberInput.value = "";
    expiryInput.value = "";
    cvvInput.value = "";
    nameInput.value = "";
}
