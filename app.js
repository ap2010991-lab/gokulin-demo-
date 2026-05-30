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
    "Banquet hall up to 150+",
    "Daily housekeeping",
    "Smart TV",
    "Complimentary dental kit",
    "Comb",
    "Hair oil"
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

const fiveStarReviews = [
  { name: "advocate chandrakant", text: "Well organised and mannered staff with efficient management. Good AC, Smart TV, Wi-Fi, hot water, veg food and complimentary breakfast made our family stay fully satisfying." },
  { name: "Jigar Chauhan", text: "Wonderful stay at a newly developed, clean and well-maintained property. Excellent food, prime location opposite Vapi Railway Station, spacious rooms and polite professional staff." },
  { name: "Rupesh Nagle", text: "Very good hotel and very gentle staff. Just 200 meters from the railway station. The team even couriered back a watch forgotten in the room." },
  { name: "Kumar Swami", text: "Amazing stay just outside Vapi railway station. Hotel staff were courteous and the food was amazing. Recommended." },
  { name: "Kalpesh Kothari", text: "Very good location outside Vapi Railway Station. Decent room size for a business trip, good interiors, fresh restaurant food and helpful reception support." },
  { name: "Ankur Hadiya", text: "Best hotel and restaurant in Vapi. Gokul Inn is right in front of Vapi Railway Station. Must stay here if you are visiting Vapi." },
  { name: "Harrison Pritchard", text: "The room at Hotel Gokul was nice and spacious. The building is good quality, and the staff are very helpful." },
  { name: "Balachandra Bhat", text: "Rooms were very clean, construction is new, with an attached hotel and a location right next to Vapi station." },
  { name: "Shekhar S", text: "Spacious rooms, very supportive and cooperative staff, perfect location and value more than money." },
  { name: "Himanshu Ruparel", text: "Just beside Vapi railway station platform number 3, near the market and with food options available close by." },
  { name: "Chaitali Patel", text: "Nice experience with comfort and service. Buffet breakfast was awesome." },
  { name: "WASIM MANZOOR", text: "Very caring about guests and everything there was fine." },
  { name: "Dipak Prajapati", text: "Best hotel and rooms near Vapi station. Good and nice service at Hotel Gokul Inn." },
  { name: "pranav bhatt", text: "Nice clean and hygienic rooms with polite staff." },
  { name: "Gourav Khajuria", text: "Good food and very good person to serve the food." },
  { name: "Rajat Subhra Mondal", text: "No. 1 hotel at Vapi. Best of the best. The food was best." },
  { name: "sourabh pareek", text: "Good service and laundry also excellent." },
  { name: "pavan jonpelliwar", text: "Good staff, good food and excellent stay." },
  { name: "PRINCE KUMAR", text: "Best service overall. Staff is very cooperative." },
  { name: "Monojit Dey", text: "Easy to access location, good property and very good overall." },
  { name: "Raja Hindustani", text: "Nice stay and great hotel." },
  { name: "Abdul Qayyum", text: "Good food and very cooperative staff. Enjoyed the stay." },
  { name: "Mubarak Ali", text: "Best stay in Vapi." },
  { name: "Samadhan Dabhade", text: "Service is awesome." },
  { name: "sikkander seeni", text: "Very good service, nice dealing and quick response." },
  { name: "Vijay Kumar", text: "Good hotel nearby railway station." },
  { name: "Goraksh Surve", text: "Good and clean room." },
  { name: "Dharmendr Kumar", text: "Nice room and good location." },
  { name: "mohan pandit", text: "Very nice to observe." },
  { name: "Vivek Rautela", text: "Ultimate service." },
  { name: "Ahir Sanjay", text: "Best place in all Vapi location area." },
  { name: "Manivannan Tnj", text: "Good quality with responsibility." },
  { name: "Ahmed Tapale", text: "Staff is good." },
  { name: "nakum Rakesh", text: "Very good." },
  { name: "Soni Chetankumar", text: "Excellent room." },
  { name: "amitkumar singh", text: "Overall everything is good." },
  { name: "parag thacker", text: "Comfortable rooms." },
  { name: "santosh sontakke", text: "Hotel is good. Take care of your clothes and belonging accessories." },
  { name: "Sumit Singh", text: "Location is best." },
  { name: "Niyant Thakkar", text: "Very nice place to stay." },
  { name: "paruvolu prasad", text: "Good hotel to stay." },
  { name: "Vinod Kumar", text: "Good for stay." },
  { name: "Pramod MM", text: "Good room and service, all are good." },
  { name: "rajendra vaghela", text: "Very nice." },
  { name: "Srinivas Mogili", text: "Good maintenance." },
  { name: "Abhay Rohilla", text: "Best stays in Vapi." },
  { name: "Dheeru Kumar", text: "Nice hotel and very nice stay." },
  { name: "Sanathana S", text: "Good location." },
  { name: "Amit Kumar", text: "Excellent." },
  { name: "Vikash Vikas", text: "Saandaar. Excellent experience." },
  { name: "Parth Dhameliya", text: "Bahot he mast hotel hai or service bhi mast hai. Very great hotel and service too." }
];

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
  selectedRooms: {},
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
    .filter((booking) => booking.status !== "cancelled" && rangesOverlap(checkIn, checkOut, booking.checkIn, booking.checkOut))
    .reduce((sum, booking) => {
      if (Array.isArray(booking.roomSelections)) {
        return sum + booking.roomSelections
          .filter((selection) => selection.roomId === roomId)
          .reduce((total, selection) => total + Number(selection.count || 0), 0);
      }
      return booking.roomId === roomId ? sum + Number(booking.roomCount || 1) : sum;
    }, 0);
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
  const selected = state.selectedRooms[room.id] || {};
  const selectedCount = Number(selected.count || 0);
  const includeBreakfast = selected.includeBreakfast !== false;
  const extraBed = room.id !== "deluxe" && selected.extraBed === true;
  const roomsNeeded = Math.max(1, Math.ceil((options.guests || 1) / room.capacity));
  const roomCount = options.showStayTotal ? Math.max(selectedCount || roomsNeeded, 1) : 1;
  const rate = getRoomRate(room, guests, roomCount, includeBreakfast);
  const extraBedTotal = extraBed ? extraBedRates.withBreakfast * nights * roomCount : 0;
  const stayTotal = (rate.amount * nights * roomCount) + extraBedTotal;
  const available = options.checkIn && options.checkOut ? getAvailableRoomCount(room.id, options.checkIn, options.checkOut) : getAvailableRoomCount(room.id);
  const canSelect = available > 0;
  const capacityText = selectedCount > 0 ? `${selectedCount} selected` : `Up to ${room.capacity} guests`;

  return `
    <article class="room-card ${options.showStayTotal ? "availability-card compact-stay-card" : ""} ${selectedCount ? "selected" : ""}" data-room="${room.id}">
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
            ${extraBed ? `<div><span>Extra bed</span><strong>${formatMoney(extraBedRates.withBreakfast)} / night</strong></div>` : ""}
            <div><span>${nights} night${nights > 1 ? "s" : ""} total</span><strong>${formatMoney(stayTotal)}</strong></div>
          </div>
          <div class="room-booking-options">
            <label>
              <span>Rooms</span>
              <input type="number" min="0" max="${available}" value="${selectedCount}" data-room-qty="${room.id}" ${canSelect ? "" : "disabled"} />
            </label>
            <label class="option-check">
              <input type="checkbox" data-room-breakfast="${room.id}" ${includeBreakfast ? "checked" : ""} />
              <span>Breakfast rate</span>
            </label>
            ${room.id !== "deluxe" ? `
              <label class="option-check">
                <input type="checkbox" data-room-extra-bed="${room.id}" ${extraBed ? "checked" : ""} />
                <span>Extra bed + 1 person, INR 599 with breakfast</span>
              </label>
            ` : ""}
          </div>
        ` : ""}
        <div class="room-price">
          <div>
            <strong>${options.showStayTotal ? formatMoney(stayTotal) : formatMoney(rate.amount)}</strong>
            <span>${options.showStayTotal ? "selected estimate" : "/ night with breakfast"}</span>
          </div>
          <button class="select-room" type="button" data-select-room="${room.id}" data-room-count="${Math.max(1, selectedCount || roomsNeeded)}" ${canSelect ? "" : "disabled"}>${selectedCount ? "Selected" : canSelect ? "Add" : "Sold out"}</button>
        </div>
      </div>
    </article>
  `;
}

function renderAvailability() {
  const checkIn = byId("quickCheckIn").value || byId("checkInDate").value;
  const checkOut = byId("quickCheckOut").value || byId("checkOutDate").value;
  const adults = Number(byId("quickAdults").value || byId("adultCount").value || 1);
  const children = Number(byId("quickChildren").value || byId("childCount").value || 0);
  const guests = adults + children;
  const nights = nightsBetween(checkIn, checkOut);
  const grid = byId("availabilityGrid");

  byId("searchSummary").textContent = `${formatDateLabel(checkIn)} to ${formatDateLabel(checkOut)} | ${nights} night${nights > 1 ? "s" : ""} | ${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""}`;
  grid.innerHTML = activeRooms().map((room) => buildRoomCard(room, {
    nights,
    guests,
    checkIn,
    checkOut,
    showStayTotal: true
  })).join("");

  bindRoomSelection(grid);
  bindRoomOptionControls(grid);
  renderAvailabilitySelectionSummary();
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

function bindRoomOptionControls(scope = document) {
  scope.querySelectorAll("[data-room-qty]").forEach((input) => {
    input.addEventListener("change", () => {
      const roomId = input.dataset.roomQty;
      const count = Math.max(0, Math.min(Number(input.max || 0), Number(input.value || 0)));
      input.value = count;
      updateSelectedRoom(roomId, { count });
    });
  });

  scope.querySelectorAll("[data-room-breakfast]").forEach((input) => {
    input.addEventListener("change", () => {
      const current = state.selectedRooms[input.dataset.roomBreakfast]?.count || 1;
      updateSelectedRoom(input.dataset.roomBreakfast, { includeBreakfast: input.checked, count: current });
    });
  });

  scope.querySelectorAll("[data-room-extra-bed]").forEach((input) => {
    input.addEventListener("change", () => {
      const current = state.selectedRooms[input.dataset.roomExtraBed]?.count || 1;
      updateSelectedRoom(input.dataset.roomExtraBed, { extraBed: input.checked, count: current });
    });
  });
}

function updateSelectedRoom(roomId, updates = {}) {
  const previous = state.selectedRooms[roomId] || { roomId, count: 0, includeBreakfast: true, extraBed: false };
  const next = { ...previous, ...updates };
  if (next.count <= 0) {
    delete state.selectedRooms[roomId];
  } else {
    state.selectedRooms[roomId] = next;
  }
  state.roomChosen = getSelectedRoomItems().length > 0;
  renderAvailability();
  calculateTotal();
}

function selectRoom(roomId, roomCount = 1) {
  state.selectedRoom = roomId;
  updateSelectedRoom(roomId, { count: Math.max(1, roomCount) });
}

function continueToBooking() {
  if (!getSelectedRoomItems().length) {
    byId("availabilitySelectedSummary").textContent = "Please select at least one room to continue.";
    return;
  }
  state.roomChosen = true;
  syncDateConstraints();
  calculateTotal();
  showPage("booking");
}

function renderAmenities() {
  const icons = ["utensils", "parking-circle", "wifi", "snowflake", "chef-hat", "sparkles", "stethoscope", "briefcase", "cross", "tree-palm", "badge-check", "scissors", "droplets"];
  byId("amenityGrid").innerHTML = profile.amenities.map((item, index) => `
    <article class="amenity">
      <i data-lucide="${icons[index] || "check-circle"}"></i>
      <span>${item}</span>
    </article>
  `).join("");
}

function renderFiveStarReviews() {
  const track = byId("reviewTrack");
  if (!track) return;

  track.innerHTML = "";
  [...fiveStarReviews, ...fiveStarReviews].forEach((review, index) => {
    const card = document.createElement("article");
    card.className = "review-card";
    if (index >= fiveStarReviews.length) card.setAttribute("aria-hidden", "true");

    const stars = document.createElement("span");
    stars.className = "review-stars";
    stars.textContent = "5-star Google review";

    const quote = document.createElement("p");
    quote.textContent = review.text;

    const name = document.createElement("strong");
    name.textContent = review.name;

    card.append(stars, quote, name);
    track.appendChild(card);
  });
}

function getSelectedRoom() {
  return activeRooms().find((room) => room.id === byId("roomType").value) || activeRooms()[0] || profile.rooms[0];
}

function getSelectedRoomItems() {
  return Object.values(state.selectedRooms)
    .filter((selection) => Number(selection.count || 0) > 0)
    .map((selection) => {
      const room = activeRooms().find((item) => item.id === selection.roomId);
      return room ? { ...selection, room } : null;
    })
    .filter(Boolean);
}

function getGuestCounts() {
  const adults = Math.max(1, Number(byId("adultCount")?.value || byId("quickAdults")?.value || 1));
  const children = Math.max(0, Number(byId("childCount")?.value || byId("quickChildren")?.value || 0));
  return { adults, children, guests: adults + children };
}

function redirectLargeGroupToWhatsApp(adults) {
  if (adults <= 10) return false;
  const text = encodeURIComponent(`Hello Hotel Gokul Inn, I want to book rooms for ${adults} adults. Please help me with group booking availability.`);
  window.open(`https://wa.me/917600661149?text=${text}`, "_blank", "noopener");
  return true;
}

