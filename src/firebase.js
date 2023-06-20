import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyAnANueWuuCIi0JahWTrIZIUcu3kQnwmEw",
    authDomain: "auth-development-35bc4.firebaseapp.com",
    projectId: "auth-development-35bc4",
    storageBucket: "auth-development-35bc4.appspot.com",
    messagingSenderId: "569013077146",
    appId: "1:569013077146:web:cd4ff5414eceda9e2fcb23"
  };

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export { app as default, auth };
