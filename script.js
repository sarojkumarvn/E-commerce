// Accessing the first card section by object

let productParentDiv = document.querySelector(".items");
let allProductsBtn = document.querySelector("#all-products-btn");
let loadMore = document.querySelector(".load-more");
let isAllProductsOpen = false ;

const allProducts = [
  {
    id: 1,
    title: "Iphone 16 pro max",
    image: "iphone.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },

  {
    id: 2,
    title: "PS 5",
    image: "ps5.webp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "MacBookPro",
    image: "macbook.webp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "headphones",
    image: "headphone.webp",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },

  {
    id: 2,
    title: "Gaming console",
    image: "gamingconsole.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Gaming chair",
    image: "gamingchair.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Gaming chair",
    image: "gamingchair.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Gaming chair",
    image: "gamingchair.jpg",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price: "$1000",
    button: "Add to Cart",
  },
];
function renderProducts() {
  productParentDiv.innerHTML = allProducts
    .map((elem, index) => {
      if (index > 3 && isAllProductsOpen) {
        return "";
      }
      return `<div class="product-card">
  <img src="${elem.image}" alt="Product Image"/>
  <h2>${elem.title}</h2>
  <p>${elem.description}</p>
  <h3>${elem.price}</h3>
  <button>${elem.button}</button>
  </div>`;
    })
    .join("");
}

renderProducts(); //we access 3 elemnts in render products when teh allproducts open button is true

allProductsBtn.addEventListener("click", () => {
  isAllProductsOpen = !isAllProductsOpen;
  renderProducts();

  if (!isAllProductsOpen) {
    allProductsBtn.textContent = "Load More Products";
  } else {
    allProductsBtn.textContent = "Hide Products";
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
    if (index > 7 && !isproductsloaded) {
      return "";
    }
    return ` <div class="card-second">
    <img src="${e.image}" alt="Product Image" />
    <h2>${e.title}</h2>
          <p>${e.description.slice(0, 100)}...</p>
           <div class="price">$${e.price}</div>
           <button>Add to Cart</button>
         </div>
    `;
  });

  secondCard.innerHTML = secondProductsHTML.join("");
}


getallsecondProducts().then(() => {
  renderSecondProductsFn();
});

// Load more button click event
loadMore.addEventListener("click", () => {
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
submit_button.addEventListener("click", () => {
  if (email_input.value === "") {
    alert("Enter your email first");
  } else {
    alert(`Successfully resistered to ${email_input.value}`);
  }
});

let btn_electronics = document.querySelector(".electronics");


btn_electronics.addEventListener("click",()=>{
  console.log("clicked")
})

btn_electronics.addEventListener("click", redirectPage); //redirecting into the electronics page
// to redirect the pages
function redirectPage(event) {
  event.preventDefault();
  window.location.href = "Electronics.html";
}



//redirecting when the sign in button is clicked
let sign_in = document.querySelector(".sign_in")

sign_in.addEventListener("click",(event)=>{
event.preventDefault()
window.location.href = "login.html"
})