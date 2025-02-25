let surnameInput = document.querySelector(".surname");
let firstnameInput = document.querySelector(".firstName");
let emailInput = document.querySelector(".email");
let nationalityInput = document.querySelector(".nationality");
let addressInput = document.querySelector(".address");
let phone = document.querySelector(".phone");
let shippingForm = document.querySelector(".shipping-form");

let userdetails = [];
shippingForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (
    surnameInput.value === "" ||
    firstnameInput.value === "" ||
    emailInput.value === "" ||
    nationalityInput.value === "" ||
    addressInput.value === "" ||
    phone.value === ""
  ) {
    alert("All fields are required");
  } else {
    let userFilledDetails = {
      firstName: firstnameInput.value,
      lastName: surnameInput.value,
      email: emailInput.value,
      userAddress: addressInput.value,
      userPhone: phone.value,
      userNationality: nationalityInput.value,
    };
    userdetails.push(userFilledDetails);
    localStorage.setItem("userdetails", JSON.stringify(userdetails));
    localStorage.setItem("usersignedup" , "true")
    alert("Details added successfully || Redirecting to homepage...");
    window.location.href = "../index.html";
   
  }
});
