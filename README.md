# 🏥 Klinik Ku - FCM

This is a technical test submission for FCM integration for the Klinik Ku application process.

## 📑 Contents
- [Requirements Checklist](#-technical-test-requirements-checklist)
- [Extra Features](#-extra-features)
- [Tech Stack](#-tech-stack)
- [Live URL](#-live-url)
- [Test Credentials](#-test-credentials)
- [Backend API Route](#-backend-api-route)
- [How to Run This Project](#️-how-to-run-this-project)

## ✅ Requirements Checklist

| Requirement                                                      | Status   | Notes                                                                 |
|------------------------------------------------------------------|----------|-----------------------------------------------------------------------|
| Next.js with TypeScript                                          | ✅       | Next.js in tech stack; TypeScript used                                |
| Official Firebase SDK                                            | ✅       | Firebase in tech stack, .env for config                               |
| State Management (any)                                           | ✅       | React Query & React Context                                           |
| Minimalist, modern, responsive UI                                | ✅       | Tailwind CSS, shadcn/ui                                               |
| FCM Integration (init, permission, send token to backend)         | ✅       | FCM config in .env, backend sync implemented                          |
| Notification List (fetch, display, pagination, read/unread style) | ✅       | Implemented in codebase                                               |
| Mark as Read (update local and backend)                          | ✅       | Implemented in codebase                                               |
| .env for sensitive config                                        | ✅       | .env.local setup instructions                                         |
| Clear folder/component structure                                 | ✅       | Implemented in codebase                                               |
| Clean code, short README                                         | ✅       | README is concise                                                     |
| Deployment (optional)                                            | ✅       | Live URL: https://fcm-klinik-ku.vercel.app/                           |

## ✨ Extra Features

### Testing
- 🔑 "Use test credential" button on login form for quick demo access.
- ➕ Floating action button to trigger a test notification.
### Others
- 🌓 Theme toggle (dark mode) implementation.
- 🔔 Toast notifications for user feedback (success, error, info).
- 📣 Foreground & background push notification handling with native Notification and in-app toast.
- 📱 Client-side filtering for "Unread only".
- 🗂️ Notification details shown in a dialog/drawer.
- 🪝 Custom hooks (e.g., useIsMobile, useNotification) for enhanced UX and code organization.

## 🚀 Tech Stack

- [Next.js](https://nextjs.org/) – React framework for production, server-side rendering, and static site generation.
- [React](https://react.dev/) – Library for building user interfaces.
- [Firebase](https://firebase.google.com/) – Backend-as-a-Service for authentication, database, and more.
- [Tailwind CSS](https://tailwindcss.com/) – Utility-first CSS framework for rapid UI development.
- [@tanstack/react-query](https://tanstack.com/query/latest) – Powerful data-fetching and state management for React.
- [shadcn/ui](https://ui.shadcn.com/) – Beautifully designed, accessible React components built on top of Radix UI primitives.
- [Lucide React](https://lucide.dev/) – Beautiful, consistent open-source icon library for React.

## 🌐 Live URL

[https://fcm-klinik-ku.vercel.app/](https://fcm-klinik-ku.vercel.app/)

## 🧪 Test Credentials

```
{
  "username": "akun_test_fe",
  "password": "mY)5cl37|iY{"
}
```

## 🔗 Backend API Route

```
http://173.249.59.138/api
```

Enjoy exploring the app! ✨

## 🛠️ How to Run This Project

1. Create a `.env.local` file in the project root and add the following environment variables:

  ```env
  NEXT_PUBLIC_FIREBASE_API_KEY=
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
  NEXT_PUBLIC_FIREBASE_PROJECT_ID=
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
  NEXT_PUBLIC_FIREBASE_APP_ID=
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
  NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY=
  NEXT_PUBLIC_BACKEND_API_URL=
  ```

2. Update the Firebase config in `public/firebase-messaging-sw.js` to match your environment variables.

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
