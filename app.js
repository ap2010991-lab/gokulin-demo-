const profile = {
  name: "Hotel Gokul Inn & Banquet",
  address: "9WC5+WMJ, Vapi East, Gita Nagar, Vapi, Gujarat 396191, India",
  phone: "+91 76006 61149",
  rating: 4.5,
  reviewCount: 93,
  amenities: [
    "Restaurant",
    "Free breakfast",
    "Free Wi-Fi",
    "Free parking",
    "Air conditioning",
    "Laundry service",
    "Room service",
    "Banquet hall",
    "Kitchens in some rooms",
    "Vegetarian food"
  ],
  rooms: [
    {
      id: "deluxe",
      name: "Deluxe Double Room",
      size: "165 sq.ft",
      bed: "Double Bed",
      bathrooms: 1,
      capacity: 2,
      price: 3081,
      tax: 366,
      image: "assets/gallery/room-bright.jpg",
      features: ["Air conditioning", "Room service", "Closet", "Private bathroom"]
    },
    {
      id: "super-deluxe",
      name: "Super Deluxe Room",
      size: "165 sq.ft",
      bed: "King Bed",
      bathrooms: 1,
      capacity: 2,
      price: 3797,
      tax: 452,
      image: "assets/gallery/room-premium.jpg",
      features: ["King bed", "Air conditioning", "Seating area", "Free Wi-Fi"]
    },
    {
      id: "family",
      name: "Family Room",
      size: "352 sq.ft",
      bed: "2 Double Beds",
      bathrooms: 1,
      capacity: 4,
      price: 4514,
      tax: 538,
      image: "assets/gallery/room-city-view.jpg",
      features: ["Two double beds", "Large room", "Family seating", "Private bathroom"]
    }
  ]
};

const state = {
  selectedRoom: "deluxe",
  roomChosen: false,
  currentBooking: null,
  paymentConfig: {
    keyId: "",
    liveMode: false
  }
};

const formatMoney = (value) => `INR ${Math.round(value).toLocaleString("en-IN")}`;

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);

const padDatePart = (value) => String(value).padStart(2, "0");
const toDateInput = (date) => `${date.getFullYear()}-${padDatePart(date.getMonth() + 1)}-${padDatePart(date.getDate())}`;

const parseDateInput = (value) => {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
};

const addDays = (dateValue, days) => {
  const date = parseDateInput(dateValue);
  date.setDate(date.getDate() + days);
  return toDateInput(date);
};

const formatDateLabel = (value) => parseDateInput(value).toLocaleDateString("en-IN", {
  day: "numeric",
  month: "short",
  year: "numeric"
});

const nightsBetween = (start, end) => {
  const inDate = parseDateInput(start);
  const outDate = parseDateInput(end);
  const diff = Math.ceil((outDate - inDate) / 86400000);
  return diff > 0 ? diff : 1;
};

const byId = (id) => document.getElementById(id);
const calendarState = {
  input: null,
  month: new Date(today.getFullYear(), today.getMonth(), 1)
};

function setDefaultDates() {
  const defaults = [
    ["quickCheckIn", today],
    ["checkInDate", today],
    ["quickCheckOut", tomorrow],
    ["checkOutDate", tomorrow]
  ];

  defaults.forEach(([id, date]) => {
    const input = byId(id);
    input.value = toDateInput(date);
    input.min = toDateInput(today);
  });

  syncDateConstraints();
}

function syncDateConstraints(sourceId = "") {
  const quickCheckIn = byId("quickCheckIn");
  const quickCheckOut = byId("quickCheckOut");
  const checkInDate = byId("checkInDate");
  const checkOutDate = byId("checkOutDate");

  [
    [quickCheckIn, quickCheckOut],
    [checkInDate, checkOutDate]
  ].forEach(([startInput, endInput]) => {
    if (!startInput.value) startInput.value = toDateInput(today);
    const nextDay = addDays(startInput.value, 1);
    endInput.min = nextDay;
    if (!endInput.value || parseDateInput(endInput.value) <= parseDateInput(startInput.value)) {
      endInput.value = nextDay;
    }
  });

  if (sourceId === "quickCheckIn") openDatePicker(quickCheckOut);
  if (sourceId === "checkInDate") openDatePicker(checkOutDate);
}

