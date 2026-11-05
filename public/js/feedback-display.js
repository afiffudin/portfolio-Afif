// Menampilkan testimoni dari /api/feedbacks sebagai kartu kutipan.
function escapeHtml(value) {
  return String(value == null ? "" : value)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}

function feedbackCard(fb) {
  const rating = Math.max(0, Math.min(5, parseInt(fb.rating) || 0));
  const stars = rating
    ? `<div class="quote-stars" aria-label="Rating ${rating} dari 5">${"★".repeat(rating)}<span class="off">${"★".repeat(5 - rating)}</span></div>`
    : "";
  const note = (fb.keterangan || "").trim();
  return `
    <figure class="quote">
      ${stars}
      <blockquote>${note ? escapeHtml(note) : `<span class="quote-meta">Dibantu untuk: ${escapeHtml(fb.service)}</span>`}</blockquote>
      <figcaption><b>${escapeHtml(fb.name)}</b>, ${escapeHtml(fb.divisi || "")}${note ? `<br>Dibantu untuk: ${escapeHtml(fb.service)}` : ""}</figcaption>
    </figure>`;
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
  } catch (err) {
    console.error("Gagal load feedback:", err);
    section.innerHTML = `<p class="empty">Testimoni belum bisa dimuat.</p>`;
  }
}

// render saat page load
document.addEventListener("DOMContentLoaded", loadFeedbacks);