// Payment modal state
let selectedProduct = '';
let selectedPrice = '';

function showPayment(product, price) {
  selectedProduct = product;
  selectedPrice = price;
  document.getElementById('productInfo').innerHTML = `
    <strong>Ürün:</strong> ${product} (${price})
  `;
  document.getElementById('paymentModal').style.display = 'block';
}

function closePayment() {
  document.getElementById('paymentModal').style.display = 'none';
}

function copyText(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('Başarıyla kopyalandı!');
  }).catch(err => {
    console.error('Kopyalama hatası:', err);
  });
}

function handlePaymentConfirmation() {
  closePayment();
  window.open('https://t.me/byjudgee', '_blank');
}

// Close modal when clicking outside
document.addEventListener('click', function (event) {
  const modal = document.getElementById('paymentModal');
  if (event.target === modal) {
    closePayment();
  }
});

// Mobile menu toggle
(function () {
  const menuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuButton || !mobileMenu) return;

  const toggleMenu = () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    menuButton.setAttribute('aria-expanded', String(isHidden));
    const icon = menuButton.querySelector('i');
    if (icon) {
      icon.classList.toggle('fa-bars', !isHidden);
      icon.classList.toggle('fa-times', isHidden);
    }
  };

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  mobileMenu.addEventListener('click', (e) => {
    const target = e.target;
    if (target && target.tagName === 'A') {
      if (!mobileMenu.classList.contains('hidden')) toggleMenu();
    }
  });

  document.addEventListener('click', (e) => {
    if (!mobileMenu.classList.contains('hidden')) {
      const isClickInsideMenu = mobileMenu.contains(e.target);
      const isClickOnButton = menuButton.contains(e.target);
      if (!isClickInsideMenu && !isClickOnButton) {
        toggleMenu();
      }
    }
  });
})();

// Theme toggle
(function () {
  const root = document.documentElement;
  const desktopBtn = document.getElementById('themeToggleDesktop');
  const mobileBtn = document.getElementById('themeToggleMobile');
  const buttons = [desktopBtn, mobileBtn].filter(Boolean);

  const applyIconState = () => {
    const isDark = root.classList.contains('dark');
    buttons.forEach((btn) => {
      const sun = btn.querySelector('.icon-sun');
      const moon = btn.querySelector('.icon-moon');
      if (!sun || !moon) return;
      sun.classList.toggle('hidden', isDark);
      moon.classList.toggle('hidden', !isDark);
    });
  };

  const setTheme = (mode) => {
    if (mode === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
    try { localStorage.setItem('theme', mode); } catch (e) {}
    applyIconState();
  };

  const toggleTheme = () => {
    const isDark = root.classList.contains('dark');
    setTheme(isDark ? 'light' : 'dark');
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggleTheme(); });
  });

  applyIconState();

  try {
    const stored = localStorage.getItem('theme');
    if (!stored && window.matchMedia) {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const onChange = (e) => setTheme(e.matches ? 'dark' : 'light');
      if (mq.addEventListener) mq.addEventListener('change', onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  } catch (e) {}

  // Expose globally for inline fallback (if any)
  window.toggleTheme = toggleTheme;
})();


