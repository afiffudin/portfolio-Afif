// Dark mode toggle with localStorage
(function(){
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  const apply = (theme) => {
    if(theme === 'dark') {
      html.setAttribute('data-theme','dark');
      document.body.classList.add('bg-slate-900','text-gray-100');
    } else {
      html.setAttribute('data-theme','light');
      document.body.classList.remove('bg-slate-900','text-gray-100');
    }
  };
  apply(stored || 'light');
  btn.addEventListener('click', () => {
    const next = (localStorage.getItem('theme') === 'dark') ? 'light' : 'dark';
    localStorage.setItem('theme', next);
    apply(next);
  });
})();

// ScrollReveal animate
document.addEventListener('DOMContentLoaded', function(){
  if(window.ScrollReveal) {
    ScrollReveal().reveal('[data-sr]', { distance: '24px', duration: 600, easing: 'cubic-bezier(.2,.8,.2,1)', interval: 80 });
  }
});