function placeDatePicker(input) {
  const picker = byId("datePicker");
  const rect = input.closest(".date-control").getBoundingClientRect();
  const top = Math.min(rect.bottom + 8, window.innerHeight - picker.offsetHeight - 14);
  const left = Math.min(Math.max(14, rect.left), window.innerWidth - picker.offsetWidth - 14);

  picker.style.top = `${Math.max(14, top)}px`;
  picker.style.left = `${left}px`;
}

function renderDatePicker() {
  const picker = byId("datePicker");
  const input = calendarState.input;
  if (!input) return;

  const monthDate = calendarState.month;
  const selected = input.value;
  const minValue = input.min || toDateInput(today);
  const minDate = parseDateInput(minValue);
  const monthName = monthDate.toLocaleDateString("en-IN", { month: "long", year: "numeric" });
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const totalDays = new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0).getDate();
  const startOffset = firstDay.getDay();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let days = weekDays.map((day) => `<span>${day}</span>`).join("");
  days += Array.from({ length: startOffset }, () => "<span></span>").join("");

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(monthDate.getFullYear(), monthDate.getMonth(), day);
    const value = toDateInput(date);
    const disabled = date < minDate;
    days += `<button type="button" data-date="${value}" class="${value === selected ? "selected" : ""}" ${disabled ? "disabled" : ""}>${day}</button>`;
  }

  picker.innerHTML = `
    <div class="date-picker-head">
      <button type="button" data-calendar-prev aria-label="Previous month"><i data-lucide="chevron-left"></i></button>
      <strong>${monthName}</strong>
      <button type="button" data-calendar-next aria-label="Next month"><i data-lucide="chevron-right"></i></button>
    </div>
    <div class="date-picker-grid">${days}</div>
  `;

  window.lucide?.createIcons();
  placeDatePicker(input);
}

function openDatePicker(input) {
  const picker = byId("datePicker");
  calendarState.input = input;
  const value = input.value || input.min || toDateInput(today);
  const date = parseDateInput(value);
  calendarState.month = new Date(date.getFullYear(), date.getMonth(), 1);
  picker.hidden = false;
  renderDatePicker();
}

window.openBookingCalendar = (id, event) => {
  event?.preventDefault?.();
  event?.stopPropagation?.();
  const input = byId(id);
  if (input) openDatePicker(input);
  return false;
};

function closeDatePicker() {
  const picker = byId("datePicker");
  picker.hidden = true;
  calendarState.input = null;
}

function bindDatePicker() {
  const picker = byId("datePicker");

  document.querySelectorAll(".date-control input").forEach((input) => {
    input.addEventListener("click", (event) => {
      event.stopPropagation();
      openDatePicker(input);
    });
    input.addEventListener("focus", () => openDatePicker(input));
  });

  document.querySelectorAll("[data-date-for]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const input = byId(button.dataset.dateFor);
      input.focus();
      openDatePicker(input);
    });
  });

  picker.addEventListener("click", (event) => {
    const previous = event.target.closest("[data-calendar-prev]");
    const next = event.target.closest("[data-calendar-next]");
    const day = event.target.closest("[data-date]");

    if (previous) {
      calendarState.month.setMonth(calendarState.month.getMonth() - 1);
      renderDatePicker();
      return;
    }

    if (next) {
      calendarState.month.setMonth(calendarState.month.getMonth() + 1);
      renderDatePicker();
      return;
    }

    if (day && calendarState.input) {
      calendarState.input.value = day.dataset.date;
      calendarState.input.dispatchEvent(new Event("change", { bubbles: true }));
      closeDatePicker();
    }
  });

  document.addEventListener("click", (event) => {
    if (event.target.closest(".date-control") || event.target.closest("#datePicker")) return;
    closeDatePicker();
  });

  window.addEventListener("resize", () => {
    if (calendarState.input && !picker.hidden) placeDatePicker(calendarState.input);
  });
}

