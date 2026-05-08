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
  const paymentModal = document.getElementById('paymentModal');
  const banInfoModal = document.getElementById('banInfoModal');
  const bypassFeaturesModal = document.getElementById('bypassFeaturesModal');
  const privateFeaturesModal = document.getElementById('privateFeaturesModal');
  const wolfteamVipFeaturesModal = document.getElementById('wolfteamVipFeaturesModal');
  const wolfteamFeaturesModal = document.getElementById('wolfteamFeaturesModal');
  const wolfteamVlpFeaturesModal = document.getElementById('wolfteamVlpFeaturesModal');
  
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

// Theme toggle functionality
(function() {
  const themeToggle = document.getElementById('themeToggle');
  const sunIcon = document.getElementById('sunIcon');
  const moonIcon = document.getElementById('moonIcon');
  
  if (!themeToggle) return;
  
  // Get initial theme
  const getTheme = () => {
    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return stored === 'dark' || (!stored && prefersDark) ? 'dark' : 'light';
  };
  
  // Apply theme
  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.classList.toggle('dark', isDark);
    
    if (sunIcon && moonIcon) {
      sunIcon.style.display = isDark ? 'block' : 'none';
      moonIcon.style.display = isDark ? 'none' : 'block';
    }
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = isDark ? '#0b1220' : '#ffffff';
    }
  };
  
  // Toggle theme
  const toggleTheme = () => {
    const currentTheme = getTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };
  
  // Initialize theme
  applyTheme(getTheme());
  
  // Add event listener
  themeToggle.addEventListener('click', toggleTheme);
})();

// Telegram Guarantee Intercept
(function() {
  // Create Modal HTML
  const modalHTML = `
    <div id="telegramModal" class="payment-modal telegram-modal" style="display: none;">
      <div class="payment-card telegram-card">
        <div class="flex justify-center mb-4 text-blue-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.19-.08-.05-.19-.02-.27 0-.12.03-1.99 1.25-5.61 3.65-.53.36-1.01.54-1.44.53-.47-.01-1.38-.26-2.05-.48-.83-.27-1.49-.41-1.43-.87.03-.24.36-.49.97-.75C8.03 9.49 11.83 7.9 14 7.02c1.03-.42 1.25-.5 1.4-.5.03 0 .1.01.14.04.04.02.06.07.07.13.01.07.01.19 0 .31z"></path>
           </svg>
        </div>
        <h3 class="text-xl font-bold mb-3 text-center text-gray-900 dark:text-white">Telegram hesabınız var mı?</h3>
        <p class="text-gray-600 dark:text-gray-400 mb-6 text-center text-sm">Güvence kanalımızı görüntülemek için bir uygulama seçimi yapın.</p>
        <div class="flex justify-center space-x-4">
          <button id="tgBtnYes" class="bg-green-500 hover:bg-green-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg w-full">Evet</button>
          <button id="tgBtnNo" class="bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg w-full">Hayır</button>
        </div>
      </div>
    </div>
  `;
  
  // Wait for the DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const telegramModal = document.getElementById('telegramModal');
    const btnYes = document.getElementById('tgBtnYes');
    const btnNo = document.getElementById('tgBtnNo');
    
    let currentTgLink = 'https://t.me/byjudgeguvence';

    // Intercept clicks on links
    document.addEventListener('click', function(e) {
      let targetLink = e.target.closest('a');
      if (targetLink && targetLink.href && targetLink.href.includes('t.me/byjudgeguvence')) {
        e.preventDefault();
        currentTgLink = targetLink.href;
        telegramModal.style.display = 'block';
      }
    });

    // Modal actions
    btnYes.addEventListener('click', () => {
      telegramModal.style.display = 'none';
      window.open(currentTgLink, '_blank');
    });

    btnNo.addEventListener('click', () => {
      telegramModal.style.display = 'none';
      window.location.href = 'guvence-onizleme.html';
    });

    // Close when clicking outside
    document.addEventListener('click', function (event) {
      if (event.target === telegramModal) {
        telegramModal.style.display = 'none';
      }
    });
  });
})();
