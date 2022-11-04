//Initialisation 
let canvas = document.getElementById("canvas-top");
let ctx = canvas.getContext("2d");
let gameState = {
  rectPosX: 10,
  rectPosY: canvas.height / 2 - 10,
  rectVelocity: { x: 0, y:0 },
  playerSpeed: 0.5,
  enemyTimeout: 60,
  enemyTimeoutInit: 60,
  enemySpeed: 1,
  enemies: [],
  friends: [],
  friendAdded:false,
  score: 0
};
// Add a background song
let backgroundSound = new Audio("bgm.mp3");
backgroundSound.play();
backgroundSound.loop = true;
// backgroundSound.volume=1;
//Background sound for keyPress
let finalscore=0;
//function to generate random inputs
function random(n) {
  return Math.floor(Math.random() * n);
}
//cuntoructor to initialise
class RectCollider {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  //Function to check collison between elements
   isColliding(rectCollider) {
    if (this.x < rectCollider.x + rectCollider.width &&
      this.x + this.width > rectCollider.x &&
      this.y < rectCollider.y + rectCollider.height &&
      this.height + this.y > rectCollider.y){
        return true;
      }
    else
    return false;
  }
}
function checkCollision(gameState) {
  let playerCollider = new RectCollider(
    gameState.rectPosX,
    gameState.rectPosY,
    10,
    10
  );
  for (let i = 0; i < gameState.enemies.length; i++) {
    let enemyCollider = new RectCollider(
      gameState.enemies[i].x,
      gameState.enemies[i].y,
      20,
      10
    );
    //to check if square is colliding with the enemy or not
    if (playerCollider.isColliding(enemyCollider)) {
      return true;
    }
  }
  //to create friendly squares and call function to check thier collioson
  for (let i = 0; i < gameState.friends.length; i++) {
    let friendCollider = new RectCollider(
      gameState.friends[i].x,
      gameState.friends[i].y,
      5,
      5
    );
    //increase player speed with every collion with friend
    if (playerCollider.isColliding(friendCollider)) {
      let greenSq=new Audio("smb_coin.wav");
        greenSq.play(); //im here============================================================
      gameState.playerSpeed+=.10;
      gameState.friends.splice(i, 1);
    }
  }
}
//reset values
function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  gameState.enemyTimeout -= 1;
  if (gameState.enemyTimeout == 0) {
    gameState.enemyTimeout = Math.floor(gameState.enemyTimeoutInit);
    gameState.enemies.push({
      x: canvas.width,
      y: random(canvas.height),
      velocity: gameState.enemySpeed
    });
    gameState.enemySpeed += .035;
    gameState.enemyTimeoutInit = gameState.enemyTimeoutInit * 0.99;
     console.log('timeout:'+gameState.enemyTimeoutInit);
     console.log('speed:'+gameState.enemySpeed);
  }
  ctx.fillStyle = "#FF0000";//filling colours in red rectangle
  gameState.rectPosX += gameState.rectVelocity.x;
  gameState.rectPosY += gameState.rectVelocity.y;
  if (gameState.rectPosX > canvas.width - 10) {
    gameState.rectPosX = canvas.width - 10;
    gameState.rectVelocity.x = 0;
  }
  if (gameState.rectPosX < 0) {
    gameState.rectPosX = 0;
    gameState.rectVelocity.x = 0;
  }
  if (gameState.rectPosY < 0) {
    gameState.rectPosY = 0;
    gameState.rectVelocity.y = 0;
  }
  if (gameState.rectPosY > canvas.height - 10) {
    gameState.rectPosY = canvas.height - 10;
    gameState.rectVelocity.y = 0;
  }
  ctx.fillRect(gameState.rectPosX, gameState.rectPosY, 10, 10);
  ctx.fillStyle = "#0000FF"; //filling colours in blue rectangle
  for (let i = 0; i < gameState.enemies.length; ++i) {
    gameState.enemies[i].x -= gameState.enemies[i].velocity;
    ctx.fillRect(gameState.enemies[i].x, gameState.enemies[i].y, 20, 10);
  }
  for (let i = 0; i < gameState.enemies.length; ++i) {
    if (gameState.enemies[i].x < -10) {
      gameState.enemies.splice(i, 1);
      gameState.score++;
    }
  }
  document.getElementById("Score").innerHTML = "Score : " + gameState.score;
  //storing score in a new variable to push the it in local storage
  finalscore= gameState.score;
  console.log(gameState.score);
  if(gameState.score%10 == 0 && gameState.friendAdded == false){
    gameState.friends.push({
      x: random(canvas.width-20),
      y: random(canvas.height-20),
    });
  
    gameState.friendAdded = true;
    
  }
  if(gameState.score%10 == 1 && gameState.friendAdded == true){
    gameState.friendAdded = false;
  }
  //to style the friendly square
  for (let i = 0; i < gameState.friends.length; ++i) {
    ctx.fillStyle = "#8cff00";//filling colours in green rectangle
    ctx.fillRect(gameState.friends[i].x, gameState.friends[i].y, 5, 5);
  } 
  //reset the values
  if(checkCollision(gameState)==true){
    yourScore=gameState.score;
localStorage.setItem('score',finalscore);
console.log(finalscore);
// let keypressAudio=new Audio("shot.mp3");
// keypressAudio.play();
location.href="./end.html"
}
}
setInterval(update, 20);
//check input from user
document.addEventListener("keydown", function(event) {
  if (event.keyCode == 39|| event.keyCode ==100|| event.keyCode == 68 ) {
    //right arrow
    gameState.rectVelocity.x = gameState.playerSpeed;
    let keypressAudio=new Audio("shot.mp3");
        keypressAudio.play();
  }
  if (event.keyCode == 37|| event.keyCode ==97|| event.keyCode == 65 ) {
    //left arrow
    gameState.rectVelocity.x = -gameState.playerSpeed;
    let keypressAudio=new Audio("shot.mp3");
        keypressAudio.play();
  }
  if (event.keyCode == 40|| event.keyCode ==115|| event.keyCode == 83 ) {
    //up arrow
    gameState.rectVelocity.y = gameState.playerSpeed;
    let keypressAudio=new Audio("shot.mp3");
        keypressAudio.play();
  }
  if (event.keyCode == 38|| event.keyCode ==119|| event.keyCode == 87 ) {
    //down arrow
    gameState.rectVelocity.y = -gameState.playerSpeed;
    let keypressAudio=new Audio("shot.mp3");
        keypressAudio.play();
  }
});