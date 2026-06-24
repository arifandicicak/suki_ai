# 📝 Setup & Local Code Development Guide (StudySuki AI)

This master setup manual guides developers and testers through configuring, executing, customizing, and troubleshooting the **StudySuki AI** codebase on a local workstation or deployed container.

---

## 📌 Prerequisites & Tools

Ensure your host operating system is equipped with the following:
* **Node.js** (v18 LTS or more recent matches development specifications)
* **npm** (Distributed standardly with Node.js)
* **Google Chrome** or **Microsoft Edge** (Chromium-based engines provide the most dependable and compliant Web Speech API implementation out of the box)

---

## 🚀 Running StudySuki AI Locally

### Step 1: Install Package Dependencies
Open your workspace terminal inside the root directory and run the standard installer to download all React libraries, Express tooling, Tailwind, Firebase, and charting packages:

```bash
npm install
```

### Step 2: Configure Environment Variables (`.env`)
Create a local `.env` file within the root directory matching our provided `.env.example` template:

```bash
cp .env.example .env
```

Open the newly created `.env` file and input your credentials:

```env
# GEMINI_API_KEY: Paste your Google AI Studio API credential.
# This variable is loaded server-side by server.ts and is safe from browser exposure.
GEMINI_API_KEY="AIzaSyYourGeminiApiKeyHere"

# APP_URL: The hosting domain used to route web requests and resolve API targets.
APP_URL="http://localhost:3000"
```

> ⚠️ **IMPORTANT**: In accordance with modern frontend security practices, `GEMINI_API_KEY` **does not** use the `VITE_` prefix. This prevents Vite's engine from parsing it into client-side javascript bundles that are fully readable through the browser console.

---

## ⚙️ Secure Firebase Config & Anti-Reset Progress Flow

*StudySuki* integrates **Firebase Authentication (Google SSO)** and **Firestore Database** to record all progress, EXP, milestones, streaks, and FIDE chess histories.

### How Progress Synchronization Works
1. **Offline State**: When playing as a guest, achievements are temporarily tracked inside the browser's `localStorage` (via keys like `studysuki_current_user` and `studysuki_progress_*`).
2. **Dynamic Configuration Loading**: To hide Firebase credentials from raw static bundles, the client fetches the database config securely at startup from our Express route `/api/firebase-config`.
3. **Session Activation**: Upon Google login, the handler `auth.onAuthStateChanged` triggers, pulling the user's latest cloud records from the Firestore path `users/{userId}`.
4. **Auto-merge & Sync**: When completing a task, reading a scroll, or scoring high in chess, `syncUserDataToFirestore()` triggers to update both local storage and remote Firestore databases simultaneously.
5. **Session Continuity**: Upon logging out and logging back in, user statistics are restored, ensuring user progress **is never lost or reset**.

### Customizing the Firebase Database
To link the application to your custom Firebase environment:
1. Initialize a new project on your [Firebase Console](https://console.firebase.google.com/).
2. Enable **Google Sign-In / Anonymous** methods via *Authentication -> Sign-In Method*.
3. Provision a **Cloud Firestore** instance.
4. Save your configuration credentials into `firebase-applet-config.json` in the root of your project:

```json
{
  "apiKey": "AIzaSyYourConfigApiKey",
  "authDomain": "your-app.firebaseapp.com",
  "projectId": "your-app",
  "storageBucket": "your-app.appspot.com",
  "messagingSenderId": "YourSenderId",
  "appId": "YourAppId",
  "measurementId": "YourMeasurementId",
  "firestoreDatabaseId": "YourFirestoreDatabaseId"
}
```

---

## 🎙️ Troubleshooting Speech Studio (Speech-to-Text)

Our speech recognition engine leverages Chrome's native speech recognition implementation. If voice recording or translation fails:

1. **Verify Your Web Browser**:
   Chrome, Edge, and Safari support the Speech Recognition API. Firefox developers will need to enable Web Speech flags manually in `about:config` (`media.webspeech.recognition.enable`).
2. **Adjust Microphone Access**:
   If a prompt saying `⚠️ Izin Mikrofon Ditolak! / Microphone Access Blocked!` appears, click the lock/sliders icon on Chrome's URL bar, toggle Microphone to **Allow**, and refresh.
3. **iFrame Environment Configurations**:
   When loaded within virtual iFrames (like the Google AI Studio Preview system), permission headers must be declared explicitly in `metadata.json` for security delegation:
   ```json
   "requestFramePermissions": ["microphone"]
   ```
4. **Observe Active Waveforms**:
   The interactive waveform is bound to the actual sound waves received by the Web Audio API. If the wave scales dynamically when you speak, mic connection is fully functional. If the wave remains flat, check system audio inputs.

---

## 🏃 Launch Development Server

To boot the live dev environment with hot reloading and sandbox tooling:

```bash
npm run dev
```

* The dev environment binds to `http://localhost:3000`.
* Open the browser console (`F12`) to monitor the console statements tracking raw speech audio data.

---

## 📦 Building for Production

Compile optimized production assets and server bundles:

```bash
npm run build
```

The output build will be stored inside the `/dist` directory. To start the production server locally at port 3000:

```bash
npm start
```

---

*Thank you for following these instructions. Enjoy building exceptional tools with **Suki**!* 🌸
