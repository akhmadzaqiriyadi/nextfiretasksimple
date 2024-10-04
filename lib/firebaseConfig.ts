import { FirebaseApp, initializeApp } from "firebase/app";
import { Firestore, getFirestore } from "firebase/firestore";
import { Auth, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC7ug3PbPumMUPmPp1qJrWNKS7gmQ0zBfY",
  authDomain: "sipleapp.firebaseapp.com",
  projectId: "sipleapp",
  storageBucket: "sipleapp.appspot.com",
  messagingSenderId: "130601621904",
  appId: "1:130601621904:web:11f3935c942df6ae127b15"
};

const app: FirebaseApp = initializeApp(firebaseConfig);
const db: Firestore = getFirestore(app);
const auth: Auth = getAuth(app);

export { db, auth };
