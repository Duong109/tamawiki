import { DATA } from "./data.js";
import { emote } from "../emoji.js";
let index = 0;

const div1 = document.getElementById("div1");
const div4 = document.getElementById("div4");
const div3 = document.getElementById("div3");
const div5 = document.getElementById("div5");
const div6 = document.getElementById("div6");
const page = document.getElementById("page");
const imgA = document.getElementById("imgA");
const imgB = document.getElementById("imgB");
const flipCard = document.getElementById("flipCard");
const searchBtn = document.getElementById('searchBtn');
const searchPopup = document.getElementById('searchPopup');
const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');
const searchClose = document.getElementById('searchClose');
const bookmarks = document.querySelectorAll('.bookmark');
const levelBadge = document.getElementById('levelBadge');

// Create a single tooltip element for drop hover text
const _dropTooltipEl = (function(){
  const el = document.createElement('div');
  el.className = 'drop-tooltip';
  el.setAttribute('aria-hidden', 'true');
  document.body.appendChild(el);
  return el;
})();

function showDropTooltip(text, x, y) {
  if (!_dropTooltipEl) return;
  _dropTooltipEl.textContent = text || '';
  _dropTooltipEl.style.display = 'block';
  const pad = 8;
  const rect = _dropTooltipEl.getBoundingClientRect();
  const w = rect.width || 160;
  const h = rect.height || 24;
  let left = (x || 0) + 12;
  let top = (y || 0) + 12;
  if (left + w + pad > window.innerWidth) left = window.innerWidth - w - pad;
  if (top + h + pad > window.innerHeight) top = window.innerHeight - h - pad;
  _dropTooltipEl.style.left = left + 'px';
  _dropTooltipEl.style.top = top + 'px';
  _dropTooltipEl.setAttribute('aria-hidden','false');
}

function hideDropTooltip(){
  if (!_dropTooltipEl) return;
  _dropTooltipEl.setAttribute('aria-hidden','true');
  _dropTooltipEl.style.display = 'none';
}

function attachDropTooltips(container){
  if (!container) return;
  const anchors = container.querySelectorAll('a[data-tooltip]');
  anchors.forEach(a => {
    const txt = a.dataset.tooltip || a.title || (a.querySelector('img') && a.querySelector('img').alt) || '';
    a.removeAttribute('title');
    a.addEventListener('mouseenter', (e) => { showDropTooltip(txt, e.clientX, e.clientY); });
    a.addEventListener('mousemove', (e) => { showDropTooltip(txt, e.clientX, e.clientY); });
    a.addEventListener('mouseleave', hideDropTooltip);
    a.addEventListener('focus', (e) => {
      const r = a.getBoundingClientRect();
      showDropTooltip(txt, r.left + r.width/2, r.top);
    });
    a.addEventListener('blur', hideDropTooltip);
  });
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideDropTooltip(); });

function updatePageText() {
  page.value = `Page ${index + 1} / ${DATA.length}`;
}

function render() {
  const d = DATA[index];

  div1.textContent = d.name || "";
  div4.textContent = d.grade || "";

  // ✅ description có emote
  div3.innerHTML = emote(d.description || "");

  // drops + details
  div5.innerHTML = '';
  if (Array.isArray(d.drops) && d.drops.length) {
    const li = document.createElement('li');
    li.innerHTML = (
      emote(d.details || '') + ' ' +
      d.drops.map(dp =>
        `<a href="${dp.href || '#'}" data-tooltip="${dp.alt || ''}">
          <img src="${dp.src}" alt="${dp.alt || ''}" class="drop-img">
        </a>`
      ).join(' ')
    ).trim();
    div5.appendChild(li);
    attachDropTooltips(li);
  } else if (d.details) {
    const li = document.createElement('li');
    li.innerHTML = emote(d.details);
    div5.appendChild(li);
  }

  // ✅ extra có emote
  div6.innerHTML = emote(d.extra || "");

  function setImg(el, src, altSuffix) {
    if (!el) return;
    if (!src || String(src).toLowerCase().startsWith("placeholder")) {
      el.style.display = "none";
      el.removeAttribute('src');
      return;
    }
    el.src = src;
    el.alt = (d.name || "") + " " + altSuffix;
    el.style.display = "block";
  }

  setImg(imgA, d.imga, "A");
  setImg(imgB, d.imgb, "B");

  if (imgA) {
    if (d.imgaScale) imgA.style.setProperty('--img-scale', String(d.imgaScale));
    else imgA.style.removeProperty('--img-scale');
  }
  if (imgB) {
    if (d.imgbScale) imgB.style.setProperty('--img-scale', String(d.imgbScale));
    else imgB.style.removeProperty('--img-scale');
  }

  const hasA = imgA && imgA.getAttribute('src');
  const hasB = imgB && imgB.getAttribute('src');
  if (flipCard) {
    flipCard.classList.remove('flipped');
    flipCard.setAttribute('aria-pressed', 'false');
    if (hasA && hasB) {
      flipCard.style.cursor = 'pointer';
      flipCard.onclick = () => {
        const flipped = flipCard.classList.toggle('flipped');
        flipCard.setAttribute('aria-pressed', flipped ? 'true' : 'false');
      };
      flipCard.onkeydown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          flipCard.click();
        }
      };
    } else {
      flipCard.style.cursor = 'default';
      flipCard.onclick = null;
      flipCard.onkeydown = null;
    }
  }

  updatePageText();

  if (levelBadge) {
    const pnum = index + 1;
    if (pnum >= 1 && pnum <= 15) {
      levelBadge.textContent = 'L1';
      levelBadge.classList.add('l1');
      levelBadge.classList.remove('l2');
      levelBadge.style.display = 'flex';
    } else if (pnum >= 16 && pnum <= 34) {
      levelBadge.textContent = 'L2';
      levelBadge.classList.add('l2');
      levelBadge.classList.remove('l1');
      levelBadge.style.display = 'flex';
    } else {
      levelBadge.textContent = '';
      levelBadge.classList.remove('l1', 'l2');
      levelBadge.style.display = 'none';
    }
  }
}

render();
