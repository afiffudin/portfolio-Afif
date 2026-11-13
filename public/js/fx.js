// Animasi & interaksi: reveal saat scroll, teks mengetik, panel rack miring,
// bar progres scroll, menu aktif. Semua dimatikan jika "reduce motion".
(function () {
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---- Reveal saat elemen masuk layar ----
  var io = null;
  if (!reduce && 'IntersectionObserver' in window) {
    io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  }
  window.fxReveal = function (root) {
    (root || document).querySelectorAll('[data-reveal]:not(.in)').forEach(function (el) {
      if (io) io.observe(el); else el.classList.add('in');
    });
  };
  window.fxReduce = reduce;
  window.fxReveal();

  // ---- Header: bayangan + bar progres scroll ----
  var header = document.querySelector('.site-header');
  var bar = document.querySelector('.progress');
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      var y = window.scrollY, max = document.documentElement.scrollHeight - window.innerHeight;
      if (header) header.classList.toggle('scrolled', y > 8);
      if (bar) bar.style.setProperty('--p', max > 0 ? Math.min(1, y / max).toFixed(4) : 0);
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- Menu aktif sesuai bagian yang sedang dilihat (beranda) ----
  var sections = ['keahlian', 'pengalaman', 'testimoni', 'contact']
    .map(function (id) { return document.getElementById(id); }).filter(Boolean);
  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        document.querySelectorAll('.nav a').forEach(function (a) {
          a.classList.toggle('active', a.getAttribute('href') === '/#' + e.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  if (reduce) return;

  // ---- Teks mengetik di hero ----
  var typed = document.querySelector('.typed');
  if (typed) {
    var words = [];
    try { words = JSON.parse(typed.getAttribute('data-words')); } catch (e) {}
    if (words.length > 1) {
      var wi = 0, ci = words[0].length, deleting = true;
      (function tick() {
        var w = words[wi], delay;
        if (deleting) {
          ci--; typed.textContent = w.slice(0, ci); delay = 35;
          if (ci === 0) { deleting = false; wi = (wi + 1) % words.length; delay = 320; }
        } else {
          ci++; typed.textContent = words[wi].slice(0, ci); delay = 70;
          if (ci === words[wi].length) { deleting = true; delay = 1900; }
        }
        setTimeout(tick, delay);
      })();
    }
  }

  // ---- Hero: cahaya mengikuti kursor + panel rack miring (hanya mouse) ----
  var hero = document.querySelector('.hero');
  var rack = document.querySelector('.rack');
  if (hero && fine) {
    hero.addEventListener('pointermove', function (e) {
      var r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      hero.style.setProperty('--my', (e.clientY - r.top) + 'px');
      if (rack) {
        var b = rack.getBoundingClientRect();
        var dx = Math.max(-1, Math.min(1, (e.clientX - (b.left + b.width / 2)) / (window.innerWidth / 2)));
        var dy = Math.max(-1, Math.min(1, (e.clientY - (b.top + b.height / 2)) / (window.innerHeight / 2)));
        rack.style.transform = 'perspective(900px) rotateX(' + (-dy * 5).toFixed(2) + 'deg) rotateY(' + (dx * 7).toFixed(2) + 'deg)';
      }
    });
    hero.addEventListener('pointerleave', function () { if (rack) rack.style.transform = ''; });
  }
})();