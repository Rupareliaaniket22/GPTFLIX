// firebase.js (or firebaseConfig.js)
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  appId: import.meta.env.VITE_appId,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
