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

const balance = document.querySelector('[data-balance]');
const balanceToggle = document.querySelector('[data-balance-toggle]');

if (balance && balanceToggle) {
  const balanceValue = balance.textContent;

  balanceToggle.addEventListener('click', () => {
    const isHidden = balanceToggle.getAttribute('aria-pressed') === 'true';
    balance.textContent = isHidden ? balanceValue : '₦••••••••';
    balanceToggle.textContent = isHidden ? 'Hide balance' : 'Show balance';
    balanceToggle.setAttribute('aria-pressed', String(!isHidden));
  });
}

const toast = document.querySelector('.toast');
let toastTimer;

document.querySelectorAll('[data-demo-action]').forEach((button) => {
  button.addEventListener('click', () => {
    if (!toast) return;

    toast.textContent = button.dataset.demoAction;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
  });
});
