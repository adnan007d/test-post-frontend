import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config/firebaseConfig";

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app();

const auth = app.auth();

const GoogleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, GoogleProvider };
