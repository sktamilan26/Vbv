
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAR-rl_hAtv-DRCnce-VkREMq7AaXXd_I4",
  authDomain: "heatshort-ff-tool.firebaseapp.com",
  projectId: "heatshort-ff-tool",
  storageBucket: "heatshort-ff-tool.firebasestorage.app",
  messagingSenderId: "849891619189",
  appId: "1:849891619189:web:2fb27f3fed37621c60233c",
  measurementId: "G-JCBC0KG6C9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const analytics = getAnalytics(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile };
