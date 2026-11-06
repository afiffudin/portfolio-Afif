// routes/portfolio.js
const express = require('express');
const router = express.Router();

const portfolios = [
  { id: 1, title: "Tuntunan Sholat & Alquran Mobile", image: "/images/Flutter1.png" },
  { id: 2, title: "IT Support & Network", image: "/images/Server_Network.png" },
  { id: 3, title: "Proyek 3", image: "/images/docker1.png" },
  { id: 4, title: "Jasa Troubleshoot deploy Web", image: "/images/Jasa_freelance1.png" }
];

// Rute untuk halaman statis (Taruh paling atas di file ini)
router.get('/programming-mobile', (req, res) => res.render('programming-mobile'));
router.get('/web', (req, res) => res.render('web-programmer'));
router.get('/devops', (req, res) => res.render('devops'));
router.get('/itsupport', (req, res) => res.render('it-support'));

router.get('/', (req, res) => {
  res.render('portfolio', { portfolios });
});

// Perbaikan: Gunakan regex (\d+) agar rute ini HANYA menerima angka
router.get('/:id(\\d+)', (req, res) => {
  const id = parseInt(req.params.id);
  const project = portfolios.find(p => p.id === id);
  if (!project) return res.status(404).send('Portfolio tidak ditemukan');
  res.render('portfolio-detail', { project, title: project.title });
});

module.exports = router;