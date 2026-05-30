const rooms = [
  ["deluxe", "Deluxe Room"],
  ["super-deluxe", "Super Deluxe Room"],
  ["suite", "Suite Room"],
  ["royal-suite", "Royal Suite"]
];

const defaultRooms = [
  {
    id: "deluxe",
    name: "Deluxe Room",
    size: "Premium comfort",
    bed: "King / Twin Bed",
    capacity: 2,
    image: "assets/gallery/room-bright.jpg",
    rates: { withBreakfast: { single: 1449, double: 1799 }, withoutBreakfast: { single: 1349, double: 1599 } },
    features: ["Breakfast option", "High-speed Wi-Fi", "Tea/Coffee maker", "Private bathroom"],
    active: true
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Room",
    size: "Enhanced comfort",
    bed: "King Bed",
    capacity: 2,
    image: "assets/gallery/room-premium.jpg",
    rates: { withBreakfast: { single: 1649, double: 2049 }, withoutBreakfast: { single: 1549, double: 1849 } },
    features: ["Breakfast option", "Smart LED TV", "Work desk", "Premium toiletries"],
    active: true
  },
  {
    id: "suite",
    name: "Suite Room",
    size: "Spacious living area",
    bed: "King Bed",
    capacity: 2,
    image: "assets/gallery/suite-room.jpg",
    rates: { withBreakfast: { single: 2449, double: 3000 }, withoutBreakfast: { single: 2349, double: 2800 } },
    features: ["Breakfast option", "Tea/Coffee maker", "Work desk", "Bath amenities"],
    active: true
  },
  {
    id: "royal-suite",
    name: "Royal Suite",
    size: "Top category",
    bed: "King Bed",
    capacity: 2,
    image: "assets/gallery/room-city-view.jpg",
    rates: { withBreakfast: { single: null, double: 3499 }, withoutBreakfast: { single: null, double: 3299 } },
    features: ["Breakfast option", "Spacious layout", "Smart LED TV", "Premium stay"],
    active: true
  }
];

const defaultContent = {
  heroTitle: "Hotel Gokul Inn & Banquet",
  heroCopy: "Where comfort meets luxury: a trusted hotel in Vapi near Vapi Railway Station with 53 thoughtful rooms, Madhuvan pure vegetarian restaurant, online booking, partial payment, and a versatile banquet hall for celebrations and corporate gatherings of up to 150+ guests.",
  restaurantTitle: "Madhuvan Restaurant",
  restaurantCopy: "Located at Hotel Gokul Inn opposite Vapi Railway Station, Madhuvan is a pure vegetarian, Jain-friendly multi-cuisine destination serving breakfast, brunch, lunch and dinner from 8:00 AM to 11:00 PM.",
  banquetTitle: "Elegant moments, thoughtfully hosted.",
  banquetCopy: "Directly opposite Vapi Railway Station (East), our versatile hall welcomes corporate events, meetings, parties, marriage functions, anniversaries and special occasions with seating arrangements for up to 150+ guests.",
  rooms: defaultRooms
};

const currency = (value) => `INR ${Math.round(Number(value || 0)).toLocaleString("en-IN")}`;
const byId = (id) => document.getElementById(id);
let adminPin = "";
let adminState = { bookings: [], inventory: {}, banquetBookings: [], content: structuredClone(defaultContent) };
let activeAdminPage = "overview";
let adminPollTimer = null;
let adminHasLoaded = false;
let knownBookingIds = new Set();
let knownBanquetIds = new Set();

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function mergeRoom(defaultRoom, savedRoom = {}) {
  return {
    ...defaultRoom,
    ...savedRoom,
    rates: {
      withBreakfast: { ...defaultRoom.rates.withBreakfast, ...(savedRoom.rates?.withBreakfast || {}) },
      withoutBreakfast: { ...defaultRoom.rates.withoutBreakfast, ...(savedRoom.rates?.withoutBreakfast || {}) }
    },
    features: Array.isArray(savedRoom.features) ? savedRoom.features : defaultRoom.features
  };
}

