// Accessing the first card section by object

let productParentDiv = document.querySelector(".items");
let allProductsBtn = document.querySelector("#all-products-btn");
let loadMore = document.querySelector(".load-more");
let isAllProductsOpen = false;

const allProducts = [
  {
    id: 1,
    title: "iPhone 16 Pro Max",
    image: "iphone.jpg",
    description: "A18 Bionic, 6.9-inch OLED, triple-camera, LiDAR...",
    price: "199999",
    button: "Buy now",
  },

  {
    id: 2,
    title: "PlayStation 5 Limited Edition",
    image: "ps5.webp",
    description: "4K gaming, DualSense, ultra-fast SSD, 2TB storage...",
    price: "95000",
    button: "Buy now",
  },
  
  {
    id: 3,
    title: "MacBook Pro M4 Max",
    image: "macbook.webp",
    description: "16-inch Retina, M4 Max chip, 38-core GPU, pro-grade...",
    price: "289999",
    button: "Buy now",
  },

  {
    id: 4,
    title: "Bose QuietComfort Ultra Headphones",
    image: "headphone.webp",
    description: "Premium noise cancellation, spatial audio, 40-hour battery...",
    price: "75000",
    button: "Buy now",
  },

  {
    id: 5,
    title: "Gaming Console Elite X",
    image: "gamingconsole.jpg",
    description: "8K gaming, ray tracing, ultra-high refresh rate...",
    price: "120000",
    button: "Buy now",
  },

  {
    id: 6,
    title: "Razer Enforcer Gaming Chair",
    image: "gamingchair.jpg",
    description: "Ergonomic design, memory foam, premium leather, lumbar support...",
    price: "45000",
    button: "Buy now",
  },

  {
    id: 7,
    title: "Logitech G Pro X Superlight Mouse",
    image: "gamingmouse.jpg",
    description: "Ultra-lightweight, HERO 25K sensor, zero lag, RGB lighting...",
    price: "35000",
    button: "Buy now",
  },

  {
    id: 8,
    title: "Apple Mac Studio M4 Ultra",
    image: "macos.jpg",
    description: "M4 Ultra chip, 8TB storage, pro performance, compact design...",
    price: "650000",
    button: "Buy now",
  },
];

function renderProducts() {
  productParentDiv.innerHTML = allProducts
    .map((elem, index) => {
      if (index > 3 && !isAllProductsOpen) {
        return "";
      }
      return `<div class="product-card">
  <img src="${elem.image}" alt="Product Image"/>
  <h2>${elem.title}</h2>
  <p>${elem.description}</p>
  <h3>₹${elem.price}</h3>
  <button class="buy_now" item_index="${index}">${elem.button}</button>
  </div>`;
    })
    .join("");
}

renderProducts(); //we access 3 elemnts in render products when teh allproducts open button is true

let product_arr = []; // creating an empty array
function storeProductIndex(elem, index) {
  let productIndex = elem.target.getAttribute("item_index");
  let product = allProducts[productIndex];
  product_arr.push({
    title: product.title,
    image: product.image,
    price: product.price,
  });
  let indexProductStore = JSON.stringify(product_arr);
  localStorage.setItem("product_arr", indexProductStore);
  console.log(product_arr);
  alert("Product added to cart");
  window.location.href = "addcart.html"; //to be sorted 
}

// accessing all the buy buttons and adding event listener
document.querySelectorAll(".buy_now").forEach((btn) => {
  btn.addEventListener("click", storeProductIndex);
});

allProductsBtn.addEventListener("click", () => {
  isAllProductsOpen = !isAllProductsOpen;
  renderProducts();

  if (!isAllProductsOpen) {
    allProductsBtn.textContent = "Load More Products";
  } else {
    allProductsBtn.textContent = "Hide Products";
    document.querySelectorAll(".buy_now").forEach((btn) => {
      btn.addEventListener("click", storeProductIndex);
    });
  }
});

//Accessing the second card section
let secondCard = document.querySelector(".items-second");
let isproductsloaded = false;

let _secondProductsData = []; // to store the data of the second card section as an array

async function getallsecondProducts() {
  try {
    let response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    _secondProductsData = data; // Assign the fetched data to the array instead of pushing
  } catch (error) {
    console.log(error);
  }
}

function renderSecondProductsFn() {
  const secondProductsHTML = _secondProductsData.map((e, index) => {
    if (index > 3 && !isproductsloaded) {
      return "";
    }
    return ` <div class="card-second">
    <img src="${e.image}" alt="Product Image" />
    <h2>${e.title}</h2>
          <p>${e.description.slice(0, 100)}...</p>
         
           <div class="price">₹${Math.floor(e.price * 86)}</div>
           <button class="buy_now_second" second_item_index="${index}">Buy now</button>
         </div>
    `;
  });

  secondCard.innerHTML = secondProductsHTML.join("");
}

