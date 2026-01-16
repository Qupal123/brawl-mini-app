/* =========================
   STORAGE KEYS
========================= */

const STORAGE_KEYS = {
  ORDERS: "brawl_orders",
  REVIEWS: "brawl_reviews",
  CHAT: "brawl_support_chat"
};

/* =========================
   ORDERS
========================= */

function getOrders() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.ORDERS)) || [];
}

function saveOrders(orders) {
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
}

function addOrder(order) {
  const orders = getOrders();
  orders.push(order);
  saveOrders(orders);
}

function updateOrder(orderId, updates) {
  const orders = getOrders().map(order => {
    if (order.id === orderId) {
      return { ...order, ...updates };
    }
    return order;
  });
  saveOrders(orders);
}

function getUserOrders(userId) {
  return getOrders().filter(order => order.userId === userId);
}

function getOrderById(orderId) {
  return getOrders().find(order => order.id === orderId);
}

/* =========================
   REVIEWS
========================= */

function getReviews() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.REVIEWS)) || DEMO_REVIEWS;
}

function addReview(review) {
  const reviews = getReviews();
  reviews.unshift(review);
  localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews.slice(0, 5)));
}

/* =========================
   SUPPORT CHAT
========================= */

function getChatMessages() {
  return JSON.parse(localStorage.getItem(STORAGE_KEYS.CHAT)) || [];
}

function addChatMessage(message) {
  const messages = getChatMessages();
  messages.push(message);
  localStorage.setItem(STORAGE_KEYS.CHAT, JSON.stringify(messages));
}
