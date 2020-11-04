import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const CONFIG = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

class Firebase {
  constructor() {
    app.initializeApp(CONFIG);
    this.auth = app.auth();
    this.db = app.firestore();
  }

  //Inscription

  signupUser = (email, password) => {
    return this.auth.createUserWithEmailAndPassword(email, password);
  };

  //Connexion

  loginUser = (email, password) => {
    return this.auth.signInWithEmailAndPassword(email, password);
  };

  //Deconnexion

  signoutUser = () => {
    this.auth.signOut();
  };

  //Récupérer le mot de passe

  passwordReset = (email) => {
    return this.auth.sendPasswordResetEmail(email);
  };

  user = (userId) => {
    return this.db.doc(`users/${userId}`);
  };
}

export default Firebase;
