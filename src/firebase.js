import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBUsgPywzVkUVOYKRT7EGBCZeSZacMPoQ8",
    authDomain: "usuariossistema-fa611.firebaseapp.com",
    projectId: "usuariossistema-fa611",
    storageBucket: "usuariossistema-fa611.appspot.com",
    messagingSenderId: "269752644818",
    appId: "1:269752644818:web:408d7e48c1b5b9f059690b",
    measurementId: "G-J89QT9XRYS"
  };

const app = initializeApp(firebaseConfig);

export const auth = getAuth();