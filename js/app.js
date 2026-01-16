const tg = window.Telegram?.WebApp;
const userId = tg?.initDataUnsafe?.user?.id || "demo";

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderProducts();
  tg?.ready();
});

/* =========================
   BOT NOTIFY
========================= */

function notifyBot(type, order) {
  fetch(BOT_SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ type, order })
  }).catch(() => {});
}

/* =========================
   PRODUCTS
========================= */

function renderProducts() {
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";

  PRODUCTS.forEach(p => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h3>${p.name}</h3>
      <div class="price">${p.price} ₽</div>
      <button class="neon-btn" onclick="openOrder('${p.id}')">Купить</button>
    `;
    grid.appendChild(div);
  });
}

/* =========================
   PAYMENT
========================= */

function confirmPayment() {
  const email = document.getElementById("supercellEmail").value;
  const receipt = document.getElementById("receiptUpload").files[0];
  if (!email || !receipt) return showToast("Заполни все поля", "error");

  const order = {
    id: generateOrderId(),
    userId,
    product: selectedProduct.name,
    price: selectedProduct.price,
    email,
    receipt: receipt.name,
    status: ORDER_STATUSES.PAID,
    date: new Date().toLocaleString()
  };

  addOrder(order);
  notifyBot("new_order", order);
  openOrders();
}

/* =========================
   CODE
========================= */

function submitCode() {
  const code = document.getElementById("supercellCode").value;
  if (!code) return showToast("Введите код", "error");

  updateOrder(selectedOrderId, {
    code,
    status: ORDER_STATUSES.IN_PROGRESS
  });

  const order = getOrderById(selectedOrderId);
  notifyBot("code_sent", order);

  openOrders();
}
