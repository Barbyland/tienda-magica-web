const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

if (menuToggle && menu) {
  menuToggle.setAttribute('aria-expanded', 'false');
  menu.setAttribute('aria-hidden', 'true');

  const updateMenuState = (isOpen) => {
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-hidden', String(!isOpen));
    if (isOpen) {
      menu.classList.add('active');
    } else {
      menu.classList.remove('active');
    }
  };

  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.contains('active');
    updateMenuState(!isOpen);
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      updateMenuState(false);
    });
  });
}
