import { initializeApp } from 
"https://www.gstatic.com/firebasejs/12.15.0/firebase-app.js";

import { 
getDatabase 
} from 
"https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";


// Firebase設定

const firebaseConfig = {

apiKey: "AIzaSyDe2Dk4-JrHZWw0YidDdZt88sUCawWxSKo",

authDomain: "hidamari-post-v5.firebaseapp.com",

databaseURL: "https://hidamari-post-v5-default-rtdb.asia-southeast1.firebasedatabase.app",

projectId: "hidamari-post-v5",

storageBucket: "hidamari-post-v5.firebasestorage.app",

messagingSenderId: "489161517987",

appId: "1:489161517987:web:c876d99f9be7a6d67e0816"

};


// Firebase開始

const app = initializeApp(firebaseConfig);


// Realtime Database

export const db = getDatabase(app);