function calculateTotal() {
  const nights = nightsBetween(byId("checkInDate").value, byId("checkOutDate").value);
  const { adults, children, guests } = getGuestCounts();
  byId("guestCount").value = guests;
  const items = getSelectedRoomItems();
  const fallbackRoom = getSelectedRoom();
  const selectedItems = items.length ? items : [{ room: fallbackRoom, roomId: fallbackRoom.id, count: Number(byId("roomCount").value || 1), includeBreakfast: byId("mealPlan").checked, extraBed: false }];
  const lines = selectedItems.map((item) => {
    const rate = getRoomRate(item.room, item.room.capacity, item.count, item.includeBreakfast !== false);
    const extraBedCount = item.room.id !== "deluxe" && item.extraBed ? item.count : 0;
    const roomTotal = rate.amount * nights * item.count;
    const extraBedTotal = extraBedCount * extraBedRates.withBreakfast * nights;
    return {
      ...item,
      rate,
      roomTotal,
      extraBedCount,
      extraBedTotal,
      total: roomTotal + extraBedTotal,
      capacity: item.room.capacity * item.count + extraBedCount
    };
  });
  const room = lines[0].room;
  const roomCount = lines.reduce((sum, line) => sum + Number(line.count || 0), 0);
  const capacity = lines.reduce((sum, line) => sum + line.capacity, 0);
  const base = lines.reduce((sum, line) => sum + line.total, 0);
  const taxes = 0;
  const meal = 0;
  const pickup = byId("pickup").checked ? 900 : 0;
  const total = base + taxes + meal + pickup;

  byId("totalAmount").textContent = formatMoney(total);
  byId("roomCount").value = roomCount || 1;
  byId("roomType").value = room.id;
  byId("bookingMessage").textContent = guests > capacity ? `Selected rooms support ${capacity} guest(s). Add more rooms or extra bed to continue.` : "";
  renderSelectedStaySummary({ lines, nights, roomCount, guests, adults, children, total });

  return { room, lines, nights, roomCount, guests, adults, children, base, taxes, meal, pickup, total, capacity, rate: lines[0].rate, includeBreakfast: lines.every((line) => line.includeBreakfast !== false) };
}

