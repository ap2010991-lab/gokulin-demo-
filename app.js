const profile = {
  name: "Hotel Gokul Inn & Banquet",
  address: "9WC5+WMJ, Vapi East, Gita Nagar, Vapi, Gujarat 396191, India",
  phone: "+91 76006 61149",
  rating: 4.5,
  reviewCount: 93,
  amenities: [
    "Madhuvan Restaurant",
    "Buffet breakfast",
    "High-speed Wi-Fi",
    "Free parking",
    "Air conditioning",
    "Tea / coffee maker",
    "24/7 room service",
    "Banquet hall up to 150",
    "Daily housekeeping",
    "Smart TV"
  ],
  rooms: [
    {
      id: "deluxe",
      name: "Deluxe Room",
      size: "Premium comfort",
      bed: "King / Twin Bed",
      bathrooms: 1,
      capacity: 2,
      rates: {
        withBreakfast: { single: 1449, double: 1799 },
        withoutBreakfast: { single: 1349, double: 1599 }
      },
      image: "assets/gallery/room-bright.jpg",
      features: ["Breakfast option", "High-speed Wi-Fi", "Tea/Coffee maker", "Private bathroom"]
    },
    {
      id: "super-deluxe",
      name: "Super Deluxe Room",
      size: "Enhanced comfort",
      bed: "King Bed",
      bathrooms: 1,
      capacity: 2,
      rates: {
        withBreakfast: { single: 1649, double: 2049 },
        withoutBreakfast: { single: 1549, double: 1849 }
      },
      image: "assets/gallery/room-premium.jpg",
      features: ["Breakfast option", "Smart LED TV", "Work desk", "Premium toiletries"]
    },
    {
      id: "suite",
      name: "Suite Room",
      size: "Spacious living area",
      bed: "King Bed",
      bathrooms: 1,
      capacity: 2,
      rates: {
        withBreakfast: { single: 2449, double: 3000 },
        withoutBreakfast: { single: 2349, double: 2800 }
      },
      image: "assets/gallery/suite-room.jpg",
      features: ["Breakfast option", "Tea/Coffee maker", "Work desk", "Bath amenities"]
    },
    {
      id: "royal-suite",
      name: "Royal Suite",
      size: "Top category",
      bed: "King Bed",
      bathrooms: 1,
      capacity: 2,
      rates: {
        withBreakfast: { single: null, double: 3499 },
        withoutBreakfast: { single: null, double: 3299 }
      },
      image: "assets/gallery/room-city-view.jpg",
      features: ["Breakfast option", "Spacious layout", "Smart LED TV", "Premium stay"]
    }
  ]
};

const defaultContent = {
  heroTitle: "Hotel Gokul Inn & Banquet",
  heroCopy: "Where comfort meets luxury: a trusted hotel in Vapi near Vapi Railway Station with 53 thoughtful rooms, Madhuvan pure vegetarian restaurant, online booking, partial payment, and a versatile banquet hall for celebrations and corporate gatherings of up to 150 guests.",
  restaurantTitle: "Madhuvan Restaurant",
  restaurantCopy: "Located at Hotel Gokul Inn opposite Vapi Railway Station, Madhuvan is a pure vegetarian, Jain-friendly multi-cuisine destination serving breakfast, brunch, lunch and dinner from 8:00 AM to 11:00 PM.",
  banquetTitle: "Elegant moments, thoughtfully hosted.",
  banquetCopy: "Directly opposite Vapi Railway Station (East), our versatile hall welcomes corporate events, meetings, parties, marriage functions, anniversaries and special occasions with seating arrangements for up to 150 guests.",
  rooms: profile.rooms.map((room) => ({ ...room, active: true }))
};

const defaultInventory = {
  "deluxe": 18,
  "super-deluxe": 16,
  "suite": 13,
  "royal-suite": 6
};

const state = {
  selectedRoom: "deluxe",
  roomChosen: false,
  currentBooking: null,
  paymentConfig: {
    keyId: "",
    liveMode: false
  },
  availability: {
    inventory: { ...defaultInventory },
    bookings: []
  }
};

const formatMoney = (value) => `INR ${Math.round(value).toLocaleString("en-IN")}`;
const extraBedRates = {
  withBreakfast: 599,
  withoutBreakfast: 499
};

