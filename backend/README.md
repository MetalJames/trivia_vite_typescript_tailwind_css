# **Trivia Quiz Game Backend** 🎯  

A **Node.js + Express + TypeScript** backend for the Trivia Quiz Game, powered by **MongoDB**. This API serves trivia questions and manages game data efficiently.

---

## **Table of Contents**
1. [Features](#1-features)
2. [Folder Structure](#2-folder-structure)
3. [Setup & Installation](#3-setup--installation)
4. [Running the Server](#4-running-the-server)
5. [API Endpoints](#5-api-endpoints)
6. [Tech Stack](#6-tech-stack)
7. [Contributors](#7-contributors)

---

## **1. Features** 🚀

- ✅ **REST API** – Fetch trivia questions by category.  
- ✅ **MongoDB Integration** – Stores and retrieves quiz questions.  
- ✅ **Hot Reloading** – Uses **Nodemon** for smooth development.  
- ✅ **Environment Configuration** – Supports `.env` variables.  
- ✅ **Structured Codebase** – Scalable & production-ready architecture.  
- ✅ **Sorted Categories** – Ensures `"General"` appears first in the response.  

---

## **2. Folder Structure** 📂  

```bash
backend/
├── src/
│   ├── config/       # Database connection setup
│   ├── routes/       # Express routes
│   ├── types/        # TypeScript types
│   ├── utils/        # Utility functions
│   ├── server.ts     # Main server entry point
├── .env              # Environment variables (not committed)
├── package.json      # Dependencies and scripts
├── tsconfig.json     # TypeScript configuration
├── README.md         # Documentation (this file)
```

## **3. Setup & Installation** 🛠️  

### **Clone the repository**:
```bash
   git clone https://github.com/MetalJames/trivia-quiz-backend.git
```
```bash
   cd trivia-quiz-backend
```
```bash
   npm install
```

### **Create an `.env` File**  
Inside the **backend/** folder, create a `.env` file and add the following:

```env
    MONGODB_URI=your_mongodb_connection_string
    PORT=8000
```

## **4. Running the Server** 🏃

### **Development Mode (with Hot Reloading)**
```bash
   npm run dev
```

The backend will start on http://localhost:8000 with hot-reloading enabled.

**Production Mode**
```bash
   npm run build
```
```bash
   npm start
```

This compiles TypeScript to JavaScript and runs the production server from the dist/ folder.

---

## **5. API Endpoints** 🔥  

### **Fetch Trivia Questions**  
**`GET /questions`**  
📌 **Description:** Returns trivia questions categorized by type, ensuring **`"General"`** appears first.

✅ **Example Response:**  
```json
{
  "General": [ 
    { "Question": "Example?", "CorrectAnswer": "Yes" }
  ],
  "Games": [...],
  "IT": [...]
}
```

### **Health Check (Cron Job Route)**

**`GET /cron-job`**  

📌 **Description:** A minimal endpoint to verify the backend is running.  

✅ **Example Response:**  
```json
{
  "message": "OK"
}
```

## **6. Tech Stack** ⚙️

### **The project utilizes the following technologies:**

### **Backend**
- 🚀 **Node.js & Express** – Fast, scalable API server  
- 🛢 **MongoDB** – NoSQL database for storing trivia questions  
- 🔷 **TypeScript** – Type-safe JavaScript for better maintainability  

### **Development Tools**
- ⚡ **Nodemon** – Auto-reloads the server on changes  
- 🔑 **dotenv** – Securely manages environment variables
- 🏗 **TypeScript Compiler (`tsc`)** – Converts TypeScript to JavaScript for production  

## **7. Contributors** 💡

👨‍💻 **James (Volodymyr) Ruzhak** – [GitHub: @MetalJames](https://github.com/MetalJames)

**Special thanks to everyone who provided feedback and ideas for improving this project!** 🎉