function renderSelectedStaySummary({ lines = [], nights, roomCount, guests, adults, children, total }) {
  const summary = byId("selectedStaySummary");
  if (!summary) return;
  const roomText = lines.map((line) => `${line.count} ${line.room.name}${line.extraBedCount ? ` + ${line.extraBedCount} extra bed` : ""}`).join(", ");
  const planText = lines.map((line) => `${line.room.name}: ${line.rate.planLabel}`).join(" | ");

  summary.innerHTML = `
    <div>
      <span>Selected rooms</span>
      <strong>${roomText || "Select room"}</strong>
    </div>
    <div>
      <span>Stay dates</span>
      <strong>${formatDateLabel(byId("checkInDate").value)} to ${formatDateLabel(byId("checkOutDate").value)}</strong>
    </div>
    <div>
      <span>Guests & rooms</span>
      <strong>${adults} adult${adults > 1 ? "s" : ""}${children ? `, ${children} child${children > 1 ? "ren" : ""}` : ""} | ${roomCount} room${roomCount > 1 ? "s" : ""}</strong>
    </div>
    <div>
      <span>Rate plans</span>
      <strong>${planText || "Selected rate"}</strong>
    </div>
    <div>
      <span>${nights} night${nights > 1 ? "s" : ""} estimate</span>
      <strong>${formatMoney(total)}</strong>
    </div>
  `;
}

