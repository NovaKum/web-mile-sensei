const RACE_DATE = new Date("2026-06-19T16:00:00");

function pad2(n) {
  return String(n).padStart(2, "0");
}

function renderCountdown() {
  const dayEl = document.getElementById("countdown-day");
  const clockEl = document.getElementById("countdown-clock");
  if (!dayEl || !clockEl) return;

  const now = new Date();
  let diff = RACE_DATE - now;

  // Race day has arrived (or passed)
  if (diff <= 0) {
    dayEl.textContent = "LIVE";
    clockEl.textContent = "Race is underway!";
    return;
  }

  const oneDay = 1000 * 60 * 60 * 24;
  const days = Math.floor(diff / oneDay);
  diff -= days * oneDay;

  const hours = Math.floor(diff / (1000 * 60 * 60));
  diff -= hours * 1000 * 60 * 60;

  const minutes = Math.floor(diff / (1000 * 60));
  diff -= minutes * 1000 * 60;

  const seconds = Math.floor(diff / 1000);

  // Day label: show the race's weekday name, e.g. "FRI"
  dayEl.textContent = RACE_DATE.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase();

  // If more than a day away, prefix with a day count too
  const dayPrefix = days > 0 ? `${days}<sub>D</sub> <span class="sep">:</span> ` : "";

  clockEl.innerHTML =
    `${dayPrefix}${pad2(hours)}<sub>H</sub> <span class="sep">:</span> ` +
    `${pad2(minutes)}<sub>M</sub> <span class="sep">:</span> ` +
    `${pad2(seconds)}<sub>S</sub>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCountdown();
  setInterval(renderCountdown, 1000);
});
