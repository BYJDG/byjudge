// Dashboard functionality
import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Initialize dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication state
    onAuthStateChanged(auth, (user) => {
        if (user) {
            loadUserData(user);
            loadUserOrders(user.uid);
        } else {
            // Redirect to login if not authenticated
            window.location.href = 'login.html';
        }
    });
    
    // Initialize user menu dropdown
    initUserMenu();
});

// Load user data
async function loadUserData(user) {
    try {
        // Get user document from Firestore
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        
        if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Update UI with user data
            document.getElementById('welcomeName').textContent = userData.fullName || 'Kullanıcı';
            document.getElementById('userName').textContent = userData.fullName || 'Kullanıcı';
            document.getElementById('userEmail').textContent = userData.email || user.email;
            document.getElementById('userRole').textContent = userData.role === 'admin' ? 'Yönetici' : 'Kullanıcı';
        } else {
            // Fallback to auth user data
            document.getElementById('welcomeName').textContent = user.displayName || 'Kullanıcı';
            document.getElementById('userName').textContent = user.displayName || 'Kullanıcı';
            document.getElementById('userEmail').textContent = user.email;
            document.getElementById('userRole').textContent = 'Kullanıcı';
        }
    } catch (error) {
        console.error('Error loading user data:', error);
        // Fallback to auth user data
        document.getElementById('welcomeName').textContent = user.displayName || 'Kullanıcı';
        document.getElementById('userName').textContent = user.displayName || 'Kullanıcı';
        document.getElementById('userEmail').textContent = user.email;
        document.getElementById('userRole').textContent = 'Kullanıcı';
    }
}

// Load user orders (placeholder - you'll need to implement order system)
async function loadUserOrders(userId) {
    try {
        // This is a placeholder - you'll need to implement your order system
        // For now, we'll show empty state
        const recentOrdersDiv = document.getElementById('recentOrders');
        
        // You can implement order loading here
        // Example:
        // const ordersQuery = query(collection(db, 'orders'), where('userId', '==', userId), orderBy('createdAt', 'desc'), limit(5));
        // const ordersSnapshot = await getDocs(ordersQuery);
        // ... process orders
        
        // Update order stats (placeholder)
        document.getElementById('totalOrders').textContent = '0';
        document.getElementById('completedOrders').textContent = '0';
        document.getElementById('pendingOrders').textContent = '0';
        
    } catch (error) {
        console.error('Error loading orders:', error);
    }
}

// Initialize user menu dropdown
function initUserMenu() {
    const userMenuButton = document.getElementById('userMenuButton');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userMenuButton && userDropdown) {
        userMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            userDropdown.classList.toggle('hidden');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!userMenuButton.contains(e.target) && !userDropdown.contains(e.target)) {
                userDropdown.classList.add('hidden');
            }
        });
    }
}

// Utility function to format date
function formatDate(date) {
    return new Date(date).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY'
    }).format(amount);
}
