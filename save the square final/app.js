const start =document.getElementById("start");
const instructions=document.getElementById("instructions");
const about1=document.getElementById("redsquare");
const about2=document.getElementById("bluesquare");
let username=document.getElementById("playerName");
start.onclick=()=>{
    location.href = "./game.html";
    storename();
}
instructions.onclick=()=>{
    location.href = "./instructions.html";
    storename();
}
about1.onclick=()=>{
    location.href="./about.html"
    storename();
}
about2.onclick=()=>{
    location.href="./about.html"
    storename();
}

function storename(){
    console.log(username) 
    localStorage.setItem('userId',username.value);
}