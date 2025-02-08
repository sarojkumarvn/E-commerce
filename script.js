const productsParentDiv = document.querySelector(".items");
const allProductsBtn = document.querySelector("#all-products-btn");
const productsLoader = document.querySelector(".products-loader");

let isAllProductsOpen = false;

let _productsData = [];
getAllProductsData().then(() => {
  renderProductsFn();
});

async function getAllProductsData() {
  try {
    productsLoader.style.display = "block";
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    _productsData.push(...data);
    productsLoader.style.display = "none";
  } catch (error) {
    console.log(error);
  }
}

function renderProductsFn() {
  const productsHTML = _productsData.map((elem, index) => {
    if (index > 3 && !isAllProductsOpen) {
      return "";
    }

    return `  <div class="card">
          <img src="${elem.image}" alt="Smartphone Icon" />
           <h2>${elem.title}</h2>
           <p>${elem.description.slice(0, 100)}...</p>
           <div class="price">${elem.price}</div>
           <button>Add to Cart</button>
         </div>
    `;
  });

  productsParentDiv.innerHTML = productsHTML.join("");
}

allProductsBtn.addEventListener("click", () => {
  isAllProductsOpen = !isAllProductsOpen;

  if (isAllProductsOpen) {
    allProductsBtn.textContent = "Show Less";
  } else {
    allProductsBtn.textContent = "All Products";
  }
  console.log(isAllProductsOpen);
  renderProductsFn();
});
