(() => {
  const root = document.documentElement;
  const btn = document.getElementById('themeToggle');
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');
  const scrollBtn = document.getElementById('scrollTop');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  const saved = localStorage.getItem('theme');

  const apply = (theme) => {
    root.setAttribute('data-theme', theme);
    if (btn) {
      btn.innerHTML = theme === 'light' ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      btn.setAttribute('aria-pressed', theme === 'light' ? 'true' : 'false');
    }
  };
  
  // Initialize theme: saved preference or system
  const initTheme = saved || (prefersDark.matches ? 'dark' : 'light');
  apply(initTheme);
  localStorage.setItem('theme', initTheme);

  if (btn) {
    btn.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      apply(next);
      localStorage.setItem('theme', next);
    });
  }

  // Only respond to system changes when the user has not explicitly chosen
  if (prefersDark.addEventListener) {
    prefersDark.addEventListener('change', (e) => {
      const system = e.matches ? 'dark' : 'light';
      const stored = localStorage.getItem('theme');
      if (!stored) {
        apply(system);
      }
    });
  }

  // Mobile nav toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Scroll to top button
  if (scrollBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 200) {
        scrollBtn.style.display = 'flex';
      } else {
        scrollBtn.style.display = 'none';
      }
    });

    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

})();

