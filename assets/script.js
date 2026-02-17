    // Custom cursor
    const cursor = document.getElementById('cursor');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      cursor.style.left = mx + 'px';
      cursor.style.top = my + 'px';
    });
    function animateRing() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.left = rx + 'px';
      ring.style.top = ry + 'px';
      requestAnimationFrame(animateRing);
    }
    animateRing();

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // Nav background on scroll
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(10,10,10,0.92)';
        nav.style.backdropFilter = 'blur(12px)';
        nav.style.borderBottom = '1px solid rgba(201,168,76,0.1)';
      } else {
        nav.style.background = 'transparent';
        nav.style.backdropFilter = 'none';
        nav.style.borderBottom = 'none';
      }
    });

    // Counter animation for stats
    function animateCounter(el, target, suffix = '') {
      let current = 0;
      const step = target / 60;
      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        el.textContent = Math.floor(current) + suffix;
      }, 20);
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const nums = e.target.querySelectorAll('.stat-number');
          const targets = [8, 42, 120, 18];
          const suffixes = ['+', '', '+', ''];
          nums.forEach((n, i) => animateCounter(n, targets[i], suffixes[i]));
          statsObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.5 });
    const statsBar = document.querySelector('.stats-bar');
    if (statsBar) statsObserver.observe(statsBar);

    // Parallax on hero
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      const heroContent = document.querySelector('.hero-content');
      if (heroContent) heroContent.style.transform = `translateY(${y * 0.18}px)`;
    });
