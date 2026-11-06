// Menampilkan testimoni dari /api/feedbacks sebagai kartu kutipan + ringkasan rating.
function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function feedbackCard(fb, i) {
  const rating = Math.max(0, Math.min(5, parseInt(fb.rating) || 0));
  const stars = rating
    ? `<div class="quote-stars" aria-label="Rating ${rating} dari 5">${"★".repeat(rating)}<span class="off">${"★".repeat(5 - rating)}</span></div>`
    : "";
  const note = (fb.keterangan || "").trim();
  return `
    <figure class="quote" data-reveal style="--d:${(i || 0) * 80}ms">
      ${stars}
      <blockquote>${note ? escapeHtml(note) : `<span class="quote-meta">Dibantu untuk: ${escapeHtml(fb.service)}</span>`}</blockquote>
      <figcaption><b>${escapeHtml(fb.name)}</b>, ${escapeHtml(fb.divisi || "")}${note ? `<br>Dibantu untuk: ${escapeHtml(fb.service)}` : ""}</figcaption>
    </figure>`;
}

// Hitung naik dari 0 ke nilai akhir (dilewati jika "reduce motion")
function countUp(el, to, decimals) {
  if (window.fxReduce) { el.textContent = to.toFixed(decimals); return; }
  const start = performance.now(), dur = 1200;
  (function step(now) {
    const t = Math.min(1, (now - start) / dur);
    el.textContent = (to * (1 - Math.pow(1 - t, 3))).toFixed(decimals);
    if (t < 1) requestAnimationFrame(step);
  })(start);
}

function renderSummary(feedbacks) {
  const box = document.getElementById("feedbackSummary");
  if (!box) return;
  const ratings = feedbacks.map(f => parseInt(f.rating)).filter(n => n > 0);
  if (!ratings.length) return;
  const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
  const full = Math.round(avg);
  box.innerHTML = `
    <b id="avgNumber">0.0</b>
    <div class="quote-stars" aria-hidden="true">${"★".repeat(full)}<span class="off">${"★".repeat(5 - full)}</span></div>
    <span>rata-rata dari ${ratings.length} penilaian</span>`;
  box.hidden = false;
  countUp(document.getElementById("avgNumber"), avg, 1);
}

async function loadFeedbacks() {
  const section = document.getElementById("feedbackList");
  if (!section) return;
  try {
    const res = await fetch("/api/feedbacks");
    const feedbacks = await res.json();
    section.innerHTML = feedbacks.length
      ? feedbacks.map(feedbackCard).join("")
      : `<p class="empty">Belum ada testimoni.</p>`;
    renderSummary(feedbacks);
    if (window.fxReveal) window.fxReveal(section);
    else section.querySelectorAll("[data-reveal]").forEach(el => el.classList.add("in"));
  } catch (err) {
    console.error("Gagal load feedback:", err);
    section.innerHTML = `<p class="empty">Testimoni belum bisa dimuat.</p>`;
  }
}

// render saat page load
document.addEventListener("DOMContentLoaded", loadFeedbacks);