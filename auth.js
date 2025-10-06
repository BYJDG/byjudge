// Authentication Functions
import { 
    signInWithEmailAndPassword, 
    createUserWithEmailAndPassword, 
    signOut, 
    onAuthStateChanged 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js';
import { 
    doc, 
    setDoc, 
    getDoc 
} from 'https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js';

// Global variables
let currentUser = null;

// Initialize authentication state listener
onAuthStateChanged(auth, (user) => {
    currentUser = user;
    updateUI();
});

// Update UI based on authentication state
function updateUI() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    const authLinks = document.getElementById('authLinks');

    if (currentUser) {
        // User is signed in
        if (loginBtn) loginBtn.style.display = 'none';
        if (registerBtn) registerBtn.style.display = 'none';
        if (userMenu) userMenu.style.display = 'block';
        if (authLinks) authLinks.style.display = 'none';
        
        // Redirect to dashboard or home page
        if (window.location.pathname.includes('login.html') || window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is signed out
        if (loginBtn) loginBtn.style.display = 'block';
        if (registerBtn) registerBtn.style.display = 'block';
        if (userMenu) userMenu.style.display = 'none';
        if (authLinks) authLinks.style.display = 'block';
    }
}

// Show error message
function showError(message) {
    const errorDiv = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const successDiv = document.getElementById('successMessage');
    
    if (errorDiv && errorText) {
        errorText.textContent = message;
        errorDiv.classList.remove('hidden');
        if (successDiv) successDiv.classList.add('hidden');
    }
}

// Show success message
function showSuccess(message) {
    const successDiv = document.getElementById('successMessage');
    const successText = document.getElementById('successText');
    const errorDiv = document.getElementById('errorMessage');
    
    if (successDiv && successText) {
        successText.textContent = message;
        successDiv.classList.remove('hidden');
        if (errorDiv) errorDiv.classList.add('hidden');
    }
}

// Hide messages
function hideMessages() {
    const errorDiv = document.getElementById('errorMessage');
    const successDiv = document.getElementById('successMessage');
    
    if (errorDiv) errorDiv.classList.add('hidden');
    if (successDiv) successDiv.classList.add('hidden');
}

// Set loading state
function setLoading(buttonId, isLoading) {
    const button = document.getElementById(buttonId);
    const text = document.getElementById(buttonId + 'Text');
    const spinner = document.getElementById(buttonId + 'Spinner');
    
    if (button && text && spinner) {
        button.disabled = isLoading;
        if (isLoading) {
            text.style.display = 'none';
            spinner.classList.remove('hidden');
        } else {
            text.style.display = 'inline';
            spinner.classList.add('hidden');
        }
    }
}

// Login function
async function login(email, password) {
    try {
        hideMessages();
        setLoading('loginBtn', true);
        
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        showSuccess('Giriş başarılı! Yönlendiriliyorsunuz...');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Login error:', error);
        let errorMessage = 'Giriş yapılırken bir hata oluştu.';
        
        switch (error.code) {
            case 'auth/user-not-found':
                errorMessage = 'Bu e-posta adresi ile kayıtlı kullanıcı bulunamadı.';
                break;
            case 'auth/wrong-password':
                errorMessage = 'Hatalı şifre.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Geçersiz e-posta adresi.';
                break;
            case 'auth/user-disabled':
                errorMessage = 'Bu hesap devre dışı bırakılmış.';
                break;
            case 'auth/too-many-requests':
                errorMessage = 'Çok fazla başarısız deneme. Lütfen daha sonra tekrar deneyin.';
                break;
        }
        
        showError(errorMessage);
    } finally {
        setLoading('loginBtn', false);
    }
}

// Register function
async function register(fullName, email, phone, password) {
    try {
        hideMessages();
        setLoading('registerBtn', true);
        
        // Create user account
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        // Save additional user data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
            fullName: fullName,
            email: email,
            phone: phone,
            createdAt: new Date(),
            role: 'user'
        });
        
        showSuccess('Kayıt başarılı! Giriş yapılıyor...');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
        
    } catch (error) {
        console.error('Register error:', error);
        let errorMessage = 'Kayıt olurken bir hata oluştu.';
        
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = 'Bu e-posta adresi zaten kullanılıyor.';
                break;
            case 'auth/invalid-email':
                errorMessage = 'Geçersiz e-posta adresi.';
                break;
            case 'auth/weak-password':
                errorMessage = 'Şifre çok zayıf. En az 6 karakter olmalıdır.';
                break;
        }
        
        showError(errorMessage);
    } finally {
        setLoading('registerBtn', false);
    }
}

// Logout function
async function logout() {
    try {
        await signOut(auth);
        showSuccess('Çıkış yapıldı.');
        window.location.href = 'index.html';
    } catch (error) {
        console.error('Logout error:', error);
        showError('Çıkış yapılırken bir hata oluştu.');
    }
}

// Password visibility toggle
function togglePasswordVisibility(inputId, buttonId) {
    const input = document.getElementById(inputId);
    const button = document.getElementById(buttonId);
    const icon = button.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            await login(email, password);
        });
    }
    
    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            // Validate passwords match
            if (password !== confirmPassword) {
                showError('Şifreler eşleşmiyor.');
                return;
            }
            
            await register(fullName, email, phone, password);
        });
    }
    
    // Password visibility toggles
    const togglePassword = document.getElementById('togglePassword');
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            togglePasswordVisibility('password', 'togglePassword');
        });
    }
    
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', () => {
            togglePasswordVisibility('confirmPassword', 'toggleConfirmPassword');
        });
    }
    
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});

// Export functions for global use
window.login = login;
window.register = register;
window.logout = logout;
window.currentUser = () => currentUser;