function renderRooms() {
  const roomGrid = byId("roomGrid");
  const roomType = byId("roomType");

  roomGrid.innerHTML = profile.rooms.map((room) => `
    <article class="room-card" data-room="${room.id}">
      <img src="${room.image}" alt="${room.name}" loading="lazy" />
      <div class="room-body">
        <h3>${room.name}</h3>
        <div class="room-meta">
          <span>${room.size}</span>
          <span>${room.bed}</span>
          <span>Up to ${room.capacity} guests</span>
        </div>
        <p>${room.features.join(" | ")}</p>
        <div class="room-price">
          <div>
            <strong>${formatMoney(room.price)}</strong>
            <span>/ night + taxes</span>
          </div>
          <button class="select-room" type="button" data-select-room="${room.id}">Select</button>
        </div>
      </div>
    </article>
  `).join("");

  roomType.innerHTML = profile.rooms.map((room) => `
    <option value="${room.id}">${room.name} - ${formatMoney(room.price)} / night</option>
  `).join("");

  bindRoomSelection(roomGrid);
}

function buildRoomCard(room, options = {}) {
  const nights = options.nights || 1;
  const roomsNeeded = Math.max(1, Math.ceil((options.guests || 1) / room.capacity));
  const roomCount = options.showStayTotal ? roomsNeeded : 1;
  const stayTotal = (room.price + room.tax) * nights * roomCount;
  const capacityText = roomCount > 1 ? `${roomCount} rooms suggested` : `Up to ${room.capacity} guests`;

  return `
    <article class="room-card ${options.showStayTotal ? "availability-card" : ""}" data-room="${room.id}">
      <img src="${room.image}" alt="${room.name}" loading="lazy" />
      <div class="room-body">
        <div class="room-title-row">
          <h3>${room.name}</h3>
          ${options.showStayTotal ? `<span>${capacityText}</span>` : ""}
        </div>
        <div class="room-meta">
          <span>${room.size}</span>
          <span>${room.bed}</span>
          <span>${options.showStayTotal ? `${room.capacity} guests / room` : `Up to ${room.capacity} guests`}</span>
        </div>
        <p>${room.features.join(" | ")}</p>
        ${options.showStayTotal ? `
          <div class="availability-detail">
            <div><span>Nightly room price</span><strong>${formatMoney(room.price)}</strong></div>
            <div><span>Taxes per night</span><strong>${formatMoney(room.tax)}</strong></div>
            <div><span>${nights} night${nights > 1 ? "s" : ""} total</span><strong>${formatMoney(stayTotal)}</strong></div>
          </div>
        ` : ""}
        <div class="room-price">
          <div>
            <strong>${options.showStayTotal ? formatMoney(stayTotal) : formatMoney(room.price)}</strong>
            <span>${options.showStayTotal ? "estimated stay total" : "/ night + taxes"}</span>
          </div>
          <button class="select-room" type="button" data-select-room="${room.id}" data-room-count="${roomCount}">Select</button>
        </div>
      </div>
    </article>
  `;
}

function renderAvailability() {
  const checkIn = byId("quickCheckIn").value || byId("checkInDate").value;
  const checkOut = byId("quickCheckOut").value || byId("checkOutDate").value;
  const guests = Number(byId("quickGuests").value || byId("guestCount").value || 1);
  const nights = nightsBetween(checkIn, checkOut);
  const grid = byId("availabilityGrid");

  byId("searchSummary").textContent = `${formatDateLabel(checkIn)} to ${formatDateLabel(checkOut)} | ${nights} night${nights > 1 ? "s" : ""} | ${guests} guest${guests > 1 ? "s" : ""}`;
  grid.innerHTML = profile.rooms.map((room) => buildRoomCard(room, {
    nights,
    guests,
    showStayTotal: true
  })).join("");

  bindRoomSelection(grid);
  window.lucide?.createIcons();
  initRoomCardAnimations(grid);
}

