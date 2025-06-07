const clockEl = document.getElementById('clock');
const dateEl = document.getElementById('date');
const themeSwitcher = document.getElementById('themeSwitcher');
const hourFormatSwitcher = document.getElementById('hourFormatSwitcher');
const tickSound = document.getElementById('tickSound');

let use24Hour = false;
let lastSecond = null;

function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();

  // Play tick sound only once per second
  if (seconds !== lastSecond) {
    tickSound.currentTime = 0;
    tickSound.play().catch(() => {}); // Prevent errors if user hasn't interacted yet
    lastSecond = seconds;
  }

  // Format hours
  let ampm = '';
  if (!use24Hour) {
    ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
  }

  const formattedTime = [
    String(hours).padStart(2, '0'),
    String(minutes).padStart(2, '0'),
    String(seconds).padStart(2, '0')
  ].join(':') + (use24Hour ? '' : ` ${ampm}`);

  clockEl.textContent = formattedTime;

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  dateEl.textContent = now.toLocaleDateString(undefined, options);
}

// Initial setup
updateClock();
setInterval(updateClock, 1000);

// Theme toggle event
themeSwitcher.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  document.body.classList.toggle('light-mode');
});

// 24-hour toggle event
hourFormatSwitcher.addEventListener('change', () => {
  use24Hour = hourFormatSwitcher.checked;
  updateClock();
});
