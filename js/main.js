// ============================================================
// EDIT THIS CONFIG TO UPDATE ANY TEXT / DATES / LINKS ON THE SITE
// ============================================================
const CONFIG = {
  bride: "Varsha",
  groom: "Shobin Thomas",
  tagline: "Together Forever",
  invitationMessage: "With the blessings of our families, we invite you to celebrate our wedding.",

  groomParents: "Shaju M A & Suja Thomas",
  brideParents: "P. Venugopalan (Late) & Bindu T",

  countdownTarget: "2026-08-23T10:30:00",

  wedding: {
    title: "Wedding Ceremony",
    dateISO: "2026-08-23",
    day: "Sunday, 23 August 2026",
    startTime: "10:30",
    endTime: "11:30",
    timeLabel: "10:30 AM – 11:30 AM",
    venue: "Image Garden",
    address: "Eranthode, Valamboor",
    mapsUrl: "https://maps.app.goo.gl/qFWHHDWnbXzwqhRJ9"
  },

  rsvpByDate: "9th August 2026",
  whatsappNumber: "919746166545", // country code + number, no + or spaces
  phoneNumber: "+919746166545"
};
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  populateContent();
  startCountdown();
  spawnPetals();
  setupMusicToggle();
  setupScrollReveal();
  setupLightbox();
  setupCalendarLinks();
  setupRsvpLinks();
  setupWishesForm();
  setupShareAndDownload();
});

function populateContent() {
  const set = (id, html) => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = html;
  };

  set("heroTagline", CONFIG.tagline);
  set("heroBride", CONFIG.bride);
  set("heroGroom", CONFIG.groom);
  set("heroDate", formatLongDate(CONFIG.wedding.dateISO));
  set("invitationMessage", CONFIG.invitationMessage);

  set("groomName", CONFIG.groom);
  set("groomParents", CONFIG.groomParents);
  set("brideName", CONFIG.bride);
  set("brideParents", CONFIG.brideParents);

  set("coupleBrideName", CONFIG.bride);
  set("coupleGroomName", CONFIG.groom);

  set("weddingTitle", CONFIG.wedding.title);
  set("weddingDay", CONFIG.wedding.day);
  set("weddingTime", CONFIG.wedding.timeLabel);
  set("weddingVenue", CONFIG.wedding.venue);
  set("weddingAddress", CONFIG.wedding.address);

  set("rsvpByDate", CONFIG.rsvpByDate);
  set("footerBride", CONFIG.bride);
  set("footerGroom", CONFIG.groom);

  const weddingMapBtn = document.getElementById("weddingMapBtn");
  if (weddingMapBtn) weddingMapBtn.href = CONFIG.wedding.mapsUrl;

  document.title = `${CONFIG.bride} & ${CONFIG.groom} | Wedding Invitation`;
}

function formatLongDate(isoDate) {
  const d = new Date(isoDate + "T00:00:00");
  return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

// ---------------- Countdown ----------------
function startCountdown() {
  const target = new Date(CONFIG.countdownTarget).getTime();
  const els = {
    days: document.getElementById("cdDays"),
    hours: document.getElementById("cdHours"),
    mins: document.getElementById("cdMins"),
    secs: document.getElementById("cdSecs")
  };

  function tick() {
    const now = Date.now();
    let diff = target - now;
    if (diff < 0) diff = 0;

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    if (els.days) els.days.textContent = String(days).padStart(2, "0");
    if (els.hours) els.hours.textContent = String(hours).padStart(2, "0");
    if (els.mins) els.mins.textContent = String(mins).padStart(2, "0");
    if (els.secs) els.secs.textContent = String(secs).padStart(2, "0");
  }

  tick();
  setInterval(tick, 1000);
}

// ---------------- Floating petals ----------------
function spawnPetals() {
  const layer = document.getElementById("petalLayer");
  if (!layer) return;
  const symbols = ["❀", "✿", "⚘", "❀"]; // floral glyphs
  const count = window.innerWidth < 720 ? 14 : 22;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");
    petal.className = "petal";
    petal.textContent = symbols[i % symbols.length];
    petal.style.left = Math.random() * 100 + "vw";
    petal.style.fontSize = 12 + Math.random() * 14 + "px";
    petal.style.setProperty("--drift", (Math.random() * 80 - 40) + "px");
    petal.style.animationDuration = 10 + Math.random() * 12 + "s";
    petal.style.animationDelay = Math.random() * 10 + "s";
    layer.appendChild(petal);
  }
}

// ---------------- Background music ----------------
function setupMusicToggle() {
  const audio = document.getElementById("bgAudio");
  const openPrompt = document.getElementById("playMusicPrompt");
  const cover = document.getElementById("home");
  if (!audio || !openPrompt || !cover) return;

  audio.volume = 0.6;

  openPrompt.addEventListener("click", () => {
    audio.play().catch(() => {});
    cover.classList.add("is-open");
    document.body.classList.remove("pre-invite");
  });
}

