let productcardParent = document.querySelector(".product-container");

let productsList = [
  {
    id: 1,
    title: "The Alchemist",
    image: "../books/book1.jpg",
    description: "A journey to destiny.",
    price: "499",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "The Let Them Theory",
    image: "../books/book2.jpg",
    description: "Embrace freedom and peace.",
    price: "599",
    button: "Add to Cart",
  },
  {
    id: 3,
    title: "Inner Excellence",
    image: "../books/book3.jpg",
    description: "Master your inner self.",
    price: "699",
    button: "Add to Cart",
  },
  {
    id: 4,
    title: "Iron Flame",
    image: "../books/book4.jpg",
    description: "Fantasy and thrilling adventure.",
    price: "799",
    button: "Add to Cart",
  },
  {
    id: 5,
    title: "The God Of The Woods",
    image: "../books/book5.jpg",
    description: "Mysterious and intriguing tale.",
    price: "899",
    button: "Add to Cart",
  },
  {
    id: 6,
    title: "Sunrise On The Reaping",
    image: "../books/book6.jpg",
    description: "Epic and inspiring story.",
    price: "549",
    button: "Add to Cart",
  },
  {
    id: 7,
    title: "The Crash",
    image: "../books/book7.jpg",
    description: "A thrilling economic tale.",
    price: "649",
    button: "Add to Cart",
  },
  {
    id: 8,
    title: "The Holy Quran",
    image: "../books/book8.jpg",
    description: "Sacred and spiritual guide.",
    price: "999",
    button: "Add to Cart",
  },
  {
    id: 9,
    title: "The Awe Of God",
    image: "../books/book9.jpg",
    description: "Discover divine presence.",
    price: "799",
    button: "Add to Cart",
  },
  {
    id: 10,
    title: "Girl Moments",
    image: "../books/book10.jpg",
    description: "Empowering and heartfelt read.",
    price: "699",
    button: "Add to Cart",
  },
  {
    id: 11,
    title: "The Perceptual Concept",
    image: "../books/book14.jpg",
    description: "Unlock deeper understanding.",
    price: "899",
    button: "Add to Cart",
  },
  {
    id: 12,
    title: "1984 George Orwell",
    image: "../books/book12.jpg",
    description: "A dystopian classic.",
    price: "499",
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