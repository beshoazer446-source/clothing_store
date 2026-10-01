let allProducts = [];
fetch("product.json")
  .then((Response) => Response.json())
  .then((data) => {
    allProducts = data;
    renderProducts(allProducts);
  });
function renderProducts(products) {
  let productsGrid = document.getElementById("products-grid");
  productsGrid.innerHTML = "";
  products.forEach((element) => {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    let sizeOptions = element.sizes
      .map((size) => `<option value="${size}">${size}</option>`)
      .join("");

    productCard.innerHTML = `
        <img src="${element.image}" alt = "${element.name}">
        <div class="product-info">
        <h4>${element.name}</h4>
        <div class="product-price">${element.price} ج.م</div>
        <select>${sizeOptions}</select>
        <button class = "btn btn-gold">اضف للسله</button>
        </div>
        `;
    productsGrid.appendChild(productCard);

    let sizeSelect = productCard.querySelector("select");
    let addBtn = productCard.querySelector("button");
    addBtn.addEventListener("click", () => {
      // console.log(sizeSelect.value, element.name)
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      let existing = cart.find(
        (item) => item.id === element.id && item.size === sizeSelect.value,
      );
      if(existing){
        existing.qty += 1;
      }else{
      let detailsProduct = {
        id: element.id,
        name: element.name,
        price: element.price,
        size: sizeSelect.value,
        qty: 1,
      };
      cart.push(detailsProduct);
    }


      localStorage.setItem("cart", JSON.stringify(cart));
      // console.log(JSON.parse(localStorage.getItem("cart")));
      addBtn.textContent = "تم الاضافه للسله ✓";
      setTimeout(() => {
        addBtn.textContent = "اضف للسله";
      }, 1000);
    });
  });
}
function applyFilters() {
  let checkedCategories = Array.from(
    document.querySelectorAll(".category-filter:checked"),
  ).map((checkbox) => checkbox.value);
  // console.log(checkedCategories);
  let minPrice = Number(document.getElementById("min-price").value) || 0;
  let maxPriceInput = document.getElementById("max-price").value;
  let maxPrice = maxPriceInput ? Number(maxPriceInput) : Infinity;
  let filtered = allProducts.filter((product) => {
    let matchesCategory = checkedCategories.includes(product.category);
    let matchesPrice = product.price >= minPrice && product.price <= maxPrice;
    return matchesCategory && matchesPrice;
  });
  renderProducts(filtered);
}

document.querySelectorAll(".category-filter").forEach((checkbox) => {
  checkbox.addEventListener("change", applyFilters);
});
document.getElementById("min-price").addEventListener("input", applyFilters);
document.getElementById("max-price").addEventListener("input", applyFilters);
