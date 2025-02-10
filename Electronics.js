let productcardParent = document.querySelector(".product-container");

let productsList = [
  {
    id: 1,
    title: "Samsung Galaxy S25 Ultra",
    image: "image2/samsung.webp",
    description: "Looks sleek, built tough",
    price: "1,25,000",
    button: "Add to Cart",
  },
  {
    id: 2,
    title: "Vivo IQ00 13 pro",
    image: "image2/vivo1600.jpg",
    description: "Built for Rough Gaming",
    price: "50,000",
    button: "Add to Cart",
  },
  {
    id: 3,
    title: "Realme 9 Pro 5G",
    image: "image2/realme9pro.jpg",
    description: "Looks sleek, built tough",
    price: "30,000",
    button: "Add to Cart",
  },
  {
    id: 4,
    title: "Oppo Find X5 Pro",
    image: "image2/oppo.jpg",
    description: "Looks sleek, built tough",
    price: "42,000",
    button: "Add to Cart",
  },
  {
    id: 5,
    title: "I phone 15 pro max",
    image: "iphone.jpg",
    description: "Looks sleek, built tough",
    price: "80,000",
    button: "Add to Cart",
  },
  {
    id: 6,
    title: "Nothing Phone 2A",
    image: "image2/nothing2a.webp",
    description: "Looks sleek, built tough",
    price: "35000",
    button: "Add to Cart",
  },
  {
    id: 7,
    title: "Samsung Galaxy f54 ",
    image: "image2/samsungf54.jpeg",
    description: "Looks sleek, built tough",
    price: "25,000",
    button: "Add to Cart",
  },
  {
    id: 8,
    title: "Motrola Edge Fusion",
    image: "image2/MotrolaEdge.jpeg",
    description: "Looks sleek, built tough",
    price: "45,000",
    button: "Add to Cart",
  },
  {
    id: 9,
    title: "Samsung Galaxy S25 Ultra",
    image: "image2/samsung.webp",
    description: "Looks sleek, built tough",
    price: "12,000",
    button: "Add to Cart",
  },
  {
    id: 10,
    title: "Samsung Galaxy S25 Ultra",
    image: "image2/samsung.webp",
    description: "Looks sleek, built tough",
    price: "65,000",
    button: "Add to Cart",
  },
  {
    id: 11,
    title: "Samsung Galaxy S25 Ultra",
    image: "image2/samsung.webp",
    description: "Looks sleek, built tough",
    price: "42,990",
    button: "Add to Cart",
  },
  {
    id: 12,
    title: "Samsung Galaxy S25 Ultra",
    image: "image2/samsung.webp",
    description: "Looks sleek, built tough",
    price: "93,000",
    button: "Add to Cart",
  },
];

//making a function in which we can render the products

function renderSecondProducts() {
  productcardParent.innerHTML = productsList
    .map((elem) => {
      return `
      <div class="product_card_secondpage">
      <img src="${elem.image}" alt="">
      <h3>${elem.title}</h3>
      <p>${elem.description}</p>
      <div class="product-price">${elem.price}</div>
      <button>Add to cart</button>
    </div>
    `;
    })
    .join("");
}

renderSecondProducts(productsList);

let valueOptions = document.getElementById("value-options");

valueOptions.addEventListener("change", () => {
  let sortedProducts = [...productsList];

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
  
  productcardParent.innerHTML = sortedProducts
    .map((elem) => {
      return `
        <div class="product_card_secondpage">
          <img src="${elem.image}" alt="">
          <h3>${elem.title}</h3>
          <p>${elem.description}</p>
          <div class="product-price">${elem.price}</div>
          <button>Add to cart</button>
        </div>
      `;
    })
    .join(""); 
  
});
