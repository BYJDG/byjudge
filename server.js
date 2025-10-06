const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: './config.env' });

// Import routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');
const uploadRoutes = require('./routes/upload');

// Import security middleware
const {
    adminRateLimit,
    authRateLimit,
    uploadRateLimit,
    checkAdminIP,
    logAdminActivity,
    detectSuspiciousActivity,
    validateRequest,
    sanitizeInput
} = require('./middleware/security');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable for development
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Trust proxy for accurate IP addresses
app.set('trust proxy', 1);

// Global security middleware
app.use(detectSuspiciousActivity);
app.use(validateRequest);
app.use(sanitizeInput);

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Çok fazla istek gönderdiniz, lütfen daha sonra tekrar deneyin.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'byjudge-main')));

// Create necessary directories
const createDirectories = () => {
  const dirs = ['database', 'uploads', 'uploads/receipts'];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

// Routes with security middleware
app.use('/api/auth', authRateLimit, authRoutes);
app.use('/api/admin', adminRateLimit, checkAdminIP, logAdminActivity, adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRateLimit, uploadRoutes);

// Frontend routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'index.html'));
});

app.get('/urunler', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'urunler.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'auth.html'));
});

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'auth.html'));
});

app.get('/auth', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'auth.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'orders.html'));
});

app.get('/profile', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'profile.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'admin.html'));
});

app.get('/sss', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'sss.html'));
});

app.get('/iletisim', (req, res) => {
  res.sendFile(path.join(__dirname, 'byjudge-main', 'iletisim.html'));
});

// API health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV 
  });
});

// 404 handler
app.use('*', (req, res) => {
  if (req.originalUrl.startsWith('/api/')) {
    res.status(404).json({ error: 'API endpoint bulunamadı' });
  } else {
    res.sendFile(path.join(__dirname, 'byjudge-main', 'index.html'));
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Sunucu hatası',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Bir hata oluştu'
  });
});

// Initialize database and start server
const initializeApp = async () => {
  try {
    createDirectories();
    
    // Initialize database
    const { initializeDatabase } = require('./database/init');
    await initializeDatabase();
    
    // Start security monitor
    if (process.env.NODE_ENV === 'production') {
      const SecurityMonitor = require('./scripts/security-monitor');
      const monitor = new SecurityMonitor();
      monitor.initialize();
      console.log('🔍 Güvenlik monitörü başlatıldı');
    }
    
    app.listen(PORT, () => {
      console.log(`🚀 Server ${PORT} portunda çalışıyor`);
      console.log(`📱 Site: http://localhost:${PORT}`);
      console.log(`🔧 Admin Panel: http://localhost:${PORT}/admin`);
      console.log(`📊 API: http://localhost:${PORT}/api`);
      console.log(`🔐 Admin: ${process.env.ADMIN_USERNAME} (${process.env.ADMIN_EMAIL})`);
    });
  } catch (error) {
    console.error('Uygulama başlatma hatası:', error);
    process.exit(1);
  }
};

initializeApp();
