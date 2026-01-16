/* =========================
   TELEGRAM CONFIG
========================= */

const TELEGRAM_BOT_TOKEN = "8498556233:AAE8f7mhHVWfwxOequwjexK4LgKzpSKNzf0";

/* =========================
   ADMIN AUTH
========================= */

// Telegram ID администратора
// Узнать через @userinfobot
const ADMIN_TELEGRAM_ID = 8382113817;

/* =========================
   PAYMENT SETTINGS
========================= */

const PAYMENT_INFO = {
  phone: "+7 908 314-22-69",
  instruction: "Переведите точную сумму и загрузите чек."
};

/* =========================
   PRODUCTS
========================= */

const PRODUCTS = [
  { id: "gems", name: "Гемы", price: 499 },
  { id: "brawl_pass", name: "Brawl Pass", price: 899 },
  { id: "brawl_pass_plus", name: "Brawl Pass Plus", price: 1299 },
  { id: "pro_pass", name: "Pro Pass", price: 1999 }
];

/* =========================
   ORDER STATUSES
========================= */

const ORDER_STATUSES = {
  WAIT_PAYMENT: "Ожидает оплату",
  PAID: "Оплачено (чек загружен)",
  ACCEPTED: "Принято администратором",
  WAIT_CODE: "Ожидает код",
  IN_PROGRESS: "В работе",
  DONE: "Выполнено",
  REVIEWED: "Отзыв оставлен",
  REJECTED: "Отклонено"
};

/* =========================
   REVIEWS (DEMO)
========================= */

const DEMO_REVIEWS = [
  { rating: 5, text: "Всё пришло быстро, спасибо!", date: "15.01.2026" },
  { rating: 4, text: "Немного ждал, но всё ок", date: "14.01.2026" },
  { rating: 5, text: "Лучший сервис 🔥", date: "13.01.2026" },
  { rating: 5, text: "Рекомендую", date: "12.01.2026" }
];

/* =========================
   HELPERS
========================= */

function generateOrderId() {
  return "ORD-" + Date.now();
}