function bindRoomSelection(scope = document) {
  scope.querySelectorAll("[data-select-room]").forEach((button) => {
    button.addEventListener("click", () => {
      selectRoom(button.dataset.selectRoom, Number(button.dataset.roomCount || 1));
    });
  });
}

function selectRoom(roomId, roomCount = 1) {
  state.selectedRoom = roomId;
  state.roomChosen = true;
  byId("roomType").value = roomId;
  byId("roomCount").value = Math.min(4, Math.max(1, roomCount));
  syncDateConstraints();
  calculateTotal();
  showPage("booking");
}

function renderAmenities() {
  const icons = ["utensils", "parking-circle", "wifi", "snowflake", "chef-hat", "sparkles", "stethoscope", "briefcase", "cross", "tree-palm"];
  byId("amenityGrid").innerHTML = profile.amenities.map((item, index) => `
    <article class="amenity">
      <i data-lucide="${icons[index] || "check-circle"}"></i>
      <span>${item}</span>
    </article>
  `).join("");
}

function getSelectedRoom() {
  return profile.rooms.find((room) => room.id === byId("roomType").value) || profile.rooms[0];
}

function calculateTotal() {
  const room = getSelectedRoom();
  const nights = nightsBetween(byId("checkInDate").value, byId("checkOutDate").value);
  const roomCount = Number(byId("roomCount").value || 1);
  const guests = Number(byId("guestCount").value || 1);
  const capacity = room.capacity * roomCount;
  const base = room.price * nights * roomCount;
  const taxes = room.tax * nights * roomCount;
  const meal = byId("mealPlan").checked ? guests * nights * 650 : 0;
  const pickup = byId("pickup").checked ? 900 : 0;
  const total = base + taxes + meal + pickup;

  byId("totalAmount").textContent = formatMoney(total);
  byId("bookingMessage").textContent = guests > capacity ? `${room.name} supports ${capacity} guest(s) for ${roomCount} room(s). Add more rooms or choose Family Room.` : "";
  renderSelectedStaySummary({ room, nights, roomCount, guests, total });

  return { room, nights, roomCount, guests, base, taxes, meal, pickup, total, capacity };
}

function renderSelectedStaySummary({ room, nights, roomCount, guests, total }) {
  const summary = byId("selectedStaySummary");
  if (!summary) return;

  summary.innerHTML = `
    <div>
      <span>Selected room</span>
      <strong>${room.name}</strong>
    </div>
    <div>
      <span>Stay dates</span>
      <strong>${formatDateLabel(byId("checkInDate").value)} to ${formatDateLabel(byId("checkOutDate").value)}</strong>
    </div>
    <div>
      <span>Guests & rooms</span>
      <strong>${guests} guest${guests > 1 ? "s" : ""} | ${roomCount} room${roomCount > 1 ? "s" : ""}</strong>
    </div>
    <div>
      <span>${nights} night${nights > 1 ? "s" : ""} estimate</span>
      <strong>${formatMoney(total)}</strong>
    </div>
  `;
}

function syncQuickBooking(event) {
  event?.preventDefault?.();
  syncDateConstraints();
  byId("checkInDate").value = byId("quickCheckIn").value;
  byId("checkOutDate").value = byId("quickCheckOut").value;
  byId("guestCount").value = byId("quickGuests").value;
  syncDateConstraints();
  calculateTotal();
  renderAvailability();
  showPage("availability");
  return false;
}

window.handleQuickBookingSubmit = (event) => syncQuickBooking(event);

