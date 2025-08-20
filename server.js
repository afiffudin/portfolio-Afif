const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

const indexRoutes = require('./routes/index');
const contactRoutes = require('./routes/contact');
const portfolioRouter = require('./routes/portfolio');
const feedbackRouter = require('./routes/feedback'); // ← tambahkan

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middleware =====
app.use(express.json()); // untuk JSON
app.use(express.urlencoded({ extended: true })); // untuk form HTML
app.use(express.static(path.join(__dirname, 'public')));

// ===== View engine =====
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('layout', 'layout');

// ===== Routes =====
app.use('/', indexRoutes);
app.use('/', contactRoutes);
app.use('/', feedbackRouter); // ← router feedback menangani /feedback GET & POST
app.use('/portfolio', portfolioRouter);

// ===== 404 handler =====
app.use((req, res, next) => {
  res.status(404).send('Halaman tidak ditemukan');
});

// ===== Error handler =====
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan server');
});

// ===== Jalankan server =====
app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
