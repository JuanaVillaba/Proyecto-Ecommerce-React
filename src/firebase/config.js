import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD6QuDld137magToe2CYJk92j7cCUPFApA",
    authDomain: "mi-ecommerce-react-b32c7.firebaseapp.com",
    projectId: "mi-ecommerce-react-b32c7",
    storageBucket: "mi-ecommerce-react-b32c7.firebasestorage.app",
    messagingSenderId: "177809277139",
    appId: "1:177809277139:web:cbdd63b155bf7b3dbdd426",
    measurementId: "G-2BPXM88G0C"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)