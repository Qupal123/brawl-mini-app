/* =========================
   EXPORT ORDERS
========================= */

function exportOrdersJSON(filter = "all") {
  const orders = getFilteredOrders(filter);
  downloadFile(
    JSON.stringify(orders, null, 2),
    `orders_${filter}.json`,
    "application/json"
  );
}

function exportOrdersCSV(filter = "all") {
  const orders = getFilteredOrders(filter);

  if (!orders.length) {
    showToast("Нет заказов для экспорта", "error");
    return;
  }

  const headers = [
    "id",
    "userId",
    "product",
    "price",
    "email",
    "status",
    "date",
    "video"
  ];

  const rows = orders.map(o =>
    headers.map(h => `"${(o[h] ?? "").toString().replace(/"/g, '""')}"`).join(",")
  );

  const csv =
    headers.join(",") +
    "\n" +
    rows.join("\n");

  downloadFile(csv, `orders_${filter}.csv`, "text/csv");
}

function getFilteredOrders(filter) {
  const orders = getOrders();

  if (filter === "done") {
    return orders.filter(o => o.status === ORDER_STATUSES.DONE);
  }

  return orders;
}

/* =========================
   DOWNLOAD
========================= */

function downloadFile(content, filename, type) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();

  URL.revokeObjectURL(url);

  showToast("Экспорт выполнен");
}
