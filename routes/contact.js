const express = require('express');
const router = express.Router();

router.post('/contact', (req, res) => {
  // Di sini kamu bisa simpan ke DB atau kirim email.
  console.log('Pesan masuk:', req.body);
  // Redirect ke halaman success
  res.redirect('/success');
});

module.exports = router;
