// 1. Canvas
const img = new Image();
img.src ="../Images/bg.png";

const canvas = document.getElementById('mi-canvas');
const ctx = canvas.getContext('2d');

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
let frames = 0;
let requestId ;
let enemies = [];
let timer=0;

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
    if(
        this.x < coin.x + coin.width &&
        this.x + this.width > coin.x  &&
        this.y < coin.y + coin.height &&
        this.y + this.height > coin.y 
    ){
      this.points++;
      updateCanvas();
    }
}
  draw(){
    //con esto hacemos que nuestro mario cobre vida y se vea la animacion alternando entre una imagen y la otra
    if(frames % 10 === 0) {
        this.image = this.image === this.image1 ? this.image2 : this.image1
    }
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
}


//Frankstein
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
  //con esto hacemos que nuestro mario cobre vida y se vea la animacion alternando entre una imagen y la otra
  if(frames % 10 === 0) {
      this.image = this.image === this.image1 ? this.image2 : this.image1
  }
  ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}
}


document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: frankie.moveUp();    console.log('up',    frankie); break;
    case 40: frankie.moveDown();  console.log('down',  frankie); break;
    case 39: frankie.moveRight(); console.log('right', frankie); break;
  }
  updateCanvas();
})

//Gatos - Enemigos*/
generateEnemies=()=>{
  

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
    ctx.drawImage(coinImg, this.x, this.y,25,25);
    if(timer > 6){
      Coins.draw = false;
    }
  }
}
 //Declaración personajes
 const pucca = new Player(80,440,4,0,60,35,puccaImages);
 const frankie = new Enemy(25,400,45,70,frankImages);
 const coin = new Coins();
 coin.x = 32 + (Math.random() * (canvas.width - 64));
 coin.y = 32 + (Math.random() * (canvas.height - 64));
  

//4. UpdateCanvas
function updateCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  frankieCollision();
  borderCollision();
  pucca.draw();
  coin.draw();
  frankie.draw();
  score();
  requestAnimationFrame(updateCanvas);
}

//Score

score=()=>{
  ctx.fillText("Pucca_x: " + pucca.x, 720,40);
  ctx.fillText("Pucca_y: " + pucca.y, 720,60);
  ctx.fillText("Vidas: " + pucca.lifes, 720,80);
  ctx.fillText("Puntos: " + pucca.points, 720,100);
}
// Gameover
gameOver=()=>{
  requestId = undefined;
  ctx.fillText("Game Over", 200, 200);
}
//Enemigos

//Sumar puntos
coinTimer=()=>{
  if(coin.draw){
    timer++;
  }
  else{
    timer=0;
  }
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
    case 38: pucca.moveUp();    console.log('up',    pucca); break;
    case 40: pucca.moveDown();  console.log('down',  pucca); break;
    case 39: pucca.moveRight(); console.log('right', pucca); break;
  }
  updateCanvas();
})
// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;


