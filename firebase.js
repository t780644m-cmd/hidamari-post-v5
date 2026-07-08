import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getDatabase 
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";


// Firebase設定
// ↓ここをあなたのFirebase情報に変更します

const firebaseConfig = {

apiKey: "ここに入力",

authDomain: "ここに入力",

databaseURL: "ここに入力",

projectId: "ここに入力",

storageBucket: "ここに入力",

messagingSenderId: "ここに入力",

appId: "ここに入力"

};


// Firebase開始

const app = initializeApp(firebaseConfig);


// Realtime Database

export const db = getDatabase(app);