// Store selected products in localStorage
let product_arr_second = [];

function storeProductIndexSecond(event) {
  if (event.target.classList.contains("buy_now_second")) {
    let productIndex = event.target.getAttribute("second_item_index");
    if (productIndex !== null) {
      let product = _secondProductsData[productIndex];

      product_arr_second.push({
        title: product.title,
        image: product.image,
        price: Math.floor(product.price * 86), //dollar to indian currency and to remove point
      });

      localStorage.setItem("product_arr", JSON.stringify(product_arr_second));

      console.log("Added to Cart:", product_arr_second);

      alert("Product added to cart");
      window.location.href = "addcart.html"; //to be sorted 
    }
  }
}

// Use event delegation for dynamically created buttons
secondCard.addEventListener("click", storeProductIndexSecond);

getallsecondProducts().then(() => {
  renderSecondProductsFn();
});

// Load more button click event
loadMore.addEventListener("click", (event) => {
  event.preventDefault();

  isproductsloaded = !isproductsloaded; // Toggle state

  if (isproductsloaded) {
    loadMore.textContent = "Show Less";
  } else {
    loadMore.textContent = "Load More";
  }

  renderSecondProductsFn();
});

//accessing the submit button and email input
let email_input = document.querySelector("#email-input");
let submit_button = document.querySelector("#submit-btn");

//adding event listener to submit button
submit_button.addEventListener("click", (event) => {
  event.preventDefault();
  if (email_input.value === "") {
    alert("Enter your email first");
  } else {
    alert(`Successfully resistered to ${email_input.value}`);
    email_input.value = "";
  }
});

// REDIRECTING THE PAGES
let btn_electronics = document.querySelector(".electronics");

btn_electronics.addEventListener("click", redirectPage); //redirecting into the electronics page
// to redirect the pages
function redirectPage(event) {
  event.preventDefault();
  window.location.href = "Electronics.html";
}

// REDIRECTING HOME AND DECOR ITEM SECTION
let home = document.querySelector(".decor");
home.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "home/home.html";
});
// REDIRECTING TO THE FASHION PAGE
let clothing = document.querySelector(".clothing");
clothing.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "fashion/fashion.html";
});

// REDIRECTING TO THE SPORTS PAGE
let sports = document.querySelector(".sports");
sports.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "sports/sport.html";
});

// REDIRECTING TO THE BOOKS PAGE
let books = document.querySelector(".books");
books.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "books/book.html";
});

// REDIRECTING TO THE BEAUTY PAGE
let beauty = document.querySelector(".beauty");
beauty.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "beauty/beauty.html";
});



























//redirecting when the sign in button is clicked

let sign_in = document.querySelector(".sign_in");

if (localStorage.getItem("usersignedup") === "true") {
sign_in.textContent = "Sign Out";


} else {
  sign_in.textContent = "Sign In";
}

sign_in.addEventListener("click", (event) => {
 event.preventDefault();

 if(localStorage.getItem("usersignedup") === "true"){
localStorage.removeItem("usersignedup");
sign_in.textContent = "Sign In";
alert("You have been signed out || click here to sign in to continue")

}

window.location.href = "../registration.html"; //to be sorted 

})























// ACCESSIGN THE CONTACT FORM
let contact_form = document.querySelector(".contact-form");

contact_form.addEventListener("submit", (event) => {
    event.preventDefault(); 

    let fromname = document.getElementById("firstName").value;
    let emailid = document.getElementById("email").value;
    let message_box = document.getElementById("message").value;

    function sendMail() {
        var params = {
            from_name: fromname,
            email_id: emailid,
            message: message_box,
        };

        emailjs.send("service_e02789u", "template_23pg0lq", params)
            .then(function (res) {
                alert("Your message has been sent. We will get back to you soon. Status: " + res.status);
                contact_form.reset();
            })
            .catch(function (err) {
                alert("Failed to send message. Error: " + err);
                console.error("EmailJS Error:", err);
            });
    }

    sendMail();
});


let shopBtn = document.querySelector(".shop_btn");
shopBtn.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../underprocess/underprocess.html";
 
})

let exploreBtn = document.querySelector(".explore_btn");

exploreBtn.addEventListener("click", (event) => {
 event.preventDefault();
 window.location.href = "../underprocess/underprocess2.html";

});