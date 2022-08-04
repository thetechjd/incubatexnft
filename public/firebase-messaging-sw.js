// import { initializeApp } from "firebase/app";
// import { getMessaging,} from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";
// // Initialize the Firebase app in the service worker by passing in
// // your app's Firebase config object.
// // https://firebase.google.com/docs/web/setup#config-object
// const firebaseApp = initializeApp({
//   apiKey: "AIzaSyCRgG3WQLtHk3v76GbSiO_Yodk03YeVUNA",
//   authDomain: "incubatex-9a1c3.firebaseapp.com",
//   projectId: "incubatex-9a1c3",
//   storageBucket: "incubatex-9a1c3.appspot.com",
//   messagingSenderId: "672493274226",
//   appId: "1:672493274226:web:5d759b330f525e15852eeb",
//   measurementId: "G-FZ569B73Y4"
// });

// // Retrieve an instance of Firebase Messaging so that it can handle background
// // messages.
// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });
