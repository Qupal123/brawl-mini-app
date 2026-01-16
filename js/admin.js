/* =========================
   ADMIN TABS
========================= */

const adminViews = document.querySelectorAll("main .view");

function showAdminTab(index) {
  adminViews.forEach(v => v.classList.remove("active"));
  adminViews[index].classList.add("active");
  renderAdmin();
}

/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  renderAdmin();
});

/* =========================
   RENDER ADMIN
========================= */

function renderAdmin() {
  renderNewOrders();
  renderWaitingCode();
  renderInProgress();
  renderCompleted();
}

/* =========================
   NEW ORDERS
========================= */

function renderNewOrders() {
  const box = document.getElementById("newOrders");
  box.innerHTML = "";

  const orders = getOrders().filter(
    o => o.status === ORDER_STATUSES.PAID
  );

  if (!orders.length) {
    box.innerHTML = "<p>Нет новых заказов</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <p><strong>${order.product}</strong></p>
      <p>Заказ: ${order.id}</p>
      <p>Почта: ${order.email}</p>
      <p>Чек: ${order.receipt}</p>

      <button class="neon-btn" onclick="acceptOrder('${order.id}')">
        Принять заказ
      </button>

      <button class="neon-btn secondary" onclick="rejectOrder('${order.id}')">
        Отклонить
      </button>
    `;

    box.appendChild(card);
  });
}

function acceptOrder(orderId) {
  updateOrder(orderId, {
    status: ORDER_STATUSES.WAIT_CODE
  });
  renderAdmin();
}

function rejectOrder(orderId) {
  updateOrder(orderId, {
    status: ORDER_STATUSES.REJECTED
  });
  renderAdmin();
}

/* =========================
   WAITING CODE
========================= */

function renderWaitingCode() {
  const box = document.getElementById("waitingCode");
  box.innerHTML = "";

  const orders = getOrders().filter(
    o => o.status === ORDER_STATUSES.IN_PROGRESS
  );

  if (!orders.length) {
    box.innerHTML = "<p>Нет заказов</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <p><strong>${order.product}</strong></p>
      <p>Заказ: ${order.id}</p>
      <p>Код: ${order.code || "—"}</p>

      <button class="neon-btn" onclick="moveToWork('${order.id}')">
        В работу
      </button>
    `;

    box.appendChild(card);
  });
}

function moveToWork(orderId) {
  updateOrder(orderId, {
    status: ORDER_STATUSES.IN_PROGRESS
  });
  renderAdmin();
}

/* =========================
   IN PROGRESS
========================= */

function renderInProgress() {
  const box = document.getElementById("inProgress");
  box.innerHTML = "";

  const orders = getOrders().filter(
    o => o.status === ORDER_STATUSES.IN_PROGRESS
  );

  if (!orders.length) {
    box.innerHTML = "<p>Нет заказов в работе</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <p><strong>${order.product}</strong></p>
      <p>Заказ: ${order.id}</p>

      <input type="text"
        placeholder="assets/videos/order_${order.id.replace("ORD-","")}.mp4"
        id="video_${order.id}"
      >

      <button class="neon-btn" onclick="completeOrder('${order.id}')">
        Завершить заказ
      </button>
    `;

    box.appendChild(card);
  });
}

function completeOrder(orderId) {
  const input = document.getElementById(`video_${orderId}`);
  const videoPath = input.value;

  if (!videoPath) {
    alert("Укажи путь к видео");
    return;
  }

  updateOrder(orderId, {
    video: videoPath,
    status: ORDER_STATUSES.DONE
  });

  renderAdmin();
}

/* =========================
   COMPLETED
========================= */

function renderCompleted() {
  const box = document.getElementById("completedOrders");
  box.innerHTML = "";

  const orders = getOrders().filter(
    o => o.status === ORDER_STATUSES.DONE
  );

  if (!orders.length) {
    box.innerHTML = "<p>Нет завершённых заказов</p>";
    return;
  }

  orders.forEach(order => {
    const card = document.createElement("div");
    card.className = "order-card";

    card.innerHTML = `
      <p><strong>${order.product}</strong></p>
      <p>Заказ: ${order.id}</p>
      <p>Видео: ${order.video}</p>
    `;

    box.appendChild(card);
  });
}
