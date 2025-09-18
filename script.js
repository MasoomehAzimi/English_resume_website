document.addEventListener('DOMContentLoaded', () => {

  /* === Zoom effect (Welcome image) === */
  const zoomImg = document.querySelector('.zoom-image img');
  if (zoomImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const newScale = 1 - scrollY / 4000; // ملایم‌تر
      zoomImg.style.transform = `scale(${Math.max(newScale, 0.9)})`;
    });
  }

  /* === Hearts (like) === */
  const hearts = document.querySelectorAll('.gallery-item .heart');
  hearts.forEach(h => {
    h.addEventListener('click', (e) => {
      e.stopPropagation(); // جلوگیری از باز شدن لایت‌باکس
      h.classList.toggle('liked');
      h.textContent = h.classList.contains('liked') ? '❤️' : '♡';
    });
  });

  /* === Lightbox === */
  const images = Array.from(document.querySelectorAll('.gallery-item img'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('lightbox-caption');
  const closeBtn = document.querySelector('.close');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (images.length && lightbox && lightboxImg && caption && closeBtn && prevBtn && nextBtn) {
    let currentIndex = 0;

    // باز کردن لایت‌باکس با کلیک روی عکس
    images.forEach((img, idx) => {
      img.addEventListener('click', () => {
        currentIndex = idx;
        openLightbox();
      });
    });

    function openLightbox() {
      const img = images[currentIndex];
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt || '';
      caption.textContent = img.alt || '';
      lightbox.classList.add('visible');
      document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
      lightbox.classList.remove('visible');
      document.body.style.overflow = '';
    }

    // کنترل دکمه‌ها
    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      openLightbox();
    });
    nextBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      currentIndex = (currentIndex + 1) % images.length;
      openLightbox();
    });

    // بستن با کلیک روی بک‌گراند
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    // کنترل با کیبورد
    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('visible')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        openLightbox();
      }
      if (e.key === 'ArrowRight') {
        currentIndex = (currentIndex + 1) % images.length;
        openLightbox();
      }
    });
  }

  /* === Reveal on scroll === */
  const reveals = document.querySelectorAll('.reveal');
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    reveals.forEach(elem => {
      const top = elem.getBoundingClientRect().top;
      if (top < windowHeight - 100) {
        elem.classList.add('active');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // بررسی اولیه

  /* === Hamburger Menu === */
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.navbar ul');

  if (menuToggle && navMenu) {
    // باز و بسته کردن منو
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('show');
    });

    // بستن منو وقتی روی لینک کلیک شد
    const navLinks = document.querySelectorAll('.navbar a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if(navMenu.classList.contains('show')){
          navMenu.classList.remove('show');
        }
      });
    });
  }

});
