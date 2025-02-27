let productcardParent = document.querySelector(".product-container");

let productsList = [
  {
    id: 1,
    title: "Samsung Galaxy S25",
    image: "image2/samsung.webp",
    description: "Flagship performance, stunning design",
    price: "135000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Vivo IQOO 13 Pro",
    image: "image2/vivo1600.jpg",
    description: "Ultimate gaming beast with power",
    price: "60000",
    button: "Add to Cart",
  },
  {
    id: 3,
    title: "Realme 9 Pro 5G",
    image: "image2/realme9pro.jpg",
    description: "Powerful mid-range 5G experience",
    price: "35000",
    button: "Add to Cart",
  },
  {
    id: 4,
    title: "Oppo Find X5 Pro",
    image: "image2/oppo.jpg",
    description: "Premium design with flagship camera",
    price: "95000",
    button: "Add to Cart",
  },
  {
    id: 5,
    title: "iPhone 15 Pro Max",
    image: "iphone.jpg",
    description: "Apple's best with pro features",
    price: "160000",
    button: "Add to Cart",
  },
  {
    id: 6,
    title: "Nothing Phone 2A",
    image: "image2/nothing2a.webp",
    description: "Minimalist design with smooth performance",
    price: "38000",
    button: "Add to Cart",
  },
  {
    id: 7,
    title: "Samsung Galaxy F54",
    image: "image2/samsungf54.jpeg",
    description: "Long battery with stunning display",
    price: "28000",
    button: "Add to Cart",
  },
  {
    id: 8,
    title: "Motorola Edge Fusion",
    image: "image2/MotrolaEdge.jpeg",
    description: "Sleek design with smooth performance",
    price: "48000",
    button: "Add to Cart",
  },
  {
    id: 9,
    title: "OnePlus Nord",
    image: "image2/oneplusnord.jpg",
    description: "Affordable 5G with smooth UI",
    price: "25000",
    button: "Add to Cart",
  },
  {
    id: 10,
    title: "Realme 12 Pro 5G",
    image: "image2/realme12pro.jpg",
    description: "Flagship-level camera and performance",
    price: "70000",
    button: "Add to Cart",
  },
  {
    id: 11,
    title: "Asus ROG Phone 6",
    image: "image2/rogphone6.jpg",
    description: "Ultimate gaming phone with cooling",
    price: "55000",
    button: "Add to Cart",
  },
  {
    id: 12,
    title: "Motorola Fusion pro",
    image: "image2/motrolaedge50.jpg",
    description: "Stylish design with great battery",
    price: "98000",
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
window.location.href = "index.html" //to be sorted 
})


// redirecting to the cart section
let gotocart = document.querySelector(".go-to-cart");
gotocart.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "addcart.html";

});








