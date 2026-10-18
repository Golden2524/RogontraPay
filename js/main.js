const menuButton = document.querySelector('.nav-toggle');
const navigation = document.getElementById('primary-navigation');

function setMenuState(isOpen) {
  if (!menuButton || !navigation) return;

  const isDesktop = window.matchMedia('(min-width: 700px)').matches;
  const shouldOpen = !isDesktop && isOpen;

  menuButton.setAttribute('aria-expanded', String(shouldOpen));
  menuButton.setAttribute('aria-label', shouldOpen ? 'Close main menu' : 'Open main menu');
  navigation.classList.toggle('is-open', shouldOpen);
  navigation.setAttribute('aria-hidden', String(!isDesktop && !shouldOpen));
  navigation.inert = !isDesktop && !shouldOpen;
  document.body.classList.toggle('menu-open', shouldOpen);
}

if (menuButton && navigation) {
  menuButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  navigation.addEventListener('click', (event) => {
    event.stopPropagation();
    if (event.target.matches('a') && window.innerWidth < 700) {
      setMenuState(false);
    }
  });

  document.addEventListener('click', (event) => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    if (isOpen && window.innerWidth < 700 && !navigation.contains(event.target) && !menuButton.contains(event.target)) {
      setMenuState(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      setMenuState(false);
      menuButton.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 700) setMenuState(false);
  });

  setMenuState(false);
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

const contactForm = document.querySelector('[data-contact-form]');
const contactStatus = document.querySelector('[data-contact-status]');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.checkValidity()) {
      contactForm.reportValidity();
      return;
    }

    if (contactStatus) {
      contactStatus.textContent = 'Thanks for your message. The support inbox will be connected when the backend is built.';
    }
  });
}

const guideTopics = [
  {
    label: 'How do I make a transfer?',
    answer: 'Open Transfer, add the recipient details, then review the amount and account number before you confirm. In this frontend demo, no money is sent.'
  },
  {
    label: 'Where can I find a transaction?',
    answer: 'Open Transaction history and use the Money in or Money out filters to narrow the sample activity. A live product would also add date and search filters.'
  },
  {
    label: 'What should I check before sending?',
    answer: 'Check the recipient name, bank, account number, amount, and narration. A real payment flow should make these details easy to review before a transfer is authorised.'
  }
];

function createGuide() {
  const launcher = document.createElement('button');
  launcher.type = 'button';
  launcher.className = 'guide-launcher';
  launcher.setAttribute('aria-controls', 'rogo-guide');
  launcher.setAttribute('aria-expanded', 'false');
  launcher.innerHTML = '<span class="guide-launcher-mark" aria-hidden="true">?</span>Need help?';

  const panel = document.createElement('aside');
  panel.id = 'rogo-guide';
  panel.className = 'guide-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-labelledby', 'guide-title');
  panel.hidden = true;

  const heading = document.createElement('div');
  heading.className = 'guide-heading';
  heading.innerHTML = '<div><h2 id="guide-title">Rogontra Guide</h2><p>Guided-help prototype</p></div><button class="guide-close" type="button" aria-label="Close guided help">×</button>';

  const topics = document.createElement('div');
  topics.className = 'guide-topics';
  topics.setAttribute('aria-label', 'Guided help topics');
  const answer = document.createElement('p');
  answer.className = 'guide-answer';
  answer.setAttribute('aria-live', 'polite');
  answer.textContent = 'Choose a question for a short, practical answer.';

  guideTopics.forEach((topic) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'guide-topic';
    button.textContent = topic.label;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      topics.querySelectorAll('.guide-topic').forEach((item) => item.setAttribute('aria-pressed', String(item === button)));
      answer.textContent = topic.answer;
    });
    topics.append(button);
  });

  const safetyNote = document.createElement('p');
  safetyNote.className = 'guide-safety-note';
  safetyNote.textContent = 'Prototype only — never share a password, PIN, or card details in a help chat.';
  panel.append(heading, topics, answer, safetyNote);
  document.body.append(launcher, panel);

  const closeButton = panel.querySelector('.guide-close');
  const closeGuide = () => {
    panel.hidden = true;
    launcher.setAttribute('aria-expanded', 'false');
  };

  launcher.addEventListener('click', () => {
    const willOpen = panel.hidden;
    if (willOpen && menuButton?.getAttribute('aria-expanded') === 'true') setMenuState(false);
    panel.hidden = !willOpen;
    launcher.setAttribute('aria-expanded', String(willOpen));
    if (willOpen) closeButton.focus();
  });

  closeButton.addEventListener('click', () => {
    closeGuide();
    launcher.focus();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      closeGuide();
      launcher.focus();
    }
  });
}

createGuide();
