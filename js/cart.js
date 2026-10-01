function renderCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let cartItem = document.getElementById("cart-items");
  cartItem.innerHTML = "";
  cart.forEach((element,index) => {
    let cartDetails = document.createElement("div");
    cartDetails.className = "cart-item";
    cartDetails.innerHTML = `
    <div>
    <div>${element.name}</div>
    <div class="item-meta">المقاس: ${element.size} | الكمية: ${element.qty}</div>
    </div>
    <div>${element.price * element.qty} ج.م</div>
    <button class="btn-danger delete-btn">حذف</button>
    `;
    let deleteBtn = cartDetails.querySelector(".delete-btn")
    deleteBtn.addEventListener("click",()=>{
      cart.splice(index,1);
      localStorage.setItem("cart",JSON.stringify(cart));
      renderCart()
    });

    cartItem.appendChild(cartDetails)
  });
  let total = cart.reduce((sum,item)=>sum+(item.price * item.qty),0)
  document.getElementById("cart-total-amount").textContent = `${total} ج.م`;
}
renderCart();
