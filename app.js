const express = require('express');
const path = require('path');
const portfolioRoutes = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Home' });
});
app.use('/portfolio', portfolioRoutes);

// Handle 404
app.use((req, res) => {
  res.status(404).send('Halaman tidak ditemukan');
});

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
