const express = require('express');
const router = express.Router();

const portfolios = [
  { id: 1, title: "Tuntunan Sholat & Alquran Mobile", description: "Deskripsi proyek 1", image: "/images/Flutter1.png" },
  { id: 2, title: "IT Support & Network", description: "1. Instalasi CCTV, 2. Instalasi Networking (AP, Klimping Cable RJ45, Spliccing FO ), 3. Support Server ( Pemasangan Rack Server, Cable Mapping, Klimping LAN & FO ), 4. Support System & Hardware. ", image: "/images/Server_Network.png" },
  { id: 3, title: "Proyek 3", description: "Deskripsi proyek 3", image: "/images/Flutter3.png" },
];

router.get('/', (req, res) => {
  res.render('portfolio', { portfolios });
});

router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = portfolios.find(p => p.id === id);
  if (!project) return res.status(404).send('Portfolio tidak ditemukan');
  res.render('portfolio-detail', { project, title: project.title });
});

module.exports = router;