function getRoomRate(room, guests = 2, roomCount = 1, includeBreakfast = true) {
  const planKey = includeBreakfast ? "withBreakfast" : "withoutBreakfast";
  const rates = room.rates[planKey];
  const guestsPerRoom = Math.ceil(Number(guests || 1) / Math.max(1, Number(roomCount || 1)));
  const preferredOccupancy = guestsPerRoom <= 1 && rates.single ? "single" : "double";
  const amount = rates[preferredOccupancy] ?? rates.double ?? rates.single;

  return {
    amount,
    occupancy: preferredOccupancy,
    occupancyLabel: preferredOccupancy === "single" ? "Single occupancy" : "Double occupancy",
    planKey,
    planLabel: includeBreakfast ? "With breakfast" : "Without breakfast"
  };
}

function rangesOverlap(startA, endA, startB, endB) {
  return parseDateInput(startA) < parseDateInput(endB) && parseDateInput(endA) > parseDateInput(startB);
}

function getBookedRooms(roomId, checkIn, checkOut) {
  return state.availability.bookings
    .filter((booking) => booking.roomId === roomId && booking.status !== "cancelled" && rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut))
    .reduce((sum, booking) => sum + Number(booking.roomCount || 1), 0);
}

function getAvailableRoomCount(roomId, checkIn = byId("checkInDate")?.value, checkOut = byId("checkOutDate")?.value) {
  const total = Number(state.availability.inventory[roomId] ?? 0);
  if (!checkIn || !checkOut) return total;
  return Math.max(0, total - getBookedRooms(roomId, checkIn, checkOut));
}

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
const activeRooms = () => profile.rooms.filter((room) => room.active !== false);

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

function applySiteContent(content = {}) {
  const merged = { ...defaultContent, ...content };
  byId("heroTitle").textContent = merged.heroTitle;
  byId("heroCopy").textContent = merged.heroCopy;
  byId("restaurantTitle").textContent = merged.restaurantTitle;
  byId("restaurantCopy").textContent = merged.restaurantCopy;
  byId("banquetTitle").textContent = merged.banquetTitle;
  byId("banquetCopy").textContent = merged.banquetCopy;

  if (Array.isArray(merged.rooms)) {
    const savedById = Object.fromEntries(merged.rooms.map((room) => [room.id, room]));
    profile.rooms = defaultContent.rooms.map((room) => mergeRoom(room, savedById[room.id]));
  }
}

async function loadSiteContent() {
  try {
    const response = await fetch("/api/content");
    if (!response.ok) throw new Error("Content API unavailable.");
    applySiteContent(await response.json());
  } catch {
    applySiteContent(defaultContent);
  }
}
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

  roomGrid.innerHTML = activeRooms().map((room) => {
    const singleRate = getRoomRate(room, 1, 1, true);
    const doubleRate = getRoomRate(room, 2, 1, true);
    return `
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
          <div class="rate-strip">
            <span>Single ${singleRate.amount ? formatMoney(singleRate.amount) : "on double rate"}</span>
            <span>Double ${formatMoney(doubleRate.amount)}</span>
          </div>
          <div class="room-price">
            <div>
              <strong>From ${formatMoney(singleRate.amount || doubleRate.amount)}</strong>
              <span>/ night with breakfast</span>
            </div>
            <button class="select-room" type="button" data-select-room="${room.id}">Select</button>
          </div>
        </div>
      </article>
    `;
  }).join("");

  roomType.innerHTML = activeRooms().map((room) => `
    <option value="${room.id}">${room.name}</option>
  `).join("");

  bindRoomSelection(roomGrid);
}

