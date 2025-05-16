import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDvud2P0KGh7x3DZN9V6mJ1LLzb1ymcz8A",
  authDomain: "lab6mobapp.firebaseapp.com",
  projectId: "lab6mobapp",
  storageBucket: "lab6mobapp.appspot.com",
  messagingSenderId: "294247548264",
  appId: "1:294247548264:web:817e6bd73d24b219d882dd"
};

const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

const db = getFirestore(app);

export { auth, db };