// ---------------- Scroll reveal ----------------
function setupScrollReveal() {
  const targets = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((t) => observer.observe(t));
}

// ---------------- Gallery lightbox ----------------
function setupLightbox() {
  const grid = document.getElementById("galleryGrid");
  const lightbox = document.getElementById("lightbox");
  const lbImage = document.getElementById("lbImage");
  const lbClose = document.getElementById("lbClose");
  const lbPrev = document.getElementById("lbPrev");
  const lbNext = document.getElementById("lbNext");
  if (!grid || !lightbox) return;

  const images = Array.from(grid.querySelectorAll("img"));
  let currentIndex = 0;

  function open(index) {
    currentIndex = index;
    lbImage.src = images[currentIndex].src;
    lbImage.alt = images[currentIndex].alt;
    lightbox.classList.add("open");
  }
  function close() { lightbox.classList.remove("open"); }
  function show(delta) {
    currentIndex = (currentIndex + delta + images.length) % images.length;
    lbImage.src = images[currentIndex].src;
    lbImage.alt = images[currentIndex].alt;
  }

  images.forEach((img, i) => img.addEventListener("click", () => open(i)));
  lbClose.addEventListener("click", close);
  lbPrev.addEventListener("click", () => show(-1));
  lbNext.addEventListener("click", () => show(1));
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) close(); });
  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(-1);
    if (e.key === "ArrowRight") show(1);
  });
}

// ---------------- Add to calendar ----------------
function setupCalendarLinks() {
  document.querySelectorAll(".cal-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const menu = document.querySelector(`.cal-menu[data-menu="${btn.dataset.event}"]`);
      document.querySelectorAll(".cal-menu").forEach((m) => { if (m !== menu) m.classList.remove("open"); });
      menu.classList.toggle("open");
    });
  });

  document.addEventListener("click", () => {
    document.querySelectorAll(".cal-menu").forEach((m) => m.classList.remove("open"));
  });

  document.querySelectorAll("[data-cal]").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const eventKey = link.dataset.event;
      const evt = CONFIG[eventKey];
      if (link.dataset.cal === "google") {
        window.open(buildGoogleCalendarUrl(evt), "_blank");
      } else {
        downloadIcsFile(evt);
      }
    });
  });
}

function toUtcStamp(dateISO, timeHHMM) {
  const dt = new Date(`${dateISO}T${timeHHMM}:00`);
  return dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

function buildGoogleCalendarUrl(evt) {
  const start = toUtcStamp(evt.dateISO, evt.startTime);
  const end = toUtcStamp(evt.dateISO, evt.endTime);
  const text = encodeURIComponent(`${evt.title} - ${CONFIG.bride} & ${CONFIG.groom}`);
  const details = encodeURIComponent(`Join us for the ${evt.title.toLowerCase()}.`);
  const location = encodeURIComponent(`${evt.venue}, ${evt.address}`);
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${start}/${end}&details=${details}&location=${location}`;
}

function downloadIcsFile(evt) {
  const start = toUtcStamp(evt.dateISO, evt.startTime);
  const end = toUtcStamp(evt.dateISO, evt.endTime);
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `SUMMARY:${evt.title} - ${CONFIG.bride} & ${CONFIG.groom}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `LOCATION:${evt.venue}, ${evt.address}`,
    `DESCRIPTION:Join us for the ${evt.title.toLowerCase()}.`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${evt.title.replace(/\s+/g, "-")}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ---------------- RSVP ----------------
function setupRsvpLinks() {
  const waLink = document.getElementById("rsvpWhatsapp");
  const callLink = document.getElementById("rsvpCall");
  if (waLink) {
    const msg = encodeURIComponent(`Hi! This is regarding the wedding of ${CONFIG.bride} & ${CONFIG.groom}. I would like to RSVP.`);
    waLink.href = `https://wa.me/${CONFIG.whatsappNumber}?text=${msg}`;
  }
  if (callLink) {
    callLink.href = `tel:${CONFIG.phoneNumber}`;
  }
}

// ---------------- Wishes / Guestbook ----------------
function setupWishesForm() {
  const form = document.getElementById("wishesForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("wishName").value.trim();
    const message = document.getElementById("wishMessage").value.trim();
    if (!name || !message) return;

    const text = encodeURIComponent(`Wedding wishes for ${CONFIG.bride} & ${CONFIG.groom}\n\nFrom: ${name}\n\n"${message}"`);
    window.open(`https://wa.me/${CONFIG.whatsappNumber}?text=${text}`, "_blank");
    form.reset();
  });
}

// ---------------- Share & Download ----------------
function setupShareAndDownload() {
  const shareBtn = document.getElementById("shareBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const shareData = {
        title: `${CONFIG.bride} & ${CONFIG.groom}'s Wedding`,
        text: CONFIG.invitationMessage,
        url: window.location.href
      };
      if (navigator.share) {
        try { await navigator.share(shareData); } catch (_) {}
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
      }
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => window.print());
  }
}
