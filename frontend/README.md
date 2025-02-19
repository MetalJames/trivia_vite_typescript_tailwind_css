# **Trivia Quiz Game Frontend** 🎮  

A **React + TypeScript** frontend for the **Trivia Quiz Game**, built using **Vite** and styled with **Tailwind CSS**. This interactive game allows players to test their knowledge across various trivia categories.

---

## **Table of Contents**
1. [Features](#1-features)
2. [Folder Structure](#2-folder-structure)
3. [Setup & Installation](#3-setup--installation)
4. [Running the App](#4-running-the-app)
5. [Game Flow](#5-game-flow)
6. [Tech Stack](#6-tech-stack)
7. [Contributors](#7-contributors)

---

## **1. Features** 🚀  

- ✅ **Single & Multiplayer Modes** – Play solo or challenge a friend.  
- ✅ **Category Selection** – Choose from multiple trivia categories.  
- ✅ **Dynamic Question System** – Questions fetched from the backend.  
- ✅ **Score Tracking** – Keeps track of player scores.  
- ✅ **Winner Screen** – Displays the game winner.  
- ✅ **Top Scores** – Shows leaderboard with previous scores.  
- ✅ **Smooth UI** – Responsive and visually appealing with **Tailwind CSS**.  
- ✅ **Error Handling** – Uses **React Error Boundaries** for stability.  

---

## **2. Folder Structure** 📂  

```bash
frontend/
├── src/
│   ├── assets/        # Static assets (images, icons, etc.)
│   ├── components/    # Reusable UI components
│   │   ├── common/    # Shared/reusable components (buttons, modals, etc.)
│   │   ├── game/      # Game-related components (GameOptions, Questions, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page-level components (Home, Game, Winner)
│   ├── services/      # API services & Firebase config
│   ├── state/         # Global state management with Context API
│   ├── types/         # TypeScript types & interfaces
│   ├── App.tsx        # Main app component
│   ├── main.tsx       # React entry point
│   ├── router.tsx     # App routing configuration
├── .env               # Environment variables (not committed)
├── package.json       # Dependencies and scripts
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
├── README.md          # Documentation (this file)
```

## **3. Setup & Installation** 🛠️  

### **Clone the repository**:
```bash
   git clone https://github.com/MetalJames/trivia-quiz-frontend.git
```
```bash
   cd trivia-quiz-frontend
```
```bash
   npm install
```

### **Create an `.env` File**  
Inside the **frontend/** folder, create a `.env` file and add the following:

```env
    FIREBASE_API_KEY=
    FIREBASE_AUTH_DOMAIN=
    FIREBASE_APP_ID=
    FIREBASE_MESSAGING_SENDER_ID=
    FIREBASE_STORAGE_BUCKET=
```
NOTE: Firebase is required for storing top scores. If you don’t need the leaderboard, this step can be skipped.

### **Modify `fetchMongo.ts`**

- If needed, update the backend endpoint in `fetchMongo.ts`:
```ts
    export const BASE_URL = "http://localhost:8000/questions";
```

## **4. Running the Server** 🏃

### **Development Mode (with Hot Reloading)**
```bash
   npm run dev
```

The **frontend** will start on `http://localhost:5173` with hot-reloading enabled.

**Production Mode**
```bash
   npm run build
```
```bash
   npm run preview
```

Generates an optimized build in the dist/ folder.

---

## **5. Game Flow** 🎮  

### **1️⃣ Home Screen**
- 📝 Enter **player names**.  
- 🎮 Select **single-player** or **multiplayer** mode.  
- 🎯 Choose a **category** and **number of questions**.  
- ✅ Click **"Start the Game"**.  

### **2️⃣ Game Screen**
- ❓ Players answer **multiple-choice questions**.  
- 📊 Score updates **instantly** after each answer.  

### **3️⃣ Winner Screen**
- 🏆 Displays the **final score** for all players.  
- 🎉 Highlights the **winner** or declares a **tie**.  

### **4️⃣ Leaderboard**
- 📋 Shows **top scores** for different question sets.  

---

## **6. Tech Stack** ⚙️  

### **Frontend Technologies**
- ⚛ **React (Vite + TypeScript)** – Fast, modern UI framework.  
- 🎨 **Tailwind CSS** – Utility-first CSS framework for responsive design.  
- 🔗 **React Router** – Handles page navigation.  

### **State Management**
- 🌍 **React Context API** – Manages global game state.  

### **APIs & Services**
- 🌐 **Axios** – Fetches questions from the backend.  
- 🔥 **Firebase Firestore** – Stores high scores.  


## **7. Contributors** 💡

👨‍💻 **James (Volodymyr) Ruzhak** – [GitHub: @MetalJames](https://github.com/MetalJames)

**Special thanks to everyone who provided feedback and ideas for improving this project!** 🎉