import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { 
getFirestore 
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =============================
// Firebase設定
// 後であなたのFirebaseの値に変更
// =============================

const firebaseConfig = {

apiKey: "ここに入力",

authDomain: "ここに入力",

projectId: "ここに入力",

storageBucket: "ここに入力",

messagingSenderId: "ここに入力",

appId: "ここに入力"

};



// Firebase開始

const app = initializeApp(firebaseConfig);


// データベース

export const db = getFirestore(app);
