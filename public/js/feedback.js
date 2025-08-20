let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

const form = document.getElementById("feedbackForm");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const feedback = {
      name: data.get("name"),
      divisi: data.get("divisi"),
      service: data.get("service"),
      rating: data.get("rating"),
      keterangan: data.get("keterangan") // ✅ field baru
    };

    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    alert("Terima kasih atas penilaian Anda!");
    form.reset();
    updateFeedbackDisplay();
  });
}

function updateFeedbackDisplay() {
  const section = document.getElementById("feedbackDisplay");
  if (!section) return;

  section.innerHTML =
    `<h2 class="text-2xl font-bold mb-6 text-center">Testimoni & Penilaian User</h2>` +
    feedbacks.map(fb => `
      <div class="bg-white p-4 rounded shadow mb-4">
        <p class="font-semibold">${fb.name} (${fb.divisi})</p>
        <p>Dibantu untuk: <span class="font-medium">${fb.service}</span></p>
        <p>Rating: ${"★".repeat(fb.rating)}${"☆".repeat(5 - fb.rating)}</p>
        <p>Keterangan: ${fb.keterangan || "-"}</p>
      </div>
    `).join("");
}

// render pertama kali
updateFeedbackDisplay();