function buildRoomCard(room, options = {}) {
  const nights = options.nights || 1;
  const guests = Number(options.guests || 1);
  const roomsNeeded = Math.max(1, Math.ceil((options.guests || 1) / room.capacity));
  const roomCount = options.showStayTotal ? roomsNeeded : 1;
  const rate = getRoomRate(room, guests, roomCount, true);
  const stayTotal = rate.amount * nights * roomCount;
  const available = options.checkIn && options.checkOut ? getAvailableRoomCount(room.id, options.checkIn, options.checkOut) : getAvailableRoomCount(room.id);
  const canSelect = available >= roomCount;
  const capacityText = roomCount > 1 ? `${roomCount} rooms suggested` : `Up to ${room.capacity} guests`;

  return `
    <article class="room-card ${options.showStayTotal ? "availability-card compact-stay-card" : ""}" data-room="${room.id}">
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
          ${options.showStayTotal ? `<span>${available} available</span>` : ""}
        </div>
        <p>${room.features.join(" | ")}</p>
        ${options.showStayTotal ? `
          <div class="availability-detail">
            <div><span>Plan</span><strong>${rate.planLabel}</strong></div>
            <div><span>Occupancy rate</span><strong>${rate.occupancyLabel}</strong></div>
            <div><span>Nightly room price</span><strong>${formatMoney(rate.amount)}</strong></div>
            <div><span>${nights} night${nights > 1 ? "s" : ""} total</span><strong>${formatMoney(stayTotal)}</strong></div>
          </div>
        ` : ""}
        <div class="room-price">
          <div>
            <strong>${options.showStayTotal ? formatMoney(stayTotal) : formatMoney(rate.amount)}</strong>
            <span>${options.showStayTotal ? "with breakfast estimate" : "/ night with breakfast"}</span>
          </div>
          <button class="select-room" type="button" data-select-room="${room.id}" data-room-count="${roomCount}" ${canSelect ? "" : "disabled"}>${canSelect ? "Select" : "Sold out"}</button>
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
  grid.innerHTML = activeRooms().map((room) => buildRoomCard(room, {
    nights,
    guests,
    checkIn,
    checkOut,
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
  return activeRooms().find((room) => room.id === byId("roomType").value) || activeRooms()[0] || profile.rooms[0];
}

function calculateTotal() {
  const room = getSelectedRoom();
  const nights = nightsBetween(byId("checkInDate").value, byId("checkOutDate").value);
  const roomCount = Number(byId("roomCount").value || 1);
  const guests = Number(byId("guestCount").value || 1);
  const capacity = room.capacity * roomCount;
  const includeBreakfast = byId("mealPlan").checked;
  const rate = getRoomRate(room, guests, roomCount, includeBreakfast);
  const base = rate.amount * nights * roomCount;
  const taxes = 0;
  const meal = 0;
  const pickup = byId("pickup").checked ? 900 : 0;
  const total = base + taxes + meal + pickup;

  byId("totalAmount").textContent = formatMoney(total);
  byId("bookingMessage").textContent = guests > capacity ? `${room.name} supports ${capacity} guest(s) for ${roomCount} room(s). Add more rooms to continue.` : "";
  renderSelectedStaySummary({ room, nights, roomCount, guests, total, rate });

  return { room, nights, roomCount, guests, base, taxes, meal, pickup, total, capacity, rate, includeBreakfast };
}

function renderSelectedStaySummary({ room, nights, roomCount, guests, total, rate }) {
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
      <span>${rate?.planLabel || "Rate plan"}</span>
      <strong>${rate?.occupancyLabel || "Selected rate"}</strong>
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
    const knownPages = ["rooms", "availability", "restaurant", "banquet", "amenities", "reviews", "booking"];
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

async function loadAvailability() {
  try {
    const response = await fetch("/api/availability");
    if (!response.ok) throw new Error("Availability API unavailable.");
    const payload = await response.json();
    state.availability = {
      inventory: { ...defaultInventory, ...(payload.inventory || {}) },
      bookings: payload.bookings || []
    };
  } catch {
    state.availability = {
      inventory: { ...defaultInventory },
      bookings: []
    };
  }
}

function animateCounters() {
  const counters = document.querySelectorAll("[data-count]");
  if (!counters.length) return;

  const runCounter = (item) => {
    const target = Number(item.dataset.count);
    const isDecimal = item.dataset.count.includes(".");
    const duration = 1200;
    const start = performance.now();

    const tick = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      item.textContent = isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString("en-IN");
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  };

  if (!("IntersectionObserver" in window)) {
    counters.forEach(runCounter);
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        runCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

async function submitBanquetEnquiry(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const enquiry = {
    id: `BANQ-${Date.now().toString().slice(-6)}`,
    name: byId("banquetName").value,
    phone: byId("banquetPhone").value,
    eventDate: byId("banquetDate").value,
    eventType: byId("banquetType").value,
    guests: byId("banquetGuests").value,
    package: byId("banquetPackage").value,
    message: byId("banquetMessage").value,
    status: "new",
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch("/api/banquet-bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(enquiry)
    });
    if (!response.ok) throw new Error("Banquet enquiry could not be saved.");
    byId("banquetFormMessage").textContent = "Banquet enquiry saved. Our team will contact you shortly.";
    form.reset();
  } catch {
    const text = encodeURIComponent(`Hello Hotel Gokul Inn, I want to book the banquet. Name: ${enquiry.name}, Phone: ${enquiry.phone}, Date: ${enquiry.eventDate}, Guests: ${enquiry.guests}, Package: ${enquiry.package}`);
    byId("banquetFormMessage").innerHTML = `Banquet enquiry is ready. <a href="https://wa.me/917600661149?text=${text}" target="_blank" rel="noopener">Send it on WhatsApp</a>.`;
  }
}

function buildBooking(totals) {
  const paymentOption = document.querySelector("input[name='paymentOption']:checked")?.value || "full";
  const paymentDue = paymentOption === "partial-300" ? 300 : paymentOption === "partial-500" ? 500 : totals.total;

  return {
    id: `GIN-${Date.now().toString().slice(-6)}`,
    guest: byId("guestName").value,
    phone: byId("guestPhone").value,
    roomId: totals.room.id,
    room: totals.room.name,
    checkIn: byId("checkInDate").value,
    checkOut: byId("checkOutDate").value,
    checkInTime: byId("checkInTime").value,
    checkOutTime: byId("checkOutTime").value,
    guests: totals.guests,
    roomCount: totals.roomCount,
    ratePlan: totals.rate.planLabel,
    occupancy: totals.rate.occupancyLabel,
    total: totals.total,
    paymentOption,
    paymentDue,
    balanceDue: Math.max(0, totals.total - paymentDue),
    status: "pending"
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
    <div><span>Pay now</span><strong>${formatMoney(booking.paymentDue)}</strong></div>
    <div><span>Pay at counter</span><strong>${formatMoney(booking.balanceDue)}</strong></div>
    ${message ? `<p class="payment-hint">${message}</p>` : ""}
  `;
}

