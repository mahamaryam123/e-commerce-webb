import { initializeApp, getApps } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDG5yf1R5d7w_3u2Funbysnp9Irfe4LI3c",
  authDomain: "e-commerse-1e.firebaseapp.com",
  databaseURL: "https://e-commerse-1e-default-rtdb.firebaseio.com",
  projectId: "e-commerse-1e",
  storageBucket: "e-commerse-1e.firebasestorage.app",
  messagingSenderId: "848018332154",
  appId: "1:848018332154:web:387ac849e019fc74a06c43",
  measurementId: "G-9YPNDGTJ2E"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
// Set persistence to LOCAL so sessions survive browser restarts (effectively long-lived)
setPersistence(auth, browserLocalPersistence);

export const db = getFirestore(app);
export const storage = getStorage(app);
