importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBJgXnOTnJb6043PmD5d3cmQt7o84Y6sLA",
  authDomain: "projectone-fcm.firebaseapp.com",
  databaseURL:
    "https://projectone-fcm-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "projectone-fcm",
  storageBucket: "projectone-fcm.appspot.com",
  messagingSenderId: "111158573365",
  appId: "1:111158573365:web:55435890e0f1476bd1f47c",
};

firebase.initializeApp(firebaseConfig);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register("../firebase-messaging-sw.js")
    .then(function (registration) {
      console.log("Registration successful, scope is:", registration.scope);
    })
    .catch(function (err) {
      console.log("Service worker registration failed, error:", err);
    });
}

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// export const onMessageListener = () =>
// new Promise((resolve) => {
//   onMessage(messaging, (payload) => {
//     console.log("payload", payload)
//     resolve(payload);
//   });
// });

// onMessage(messaging, (payload) => {
//   console.log("payload", payload)
// });