function renderAvailabilitySelectionSummary() {
  const items = getSelectedRoomItems();
  const summary = byId("availabilitySelectedSummary");
  const next = byId("continueToBooking");
  if (!summary || !next) return;
  const count = items.reduce((sum, item) => sum + Number(item.count || 0), 0);
  summary.textContent = count ? `${count} room${count > 1 ? "s" : ""} selected: ${items.map((item) => `${item.count} ${item.room.name}`).join(", ")}` : "Select one or more rooms to continue.";
  next.disabled = count === 0;
}

function syncQuickBooking(event) {
  event?.preventDefault?.();
  syncDateConstraints();
  byId("checkInDate").value = byId("quickCheckIn").value;
  byId("checkOutDate").value = byId("quickCheckOut").value;
  if (redirectLargeGroupToWhatsApp(Number(byId("quickAdults").value || 1))) return false;
  byId("adultCount").value = byId("quickAdults").value;
  byId("childCount").value = byId("quickChildren").value || 0;
  byId("guestCount").value = Number(byId("adultCount").value || 1) + Number(byId("childCount").value || 0);
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

  document.body.dataset.activePage = targetPage;

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
      const suffix = item.dataset.suffix || "";
      item.textContent = `${isDecimal ? value.toFixed(1) : Math.round(value).toLocaleString("en-IN")}${suffix}`;
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
  byId("banquetFormMessage").textContent = "Sending your banquet request...";
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
    byId("banquetFormMessage").textContent = "Request sent successfully. Our banquet team will contact you shortly.";
    form.reset();
  } catch {
    const text = encodeURIComponent(`Hello Hotel Gokul Inn, I want to book the banquet. Name: ${enquiry.name}, Phone: ${enquiry.phone}, Date: ${enquiry.eventDate}, Guests: ${enquiry.guests}, Package: ${enquiry.package}`);
    byId("banquetFormMessage").innerHTML = `Banquet enquiry is ready. <a href="https://wa.me/917600661149?text=${text}" target="_blank" rel="noopener">Send it on WhatsApp</a>.`;
  }
}

