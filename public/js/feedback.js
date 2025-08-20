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
    };

    feedbacks.push(feedback);
    localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

    alert("Terima kasih atas penilaian Anda!");

    form.reset();

    // redirect ke halaman utama biar bisa lihat hasilnya
    window.location.href = "/";
  });
}
