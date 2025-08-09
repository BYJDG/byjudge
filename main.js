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
  const mobileMenuClose = document.getElementById('mobileMenuClose');
  if (!menuButton || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    const iconMenu = menuButton.querySelector('.icon-menu');
    const iconClose = menuButton.querySelector('.icon-close');
    if (iconMenu && iconClose) {
      iconMenu.classList.toggle('hidden', isOpen);
      iconClose.classList.toggle('hidden', !isOpen);
    }
  };

  menuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
  }

  // Close when clicking a link or outside drawer
  mobileMenu.addEventListener('click', (e) => {
    const target = e.target;
    const clickedLink = target && target.closest('a');
    const clickedInsideDrawer = target && target.closest('.mobile-drawer');
    if (clickedLink) {
      if (mobileMenu.classList.contains('open')) toggleMenu();
    } else if (!clickedInsideDrawer) {
      if (mobileMenu.classList.contains('open')) toggleMenu();
    }
  });

  // No global document listener needed; overlay handles outside clicks
})();

// Theme toggle removed


