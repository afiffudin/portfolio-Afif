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
// Route untuk halaman detail Programmer Web
app.get('/portfolio/web', (req, res) => {
    res.render('web-programmer'); // Sesuai nama file EJS yang dibuat tadi
});

app.get('/portfolio/devops', (req, res) => {
  res.render('devops');
});

app.get('/portfolio/itsupport', (req, res) => {
  res.render('it-support');
});

app.get('/portfolio/programming-mobile', (req, res) =>{
  res.render('programming-mobile')
} )
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
