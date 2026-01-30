// Fix: Use namespace import for firebase/app to avoid "no exported member" errors in certain TypeScript/Firebase version configurations
import * as firebaseApp from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: "AIzaSyBUvwY-e7h0KZyFJv7n0ignpzlMUGJIurU",
  authDomain: "niklaus-b2b.firebaseapp.com",
  projectId: "niklaus-b2b",
  storageBucket: "niklaus-b2b.firebasestorage.app",
  messagingSenderId: "936430517671",
  appId: "1:936430517671:web:6a0f1b86a39621d74c4a82",
  measurementId: "G-3VGKJGWFSY"
};

// Inicializa o Firebase apenas se não houver um app ativo
// Fix: Access initializeApp and getApps via the namespace import for better compatibility
const app = firebaseApp.getApps().length === 0 
  ? firebaseApp.initializeApp(firebaseConfig) 
  : firebaseApp.getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;
