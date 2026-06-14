/* ========================================
   SMILE KOMIK — Landing Page Scripts
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Navbar Scroll Effect ----
  const navbar = document.querySelector('.navbar');
  const scrollThreshold = 50;

  function handleNavbarScroll() {
    if (window.scrollY > scrollThreshold) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---- Mobile Menu Toggle ----
  const toggle = document.querySelector('.navbar__toggle');
  const navMenu = document.querySelector('.navbar__nav');

  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      navMenu.classList.toggle('open');
      document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu when clicking a nav link
    navMenu.querySelectorAll('.navbar__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        navMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Scroll Reveal ----
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ---- Screenshot Carousel Dots ----
  const carousel = document.querySelector('.screenshots__carousel');
  const dots = document.querySelectorAll('.screenshots__dot');

  if (carousel && dots.length > 0) {
    const items = carousel.querySelectorAll('.screenshot-item');
    
    function updateDots() {
      if (items.length === 0) return;
      
      const scrollLeft = carousel.scrollLeft;
      const itemWidth = items[0].offsetWidth + 24; // width + gap
      const activeIndex = Math.round(scrollLeft / itemWidth);
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === activeIndex);
      });
    }

    carousel.addEventListener('scroll', updateDots, { passive: true });
    
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        const itemWidth = items[0].offsetWidth + 24;
        carousel.scrollTo({
          left: i * itemWidth,
          behavior: 'smooth'
        });
      });
    });

    updateDots();
  }

  // ---- Smooth Scroll for Anchor Links ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;
        
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---- Staggered Animation for Feature Cards ----
  const featureCards = document.querySelectorAll('.feature-card');
  const featureObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        featureObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    featureObserver.observe(card);
  });

  // ---- Step Cards Stagger ----
  const stepCards = document.querySelectorAll('.step-card');
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = Array.from(stepCards).indexOf(entry.target);
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 150);
        stepObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  stepCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
    stepObserver.observe(card);
  });

  // ---- Download Button Analytics (optional, placeholder) ----
  const downloadBtns = document.querySelectorAll('.btn-download');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Analytics placeholder - can be integrated with GA or other services
      console.log('[Smile Komik] Download button clicked');
    });
  });

});
