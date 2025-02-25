let productcardParent = document.querySelector(".product-container");

let productsList = [
  {
    id: 1,
    title: "Herbal Face Toner",
    image: "../beauty/beauty1.jpg",
    description: "Refreshes and hydrates skin",
    price: "1200",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Green Tea Serum",
    image: "../beauty/beauty2.jpg",
    description: "Nourishes and brightens skin",
    price: "1800",
    button: "Add to Cart",
  },
  {
    id: 3,
    title: "Matte Liquid Foundation",
    image: "../beauty/beauty3.jpg",
    description: "Flawless matte finish",
    price: "2200",
    button: "Add to Cart",
  },
  {
    id: 4,
    title: "Waterproof Mascara",
    image: "../beauty/beauty4.jpg",
    description: "Long-lasting voluminous lashes",
    price: "1500",
    button: "Add to Cart",
  },
  {
    id: 5,
    title: "Lip Hydration Set",
    image: "../beauty/beauty5.jpg",
    description: "Soft and plump lips",
    price: "2500",
    button: "Add to Cart",
  },
  {
    id: 6,
    title: "Volumizing Mascara",
    image: "../beauty/beauty6.jpg",
    description: "Fuller and lifted lashes",
    price: "1700",
    button: "Add to Cart",
  },
  {
    id: 7,
    title: "Curling Mascara",
    image: "../beauty/beauty7.jpg",
    description: "Dramatic curled lashes",
    price: "1600",
    button: "Add to Cart",
  },
  {
    id: 8,
    title: "Hydrating Baby Serum",
    image: "../beauty/beauty12.jpg",
    description: "Deep moisture and glow",
    price: "2800",
    button: "Add to Cart",
  },
  {
    id: 9,
    title: "Glossy Lip Tint",
    image: "../beauty/beauty9.jpg",
    description: "Natural shine and color",
    price: "1300",
    button: "Add to Cart",
  },
  {
    id: 10,
    title: "Peach Blush Compact",
    image: "../beauty/beauty10.jpg",
    description: "Radiant peachy glow",
    price: "2000",
    button: "Add to Cart",
  },
  {
    id: 11,
    title: "Complete Skincare Kit",
    image: "../beauty/beauty11.jpg",
    description: "Essential skincare essentials",
    price: "5000",
    button: "Add to Cart",
  },
  {
    id: 12,
    title: "Herbal Face Serum",
    image: "../beauty/beauty12.jpg",
    description: "Soothes and rejuvenates skin",
    price: "3000",
    button: "Add to Cart",
  },
];

//making a function in which we can render the products
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

renderSecondProducts(productsList); //rendering the products

let valueOptions = document.getElementById("value-options");

valueOptions.addEventListener("change", () => {
  let sortedProducts = [...productsList]; //adding productlist to sortedproducts

  if (valueOptions.value === "default") {
    renderSecondProducts(); // Ensure this function properly restores the original layout
    alert("Select Low to High or High to Low to sort the products");
    return; // stping our execution here
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

  productcardParent.innerHTML = sortedProducts // Storing the sorted products into the prent-card of product
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
});

//adding eventlistener to each add-to-cart button



let product_arr = []
document.addEventListener("DOMContentLoaded", function () {

  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      let productIndex = event.target.getAttribute("product_index"); //targeting product index
      let product = productsList[productIndex];
      product_arr.push({
        title: product.title,
        image: product.image,
        price: product.price,
      });
      let storedValue = JSON.stringify(product_arr);
      localStorage.setItem("product_arr", storedValue);
      console.log(product_arr)
      renderCartListProducts() // calling the render-product when the button click  
    });
  });
});




// added a new ass-to-cart and store system
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

renderCartListProducts()


// redirecting to the cart section
let gotocart = document.querySelector(".go-to-cart");
gotocart.addEventListener("click", (event) => {
  event.preventDefault();
  window.location.href = "../addcart.html";

});