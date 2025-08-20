const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', { title: 'Portfolio - Uda Yusuf' });
});
router.get('/feedback', (req, res) => {
  res.render('feedback'); // render views/feedback.ejs
});

router.get('/success', (req, res) => {
  res.render('success', { title: 'Pesan Terkirim' });
});

module.exports = router;
