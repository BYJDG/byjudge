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

// Modal açma/kapama fonksiyonları (Ban Info, Bypass, Private, Wolfteam vb.)
function showBanInfo() { document.getElementById('banInfoModal').style.display = 'block'; }
function closeBanInfo() { document.getElementById('banInfoModal').style.display = 'none'; }

function showBypassFeatures() { document.getElementById('bypassFeaturesModal').style.display = 'block'; }
function closeBypassFeatures() { document.getElementById('bypassFeaturesModal').style.display = 'none'; }

function showPrivateFeatures() { document.getElementById('privateFeaturesModal').style.display = 'block'; }
function closePrivateFeatures() { document.getElementById('privateFeaturesModal').style.display = 'none'; }

function showWolfteamVipFeatures() { document.getElementById('wolfteamVipFeaturesModal').style.display = 'block'; }
function closeWolfteamVipFeatures() { document.getElementById('wolfteamVipFeaturesModal').style.display = 'none'; }

function showWolfteamFeatures() { document.getElementById('wolfteamFeaturesModal').style.display = 'block'; }
function closeWolfteamFeatures() { document.getElementById('wolfteamFeaturesModal').style.display = 'none'; }

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

// Dışarıya tıklandığında modalları kapatma
document.addEventListener('click', function (event) {
  const modals = [
    'paymentModal', 'banInfoModal', 'bypassFeaturesModal', 
    'privateFeaturesModal', 'wolfteamVipFeaturesModal', 'wolfteamFeaturesModal'
  ];
  
  modals.forEach(id => {
    const modal = document.getElementById(id);
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });
});

// Mobile menu toggle
(function () {
  const menuButton = document.getElementById('mobileMenuButton');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!menuButton || !mobileMenu) return;

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.contains('open');
    mobileMenu.classList.toggle('open', !isOpen);
    document.body.classList.toggle('no-scroll', !isOpen);
  };

  menuButton.addEventListener('click', (e) => { e.stopPropagation(); toggleMenu(); });
})();

// Theme toggle functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;
  
  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    localStorage.setItem('theme', theme);
  };
  
  themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(newTheme);
  });

  // Başlangıç teması
  const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  applyTheme(savedTheme);
})();
