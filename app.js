let classes = JSON.parse(localStorage.getItem("classes") || "[]");
let todos = JSON.parse(localStorage.getItem("todos") || "[]");

if(classes.length===0){
classes=[
{day:"Monday",subject:"S&UL Lab",teacher:"Harjeet",start:"09:00",end:"11:00"},
{day:"Monday",subject:"DBMS",teacher:"Deepali",start:"11:00",end:"13:00"},
{day:"Monday",subject:"Java",teacher:"Ridhum",start:"14:00",end:"16:00"},

{day:"Tuesday",subject:"DBMS",teacher:"Harsh/Niharika",start:"09:00",end:"11:00"},
{day:"Tuesday",subject:"Java",teacher:"Ridhum",start:"11:00",end:"13:00"},
{day:"Tuesday",subject:"OT",teacher:"Reetu",start:"14:00",end:"15:00"},
{day:"Tuesday",subject:"Applied Prob",teacher:"Manpreet",start:"15:00",end:"16:00"},

{day:"Wednesday",subject:"Java",teacher:"Deepali/Deepak",start:"09:00",end:"11:00"},
{day:"Wednesday",subject:"Java",teacher:"Ridhum",start:"11:00",end:"13:00"},
{day:"Wednesday",subject:"S&UL",teacher:"Surender",start:"14:00",end:"16:00"},

{day:"Thursday",subject:"S&UL",teacher:"Divyanshi/Harjeet",start:"09:00",end:"11:00"},
{day:"Thursday",subject:"Java Lab",teacher:"Deepak/Ridhum",start:"11:00",end:"13:00"},
{day:"Thursday",subject:"Applied Prob",teacher:"Manpreet",start:"14:00",end:"15:00"},
{day:"Thursday",subject:"OT",teacher:"Reetu",start:"15:00",end:"16:00"},

{day:"Friday",subject:"Applied Prob",teacher:"Manpreet",start:"09:00",end:"10:00"},
{day:"Friday",subject:"OT",teacher:"Reetu",start:"10:00",end:"11:00"},
{day:"Friday",subject:"S&UL",teacher:"Surender",start:"11:00",end:"13:00"},
{day:"Friday",subject:"DBMS Lab",teacher:"Niharika/Harsh",start:"14:00",end:"15:00"},
{day:"Friday",subject:"DBMS",teacher:"Harsh",start:"15:00",end:"16:00"}
];
save();
}

function save(){
localStorage.setItem("classes",JSON.stringify(classes));
localStorage.setItem("todos",JSON.stringify(todos));
}

function todayName(){
return ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date().getDay()];
}

function addClass(){
classes.push({day:day.value,subject:subject.value,teacher:teacher.value,start:start.value,end:end.value});
save();render();scheduleAlerts();
}

function addTodo(){
todos.push(todoText.value);
todoText.value="";
save();render();
}

function removeTodo(i){todos.splice(i,1);save();render();}
function removeClass(i){classes.splice(i,1);save();render();}

function render(){
todayList.innerHTML="";
let today=todayName();
classes.filter(c=>c.day===today).forEach((c,i)=>{
todayList.innerHTML+=`<div class="item">
<div>${c.subject} (${c.teacher})<br><small>${c.start}-${c.end}</small></div>
<button onclick="removeClass(${i})">X</button>
</div>`;
});

todoList.innerHTML="";
todos.forEach((t,i)=>{
todoList.innerHTML+=`<div class="item">${t}<button onclick="removeTodo(${i})">X</button></div>`;
});
}

function scheduleAlerts(){
if(Notification.permission!=="granted"){Notification.requestPermission();}
let today=todayName();
classes.filter(c=>c.day===today).forEach(c=>{
let [h,m]=c.start.split(":").map(Number);
let alertTime=new Date();
alertTime.setHours(h,m-10,0);
let diff=alertTime-new Date();
if(diff>0){
setTimeout(()=>{
new Notification("Next Class in 5 min",{body:`${c.subject} with ${c.teacher}`});
},diff);
}
});
}

render();scheduleAlerts();
