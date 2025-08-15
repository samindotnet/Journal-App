# Journal App (Ionic + Angular + Capacitor)

A cross-platform journaling app built with Ionic Angular and Capacitor, targeting the web, Android, and iOS. Uses Firebase Authentication and Cloud Firestore for secure, per-user entries.

Repo contains src/, android/, and ios/ platforms with Ionic/Capacitor config files. 
GitHub

## ✨ Features

Email/password sign up & sign in (Firebase Auth)

Create, read, update, and delete journal entries (Firestore)

Per-user data isolation via Firestore Security Rules

Responsive Ionic UI (runs on web, Android, and iOS)

Instant feedback via Ionic toasts (create/update/delete)

Dark/Light mode following system preference

## 🧰 Tech Stack

Frontend: Ionic Framework (Angular), TypeScript, SCSS

Runtime/Build: Capacitor (Android/iOS), Angular CLI

Backend (BaaS): Firebase Auth, Cloud Firestore

Testing: Karma/Jasmine (Angular default)

## 🚀 Getting Started
Prerequisites

Node.js 18+ and npm

Ionic CLI

npm i -g @ionic/cli


Angular CLI

npm i -g @angular/cli


Capacitor platform toolchains (as needed)

Android: Android Studio + SDKs

iOS (macOS): Xcode

### 1) Clone & Install
git clone https://github.com/samindotnet/Journal-App.git
cd Journal-App
npm install

### 2) Firebase Setup

Create a Firebase project (console.firebase.google.com).

Enable Authentication → Email/Password.

Create Cloud Firestore in production mode.

Add a Web App in Firebase → copy your config.

Create src/environments/environment.ts and (optionally) environment.prod.ts:

// src/environments/environment.ts
export const environment = {
  production: false,
  firebase: {
    apiKey: '<API_KEY>',
    authDomain: '<PROJECT_ID>.firebaseapp.com',
    projectId: '<PROJECT_ID>',
    storageBucket: '<PROJECT_ID>.appspot.com',
    messagingSenderId: '<SENDER_ID>',
    appId: '<APP_ID>',
    measurementId: '<MEASUREMENT_ID>' // optional
  }
};

### 3) Firestore Security Rules

Use rules that restrict reads/writes to the authenticated user’s UID. Example:

// Firestore rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Per-user journals collection
    match /users/{userId}/journals/{journalId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}


Deploy via Firebase Console or the Firebase CLI.

### 4) Run in the Browser
ionic serve

### 5) Add Native Platforms (Optional)
npx cap add android
npx cap add ios


Sync web build into native projects:

npm run build
npx cap sync


Open in IDEs:

npx cap open android
npx cap open ios


On iOS, ensure signing is set up in Xcode. On Android, select the correct SDK and Gradle version in Android Studio.

📁 Project Structure
Journal-App/
├─ android/                # Android native shell (Capacitor)
├─ ios/                    # iOS native shell (Capacitor)
├─ src/
│  ├─ app/                 # Angular modules/components/pages
│  │  ├─ pages/            # Login/Register/Journals etc.
│  │  ├─ services/         # AuthService, JournalService
│  │  └─ guards/           # (optional) auth route guards
│  ├─ assets/              # Icons, images
│  └─ environments/        # environment.ts files
├─ capacitor.config.ts     # Capacitor config
├─ ionic.config.json       # Ionic config
├─ angular.json            # Angular workspace config
└─ package.json

## 🔑 Auth & Data Model (Typical)

Auth: Firebase Email/Password

Firestore Path: users/{uid}/journals/{journalId}

Journal Entry Document:

export interface JournalEntry {
  id?: string;
  title: string;
  content: string;
  createdAt: number; // serverTimestamp
  updatedAt?: number;
}

## 🧪 Scripts

Common npm scripts (adjust to your package.json):

npm start           # same as 'ionic serve'
npm run build       # production build
npm test            # unit tests


Capacitor helpers:

npx cap sync
npx cap copy
npx cap open android
npx cap open ios

## 🧯 Troubleshooting

Blank screen on device: Run npm run build && npx cap sync before opening the native project.

Firebase 401/permission errors: Confirm Auth state and Firestore rules; ensure you’re writing to users/{uid}/journals.

Android Gradle issues: Open android/ in Android Studio and let it sync Gradle. Use a compatible JDK (e.g., 17).

iOS build errors: Open ios/App in Xcode, set signing, and ensure the minimum iOS version matches Capacitor requirements.

## 🗺️ Roadmap (ideas)

Tags & search

Rich text editor

Attach images (Capacitor Camera/Filesystem)

Offline cache (Firestore persistence)

Reminders / notifications

## 🤝 Contributing

PRs welcome! For major changes, please open an issue first to discuss what you’d like to change.

📄 License

MIT (or your preference). Add a LICENSE file at the repo root.
