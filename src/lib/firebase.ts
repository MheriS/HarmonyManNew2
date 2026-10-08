import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyABLOkL9cvs5Q_JFRnRldq3FogyRDJHqXA",
    authDomain: "harmonyman-256db.firebaseapp.com",
    projectId: "harmonyman-256db",
    storageBucket: "harmonyman-256db.firebasestorage.app",
    messagingSenderId: "692786280633",
    appId: "1:692786280633:web:200d58a7e074a9ca308368",
    measurementId: "G-1R1FW3W5T6"
};

let app;
let analytics;
let db: ReturnType<typeof getFirestore> | null = null;

try {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
    if (typeof window !== "undefined") {
        analytics = getAnalytics(app);
    }
    db = getFirestore(app);
} catch (e) {
    console.error("Firebase config error:", e);
}

export { db, analytics };
