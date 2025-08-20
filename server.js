const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts'); // ← Tambahan
const indexRoutes = require('./routes/index');
const contactRoutes = require('./routes/contact');
// const portfolioRoutes = require('./routes/portfolio');
const portfolioRouter = require('./routes/portfolio');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);            // ← Aktifkan layout
app.set('layout', 'layout');        // ← Default layout file

app.get("/", (req, res) => {
  res.render("index");  // halaman utama menampilkan hasil feedback
});

app.get("/feedback", (req, res) => {
  res.render("feedback"); // halaman form feedback
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', indexRoutes);
app.use('/', contactRoutes);
app.use('/portfolio', portfolioRouter);
// app.use('/', portfolioRoutes);


app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
