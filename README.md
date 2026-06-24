# 🌸 StudySuki AI: Premium Adaptive Learning Companion

- [x] README is available
- [x] Web/Code setup tutorial is available

> **StudySuki AI** is a high-performance, premium adaptive learning platform designed to guide users in mastering regional dialects, preserving ancient historical manuscripts (*Spirit Summons*), sharpening cognitive brain reflexes via licensed FIDE chess-board play, all while accompanied in real-time by an interactive digital AI mascot companion (**Suki**).

This application is built with a highly cohesive, secure **React-Vite (Full-Stack) & Express.js** architecture, featuring dynamic sound wave visualizers (*Waveform Analyser*), integrated real-time *Live Speech-to-Text* (STT), and database synchronization via **Firebase** to safeguard user learn-state progress.

---

## ✨ Core Advantages of the Platform

1. **Anti-Reset Cloud Progress Synchronization**: All user study progress, EXP points, daily streak tallies, historic chess matchup logs, and unlocked/read ancient libraries are fully integrated and synced with **Firebase Firestore**. When users log out or reconnect on a different session, progress is dynamically reloaded without losing any achievements.
2. **Robust Speech Recognition Engine**: The *Live Speech-to-Text* practice studio is built around Chrome-optimized dynamic web kit speech engine wrappers (`webkitSpeechRecognition`). It includes explicit fallback handlers, real-time interim transcript analysis (`interimResults = true`), active voice level visual waves, and custom status indicators notifying users of hardware blockades immediately.
3. **Double-Guarded Secret Management (No Leaked Keys)**: Excellent enterprise-level key security. Confidential credentials such as the Google AI Studio `GEMINI_API_KEY` are kept exclusively server-side. Additionally, the Firebase SDK initialization keys are fetched via a private custom express gateway (`/api/firebase-config`). **No API keys or system configurations are hardcoded or exposed to the public browser source code.**
4. **Captivating "Cosmic Slate" Designer Theme**: Features a highly polished, responsive custom slate-charcoal palette with indigo-violet glow accents, complete with rich, responsive micro-animations driven by `motion`.
5. **Interactive Responsive Mascot Companion**: Our lovable mentor **Suki** is anchored gracefully at the screen corner, adapting speaking states, micro-motions, and dialog feedback dynamically based on the current active UI panel and processed vocal transcripts.

---

## 🛠️ Main Features

### 🎙️ 1. SUKI AI Speech Studio (Speech-to-Text & Waveform)
* **Real-Time Sound Analysis**: Powered by Web Audio API's analyzer nodes, translating micro-decibel microphone input into highly fluid wave ripples.
* **Dialect Accent Extraction**: Dynamic local language targets let kawan test their pronunciation under diverse language and regional accents.
* **Continuous Resilient Session Logic**: Robust callback overrides for `onstart`, `onresult`, `onerror`, and `onend` prevent standard speech session dropouts.

### 🗺️ 2. Interactive Dialect Roadmaps
* Roadmap tracking routes for active dialects containing customized milestones.
* Progress checkpoints are saved in cloud repositories, visualized with glowing medals on successful completion.

### 📚 3. Ancient Historical Library (Spirit Summons)
* Gain access to ancient forgotten scrolls representing historic literature across different regions (Okinawa, Lisbon, Swabian, Anatolian, and Roma).
* Instantly tracks read tallies and custom collection progress.

### 🧩 4. Cognitive Training Chess Arena
* Real-time chess matches complete with on-board Move Undo, custom game difficulty settings, and AI advisory alerts powered by Gemini AI.

### 💬 5. AI Study Companion Chat
* Freeform chat consults with Suki, providing contextual responses, kind encouragements, and translation aid.

---

## 📸 Application Screenshot Previews

Explore the highly responsive layouts, beautiful themes, and premium interfaces offered by **StudySuki AI**:

| View Description | Light / Dark Theme Mockup Previews |
| :--- | :--- |
| **Main Dashboard (Dark Mode)** <br> *A premium deep charcoal-slate theme highlighting active modules, study streaks, and interactive Suki.* | <img src="/public/screenshots/main_page_dark_mode.png" width="380" alt="Main Dashboard Dark Mode"> |
| **Main Dashboard (Light Mode)** <br> *A clean white minimalism aesthetic using soft lavenders and slate cards.* | <img src="/public/screenshots/main_page_light_mode.png" width="380" alt="Main Dashboard Light Mode"> |
| **Linguistic Dialect Roadmaps** <br> *Interactive progress milestones winding through regional target challenges.* | <img src="/public/screenshots/dialect_roadmap.png" width="380" alt="Dialect Roadmaps"> |
| **Interactive Dialog Questions** <br> *Rigorous testing screens with immediate response checks and dialect logs.* | <img src="/public/screenshots/dialog_practice.png" width="380" alt="Assessment Questions"> |
| **Vocal Speech practice & wave indicators** <br> *Active visual sound curves reflecting decibel fluctuations real-time.* | <img src="/public/screenshots/speech_practice.png" width="380" alt="Speech practice"> |
| **Ancient Wisdom Scroll Library** <br> *Collectible scroll tiles keeping read achievements and historic folklore.* | <img src="/public/screenshots/ancient_library.png" width="380" alt="Scroll Library"> |
| **Cognitive Brain Chess Training** <br> *Real-time glassmorphism FIDE layout with instant Suki coaching bubbles.* | <img src="/public/screenshots/cognitive_chess.png" width="380" alt="Chess Play"> |
| **Regional Dialect Radar Analyser** <br> *Multidimensional radar plot tracking phonological accuracy.* | <img src="/public/screenshots/dialect_radar.png" width="380" alt="Dialect Radar"> |
| **Suki AI Analytics & EXP Meters** <br> *Vibrant bar charts and line progressions capturing weekly gains.* | <img src="/public/screenshots/suki_analytics.png" width="380" alt="Analytics Dashboard"> |
| **Localized Etiquette & Cultural Guide** <br> *Clear instructional slides preventing communication faux pas.* | <img src="/public/screenshots/etiquette_guide.png" width="380" alt="Etiquette Rules"> |
| **Custom User Profile & Achievement Badges** <br> *Premium unlocked badges and rank indicators.* | <img src="/public/screenshots/user_profile.png" width="380" alt="User Profile"> |

---

## 🔒 Secret Integrity & Secure API Proxy Architecture

All API calls that interact with AI Models or query cloud storages do not expose tokens to the client.

```
┌────────────────────────┐      AJAX Request      ┌────────────────────────┐
│  Client browser UI     │  ───────────────────>  │  Express Backend Node  │
│  (No confidential keys)│  <───────────────────  │  Reads from local .env │
└────────────────────────┘     Secure Response    └────────────────────────┘
                                                               │
                                                               ▼
                                                    [ Gemini API Engine ]
```

* **Server-Sourced API Tokens Only**: Third-party variables are consumed directly under Node (`process.env.GEMINI_API_KEY`).
* **Environment Sandboxing**: Any credential lacking the `VITE_` prefix remains strictly isolated behind the back-end wall.

For complete, step-by-step instructions on setting up your environment configuration, please proceed to our technical setup guide:

### 👉 **[Open Technical Setup Tutorial (SETUP.md)](./SETUP.md)**

---

*Happy learning with **Suki**! May your linguistic adventure be rewarding.* 🌸