function mergeContent(content = {}) {
  const savedById = Object.fromEntries((content.rooms || []).map((room) => [room.id, room]));
  return {
    ...defaultContent,
    ...content,
    rooms: defaultRooms.map((room) => mergeRoom(room, savedById[room.id]))
  };
}

async function adminFetch(url, options = {}) {
  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-admin-pin": adminPin,
      ...(options.headers || {})
    }
  });

  if (!response.ok) {
    throw new Error((await response.json().catch(() => ({}))).error || "Admin request failed.");
  }

  return response.json();
}

function bookingLabel(booking) {
  const guest = booking.guestName || booking.guest || "New guest";
  const room = booking.roomLabel || booking.roomName || booking.room || "room booking";
  return `${guest} - ${room}`;
}

function banquetLabel(request) {
  const guest = request.name || "New banquet enquiry";
  const count = request.guests ? `${request.guests} guests` : "event request";
  return `${guest} - ${count}`;
}

async function requestAdminNotifications() {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notifications.");
    return false;
  }
  if (Notification.permission === "granted") return true;
  const result = await Notification.requestPermission();
  return result === "granted";
}

function notifyAdmin(title, body) {
  if (!("Notification" in window) || Notification.permission !== "granted") return;
  new Notification(title, {
    body,
    icon: "assets/favicon.png",
    badge: "assets/favicon.png"
  });
}

function syncNotificationMemory(payload) {
  const bookings = payload.bookings || [];
  const banquetBookings = payload.banquetBookings || [];

  if (adminHasLoaded) {
    bookings
      .filter((booking) => booking.id && !knownBookingIds.has(booking.id))
      .forEach((booking) => notifyAdmin("New room booking", bookingLabel(booking)));

    banquetBookings
      .filter((request) => request.id && !knownBanquetIds.has(request.id))
      .forEach((request) => notifyAdmin("New banquet request", banquetLabel(request)));
  }

  knownBookingIds = new Set(bookings.map((booking) => booking.id).filter(Boolean));
  knownBanquetIds = new Set(banquetBookings.map((request) => request.id).filter(Boolean));
  adminHasLoaded = true;
}

function startAdminPolling() {
  window.clearInterval(adminPollTimer);
  adminPollTimer = window.setInterval(() => {
    loadAdmin({ silent: true }).catch(() => {});
  }, 30000);
}

function renderStats() {
  const paid = adminState.bookings.reduce((sum, booking) => sum + Number(booking.paidAmount || booking.paymentDue || 0), 0);
  const balance = adminState.bookings.reduce((sum, booking) => sum + Number(booking.balanceDue || 0), 0);
  const roomsBooked = adminState.bookings.reduce((sum, booking) => sum + Number(booking.roomCount || 1), 0);
  const roomStock = Object.values(adminState.inventory).reduce((sum, value) => sum + Number(value || 0), 0);

  byId("adminStats").innerHTML = [
    ["Total bookings", adminState.bookings.length],
    ["Rooms booked", roomsBooked],
    ["Paid online", currency(paid)],
    ["Counter balance", currency(balance)],
    ["Room stock", roomStock],
    ["Banquet requests", adminState.banquetBookings?.length || 0]
  ].map(([label, value]) => `<article class="admin-stat"><span>${label}</span><strong>${value}</strong></article>`).join("");
}

function showAdminPage(page = "overview") {
  const nextPage = document.querySelector(`[data-admin-page="${page}"]`) ? page : "overview";
  activeAdminPage = nextPage;
  document.querySelectorAll("[data-admin-page]").forEach((section) => {
    section.classList.toggle("active", section.dataset.adminPage === nextPage);
  });
  document.querySelectorAll("[data-admin-page-target]").forEach((button) => {
    button.classList.toggle("active", button.dataset.adminPageTarget === nextPage);
  });
  if (window.location.hash !== `#${nextPage}`) {
    history.replaceState(null, "", `#${nextPage}`);
  }
  window.lucide?.createIcons();
}

