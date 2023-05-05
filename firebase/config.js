import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDeJhEgmmfL9NNDOZ4rfiiz8QWui788AIQ",
    authDomain: "hw-react-native-7.firebaseapp.com",
    projectId: "hw-react-native-7",
    storageBucket: "hw-react-native-7.appspot.com",
    messagingSenderId: "1062406633374",
    appId: "1:1062406633374:web:d91ab2c12380f6e430c88f",
    measurementId: "G-7TWFG8K3P8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);