async function saveBooking(paymentDetails = {}) {
  const booking = {
    ...state.currentBooking,
    ...paymentDetails,
    status: "confirmed",
    createdAt: new Date().toISOString()
  };

  try {
    const response = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });
    if (response.ok) {
      const payload = await response.json();
      state.currentBooking = payload.booking || booking;
    }
  } catch {
    // The booking still completes visually in static preview; the Node server stores it when deployed.
  }

  await loadAvailability();
  return state.currentBooking;
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

  await saveBooking({
    paymentId: result.paymentId,
    paymentStatus: state.currentBooking.balanceDue > 0 ? "partial-paid" : "paid",
    paidAmount: state.currentBooking.paymentDue
  });
  byId("bookingMessage").textContent = `Booking confirmed. ${state.currentBooking.id} for ${state.currentBooking.guest}. Paid ${formatMoney(state.currentBooking.paymentDue)} through Razorpay. Balance: ${formatMoney(state.currentBooking.balanceDue)}.`;
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
        amount: state.currentBooking.paymentDue,
        paymentAmount: state.currentBooking.paymentDue,
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
        checkOut: state.currentBooking.checkOut,
        paymentOption: state.currentBooking.paymentOption,
        balanceDue: state.currentBooking.balanceDue
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

  if (totals.roomCount > getAvailableRoomCount(totals.room.id, checkIn, checkOut)) {
    byId("bookingMessage").textContent = "Selected room count is no longer available for these dates. Please choose another room or date.";
    await loadAvailability();
    renderAvailability();
    showPage("availability");
    return;
  }

  state.currentBooking = buildBooking(totals);
  await startRazorpayPayment();
}

function confirmPayment(event) {
  event.preventDefault();
  byId("paymentModal").close();
  saveBooking({
    paymentId: `pay_demo_${Date.now()}`,
    paymentStatus: state.currentBooking.balanceDue > 0 ? "partial-paid-demo" : "paid-demo",
    paidAmount: state.currentBooking.paymentDue
  }).then(() => {
    byId("bookingMessage").textContent = `Demo booking confirmed. ${state.currentBooking.id} is saved for admin view. Paid now: ${formatMoney(state.currentBooking.paymentDue)}. Balance at counter: ${formatMoney(state.currentBooking.balanceDue)}.`;
  });
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

  document.querySelectorAll("input[name='paymentOption']").forEach((input) => {
    input.addEventListener("change", calculateTotal);
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
  byId("banquetEnquiryForm")?.addEventListener("submit", submitBanquetEnquiry);

  document.querySelectorAll("[data-amenity-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      const key = button.dataset.amenityTab;
      document.querySelectorAll("[data-amenity-tab]").forEach((tab) => tab.classList.toggle("active", tab === button));
      document.querySelectorAll("[data-amenity-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.amenityPanel === key));
      window.lucide?.createIcons();
    });
  });
}

function initPreloader() {
  const preloader = byId("preloader");
  window.setTimeout(() => {
    preloader?.classList.add("hidden");
  }, 900);
}

document.addEventListener("DOMContentLoaded", async () => {
  setDefaultDates();
  await loadSiteContent();
  renderRooms();
  renderAmenities();
  await loadPaymentConfig();
  await loadAvailability();
  initPageTabs();
  bindDatePicker();
  bindEvents();
  calculateTotal();
  initAnimations();
  animateCounters();
  initPreloader();
  window.lucide?.createIcons();
});