function renderMiniLists() {
  const latestBookings = adminState.bookings.slice(0, 4);
  byId("recentBookingRows").innerHTML = latestBookings.length ? latestBookings.map((booking) => `
    <button class="mini-list-row" type="button" data-admin-page-target="bookings">
      <span>
        <strong>${escapeHtml(booking.guest || "Guest booking")}</strong>
        <small>${escapeHtml(booking.room || "-")} | ${escapeHtml(booking.checkIn || "-")} to ${escapeHtml(booking.checkOut || "-")}</small>
      </span>
      <b>${currency(booking.paidAmount || booking.paymentDue || 0)}</b>
    </button>
  `).join("") : `<p class="empty-note">No room bookings yet.</p>`;

  const latestBanquet = (adminState.banquetBookings || []).slice(0, 4);
  byId("recentBanquetRows").innerHTML = latestBanquet.length ? latestBanquet.map((item) => `
    <button class="mini-list-row" type="button" data-admin-page-target="banquet">
      <span>
        <strong>${escapeHtml(item.name || "Banquet enquiry")}</strong>
        <small>${escapeHtml(item.eventType || "-")} | ${escapeHtml(item.eventDate || "-")} | ${escapeHtml(String(item.guests || "-"))} guests</small>
      </span>
      <b>${escapeHtml(item.status || "new")}</b>
    </button>
  `).join("") : `<p class="empty-note">No banquet enquiries yet.</p>`;
}

function renderContentEditor() {
  const content = mergeContent(adminState.content);
  adminState.content = content;
  byId("editHeroTitle").value = content.heroTitle;
  byId("editHeroCopy").value = content.heroCopy;
  byId("editRestaurantTitle").value = content.restaurantTitle;
  byId("editRestaurantCopy").value = content.restaurantCopy;
  byId("editBanquetTitle").value = content.banquetTitle;
  byId("editBanquetCopy").value = content.banquetCopy;

  byId("roomEditorGrid").innerHTML = content.rooms.map((room) => `
    <article class="room-editor-card" data-room-editor="${room.id}">
      <div class="room-editor-preview">
        <img src="${escapeHtml(room.image)}" alt="${escapeHtml(room.name)} preview" />
        <span class="${room.active === false ? "inactive" : ""}">${room.active === false ? "Hidden on website" : "Visible on website"}</span>
      </div>
      <div class="room-editor-fields">
        <label><span>Room name</span><input data-edit-field="name" value="${escapeHtml(room.name)}" /></label>
        <label><span>Image path / URL</span><input data-edit-field="image" value="${escapeHtml(room.image)}" /></label>
        <label><span>Size text</span><input data-edit-field="size" value="${escapeHtml(room.size)}" /></label>
        <label><span>Bed text</span><input data-edit-field="bed" value="${escapeHtml(room.bed)}" /></label>
        <label><span>Capacity</span><input data-edit-field="capacity" type="number" min="1" max="8" value="${room.capacity}" /></label>
        <label><span>Features comma separated</span><input data-edit-field="features" value="${escapeHtml(room.features.join(", "))}" /></label>
        <label><span>Breakfast single</span><input data-rate-field="withBreakfast.single" type="number" min="0" value="${room.rates.withBreakfast.single || ""}" /></label>
        <label><span>Breakfast double</span><input data-rate-field="withBreakfast.double" type="number" min="0" value="${room.rates.withBreakfast.double || ""}" /></label>
        <label><span>No breakfast single</span><input data-rate-field="withoutBreakfast.single" type="number" min="0" value="${room.rates.withoutBreakfast.single || ""}" /></label>
        <label><span>No breakfast double</span><input data-rate-field="withoutBreakfast.double" type="number" min="0" value="${room.rates.withoutBreakfast.double || ""}" /></label>
        <label class="room-active-toggle"><input data-edit-field="active" type="checkbox" ${room.active === false ? "" : "checked"} /> Show this room on website</label>
      </div>
    </article>
  `).join("");
}

