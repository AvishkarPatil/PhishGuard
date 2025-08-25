# 🚀 PhishGuard Deployment Guide

## 📋 Prerequisites

```bash
Node.js 18+
npm or yarn
Firebase account
Git
```

## 🛠️ Local Development Setup

### **1. Clone Repository**

```bash
git clone https://github.com/AvishkarPatil/PhishGuard.git
cd PhishGuard
```

### **2. Install Dependencies**

```bash
npm install
# or
yarn install
```

### **3. Environment Configuration**

Create `.env.local` file in the root directory:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
```

### **4. Firebase Setup**

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (optional)
firebase init

# Deploy Firestore rules
firebase deploy --only firestore:rules
```

### **5. Database Seeding**

```bash
# Start development server
npm run dev

# Go to http://localhost:3000/admin
# Click "Seed Firebase Database" button
```

### **6. Run Development Server**

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Production Deployment

### **Vercel Deployment (Recommended)**

1. **Connect Repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Environment Variables**
   - Add all environment variables from `.env.local`
   - Set `NODE_ENV=production`

3. **Deploy**
   - Vercel will automatically build and deploy
   - Your app will be available at `https://your-app.vercel.app`

### **Manual Vercel CLI Deployment**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### **Netlify Deployment**

1. **Build Settings**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   - Add all Firebase configuration variables
   - Set `NODE_ENV=production`

### **Firebase Hosting**

```bash
# Build the application
npm run build

# Deploy to Firebase Hosting
firebase deploy --only hosting
```

---

## 🔧 Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

---

## 🔐 Firebase Configuration

### **1. Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create new project: `phishguard-your-name`
3. Enable Authentication (Email/Password)
4. Create Firestore database
5. Get configuration keys

### **2. Firestore Security Rules**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own profile
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Scenarios are readable by authenticated users
    match /scenarios/{scenarioId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
    
    // Leaderboard is readable by all authenticated users
    match /leaderboard/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### **3. Deploy Rules**

```bash
firebase deploy --only firestore:rules
```

---

## 🗄️ Database Seeding

### **Automatic Seeding (Recommended)**

1. Deploy the application
2. Go to `/admin` page
3. Click "Seed Firebase Database"
4. Wait for completion message

### **Manual Seeding**

```bash
# Run seeding script
npm run seed

# Or use Node.js directly
node -e "require('./lib/seed-data').seedDatabase()"
```

---

## 🔍 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API Key | ✅ |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase Auth Domain | ✅ |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase Project ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase Storage Bucket | ✅ |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase Messaging Sender ID | ✅ |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase App ID | ✅ |
| `NEXT_PUBLIC_GEMINI_API_KEY` | Google Gemini AI API Key | ⚠️ Optional |
| `NODE_ENV` | Environment (development/production) | ✅ |

---

## 🚨 Troubleshooting

### **Common Issues**

1. **Firebase Connection Error**
   ```bash
   # Check Firebase configuration
   # Ensure all environment variables are set
   # Verify Firebase project settings
   ```

2. **Build Failures**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

3. **Authentication Issues**
   ```bash
   # Check Firebase Auth settings
   # Ensure Email/Password provider is enabled
   # Verify security rules
   ```

4. **Database Access Denied**
   ```bash
   # Update Firestore security rules
   # Check user authentication status
   # Verify user permissions
   ```

### **Performance Optimization**

1. **Enable Compression**
   ```javascript
   // next.config.js
   module.exports = {
     compress: true,
     images: {
       domains: ['your-domain.com'],
     },
   }
   ```

2. **Bundle Analysis**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   npm run analyze
   ```

---

## 📊 Monitoring & Analytics

### **Vercel Analytics**
- Enable in Vercel dashboard
- Monitor performance metrics
- Track user interactions

### **Firebase Analytics**
- Enable Google Analytics in Firebase
- Track user engagement
- Monitor app performance

---

## 🔄 CI/CD Pipeline

### **GitHub Actions Example**

```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📞 Support

If you encounter any deployment issues:

- 📧 **Email:** me.avishkarpatil@gmail.com
- 🐙 **GitHub Issues:** [Create Issue](https://github.com/AvishkarPatil/PhishGuard/issues)
- 📱 **LinkedIn:** [Avishkar Patil](https://linkedin.com/in/TheAvishkar)

---

**🚀 Happy Deploying!**