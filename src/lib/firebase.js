import { 
  initializeApp,
} from "firebase/app";

import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
} from "firebase/firestore";

import {
  firebaseConfig,
} from "./dbConfig";

export const app = initializeApp(firebaseConfig);                   // Initialize Firebase
export const auth = getAuth(app);                                   // Initialize Firebase Authentication and get a reference to the service
export const db = getFirestore(app);                                // Initialize Cloud Firestore and get a reference to the service

export const signInWithGoogle = async () => {
  try {

    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    const user = result.user;

    window.alert(`Signed in as ${user.email}`);
  } catch (e) {
    window.alert(e.message);
  }
}

export const signOutfromGoogle = async () => {
  try {
    await signOut(auth);

    window.alert('Signed out!!!!');
  } catch (e) {
    window.alert(e.message);
  }
}