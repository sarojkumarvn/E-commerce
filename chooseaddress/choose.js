let addressContainer = document.querySelector(".address-container");

let userAddress = JSON.parse(localStorage.getItem("userdetails")) || [];
console.log(JSON.stringify(userAddress));

addressContainer.innerHTML = userAddress.map((user) => {
  return `
    <div class="address-card">
                    <label>
                        <input type="radio" name="address" required>
                        <div class="address-details">
                            <h3>My Address</h3>
                            <p>${user.firstName} ${user.lastName}</p>
                            <p>${user.userAddress}</p>
                            <p>${user.userNationality}</p>
                            <p>Phone: ${user.userPhone}</p>
                        </div>
                    </label>
                </div>
`;
});
const addressCards = document.querySelectorAll(".address-card");
let paymentBtn = document.querySelector(".button");
paymentBtn.addEventListener("click", (event) => {
    event.preventDefault();
    let selectedAddress = document.querySelector('input[name="address"]:checked');
      if(selectedAddress){
        window.location.href = "../payment/payment.html";
      } else {
        alert("Please select an address");
      }
})

let backBtn = document.querySelector(".back-button");
backBtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../addcart.html";
  
})