function buildBooking(totals) {
  const paymentOption = document.querySelector("input[name='paymentOption']:checked")?.value || "full";
  const paymentDue = paymentOption === "partial-500" ? 500 : totals.total;
  const roomSelections = totals.lines.map((line) => ({
    roomId: line.room.id,
    room: line.room.name,
    count: line.count,
    ratePlan: line.rate.planLabel,
    occupancy: line.rate.occupancyLabel,
    nightlyRate: line.rate.amount,
    extraBedCount: line.extraBedCount,
    extraBedRate: line.extraBedCount ? extraBedRates.withBreakfast : 0,
    total: line.total
  }));
  const roomName = roomSelections.map((line) => `${line.count} ${line.room}${line.extraBedCount ? ` + ${line.extraBedCount} extra bed` : ""}`).join(", ");

  return {
    id: `GIN-${Date.now().toString().slice(-6)}`,
    guest: byId("guestName").value,
    phone: byId("guestPhone").value,
    roomId: totals.room.id,
    room: roomName,
    roomSelections,
    checkIn: byId("checkInDate").value,
    checkOut: byId("checkOutDate").value,
    checkInTime: byId("checkInTime").value,
    checkOutTime: byId("checkOutTime").value,
    guests: totals.guests,
    adults: totals.adults,
    children: totals.children,
    roomCount: totals.roomCount,
    ratePlan: roomSelections.map((line) => `${line.room}: ${line.ratePlan}`).join(" | "),
    occupancy: roomSelections.map((line) => `${line.room}: ${line.occupancy}`).join(" | "),
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

  const unavailable = totals.lines.find((line) => line.count > getAvailableRoomCount(line.room.id, checkIn, checkOut));
  if (unavailable) {
    byId("bookingMessage").textContent = `${unavailable.room.name} is no longer available for the selected quantity. Please choose another room or date.`;
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
  ["checkInDate", "checkOutDate", "roomType", "guestCount", "roomCount", "mealPlan", "pickup", "adultCount", "childCount"].forEach((id) => {
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

  ["quickAdults", "quickChildren", "adultCount", "childCount", "guestCount", "roomCount"].forEach((id) => {
    const input = byId(id);
    input.addEventListener("input", () => {
      const min = Number(input.min || 1);
      const max = Number(input.max || 99);
      const value = Number(input.value || min);
      input.value = Math.min(max, Math.max(min, value));
      if ((id === "quickAdults" || id === "adultCount") && redirectLargeGroupToWhatsApp(Number(input.value || 1))) {
        input.value = 10;
      }
      byId("guestCount").value = Number(byId("adultCount").value || byId("quickAdults").value || 1) + Number(byId("childCount").value || byId("quickChildren").value || 0);
      calculateTotal();
      renderAvailabilitySelectionSummary();
    });
  });

  byId("quickBooking").addEventListener("submit", syncQuickBooking);
  byId("quickFindButton").addEventListener("click", syncQuickBooking);
  byId("continueToBooking").addEventListener("click", continueToBooking);
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
  renderFiveStarReviews();
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