function collectContent() {
  const roomsContent = adminState.content.rooms.map((room) => {
    const card = document.querySelector(`[data-room-editor="${room.id}"]`);
    const nextRoom = structuredClone(room);
    card.querySelectorAll("[data-edit-field]").forEach((input) => {
      const field = input.dataset.editField;
      if (field === "capacity") {
        nextRoom.capacity = Number(input.value || 1);
      } else if (field === "features") {
        nextRoom.features = input.value.split(",").map((item) => item.trim()).filter(Boolean);
      } else if (field === "active") {
        nextRoom.active = input.checked;
      } else {
        nextRoom[field] = input.value.trim();
      }
    });
    card.querySelectorAll("[data-rate-field]").forEach((input) => {
      const [plan, occupancy] = input.dataset.rateField.split(".");
      const value = Number(input.value);
      nextRoom.rates[plan][occupancy] = Number.isFinite(value) && value > 0 ? value : null;
    });
    return nextRoom;
  });

  return {
    heroTitle: byId("editHeroTitle").value.trim(),
    heroCopy: byId("editHeroCopy").value.trim(),
    restaurantTitle: byId("editRestaurantTitle").value.trim(),
    restaurantCopy: byId("editRestaurantCopy").value.trim(),
    banquetTitle: byId("editBanquetTitle").value.trim(),
    banquetCopy: byId("editBanquetCopy").value.trim(),
    rooms: roomsContent
  };
}

async function saveContent(event) {
  event.preventDefault();
  const content = collectContent();
  const payload = await adminFetch("/api/content", {
    method: "PATCH",
    body: JSON.stringify(content)
  });
  adminState.content = mergeContent(payload.content);
  renderContentEditor();
  byId("contentMessage").textContent = "Website content updated. Refresh the public website to see the changes.";
  byId("roomContentMessage").textContent = "Room cards updated. Refresh the public website to see the changes.";
  window.lucide?.createIcons();
}

function getBookedCount(roomId) {
  return adminState.bookings
    .filter((booking) => booking.roomId === roomId && booking.status !== "cancelled")
    .reduce((sum, booking) => sum + Number(booking.roomCount || 1), 0);
}

async function updateStock(roomId, count) {
  const payload = await adminFetch("/api/inventory", {
    method: "PATCH",
    body: JSON.stringify({ roomId, count })
  });
  adminState.inventory = payload.inventory;
  renderStats();
  renderInventory();
  window.lucide?.createIcons();
}

function renderInventory() {
  byId("inventoryGrid").innerHTML = rooms.map(([id, name]) => `
    <article class="inventory-card">
      <h3>${name}</h3>
      <div class="stock-meter">
        <span>Website stock</span>
        <strong>${adminState.inventory[id] ?? 0}</strong>
        <small>${getBookedCount(id)} booked in saved orders</small>
      </div>
      <label><span>Set available rooms</span><input type="number" min="0" value="${adminState.inventory[id] ?? 0}" data-room-stock="${id}" /></label>
      <div class="inventory-actions">
        <button class="primary-button" type="button" data-save-stock="${id}"><i data-lucide="save"></i><span>Save</span></button>
        <button class="ghost-light-button" type="button" data-soldout-stock="${id}"><i data-lucide="ban"></i><span>Mark full</span></button>
      </div>
    </article>
  `).join("");

  document.querySelectorAll("[data-save-stock]").forEach((button) => {
    button.addEventListener("click", async () => {
      const roomId = button.dataset.saveStock;
      const count = Number(document.querySelector(`[data-room-stock="${roomId}"]`).value || 0);
      await updateStock(roomId, count).catch((error) => alert(error.message));
    });
  });

  document.querySelectorAll("[data-soldout-stock]").forEach((button) => {
    button.addEventListener("click", async () => {
      await updateStock(button.dataset.soldoutStock, 0).catch((error) => alert(error.message));
    });
  });
}

function renderBookings() {
  const query = byId("bookingSearch").value.trim().toLowerCase();
  const bookings = adminState.bookings.filter((booking) => JSON.stringify(booking).toLowerCase().includes(query));

  byId("bookingRows").innerHTML = bookings.length ? bookings.map((booking) => `
    <tr>
      <td><strong>${booking.id}</strong><span>${new Date(booking.createdAt || Date.now()).toLocaleString("en-IN")}</span></td>
      <td><strong>${booking.guest || "-"}</strong><span>${booking.phone || "-"}</span></td>
      <td><strong>${booking.room}</strong><span>${booking.roomCount || 1} room(s), ${booking.guests || 1} guest(s)</span></td>
      <td><strong>${booking.checkIn} to ${booking.checkOut}</strong><span>${booking.checkInTime || "12:00"} / ${booking.checkOutTime || "11:00"}</span></td>
      <td><strong>${currency(booking.paidAmount || booking.paymentDue)}</strong><span>Total ${currency(booking.total)} | Balance ${currency(booking.balanceDue)}</span></td>
      <td><span class="status-pill">${booking.paymentStatus || booking.status || "confirmed"}</span></td>
    </tr>
  `).join("") : `<tr><td colspan="6">No booking found.</td></tr>`;
}

