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
