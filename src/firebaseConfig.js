// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Make sure to import from "firebase/firestore"
import { getStorage } from "firebase/storage"; // Import storage

const firebaseConfig = {
  apiKey: "AIzaSyAjIfsjsmXcXx7I7AMcnwp_Od4yhJp4DGg",
  authDomain: "vineleafclass.firebaseapp.com",
  projectId: "vineleafclass",
  storageBucket: "vineleafclass.appspot.com",
  messagingSenderId: "999329459972",
  appId: "1:999329459972:web:49ab2838dc0351e749aa51",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Auth with persistence
const auth = initializeAuth(app, {
  persistence: browserLocalPersistence,
});
const db = getFirestore(app); // Get Firestore service
const storage = getStorage(app); // Get Storage service
export { auth, db, storage }; // Export services for use in other parts of your application
