// Gonna add by own 
let total_price_get = JSON.parse(localStorage.getItem("total_price_storage")) || []
console.log(total_price_get)
let product_image = JSON.parse(localStorage.getItem("product_arr")) || [];

console.log(product_image[0])
let price = document.querySelector(".price")
price.innerText = total_price_get

// render the products to the page 