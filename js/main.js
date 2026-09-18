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

const transferForm = document.querySelector('[data-transfer-form]');
const transferReview = document.getElementById('transfer-review');
const editTransferButton = document.querySelector('[data-edit-transfer]');

if (transferForm && transferReview) {
  transferForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!transferForm.checkValidity()) {
      transferForm.reportValidity();
      return;
    }

    const values = new FormData(transferForm);
    const amount = Number(values.get('amount'));
    const formattedAmount = new Intl.NumberFormat('en-NG', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);

    document.querySelector('[data-review-bank]').textContent = values.get('bank');
    document.querySelector('[data-review-account]').textContent = values.get('accountNumber');
    document.querySelector('[data-review-amount]').textContent = `₦${formattedAmount}`;
    document.querySelector('[data-review-narration]').textContent = values.get('narration') || 'No narration';

    transferForm.hidden = true;
    transferReview.hidden = false;
    transferReview.focus();
  });
}

if (editTransferButton && transferForm && transferReview) {
  editTransferButton.addEventListener('click', () => {
    transferReview.hidden = true;
    transferForm.hidden = false;
    transferForm.querySelector('#bank').focus();
  });
}

const transactionFilterButtons = document.querySelectorAll('[data-transaction-filter]');
const historyItems = document.querySelectorAll('[data-transaction-type]');
const emptyHistory = document.querySelector('[data-empty-history]');

transactionFilterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.transactionFilter;
    let visibleCount = 0;

    transactionFilterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('is-active', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });

    historyItems.forEach((item) => {
      const isVisible = filter === 'all' || item.dataset.transactionType === filter;
      item.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    if (emptyHistory) emptyHistory.hidden = visibleCount !== 0;
  });
});

document.querySelectorAll('[data-password-toggle]').forEach((button) => {
  button.addEventListener('click', () => {
    const input = button.previousElementSibling;
    const isPassword = input.type === 'password';
    input.type = isPassword ? 'text' : 'password';
    button.textContent = isPassword ? 'Hide' : 'Show';
    button.setAttribute('aria-label', isPassword ? 'Hide password' : 'Show password');
  });
});

document.querySelectorAll('[data-auth-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (toast) {
      toast.textContent = 'Authentication will be connected when the secure backend is built.';
      toast.classList.add('is-visible');
      clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => toast.classList.remove('is-visible'), 3500);
    }
  });
});
