let productcardParent = document.querySelector(".product-container");

let productsList = [
  {
    id: 1,
    title: "Skipping Rope",
    image: "../sports/sport1.jpg",
    description: "Durable and fast-speed rope.",
    price: "750",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Wrist Band",
    image: "../sports/sport2.jpg",
    description: "Sweat-absorbent ",
    price: "250",
    button: "Add to Cart",
  },
  {
    id: 3,
    title: "Back Supporter",
    image: "../sports/sport3.jpg",
    description: "E comfortable support.",
    price: "1500",
    button: "Add to Cart",
  },
  {
    id: 4,
    title: "Basketball",
    image: "../sports/sport4.jpg",
    description: "High-quality, Best grip ball.",
    price: "1200",
    button: "Add to Cart",
  },
  {
    id: 5,
    title: "Headband",
    image: "../sports/sport14.jpg",
    description: "Stylish and sweat-resistant.",
    price: "300",
    button: "Add to Cart",
  },
  {
    id: 6,
    title: "Arm Band",
    image: "../sports/sport6.jpg",
    description: "Flexible and durable fit.",
    price: "450",
    button: "Add to Cart",
  },
  {
    id: 7,
    title: "Sports Webcam",
    image: "../sports/sport7.jpg",
    description: "HD quality sports recording.",
    price: "4500",
    button: "Add to Cart",
  },
  {
    id: 8,
    title: "Speed Tracker",
    image: "../sports/sport8.jpg",
    description: "Accurate speed tracking device.",
    price: "5200",
    button: "Add to Cart",
  },
  {
    id: 9,
    title: "Backpack",
    image: "../sports/sport9.jpg",
    description: "Lightweight and spacious bag.",
    price: "1800",
    button: "Add to Cart",
  },
  {
    id: 10,
    title: "Basketball Net",
    image: "../sports/sport10.jpg",
    description: "Durable, all-weather net.",
    price: "2800",
    button: "Add to Cart",
  },
  {
    id: 11,
    title: "Sports Glasses",
    image: "../sports/sport11.jpg",
    description: "Anti-glare, impact-resistant glasses.",
    price: "3200",
    button: "Add to Cart",
  },
  {
    id: 12,
    title: "Pushup Board",
    image: "../sports/sport12.jpg",
    description: "Multi-position strength training.",
    price: "3600",
    button: "Add to Cart",
  },
];

//making a function in which we can render the products to the right side of the page
function renderSecondProducts() {
  productcardParent.innerHTML = productsList
    .map((elem, index) => {
      return `
      <div class="product_card_secondpage">
      <img src="${elem.image}" alt="">
      <h3>${elem.title}</h3>
      <p>${elem.description}</p>
      <div class="product-price">${elem.price}</div>
      <button class="add-to-cart" product_index = "${index}">Add to cart</button>
    </div>
    `;
    })
    .join("");
}

renderSecondProducts(productsList); //rendering the products stored in productList


//adding eventlistener to each add-to-cart button
let valueOptions = document.getElementById("value-options");
let sortedProducts = []
valueOptions.addEventListener("change", () => {
sortedProducts  = [...productsList]; //adding productlist to sortedproducts

  if (valueOptions.value === "default") {
    renderSecondProducts(); // Ensure this function properly restores the original layout
    alert("Select Low to High or High to Low to sort the products");
    return; // stopping our execution here
  }

  if (valueOptions.value === "high-to-low") {
    sortedProducts.sort(
      //sorting the products according to descending order
      (a, b) =>
        parseFloat(b.price.replace(/,/g, "")) -
        parseFloat(a.price.replace(/,/g, ""))
    );
   
  } else if (valueOptions.value === "low-to-high") {
    sortedProducts.sort(
      (a, b) =>
        parseFloat(a.price.replace(/,/g, "")) -
        parseFloat(b.price.replace(/,/g, ""))
    );

  }
  productcardParent.innerHTML = sortedProducts // Storing the sortedproducts into the prent-card of product
    .map((elem, index) => {
      // mapping and getting each element
      return `
        <div class="product_card_secondpage">
          <img src="${elem.image}" alt="">
          <h3>${elem.title}</h3>
          <p>${elem.description}</p>
          <div class="product-price">${elem.price}</div>
          <button class ="add-to-cart" product_index="${index}">Add to cart</button>
        </div>
      `;
    })
    .join("");
    attachEventListenersToAddToCart(); // attaching the function that add-to-cart going to  do
});

// we get sortedProdutcts from this above function 


//storing the product in the local storage through product_arr
let product_arr = []
function attachEventListenersToAddToCart() {
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      let productIndex = event.target.getAttribute("product_index");
     
      let product; // keeping the product empty 
      if(sortedProducts.length > 0){  //checking if there is some values in the storedProdutcs
        product = sortedProducts[productIndex];
      } else {
        product = productsList[productIndex]; // if not then run this 
      }
      product_arr.push({ //pushing the elements
        title: product.title,
        image: product.image,
        price: product.price,
      });

      localStorage.setItem("product_arr", JSON.stringify(product_arr));
      renderCartListProducts(); // Refresh cart
    });
  });
}

attachEventListenersToAddToCart();




//adding the products in to the lefy side which is used as a cart
let collectionParentDiv = document.querySelector(".left-side-items");

// here we store the products in an array and render these items into this
function renderCartListProducts() {
  collectionParentDiv.innerHTML = product_arr
    .map((elem) => {

      return `
    
    
  <div class="collection_cart_items">
    <img src="${elem.image}" alt="">
    <div class="listed_items_des">
      <p>${elem.title} </p>
      <p class="cart_item_price">${elem.price}</p>
    </div>
  </div>
    `;
    })
    .join("");
}

renderCartListProducts() //caling the function to render the producuts in the cart section

let gotohome = document.querySelector(".home")
gotohome.addEventListener("click", (event) => {
event.preventDefault()  
window.location.href = "../index.html"
})


// redirecting to the cart section
let gotocart = document.querySelector(".go-to-cart");
gotocart.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../addcart.html";

});