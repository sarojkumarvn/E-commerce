// Accessing the first card section by object

let productParentDiv = document.querySelector(".items");
let allProductsBtn = document.querySelector("#all-products-btn");

const allProducts = [
  {
    id: 1,
    title:"Iphone 16 pro max",
    image:"iphone.jpg",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price:"$1000",
    button:"Add to Cart"
  },

  
  {  
 id: 2,
    title:"PS 5",
    image:"ps5.webp",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price:"$1000",
    button:"Add to Cart"
  },
  {  
 id: 2,
    title:"MacBookPro",
    image:"macbook.webp",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price:"$1000",
    button:"Add to Cart"
  },
  {
 id: 2,
    title:"headphones",
    image:"headphone.webp",
    description:"Lorem ipsum dolor sit amet consectetur adipisicing ...",
    price:"$1000",
    button:"Add to Cart"
  },


  {
    id: 2,
       title:"headphones",
       image:"headphone.webp",
       description:"Lorem ipsum dolor sit amet consectetur adipisicing ...",
       price:"$1000",
       button:"Add to Cart"
     },
     {
      id: 2,
         title:"headphones",
         image:"headphone.webp",
         description:"Lorem ipsum dolor sit amet consectetur adipisicing ...",
         price:"$1000",
         button:"Add to Cart"
       },

]

productParentDiv.innerHTML = allProducts.map((elem) => {
  return `<div class="product-card">
  <img src="${elem.image}" alt="Product Image"/>
  <h2>${elem.title}</h2>
  <p>${elem.description}</p>
  <h3>${elem.price}</h3>
  <button>${elem.button}</button>
  </div>`

}).join("");





//Accessing the second card section
let  secondCard  = document.querySelector(".items-second");
let loadMore = document.querySelector(".load-more");
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
if(index > 7 && !isproductsloaded){
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

// Fetch data and render once it's ready
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






































































































































































// const productsParentDiv = document.querySelector(".items");
// const allProductsBtn = document.querySelector("#all-products-btn");
// const productsLoader = document.querySelector(".products-loader");

// let isAllProductsOpen = false;

// let _productsData = [];
// getAllProductsData().then(() => {
//   renderProductsFn();
// });

// async function getAllProductsData() {
//   try {
//     productsLoader.style.display = "block";
//     const response = await fetch("https://fakestoreapi.com/products");
//     const data = await response.json();
//     _productsData.push(...data);
//     productsLoader.style.display = "none";
//   } catch (error) {
//     console.log(error);
//   }
// }

// function renderProductsFn() {
//   const productsHTML = _productsData.map((elem, index) => {
//     if (index > 3 && !isAllProductsOpen) {
//       return "";
//     }

//     return `  <div class="card">
//           <img src="${elem.image}" alt="Smartphone Icon" />
//            <h2>${elem.title}</h2>
//            <p>${elem.description.slice(0, 100)}...</p>
//            <div class="price">${elem.price}</div>
//            <button>Add to Cart</button>
//          </div>
//     `;
//   });

//   productsParentDiv.innerHTML = productsHTML.join("");
// }

// // all products button click
// allProductsBtn.addEventListener("click", () => {
//   isAllProductsOpen = !isAllProductsOpen;

//   if (isAllProductsOpen) {
//     allProductsBtn.textContent = "Show Less";
//   } else {
//     allProductsBtn.textContent = "All Products";
//   }
//   console.log(isAllProductsOpen);
//   renderProductsFn();
// });