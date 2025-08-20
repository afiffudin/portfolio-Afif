const express = require("express");
const fs = require("fs");
const path = require("path");
const router = express.Router();

const feedbackFile = path.join(__dirname, "../feedbacks.json");

// baca file JSON
function getFeedbacks() {
  if (!fs.existsSync(feedbackFile)) return [];
  const data = fs.readFileSync(feedbackFile, "utf-8");
  return JSON.parse(data);
}

// simpan file JSON (async)
function saveFeedbacks(feedbacks) {
  return new Promise((resolve, reject) => {
    fs.writeFile(feedbackFile, JSON.stringify(feedbacks, null, 2), (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

// GET form feedback
router.get("/feedback", (req, res) => {
  res.render("feedback");
});

// POST feedback (async)
router.post("/feedback", async (req, res) => {
  try {
    const { name, divisi, service, rating, keterangan } = req.body;
    if (!name || !divisi || !service || !rating) {
      return res.status(400).json({ error: "Data feedback tidak lengkap" });
    }

    const feedbacks = getFeedbacks();
    feedbacks.push({
      name,
      divisi,
      service,
      rating: parseInt(rating),
      keterangan
    });

    await saveFeedbacks(feedbacks);

    // Jika AJAX, kirim JSON
    res.json({ success: true, feedback: { name, divisi, service, rating, keterangan } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal menyimpan feedback" });
  }
});

// API untuk ambil semua feedback
router.get("/api/feedbacks", (req, res) => {
  const feedbacks = getFeedbacks();
  res.json(feedbacks);
});

module.exports = router;
