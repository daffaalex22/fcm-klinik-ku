importScripts("https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyDOfopbDbRa8JzGsFaJXPwiDrNQymzcK_0",
  authDomain: "klinik-ku-khaki.firebaseapp.com",
  projectId: "klinik-ku-khaki",
  storageBucket: "klinik-ku-khaki.firebasestorage.app",
  messagingSenderId: "424366713858",
  appId: "1:424366713858:web:2d8f2edccd2fa7ad334b1b",
  measurementId: "G-6LRN3JYLPE",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
});