function showPage(page) {
  let targetPage = page || "home";

  if (targetPage === "booking" && !state.roomChosen) {
    targetPage = "availability";
  }

  document.querySelectorAll("[data-page]").forEach((section) => {
    section.classList.toggle("active", section.dataset.page === targetPage);
  });

  document.querySelectorAll("[data-page-support]").forEach((section) => {
    section.classList.toggle("active", section.dataset.pageSupport === targetPage);
  });

  document.querySelectorAll("[data-page-target]").forEach((link) => {
    link.classList.toggle("active", link.dataset.pageTarget === targetPage);
  });

  window.history.replaceState(null, "", targetPage === "home" ? "#top" : `#${targetPage}`);
  window.scrollTo({ top: 0, behavior: "smooth" });

  if (targetPage === "availability") {
    renderAvailability();
  }

  if (targetPage === "booking") {
    window.setTimeout(() => byId("guestName")?.focus({ preventScroll: true }), 350);
  }
}

function initPageTabs() {
  const openPageFromHash = () => {
    const hash = window.location.hash.replace("#", "");
    const knownPages = ["rooms", "availability", "restaurant", "amenities", "reviews", "booking"];
    const initialPage = hash === "booking" ? "availability" : hash;
    showPage(knownPages.includes(initialPage) ? initialPage : "home");
  };

  document.querySelectorAll("[data-page-target]").forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showPage(link.dataset.pageTarget);
    });
  });

  window.addEventListener("hashchange", openPageFromHash);
  openPageFromHash();
}

async function loadPaymentConfig() {
  try {
    const response = await fetch("/api/payment-config");
    if (!response.ok) return;
    state.paymentConfig = await response.json();
  } catch {
    state.paymentConfig = { keyId: "", liveMode: false };
  }
}

function buildBooking(totals) {
  return {
    id: `GIN-${Date.now().toString().slice(-6)}`,
    guest: byId("guestName").value,
    phone: byId("guestPhone").value,
    room: totals.room.name,
    checkIn: byId("checkInDate").value,
    checkOut: byId("checkOutDate").value,
    checkInTime: byId("checkInTime").value,
    checkOutTime: byId("checkOutTime").value,
    guests: totals.guests,
    roomCount: totals.roomCount,
    total: totals.total
  };
}

function renderPaymentSummary(message = "") {
  const booking = state.currentBooking;

  byId("paymentSummary").innerHTML = `
    <div><span>Booking ID</span><strong>${booking.id}</strong></div>
    <div><span>Room</span><strong>${booking.room}</strong></div>
    <div><span>Dates</span><strong>${booking.checkIn} to ${booking.checkOut}</strong></div>
    <div><span>Guests</span><strong>${booking.guests}</strong></div>
    <div><span>Total</span><strong>${formatMoney(booking.total)}</strong></div>
    ${message ? `<p class="payment-hint">${message}</p>` : ""}
  `;
}

function openDemoPayment(message) {
  renderPaymentSummary(message);
  byId("paymentModal").showModal();
  window.lucide?.createIcons();
}

async function verifyPayment(response) {
  const verification = await fetch("/api/verify-payment", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...response,
      bookingId: state.currentBooking.id
    })
  });

  const result = await verification.json();
  if (!verification.ok || !result.verified) {
    throw new Error(result.error || "Payment verification failed.");
  }

  byId("bookingMessage").textContent = `Booking confirmed. ${state.currentBooking.id} for ${state.currentBooking.guest} is paid through Razorpay. Payment ID: ${result.paymentId}.`;
}

