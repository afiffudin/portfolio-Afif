// Tema terang/gelap (disimpan di localStorage) + menu mobile.
(function () {
  var html = document.documentElement;
  var themeBtn = document.getElementById('themeToggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function () {
      var next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
    });
  }

  var menuBtn = document.getElementById('menuToggle');
  var nav = document.getElementById('siteNav');
  if (menuBtn && nav) {
    var setOpen = function (open) {
      nav.setAttribute('data-open', open ? 'true' : 'false');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    };
    menuBtn.addEventListener('click', function () {
      setOpen(nav.getAttribute('data-open') !== 'true');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') setOpen(false);
    });
  }

  // Lightbox untuk galeri screenshot (halaman detail)
  var box = document.getElementById('lightbox');
  if (box) {
    var img = box.querySelector('img');
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        img.src = btn.getAttribute('data-full');
        img.alt = btn.getAttribute('data-alt') || '';
        box.showModal();
      });
    });
    box.addEventListener('click', function (e) {
      if (e.target === box || e.target.closest('[data-close]')) box.close();
    });
  }
})();