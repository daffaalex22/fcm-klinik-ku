# 🏥 Klinik Ku - FCM

A modern web application for Klinik Ku, providing seamless clinic management and patient interaction features. Built for efficiency and ease of use.

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

## Getting Started

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