async function startRazorpayPayment() {
  byId("payButton").disabled = true;
  byId("bookingMessage").textContent = "Creating secure Razorpay order...";

  try {
    if (window.location.protocol === "file:") {
      byId("bookingMessage").textContent = "";
      openDemoPayment("Open this website through http://localhost:4173 to use the payment server. File preview is using demo confirmation only.");
      return;
    }

    const orderResponse = await fetch("/api/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: state.currentBooking.total,
        bookingId: state.currentBooking.id
      })
    });

    const orderPayload = await orderResponse.json();
    if (!orderResponse.ok) {
      throw new Error(orderPayload.error || "Unable to create payment order.");
    }

    if (orderPayload.demo || !state.paymentConfig.keyId || !window.Razorpay) {
      byId("bookingMessage").textContent = "";
      openDemoPayment("Payment keys are not configured yet, so this local run is using demo confirmation. Add the live gateway keys on the server to enable real checkout.");
      return;
    }

    const checkout = new window.Razorpay({
      key: state.paymentConfig.keyId,
      amount: orderPayload.order.amount,
      currency: orderPayload.order.currency,
      name: "Hotel Gokul Inn & Banquet",
      description: `${state.currentBooking.room} booking`,
      image: `${window.location.origin}/assets/favicon.png`,
      order_id: orderPayload.order.id,
      prefill: {
        name: state.currentBooking.guest,
        contact: state.currentBooking.phone
      },
      notes: {
        bookingId: state.currentBooking.id,
        checkIn: state.currentBooking.checkIn,
        checkOut: state.currentBooking.checkOut
      },
      theme: {
        color: "#0f6f3f"
      },
      handler: async (response) => {
        try {
          await verifyPayment(response);
        } catch (error) {
          byId("bookingMessage").textContent = error.message;
        }
      },
      modal: {
        ondismiss: () => {
          byId("bookingMessage").textContent = "Razorpay checkout was closed before payment.";
        }
      }
    });

    checkout.open();
  } catch (error) {
    byId("bookingMessage").textContent = error.message;
  } finally {
    byId("payButton").disabled = false;
  }
}

async function openPayment(event) {
  event.preventDefault();
  const totals = calculateTotal();
  const checkIn = byId("checkInDate").value;
  const checkOut = byId("checkOutDate").value;

  if (!event.currentTarget.checkValidity()) {
    event.currentTarget.reportValidity();
    return;
  }

  if (parseDateInput(checkOut) <= parseDateInput(checkIn)) {
    byId("bookingMessage").textContent = "Check-out must be after check-in.";
    return;
  }

  if (totals.guests > totals.capacity) {
    return;
  }

  state.currentBooking = buildBooking(totals);
  await startRazorpayPayment();
}

function confirmPayment(event) {
  event.preventDefault();
  byId("paymentModal").close();
  byId("bookingMessage").textContent = `Demo booking confirmed. Add Razorpay keys to collect real payment for ${state.currentBooking.id}.`;
}

function initAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll("[data-animate], .room-card").forEach((item) => observer.observe(item));
}

function initRoomCardAnimations(scope = document) {
  if (!("IntersectionObserver" in window)) {
    scope.querySelectorAll(".room-card").forEach((item) => item.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  scope.querySelectorAll(".room-card").forEach((item) => observer.observe(item));
}

function bindEvents() {
  ["checkInDate", "checkOutDate", "roomType", "guestCount", "roomCount", "mealPlan", "pickup"].forEach((id) => {
    byId(id).addEventListener("input", calculateTotal);
  });

  ["quickCheckIn", "quickCheckOut", "checkInDate", "checkOutDate"].forEach((id) => {
    const input = byId(id);
    input.addEventListener("change", () => {
      syncDateConstraints(id);
      calculateTotal();
    });
  });

  ["quickGuests", "guestCount", "roomCount"].forEach((id) => {
    const input = byId(id);
    input.addEventListener("change", () => {
      const min = Number(input.min || 1);
      const max = Number(input.max || 99);
      const value = Number(input.value || min);
      input.value = Math.min(max, Math.max(min, value));
      calculateTotal();
    });
  });

  byId("quickBooking").addEventListener("submit", syncQuickBooking);
  byId("quickFindButton").addEventListener("click", syncQuickBooking);
  byId("bookingForm").addEventListener("submit", openPayment);
  byId("paymentForm").addEventListener("submit", confirmPayment);
}

function initPreloader() {
  const preloader = byId("preloader");
  window.setTimeout(() => {
    preloader?.classList.add("hidden");
  }, 900);
}

document.addEventListener("DOMContentLoaded", async () => {
  setDefaultDates();
  renderRooms();
  renderAmenities();
  await loadPaymentConfig();
  initPageTabs();
  bindDatePicker();
  bindEvents();
  calculateTotal();
  initAnimations();
  initPreloader();
  window.lucide?.createIcons();
});
