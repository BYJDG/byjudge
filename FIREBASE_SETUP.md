# Firebase Kurulum Talimatları

Bu dosya, ByJudge Store sitesine Firebase kimlik doğrulama ve veritabanı sistemini kurmak için gerekli adımları içerir.

## 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Proje Oluştur" butonuna tıklayın
3. Proje adını girin: `byjudge-store` (veya istediğiniz bir isim)
4. Google Analytics'i etkinleştirin (isteğe bağlı)
5. Projeyi oluşturun

## 2. Web Uygulaması Ekleme

1. Firebase Console'da projenizi seçin
2. Sol menüden "Project Settings" (Proje Ayarları) ikonuna tıklayın
3. "General" sekmesinde "Your apps" bölümüne gidin
4. Web uygulaması ikonuna (</>) tıklayın
5. Uygulama adını girin: `ByJudge Store Web`
6. "Firebase Hosting'i de kur" seçeneğini işaretleyin
7. "Uygulamayı kaydet" butonuna tıklayın

## 3. Firebase Konfigürasyonu

1. Firebase Console'da "Project Settings" > "General" sekmesine gidin
2. "Your apps" bölümünde web uygulamanızı bulun
3. "Config" objesini kopyalayın
4. `firebase-config.js` dosyasındaki `firebaseConfig` objesini güncelleyin:

```javascript
const firebaseConfig = {
  apiKey: "your-api-key-here",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};
```

## 4. Authentication Kurulumu

1. Firebase Console'da sol menüden "Authentication" seçin
2. "Get started" butonuna tıklayın
3. "Sign-in method" sekmesine gidin
4. "Email/Password" seçeneğini etkinleştirin:
   - "Email/Password" satırına tıklayın
   - İlk seçeneği (Email/Password) etkinleştirin
   - "Save" butonuna tıklayın

## 5. Firestore Database Kurulumu

1. Firebase Console'da sol menüden "Firestore Database" seçin
2. "Create database" butonuna tıklayın
3. "Start in test mode" seçeneğini seçin (geliştirme için)
4. Veritabanı konumunu seçin (Europe-west3 önerilir)
5. "Done" butonuna tıklayın

## 6. Güvenlik Kuralları (Firestore)

Firestore'da "Rules" sekmesine gidin ve aşağıdaki kuralları ekleyin:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Kullanıcılar sadece kendi verilerini okuyabilir/yazabilir
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Siparişler - kullanıcılar sadece kendi siparişlerini görebilir
    match /orders/{orderId} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
    }
    
    // Ürünler - herkes okuyabilir, sadece admin yazabilir
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## 7. Hosting Kurulumu (İsteğe Bağlı)

Eğer Firebase Hosting kullanmak istiyorsanız:

1. Terminal/Command Prompt'u açın
2. Proje klasörüne gidin
3. Firebase CLI'yi yükleyin: `npm install -g firebase-tools`
4. Firebase'e giriş yapın: `firebase login`
5. Projeyi başlatın: `firebase init hosting`
6. Mevcut klasörü public klasörü olarak seçin
7. Single-page app olarak yapılandırın: `Yes`
8. Build klasörünü belirtin: `.` (mevcut klasör)
9. Deploy edin: `firebase deploy`

## 8. Test Etme

1. `index.html` dosyasını tarayıcıda açın
2. "Kayıt Ol" butonuna tıklayın
3. Test kullanıcısı oluşturun
4. Giriş yapmayı test edin
5. Kullanıcı panelini kontrol edin

## 9. Güvenlik Notları

- Production ortamında Firestore güvenlik kurallarını güncelleyin
- API anahtarlarınızı güvende tutun
- Kullanıcı verilerini şifreleyin
- Rate limiting ekleyin
- HTTPS kullanın

## 10. Sorun Giderme

### Yaygın Hatalar:

1. **"Firebase is not defined"**: Firebase scriptlerinin doğru yüklendiğinden emin olun
2. **"Permission denied"**: Firestore güvenlik kurallarını kontrol edin
3. **"Invalid API key"**: Firebase konfigürasyonunu kontrol edin
4. **"Network error"**: İnternet bağlantınızı kontrol edin

### Debug Modu:

Tarayıcı konsolunda hataları kontrol edin:
- F12 tuşuna basın
- "Console" sekmesine gidin
- Hata mesajlarını inceleyin

## 11. Ek Özellikler

İleride ekleyebileceğiniz özellikler:
- Email doğrulama
- Şifre sıfırlama
- Sosyal medya girişi (Google, Facebook)
- Kullanıcı profil yönetimi
- Sipariş takip sistemi
- Admin paneli
- Email bildirimleri

## Destek

Herhangi bir sorun yaşarsanız:
1. Firebase dokümantasyonunu inceleyin
2. Console hatalarını kontrol edin
3. Güvenlik kurallarını gözden geçirin
4. Firebase Console'da Authentication ve Firestore bölümlerini kontrol edin
