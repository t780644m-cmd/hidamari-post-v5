import { db } from "./firebase.js";

import {
ref,
set,
push,
onValue,
update
}
from
"https://www.gstatic.com/firebasejs/12.15.0/firebase-database.js";


// =======================
// 初期データ
// =======================

let students = [
{name:"あいき",icon:"🐱",id:"1"},
{name:"さくら",icon:"🌸",id:"2"},
{name:"ゆうと",icon:"🦖",id:"3"},
{name:"ひなた",icon:"☀️",id:"4"},
{name:"たくみ",icon:"⚽",id:"5"},
{name:"みお",icon:"🎀",id:"6"},
{name:"りく",icon:"🐻",id:"7"},
{name:"あおい",icon:"🐬",id:"8"},
{name:"こはる",icon:"🍀",id:"9"}
];


let selectedStudent="";

let category="やさしさ";

let messages=[];



// =======================
// 画面操作
// =======================


function hidePages(){

document.querySelectorAll(".page")
.forEach(p=>{
p.classList.add("hidden");
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
// 児童一覧表示
// =======================


function renderStudents(id,func){

const area=
document.getElementById(id);

area.innerHTML="";


students.forEach(s=>{


const btn=
document.createElement("button");


btn.innerHTML=
`
${s.icon}
<br>
${s.name}
`;


btn.onclick=()=>func(s.id);


area.appendChild(btn);


});

}




// =======================
// 相手選択
// =======================


function selectStudent(id){

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



window.selectStudent=selectStudent;



// =======================
// カテゴリー
// =======================


window.setCategory=function(value){

category=value;

}
// =======================
// メッセージ送信
// =======================


window.sendMessage = function(){


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



const messageRef =
push(
ref(db,"messages")
);



set(messageRef,{

target:selectedStudent,

category:category,

text:text,

sender:sender || "ひみつ",

approved:false,

createdAt:Date.now()

});



alert(
"ポストに入れました📮\n先生が確認したら届きます！"
);



document.getElementById("messageText").value="";

document.getElementById("sender").value="";


selectedStudent="";


goHome();


};






// =======================
// データ読み込み
// =======================


onValue(
ref(db,"messages"),
(snapshot)=>{


messages=[];


snapshot.forEach(child=>{


messages.push({

id:child.key,

...child.val()

});


});



loadCount();



}
);






// =======================
// 宝箱
// =======================


let currentBox="";



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


showMessages(id);


};






function showMessages(id){


const area=
document.getElementById("messages");


const flower=
document.getElementById("flowers");


area.innerHTML="";

let count=0;



messages.forEach(m=>{


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

${m.sender}
<br>

${m.category}

</small>

</div>

`;



}



});



flower.innerHTML =
count>0
?
"🌸".repeat(count)
:
"🌱";



}






// =======================
// 全体カウント
// =======================


function loadCount(){


let count=0;



messages.forEach(m=>{


if(m.approved===true){

count++;

}


});



const el=
document.getElementById(
"totalCount"
);


if(el){

el.innerText=count;

}



}
// =======================
// 先生ログイン
// =======================


window.openTeacher=function(){

hidePages();

document
.getElementById("teacherLogin")
.classList.remove("hidden");

};





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


function loadTeacher(){


const area =
document.getElementById("pendingMessages");


area.innerHTML="";



messages.forEach(m=>{


if(!m.approved){



const student =
students.find(
s=>s.id===m.target
);



area.innerHTML +=

`

<div class="card">

<h4>
👤 ${student.name}
</h4>

<p>
${m.text}
</p>

<small>
${m.sender}
/
${m.category}
</small>


<br>

<button onclick="approve('${m.id}')">
🌸 掲載する
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


window.approve=function(id){


update(

ref(
db,
"messages/"+id
),

{

approved:true

}

);



alert(
"掲載しました🌸"
);



};






// =======================
// 名前設定
// =======================


function renderNameSettings(){


const area =
document.getElementById(
"nameSettings"
);


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



renderStudents(
"studentButtons",
selectStudent
);


renderStudents(
"treasureButtons",
openBox
);



alert(
"名前を保存しました"
);


};







// =======================
// 起動
// =======================


window.onload=function(){

goHome();

};
