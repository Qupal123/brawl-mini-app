/* =========================
   ADMIN AUTH GUARD
========================= */

document.addEventListener("DOMContentLoaded", () => {
  if (!window.Telegram || !Telegram.WebApp) {
    blockAccess("Откройте админку через Telegram");
    return;
  }

  const tg = Telegram.WebApp;
  const user = tg.initDataUnsafe?.user;

  if (!user) {
    blockAccess("Не удалось получить данные пользователя");
    return;
  }

  if (user.id !== ADMIN_TELEGRAM_ID) {
    blockAccess("Доступ запрещён");
    return;
  }

  tg.ready();
});

/* =========================
   BLOCK SCREEN
========================= */

function blockAccess(message) {
  document.body.innerHTML = `
    <div style="
      height:100vh;
      display:flex;
      align-items:center;
      justify-content:center;
      background:#05050a;
      color:#fff;
      font-family:Inter, sans-serif;
      text-align:center;
      padding:20px;
    ">
      <div>
        <h2 style="color:#ff6b6b;">⛔ ${message}</h2>
        <p style="opacity:.7;margin-top:8px;">
          У вас нет прав для доступа к админ-панели
        </p>
      </div>
    </div>
  `;
}
