import { db } from "./firebase.js";

import {
collection,
addDoc,
getDocs,
doc,
setDoc,
updateDoc
}
from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// =======================
// 基本データ
// =======================


let students = [
{
id:"1",
name:"あいき",
icon:"🐱"
},
{
id:"2",
name:"さくら",
icon:"🌸"
},
{
id:"3",
name:"ゆうと",
icon:"🦖"
},
{
id:"4",
name:"ひなた",
icon:"☀️"
},
{
id:"5",
name:"たくみ",
icon:"⚽"
},
{
id:"6",
name:"みお",
icon:"🎀"
},
{
id:"7",
name:"りく",
icon:"🐻"
},
{
id:"8",
name:"あおい",
icon:"🐬"
},
{
id:"9",
name:"こはる",
icon:"🍀"
}
];


let selectedStudent = "";

let category = "やさしさ";

let currentBox = "";



// =======================
// 画面切替
// =======================


function hidePages(){

document.querySelectorAll(".page")
.forEach(page=>{
page.classList.add("hidden");
});

}



window.goHome=function(){

hidePages();

document
.getElementById("home")
.classList.remove("hidden");

loadCount();

}



window.showSend=function(){

hidePages();

document
.getElementById("send")
.classList.remove("hidden");

renderStudents(
"studentButtons",
selectStudent
);

}



window.showTreasure=function(){

hidePages();

document
.getElementById("treasure")
.classList.remove("hidden");

renderStudents(
"treasureButtons",
openBox
);

}




// =======================
// 児童ボタン作成
// =======================


function renderStudents(target,func){

const area=document.getElementById(target);

area.innerHTML="";


students.forEach(s=>{


let button=document.createElement("button");


button.innerHTML=
`
${s.icon}
<br>
${s.name}
`;


button.onclick=()=>func(s.id);


area.appendChild(button);


});


}






// =======================
// 投稿相手選択
// =======================


window.selectStudent=function(id){

selectedStudent=id;


document
.querySelectorAll("#studentButtons button")
.forEach(b=>{
b.classList.remove("active");
});


event.target
.closest("button")
.classList.add("active");


}






// =======================
// カテゴリー
// =======================


window.setCategory=function(value){

category=value;

}

// =======================
// メッセージ送信
// =======================


window.sendMessage = async function(){


const text =
document.getElementById("messageText")
.value.trim();


const sender =
document.getElementById("sender")
.value.trim();



if(!selectedStudent){

alert("送る相手を選んでね");

return;

}



if(!text){

alert("メッセージを書いてね");

return;

}



await addDoc(
collection(db,"messages"),
{

target:selectedStudent,

category:category,

text:text,

sender:sender || "ひみつ",

approved:false,

createdAt:Date.now()

}

);



alert(
"ポストに入れました📮\n先生が確認したら届くよ！"
);



document.getElementById("messageText").value="";

document.getElementById("sender").value="";

selectedStudent="";


goHome();


};







// =======================
// 宝箱表示
// =======================


window.openBox=function(id){

currentBox=id;


const student =
students.find(
s=>s.id===id
);



document
.getElementById("boxName")
.innerText=
student.name+"さんの宝箱";



hidePages();


document
.getElementById("box")
.classList.remove("hidden");



loadBox(id);


}





async function loadBox(id){


const area =
document.getElementById("messages");


const flower =
document.getElementById("flowers");


area.innerHTML="";


flower.innerHTML="🌸";



const snap =
await getDocs(
collection(db,"messages")
);



let count=0;



snap.forEach(doc=>{


const m=doc.data();



if(
m.target===id &&
m.approved===true
){


count++;


area.innerHTML +=
`
<div class="card">

<p>
${m.text}
</p>

<small>
${m.sender} さん
${m.category}
</small>

</div>
`;



}



});



flower.innerHTML=
"🌸".repeat(
Math.max(count,1)
);



}




// =======================
// 全体数
// =======================


async function loadCount(){


const snap=
await getDocs(
collection(db,"messages")
);



let count=0;


snap.forEach(doc=>{


if(doc.data().approved){

count++;

}


});


document
.getElementById("totalCount")
.innerText=count;


}






// =======================
// 先生画面入口
// =======================


window.openTeacher=function(){

hidePages();


document
.getElementById("teacherLogin")
.classList.remove("hidden");


}
// =======================
// 先生ログイン
// =======================


window.loginTeacher=function(){

const pass =
document.getElementById("teacherPassword")
.value;



if(pass==="1234"){


hidePages();


document
.getElementById("teacher")
.classList.remove("hidden");


loadTeacher();


}else{


alert("パスワードが違います");


}


};






// =======================
// 先生画面
// =======================


async function loadTeacher(){


const area =
document.getElementById("pendingMessages");


area.innerHTML="";


const snap =
await getDocs(
collection(db,"messages")
);



snap.forEach(async d=>{


const m=d.data();



if(!m.approved){



const student =
students.find(
s=>s.id===m.target
);



area.innerHTML +=

`

<div class="card">

<p>
👤 ${student.name}
</p>

<p>
${m.text}
</p>

<small>
${m.sender}
/
${m.category}
</small>


<button onclick="approve('${d.id}')">

掲載する

</button>


</div>


`;



}



});



renderNameSettings();


}







// =======================
// 承認
// =======================


window.approve=async function(id){


await updateDoc(

doc(db,"messages",id),

{

approved:true

}

);



alert("掲載しました🌸");


loadTeacher();


};






// =======================
// 名前設定
// =======================


function renderNameSettings(){


const area =
document.getElementById("nameSettings");


area.innerHTML="";



students.forEach(s=>{


area.innerHTML +=

`

<div class="setting">

<input 
id="name-${s.id}"
value="${s.name}"
>


</div>

`;



});


}






window.saveNames=function(){


students.forEach(s=>{


const input =
document.getElementById(
"name-"+s.id
);



if(input.value){

s.name=input.value;

}


});



alert(
"名前を保存しました"
);


renderStudents(
"studentButtons",
selectStudent
);


renderStudents(
"treasureButtons",
openBox
);


};






// =======================
// 起動
// =======================


window.onload=function(){


goHome();


loadCount();


};
