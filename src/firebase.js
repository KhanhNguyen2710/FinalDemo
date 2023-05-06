import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCo-SoueMbgVKYv-SJr7m_rbpnPkglWcBI",
  authDomain: "finaldemo-b0965.firebaseapp.com",
  projectId: "finaldemo-b0965",
  storageBucket: "finaldemo-b0965.appspot.com",
  messagingSenderId: "138730785953",
  appId: "1:138730785953:web:9f58fed84012359376f4e0",
  measurementId: "G-TNK2GTGND4",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export const storage = getStorage(app);

export default app;


