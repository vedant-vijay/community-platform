# 🧑‍🤝‍🧑 Community Platform

A modern full-stack community platform where users can register, log in, and share content with other members. Built with scalability and user experience in mind.

---

## 🚀 Tech Stack

### Frontend:
- ⚛️ React.js
- ⚡ Vite
- 🎨 Tailwind CSS
- 🔄 React Router
- 🔒 Firebase Authentication

### Backend / Data:
- 🔥 Firebase Firestore (for posts, users, likes, etc.)
- ☁️ Firebase Hosting (optional for deployment)

### Tooling:
- 🧪 React Query (data fetching/caching)
- 🍞 Sonner / ShadCN Toaster (notifications)
- 🛠️ TypeScript
- 🌐 React Context API for global auth state

---

## 🛠️ Setup Instructions

> Make sure you have **Node.js (v16+)** and **npm** installed.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/vedant-vijay/community-platform.git
   cd community-platform
Install dependencies:

bash
Copy code
npm install
Firebase Setup:

Create a project on Firebase Console

Enable Email/Password sign-in in Authentication

Create a Firestore database

Copy your Firebase config and create a .env file in the root:

ini
Copy code
VITE_FIREBASE_API_KEY=your_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
Start the development server:

bash
Copy code
npm run dev
Visit http://localhost:5173 to see it in action!

🔐 Demo Login / Admin Credentials
You can create a new account directly from the register page.
If a pre-seeded admin user is added later, update this section with the credentials.

✨ Features
🔐 Authenticated login / register flow (Firebase Auth)

📝 Create and read posts

👤 User profiles with dynamic routes

🧭 Protected and public routes

🔁 Real-time Firestore updates

🎉 Elegant UI built with Tailwind & ShadCN components

📦 Future Enhancements (Optional Ideas)
💬 Comments & replies

📷 Media uploads

🔔 Notifications

🔍 Search and filter posts

📱 Responsive mobile-first design improvements

🧑‍💻 Developer
Vedant Rokade
🔗 GitHub
📧 vedant@example.com (update if needed)

📄 License
MIT License © 2025 Vedant Rokade