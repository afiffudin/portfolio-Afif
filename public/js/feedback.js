const form = document.getElementById("feedbackForm");
const feedbackMessage = document.getElementById("feedbackMessage");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = new FormData(form);
  const feedback = Object.fromEntries(data.entries());

  try {
    const res = await fetch("/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(feedback)
    });

    const result = await res.json();

    if (res.ok && result.success) {
      feedbackMessage.textContent = "Terima kasih atas penilaian Anda!";
      form.reset();
      // update tampilan feedback langsung
      addFeedbackToPage(result.feedback);
    } else {
      feedbackMessage.textContent = result.error || "Gagal mengirim feedback";
      feedbackMessage.classList.add("text-red-600");
    }
  } catch (err) {
    console.error(err);
    feedbackMessage.textContent = "Terjadi kesalahan server";
    feedbackMessage.classList.add("text-red-600");
  }
});

function addFeedbackToPage(fb) {
  const feedbackList = document.getElementById("feedbackList");
  if (!feedbackList) return;

  const div = document.createElement("div");
  div.className = "bg-white p-4 rounded shadow mb-4";
  div.innerHTML = `
    <p class="font-semibold">${fb.name} (${fb.divisi})</p>
    <p>Dibantu untuk: <span class="font-medium">${fb.service}</span></p>
    <p>Rating: ${"★".repeat(fb.rating)}${"☆".repeat(5 - fb.rating)}</p>
    <p>Keterangan: ${fb.keterangan || "-"}</p>
  `;
  feedbackList.prepend(div);
}
