// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAYpO6psJFlgnmOHvbHPwivC_wt5GDW9pg",
  authDomain: "mathias-88c86.firebaseapp.com",
  projectId: "mathias-88c86",
  storageBucket: "mathias-88c86.firebasestorage.app",
  messagingSenderId: "535674188586",
  appId: "1:535674188586:web:f39ede26605261e070e453",
  measurementId: "G-RFMC5BBSFW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);