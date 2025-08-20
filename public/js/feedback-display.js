async function loadFeedbacks() {
  try {
    const res = await fetch("/api/feedbacks");
    const feedbacks = await res.json();

    const section = document.getElementById("feedbackList");
    if (!section) return;

    section.innerHTML = feedbacks.map(fb => `
      <div class="bg-white p-4 rounded shadow mb-4">
        <p class="font-semibold">${fb.name} (${fb.divisi})</p>
        <p>Dibantu untuk: <span class="font-medium">${fb.service}</span></p>
        <p>Rating: ${"★".repeat(fb.rating)}${"☆".repeat(5 - fb.rating)}</p>
        <p>Keterangan: ${fb.keterangan || "-"}</p>
      </div>
    `).join("");

  } catch (err) {
    console.error("Gagal load feedback:", err);
  }
}

// render saat page load
document.addEventListener("DOMContentLoaded", loadFeedbacks);
