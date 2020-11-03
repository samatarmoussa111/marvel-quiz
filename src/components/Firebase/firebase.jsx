import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const CONFIG = {
  apiKey: "AIzaSyAg61-HYw7kc22VYbB8ZNhrOrcj-Uv8E44",
  authDomain: "marvel-quiz-719f6.firebaseapp.com",
  databaseURL: "https://marvel-quiz-719f6.firebaseio.com",
  projectId: "marvel-quiz-719f6",
  storageBucket: "marvel-quiz-719f6.appspot.com",
  messagingSenderId: "797591826753",
  appId: "1:797591826753:web:7cea9e786c1276f1abb1c0",
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
