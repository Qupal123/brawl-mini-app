/* =========================
   ROUTER
========================= */

let currentView = "view-home";

function showView(viewId) {
  document.querySelectorAll(".view").forEach(view => {
    view.classList.remove("active");
  });

  const view = document.getElementById(viewId);
  if (view) {
    view.classList.add("active");
    currentView = viewId;
  }
}

/* =========================
   NAVIGATION HELPERS
========================= */

function goHome() {
  showView("view-home");
}

function openReviews() {
  renderReviews();
  showView("view-reviews");
}

function openOrders() {
  renderOrders();
  showView("view-orders");
}

function openSupport() {
  renderChat();
  showView("view-support");
}

/* =========================
   ORDER FLOW
========================= */

let selectedProduct = null;
let selectedOrderId = null;

function openOrder(productId) {
  selectedProduct = PRODUCTS.find(p => p.id === productId);
  if (!selectedProduct) return;

  document.getElementById("orderProduct").innerText = selectedProduct.name;
  document.getElementById("orderPrice").innerText = `Цена: ${selectedProduct.price} ₽`;

  showView("view-order");
}

function goToPayment() {
  document.getElementById("paymentPhone").innerText = PAYMENT_INFO.phone;
  document.getElementById("paymentAmount").innerText = `${selectedProduct.price} ₽`;
  document.getElementById("paymentInstruction").innerText = PAYMENT_INFO.instruction;

  showView("view-payment");
}

/* =========================
   CODE / REVIEW
========================= */

function openCodeInput(orderId) {
  selectedOrderId = orderId;
  showView("view-code");
}

function openReviewForm() {
  showView("view-review");
}
