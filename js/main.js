const menuButton = document.querySelector('.nav-toggle');
const navigation = document.getElementById('primary-navigation');

function setMenuState(isOpen) {
  if (!menuButton || !navigation) return;

  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close main menu' : 'Open main menu');
  navigation.classList.toggle('is-open', isOpen);
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.matches('a') && window.innerWidth < 700) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuButton.focus();
    }
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
