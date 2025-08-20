let feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

function updateFeedbackDisplay() {
  const section = document.getElementById("feedbackDisplay");
  if (!section) return;

  section.innerHTML =
    `<h2 class="text-2xl font-bold mb-6 text-center">Testimoni & Penilaian User</h2>` +
    feedbacks
      .map(
        (fb) => `
      <div class="bg-white p-4 rounded shadow mb-4">
        <p class="font-semibold">${fb.name} (${fb.divisi})</p>
        <p>Keterangan: ${fb.keterangan || "-"}</p>
        <p>Dibantu untuk: <span class="font-medium">${fb.service}</span></p>
        <p>Rating: ${"★".repeat(fb.rating)}${"☆".repeat(5 - fb.rating)}</p>
      </div>
    `
      )
      .join("");
}

updateFeedbackDisplay();
