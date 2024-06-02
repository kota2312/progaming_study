import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Firebaseの設定を記載
const firebaseConfig = {
    apiKey: process.env.REACT_APP_APIKEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    databaseURL: process.env.REACT_APP_DATABASEURL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};

// Firebaseアプリを初期化
const app = initializeApp(firebaseConfig);

// Firebase認証サービスを取得
const auth = getAuth(app);

export { auth };
