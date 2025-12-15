/* ===== Hacker Theme JavaScript ===== */

// گرفتن متن از المان منبع
const srcEl = document.getElementById('source');
const text = srcEl ? srcEl.innerText.trim() : '';
const words = text.split(/\s+/);

// تقسیم به ۵ بخش
const partsCount = 5;
const chunkSize = Math.ceil(words.length / partsCount);
const chunks = [];
for (let i = 0; i < partsCount; i++) {
  chunks.push(words.slice(i * chunkSize, (i + 1) * chunkSize).join(' '));
}

// تزریق بخش‌ها به DOM
const segmentsEl = document.getElementById('segments');
const segmentNodes = chunks.map((chunk, idx) => {
  const div = document.createElement('div');
  div.className = 'segment';
  div.id = 'seg-' + idx;
  div.textContent = chunk;
  segmentsEl.appendChild(div);
  return div;
});

// نمایش نوبتی هر ۵ ثانیه
let current = 0;
function showSegment(i) {
  segmentNodes.forEach(n => n.classList.remove('active'));
  segmentNodes[i].classList.add('active');
}
showSegment(0);

const intervalMs = 2000;
const timer = setInterval(() => {
  current++;
  if (current < partsCount) {
    showSegment(current);
  } else {
    clearInterval(timer);
    // پس از پایان ۵ بخش، پنل رمز را نشان بده
    document.getElementById('overlay').style.display = 'flex';
  }
}, intervalMs);

// پنل رمز: بررسی 0000 و نمایش شماره‌ها
const unlockBtn = document.getElementById('unlock');
const pinInput = document.getElementById('pin');
const msgEl = document.getElementById('msg');
const revealEl = document.getElementById('reveal');

function checkPin() {
  const pin = (pinInput.value || '').trim();
  if (pin === '2634') {
    msgEl.textContent = '';
    revealEl.style.display = 'block'; // نمایش شماره‌ها
  } else {
    revealEl.style.display = 'none';
    msgEl.textContent = 'False passes';
  }
}

unlockBtn.addEventListener('click', checkPin);
pinInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') checkPin();
});

// دکمه خروج قرمز
const closeBtn = document.getElementById('closePanel');
closeBtn.addEventListener('click', () => {
  document.getElementById('overlay').style.display = 'none';
});
