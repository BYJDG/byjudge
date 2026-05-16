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

// Ban Info Modal functions
function showBanInfo() {
  document.getElementById('banInfoModal').style.display = 'block';
}

function closeBanInfo() {
  document.getElementById('banInfoModal').style.display = 'none';
}

// Bypass Features Modal functions
function showBypassFeatures() {
  document.getElementById('bypassFeaturesModal').style.display = 'block';
}

function closeBypassFeatures() {
  document.getElementById('bypassFeaturesModal').style.display = 'none';
}

// Private Features Modal functions
function showPrivateFeatures() {
  document.getElementById('privateFeaturesModal').style.display = 'block';
}

function closePrivateFeatures() {
  document.getElementById('privateFeaturesModal').style.display = 'none';
}

// Wolfteam Vİp Features
function showWolfteamVipFeatures() {
  document.getElementById('wolfteamVipFeaturesModal').style.display = 'block';
}

function closeWolfteamVipFeatures() {
  document.getElementById('wolfteamVipFeaturesModal').style.display = 'none';
}

// Wolfteam Features
function showWolfteamFeatures() {
  document.getElementById('wolfteamFeaturesModal').style.display = 'block';
}

function closeWolfteamFeatures() {
  document.getElementById('wolfteamFeaturesModal').style.display = 'none';
}

// Wolfteam VLP Features
function showWolfteamVlpFeatures() {
  document.getElementById('wolfteamVlpFeaturesModal').style.display = 'block';
}

function closeWolfteamVlpFeatures() {
  document.getElementById('wolfteamVlpFeaturesModal').style.display = 'none';
}

// Wolfteam VLP Discount Modal functions (YENİ EKLENEN)
function showVlpDiscountModal() {
  document.getElementById('vlpDiscountModal').style.display = 'block';
}

function closeVlpDiscountModal() {
  document.getElementById('vlpDiscountModal').style.display = 'none';
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

// Close modal when clicking outside (YENİ MODAL BURAYA EKLENDİ)
document.addEventListener('click', function (event) {
  const paymentModal = document.getElementById('paymentModal');
  const banInfoModal = document.getElementById('banInfoModal');
  const bypassFeaturesModal = document.getElementById('bypassFeaturesModal');
  const privateFeaturesModal = document.getElementById('privateFeaturesModal');
  const wolfteamVipFeaturesModal = document.getElementById('wolfteamVipFeaturesModal');
  const wolfteamFeaturesModal = document.getElementById('wolfteamFeaturesModal');
  const wolfteamVlpFeaturesModal = document.getElementById('wolfteamVlpFeaturesModal');
  const vlpDiscountModal = document.getElementById('vlpDiscountModal'); // YENİ

  if (event.target === paymentModal) {
    closePayment();
  }
  if (event.target === banInfoModal) {
    closeBanInfo();
  }
  if (event.target === bypassFeaturesModal) {
    closeBypassFeatures();
  }
  if (event.target === privateFeaturesModal) {
    closePrivateFeatures();
  }
  if (event.target === wolfteamVipFeaturesModal) {
    closeWolfteamVipFeatures();
  }
  if (event.target === wolfteamFeaturesModal) {
    closeWolfteamFeatures();
  }
  if (event.target === wolfteamVlpFeaturesModal) {
    closeWolfteamVlpFeatures();
  }
  if (event.target === vlpDiscountModal) { // YENİ
    closeVlpDiscountModal();
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
    const nextIsOpen = !isOpen;
    mobileMenu.classList.toggle('open', nextIsOpen);
    document.body.classList.toggle('no-scroll', nextIsOpen);
    menuButton.setAttribute('aria-expanded', String(nextIsOpen));

    const iconMenu = menuButton.querySelector('.icon-menu');
    const iconClose = menuButton.querySelector('.icon-close');

    if (iconMenu && iconClose) {
      iconMenu.classList.toggle('hidden', nextIsOpen);
      iconClose.classList.toggle('hidden', !nextIsOpen);
    }
  };

  menuButton.addEventListener('click', toggleMenu);
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', toggleMenu);
  }

  // Close mobile menu when clicking a link
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      document.body.classList.remove('no-scroll');
      menuButton.setAttribute('aria-expanded', 'false');

      const iconMenu = menuButton.querySelector('.icon-menu');
      const iconClose = menuButton.querySelector('.icon-close');
      if (iconMenu && iconClose) {
        iconMenu.classList.remove('hidden');
        iconClose.classList.add('hidden');
      }
    });
  });
})();

// Telegram Güvence Modal İşlemleri
document.addEventListener('DOMContentLoaded', function () {
  const telegramModal = document.getElementById('telegramModal');
  if (telegramModal) {
    const btnYes = document.getElementById('tgBtnYes');
    const btnNo = document.getElementById('tgBtnNo');

    let currentTgLink = 'https://t.me/byjudgeguvence';

    // Intercept clicks on links
    document.addEventListener('click', function (e) {
      let targetLink = e.target.closest('a');
      if (targetLink && targetLink.href && targetLink.href.includes('t.me/byjudgeguvence')) {
        e.preventDefault();
        currentTgLink = targetLink.href;
        telegramModal.style.display = 'block';
      }
    });

    // Modal actions
    if (btnYes) {
      btnYes.addEventListener('click', () => {
        telegramModal.style.display = 'none';
        window.open(currentTgLink, '_blank');
      });
    }

    if (btnNo) {
      btnNo.addEventListener('click', () => {
        telegramModal.style.display = 'none';
        window.location.href = 'guvence-onizleme.html';
      });
    }
  }
});
