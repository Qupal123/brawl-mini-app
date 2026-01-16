/* =========================
   TOAST NOTIFICATIONS
========================= */

function showToast(message, type = "success") {
  let toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.innerText = message;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 50);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* =========================
   LOADER
========================= */

function showLoader() {
  let loader = document.createElement("div");
  loader.id = "global-loader";
  loader.innerHTML = `<div class="spinner"></div>`;
  document.body.appendChild(loader);
}

function hideLoader() {
  const loader = document.getElementById("global-loader");
  if (loader) loader.remove();
}

/* =========================
   BUTTON LOCK
========================= */

function lockButton(btn) {
  btn.disabled = true;
  btn.dataset.text = btn.innerText;
  btn.innerText = "⏳";
}

function unlockButton(btn) {
  btn.disabled = false;
  btn.innerText = btn.dataset.text || "Готово";
}

/* =========================
   AUTO REFRESH
========================= */

setInterval(() => {
  if (typeof renderOrders === "function") renderOrders();
  if (typeof renderAdmin === "function") renderAdmin();
}, 5000);
