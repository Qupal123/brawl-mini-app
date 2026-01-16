import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

/* =========================
   CONFIG
========================= */

const BOT_TOKEN = process.env.BOT_TOKEN;
const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;

/* =========================
   TELEGRAM API
========================= */

const TG_API = `https://api.telegram.org/bot${BOT_TOKEN}`;

async function sendMessage(text) {
  await fetch(`${TG_API}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: ADMIN_CHAT_ID,
      text,
      parse_mode: "HTML"
    })
  });
}

/* =========================
   WEBHOOK ENDPOINT
========================= */

app.post("/notify", async (req, res) => {
  const { type, order } = req.body;

  if (!order) {
    return res.status(400).send("No order");
  }

  if (type === "new_order") {
    await sendMessage(
      `🆕 <b>Новый заказ</b>\n\n` +
      `📦 ${order.product}\n` +
      `💰 ${order.price} ₽\n` +
      `📧 ${order.email}\n` +
      `🆔 ${order.id}`
    );
  }

  if (type === "code_sent") {
    await sendMessage(
      `🔑 <b>Введён код</b>\n\n` +
      `🆔 ${order.id}\n` +
      `📦 ${order.product}\n` +
      `🔐 Код: ${order.code}`
    );
  }

  if (type === "done") {
    await sendMessage(
      `✅ <b>Заказ выполнен</b>\n\n` +
      `🆔 ${order.id}\n` +
      `📦 ${order.product}`
    );
  }

  res.send("OK");
});

/* =========================
   START
========================= */

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Bot server running on port", PORT);
});
