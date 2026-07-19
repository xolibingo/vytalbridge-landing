import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCLEsomOaFsKExmzDAr7tvgsWOaYzKdMu8",
  authDomain: "gen-lang-client-0596415258.firebaseapp.com",
  projectId: "gen-lang-client-0596415258",
  storageBucket: "gen-lang-client-0596415258.firebasestorage.app",
  messagingSenderId: "397698776450",
  appId: "1:397698776450:web:29255c2b360546a83a239b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with custom databaseId and resilient long-polling options
const databaseId = "ai-studio-vytalbridgecomin-b26c822e-4ecc-4b47-8ece-efc2809b50d4";
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
}, databaseId);

// Initialize Firebase Auth
export const auth = getAuth(app);
