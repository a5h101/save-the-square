const startagain=document.getElementById("startagain");
const home=document.getElementById("home");
startagain.onclick=()=>{
    location.href="./game.html";
    storename();
}
let printscore= localStorage.getItem("score")
let printname=localStorage.getItem("userId")
home.onclick=()=>{
    location.href="./index.html";

}

if(printscore>100)
document.getElementById("quote").innerHTML ="You have the potential";
else if(printscore>0&&printscore<=10)
document.getElementById("quote").innerHTML ="Shame on you";
else if(printscore>10&&printscore<=50)
document.getElementById("quote").innerHTML ="Not bad not bad";
else if(printscore>50&&printscore<=100)
document.getElementById("quote").innerHTML ="Good Game";
else 
document.getElementById("quote").innerHTML ="Skill Issue";

document.getElementById("namescore").innerHTML = printname+" Scored : "+printscore;
