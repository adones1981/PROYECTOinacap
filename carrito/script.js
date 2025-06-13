const cartItems = [];

function addToCart(button, item) {
  if (cartItems.includes(item)) return;

  cartItems.push(item);
  button.textContent = "Agregado";
  button.classList.add("added");

  updateCart();
}

function removeFromCart(item) {
  const index = cartItems.indexOf(item);
  if (index !== -1) {
    cartItems.splice(index, 1);
    updateCart();

    const buttons = document.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent === "Agregado" && btn.onclick.toString().includes(item)) {
        btn.textContent = "Agregar al carrito";
        btn.classList.remove("added");
      }
    });
  }
}

function updateCart() {
  const cart = document.getElementById("cart-items");
  const total = document.getElementById("cart-total");
  cart.innerHTML = "";

  cartItems.forEach(item => {
    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item}</span>
      <button class="remove-btn" onclick="removeFromCart('${item}')">Eliminar</button>
    `;
    cart.appendChild(div);
  });

  total.textContent = `Total de servicios: ${cartItems.length}`;
}

function sendQuote() {
  if (cartItems.length === 0) {
    alert("Agrega al menos un servicio para cotizar.");
    return;
  }

  alert(`Tu cotización incluye:\n\n- ${cartItems.join('\n- ')}\n\nTotal: ${cartItems.length} servicios`);
}
