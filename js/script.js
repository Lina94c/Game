// 1. Canvas
const img = new Image();
img.src ="../Images/bg.png";

const canvas = document.getElementById('mi-canvas');
const ctx = canvas.getContext('2d');
ctx.font = "10px Calibri";
ctx.fillStyle = "white";

// Fondo en movimiento
const backgroundImage = {
  img: img,
  x: 0,
  speed: -1,
  move: function() {
    this.x += this.speed;
    this.x %= canvas.width;
  },
  draw: function() {
    ctx.drawImage(this.img, this.x, 0);
    if (this.speed < 0) {
      ctx.drawImage(this.img, this.x + canvas.width, 0);
    } else {
      ctx.drawImage(this.img, this.x - this.img.width, 0);
    }
  },
};

//2. Personajes & elementos
const puccaImages = {
  first: "../Images/pucca.png",
  second: "../Images/pucca1.png"
};

const frankImages = {
  first: "../Images/Framkie.png",
  second: "../Images/Framkie.png"
};

let coinImg = new Image();
coinImg.src = "../Images/coin.png";

let catImg = new Image();
catImg.src = "../Images/Frankie.png";

let gameImg = new Image();
gameImg.src = "../Images/Game over.png";

let coins =[];
let frames = 0;
let cats = [];
let time=0;
let requestId;

//Objetos del jugador

//Pucca
class Player{
  constructor(x,y,lifes,points,width,height,imgs) {
    this.x = x;
    this.y = y;
    this.lifes= lifes;
    this.points = points;
    this.width= width;
    this.height= height;
    this.image1 = new Image();
    this.image2 = new Image();
   
    this.image1.src = imgs.first;
    this.image2.src = imgs.second;
    this.image= this.image1
  }
  moveUp() {
    this.y -= 25;
  }
  moveDown() {
    this.y += 25;
  }
  moveRight() {
    this.x += 25;
  }
  moveLeft() {
    this.x -= 25;
  }
  collition(coin){
    return(
        this.x < coin.x + coin.width &&
        this.x + this.width > coin.x  &&
        this.y < coin.y + coin.height &&
        this.y + this.height > coin.y 
    )
}
  draw(){
    //animación
    if(frames % 10 === 0) {
        this.image = this.image === this.image1 ? this.image2 : this.image1
    }
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
}


/*Frankstein
class Enemy {
  constructor(x,y,width,height,imgs) {
    this.x = x;
    this.y = y;
    this.width= width;
    this.height= height;
    this.image1 = new Image();
    this.image2 = new Image();
   
    this.image1.src = imgs.first;
    this.image2.src = imgs.second;
    this.image= this.image1
  }
  moveUp() {
    this.y -= 15;
  }
  moveDown() {
    this.y += 15;
  }
  moveRight() {
    this.x += 15;
}

draw(){
  //animación
  if(frames % 10 === 0) {
      this.image = this.image === this.image1 ? this.image2 : this.image1
  }
  ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
}


document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: frankie.moveUp(); break;
    case 40: frankie.moveDown(); break;
    case 39: frankie.moveRight(); break;
  }
})*/

//Gatos - Enemigos
class Cats {
  constructor(x,y,height,width) {
    this.x =x;
    this.y =y;
    this.speed= -1;
    this.height = height;
    this.width = width;
  }
  move(){
    this.x += this.speed;
    this.x %= canvas.width;
  }
  draw() {
    this.x -= 3;
    ctx.drawImage(catImg, this.x, this.y,25,25);

  }
}

//Monedas
class Coins {
  constructor(x,y,height,width) {
    this.x =x;
    this.y =y;
    this.height = height;
    this.width = width;
  }
  draw() {
    ctx.drawImage(coinImg, this.x, this.y,30,18.16)
  }
}
 //Declaración personajes
 const pucca = new Player(80,440,4,0,60,45.75,puccaImages);
 const coin = new Coins(300,400);
 const cat = new Cats(300,400,50,50);
  

//4. UpdateCanvas
function updateCanvas() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  backgroundImage.move();
  cat.move();
  //frankieCollision();
  borderCollision();
  pucca.draw();
  generateCats();
  drawCats();
  generateCoins();
  drawCoins();
  score();
  if(!requestId){
   return gameOver();
  }
  requestAnimationFrame(updateCanvas);
}

//Score

score=()=>{
  ctx.fillText("Pucca_x: " + pucca.x, 720,40);
  ctx.fillText("Pucca_y: " + pucca.y, 720,60);
  ctx.fillText("Vidas: " + pucca.lifes, 720,80);
  ctx.fillText("Puntos: " + pucca.points, 720,100);
}

//Enemigos
generateCats=()=>{;
  let y = Math.floor(Math.random()*(450-330)+330);
  const cat = new Cats(750,y,50,50);
  if(frames%150 == 0){
    cats.push(cat)
  }
}

drawCats=()=>{
  cats.forEach((cat,index)=>{
    if(pucca.collition(cat)){
      cats.splice(index,1)
      pucca.lifes -= 1;
    }
    if (pucca.lifes < 1){
      return gameOver();
        }
    cat.draw()
  })
}


// Generar Monedas
generateCoins=()=>{
  let x = Math.floor(Math.random()*18);
  let y = Math.floor(Math.random()*(450-330)+330);
  const coin = new Coins(x*64,y,50,50);
  if(frames%200 == 0){
    //console.log("Generando moneda",coin)
    coins.push(coin)
  }
}

drawCoins=()=>{
  coins.forEach((coin,index)=>{
    if(pucca.collition(coin)){
      coins.splice(index,1)
      pucca.points +=25;
    }
    coin.draw()
  })
}

//You win
youWin=()=>{
  ctx.drawImage(gameImg,250,50,350,350);
  requestId = undefined;
}

//Start game

startGame=()=>{
  requestId = requestAnimationFrame(updateCanvas);
}

// Gameover
gameOver=()=>{
    ctx.drawImage(gameImg,250,50,350,350);
    requestId = undefined;
}
//Limite jugador , falta agregar direcciones
borderCollision=()=>{
  if(pucca.y <= 330){
    pucca.y = 330;
  }
  else if(pucca.x <=10) {
    pucca.x = 0;
  }
  else if (pucca.y + pucca.height >= canvas.height-6){
    pucca.y= canvas.height - pucca.height;
    
  }
  else if (pucca.x + pucca.width >= canvas.width-6){
    pucca.x= canvas.width - pucca.width;
    
  }
}

frankieCollision=()=>{
  if(frankie.y <= 300){
    frankie.y = 300;
  }
  else if(frankie.x <=10) {
    frankie.x = 0;
  }
  else if (frankie.y + frankie.height >= canvas.height-6){
    frankie.y= canvas.height - frankie.height;
    
  }
  else if (frankie.x + frankie.width >= canvas.width-6){
    frankie.x= frankie.width - frankie.width;
    
  }
}
//Movimientos Player
document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: pucca.moveUp();    /*console.log('up',    pucca);*/ break;
    case 40: pucca.moveDown();  /*console.log('down',  pucca);*/break;
    case 39: pucca.moveRight(); /*console.log('right', pucca);*/break;
    case 37: pucca.moveLeft(); /*console.log('right', pucca);*/break;
  }
})
// start calling updateCanvas once the image is loaded
startGame();


