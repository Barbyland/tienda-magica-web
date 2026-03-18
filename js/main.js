const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');

  const updateMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    menu.classList.toggle('active', isOpen);
    menuToggle.classList.toggle('active', isOpen);
    document.body.classList.toggle('menu-open', isOpen);
  };

  menuToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = menu.classList.contains('active');
    updateMenuState(!isOpen);
  });

  menu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      updateMenuState(false);
    });
  });

  document.addEventListener('click', (e) => {
    const clickedInsideMenu = menu.contains(e.target);
    const clickedToggle = menuToggle.contains(e.target);

    if (!clickedInsideMenu && !clickedToggle && menu.classList.contains('active')) {
      updateMenuState(false);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('active')) {
      updateMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      updateMenuState(false);
    }
  });
}

const flipCards = document.querySelectorAll('.card-flip');

if (flipCards.length) {
  flipCards.forEach((card) => {
    card.addEventListener('click', () => {
      card.classList.toggle('is-flipped');
    });

    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.classList.toggle('is-flipped');
      }
    });
  });
}

const galleryCarousel = document.querySelector('.gallery-carousel');

if (galleryCarousel) {
  const track = galleryCarousel.querySelector('.gallery-track');
  const slides = Array.from(galleryCarousel.querySelectorAll('.gallery-slide'));
  const prevButton = galleryCarousel.querySelector('.gallery-control-prev');
  const nextButton = galleryCarousel.querySelector('.gallery-control-next');
  let currentIndex = 0;
  let visibleSlides = 4;

  const getVisibleSlides = () => (window.innerWidth <= 600 ? 2 : 4);
  const getStepSize = () => {
    const slide = slides[0];
    if (!slide) return 0;
    const gap = parseFloat(window.getComputedStyle(track).gap || '0');
    return slide.getBoundingClientRect().width + gap;
  };

  const updateCarousel = (index) => {
    visibleSlides = getVisibleSlides();
    const maxIndex = Math.max(0, slides.length - visibleSlides);
    currentIndex = index;

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    if (currentIndex < 0) {
      currentIndex = maxIndex;
    }

    track.style.transform = `translateX(-${currentIndex * getStepSize()}px)`;
  };

  prevButton.addEventListener('click', () => updateCarousel(currentIndex - 1));
  nextButton.addEventListener('click', () => updateCarousel(currentIndex + 1));

  let autoPlay = window.setInterval(() => {
    updateCarousel(currentIndex + 1);
  }, 3500);

  const resetAutoPlay = () => {
    window.clearInterval(autoPlay);
    autoPlay = window.setInterval(() => {
      updateCarousel(currentIndex + 1);
    }, 3500);
  };

  [prevButton, nextButton].forEach((element) => {
    element.addEventListener('click', resetAutoPlay);
  });

  galleryCarousel.addEventListener('mouseenter', () => {
    window.clearInterval(autoPlay);
  });

  galleryCarousel.addEventListener('mouseleave', () => {
    resetAutoPlay();
  });

  window.addEventListener('resize', () => {
    updateCarousel(currentIndex);
  });

  updateCarousel(0);
}
