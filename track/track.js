function toggleHelp() {
  const helpContent = document.getElementById("helpContent");
  helpContent.style.maxHeight = helpContent.style.maxHeight
    ? null
    : `${helpContent.scrollHeight}px`;
}

let orderStatuscontainer = document.querySelector(".order-status");
let cancelOrder = document.querySelector(".cancel-order");


let idOrdercanceled = localStorage.getItem("orderCancelled") === "true";


function updateOrderStatus() {
  if (idOrdercanceled) {
    orderStatuscontainer.innerHTML =
      "<h2>Order Cancelled</h2> <p>Refund will be initiated soon </p>";
    cancelOrder.textContent = "Continue Shopping";
  }
}


updateOrderStatus();

cancelOrder.addEventListener("click", (event) => {
  event.preventDefault();
  if (!idOrdercanceled) {
   
    orderStatuscontainer.innerHTML =
      "<h2>Order Cancelled</h2> <p>Refund will be initiated soon </p>";
    cancelOrder.textContent = "Continue Shopping";
    idOrdercanceled = true;
    localStorage.setItem("orderCancelled", "true"); 
  } else {
   
    localStorage.removeItem("orderCancelled"); 
    window.location.href = "../index.html";
  }
});
