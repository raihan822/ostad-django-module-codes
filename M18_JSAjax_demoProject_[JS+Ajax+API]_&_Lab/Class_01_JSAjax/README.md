# Vite+React quick setup:
1. `npm create vite@latest react-app-name`
2. **Install common npm pkg for React:** `npm install axios bootstrap react-bootstrap react-markdown react-router-dom`
3. change browser tab icon and name from index.html
4. copy the main.jsx from bangla-prescription-ai and replace in yours
5. copy the app.jsx file and directories from src/: components/, hooks/, pages/: usedtechstack, testcomponent, utils/
## Done!
-----

Implementing api calls from class1


# React note:
**Set up a React project inside your own directory**, step by step. I’ll start with the **recommended modern approach**, then mention alternatives.

---

## ✅ Recommended: Create React app using **Vite** (fast & modern)

### 1️⃣ Open your terminal and go to your directory

```bash
cd path/to/your/directory
```

Example:

```bash
cd ~/projects/my-folder
```

---

### 2️⃣ Create a React project in that directory

```bash
npm create vite@latest my-react-app
```

When prompted:

* **Project name**: `my-react-app`
* **Framework**: `React`
* **Variant**: `JavaScript` or `TypeScript`

Then:

```bash
cd my-react-app
npm install
```

---

### 3️⃣ Start the development server

```bash
npm run dev
```

You’ll see something like:

```
Local: http://localhost:5173/
```

Open that in your browser 🎉

---

## 📁 Project structure (Vite)

```
my-react-app/
├─ index.html
├─ src/
│  ├─ main.jsx
│  ├─ App.jsx
│  └─ assets/
├─ package.json
└─ vite.config.js
```

---

## 🚀 Alternative: Create React App (older, slower)

Use this only if you’re required to.

```bash
npx create-react-app my-react-app
cd my-react-app
npm start
```

---

## 🔧 If you already have a directory and want React inside it

From inside the directory:

```bash
npm create vite@latest .
npm install
npm run dev
```

⚠️ Make sure the directory is empty (or mostly empty).

---

## 🧩 Requirements

Make sure you have:

```bash
node -v
npm -v
```

If not installed → [https://nodejs.org](https://nodejs.org) (LTS version)

---

## 🧠 Which should you choose?

| Use case         | Recommendation |
| ---------------- | -------------- |
| New project      | **Vite** ✅     |
| Learning React   | **Vite**       |
| Legacy tutorials | CRA            |

---