function renderBanquetBookings() {
  const rows = adminState.banquetBookings || [];
  byId("banquetRows").innerHTML = rows.length ? rows.map((item) => `
    <tr>
      <td><strong>${item.id}</strong><span>${new Date(item.createdAt || Date.now()).toLocaleString("en-IN")}</span></td>
      <td><strong>${item.name || "-"}</strong><span>${item.phone || "-"}</span></td>
      <td><strong>${item.eventType || "-"}</strong><span>${item.eventDate || "-"} | ${item.guests || "-"} guests</span></td>
      <td><strong>${item.package || "-"}</strong></td>
      <td><span>${item.message || "-"}</span></td>
      <td>
        <select class="status-select" data-banquet-status="${item.id}">
          ${["new", "contacted", "confirmed", "closed"].map((status) => `<option value="${status}" ${item.status === status ? "selected" : ""}>${status}</option>`).join("")}
        </select>
      </td>
    </tr>
  `).join("") : `<tr><td colspan="6">No banquet request found.</td></tr>`;

  document.querySelectorAll("[data-banquet-status]").forEach((select) => {
    select.addEventListener("change", async () => {
      const payload = await adminFetch("/api/banquet-bookings", {
        method: "PATCH",
        body: JSON.stringify({ id: select.dataset.banquetStatus, status: select.value })
      });
      adminState.banquetBookings = payload.banquetBookings;
      renderStats();
      renderBanquetBookings();
    });
  });
}

async function loadAdmin({ silent = false } = {}) {
  const [payload, content] = await Promise.all([
    adminFetch("/api/bookings"),
    adminFetch("/api/content")
  ]);
  syncNotificationMemory(payload);
  adminState = { ...payload, content: mergeContent(content) };
  byId("adminLogin").hidden = true;
  byId("adminDashboard").hidden = false;
  renderStats();
  renderMiniLists();
  renderContentEditor();
  renderInventory();
  renderBookings();
  renderBanquetBookings();
  window.lucide?.createIcons();
  if (!silent) startAdminPolling();
}

document.addEventListener("DOMContentLoaded", () => {
  localStorage.removeItem("gokulAdminPin");
  byId("adminLoginForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    adminPin = byId("adminPin").value;
    byId("forgotPinMessage").textContent = "";
    await loadAdmin().then(() => requestAdminNotifications()).catch((error) => {
      adminPin = "";
      byId("adminPin").value = "";
      byId("forgotPinMessage").textContent = error.message;
    });
  });

  byId("refreshAdmin").addEventListener("click", () => loadAdmin().catch((error) => alert(error.message)));
  byId("refreshAdminSecondary").addEventListener("click", () => loadAdmin().catch((error) => alert(error.message)));
  byId("enableNotifications").addEventListener("click", () => requestAdminNotifications());
  byId("contentForm").addEventListener("submit", (event) => saveContent(event).catch((error) => alert(error.message)));
  byId("roomContentForm").addEventListener("submit", (event) => saveContent(event).catch((error) => alert(error.message)));
  byId("bookingSearch").addEventListener("input", renderBookings);
  byId("forgotPin").addEventListener("click", () => {
    byId("forgotPinMessage").textContent = "Please contact the owner or website administrator to reset the private counter PIN.";
  });
  document.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-admin-page-target]");
    if (!trigger) return;
    showAdminPage(trigger.dataset.adminPageTarget);
  });
  const requestedPage = window.location.hash.replace("#", "");
  if (requestedPage) showAdminPage(requestedPage);
  window.lucide?.createIcons();
});
