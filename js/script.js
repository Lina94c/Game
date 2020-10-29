// 1. Canvas
const img = new Image();
img.src ="../Images/bg.png";

const canvas = document.getElementById('mi-canvas');
const ctx = canvas.getContext('2d');
ctx.font = "16px Poppins";
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

let coinImg = new Image();
coinImg.src = "../Images/coin.png";

let heartImg = new Image();
heartImg.src = "../Images/Heart-08.png";

let gameImg = new Image();
gameImg.src = "../Images/Game over.png";

let winImg = new Image();
winImg.src = "../Images/win-01.png";

let sonido = new Audio();
sonido.src ="../Images/Halloween.mp3";


let coins =[];
let frames = 0;
let cats = [];
let hearts =[];
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

//Gatos - Enemigos
class Cats {
  constructor(x,y,height,width) {
    this.x =x;
    this.y =y;
    this.speed= -1;
    this.height = height;
    this.width = width;
    this.image1 = new Image();
    this.image2 = new Image();
   
    this.image1.src ="../Images/Cat-04.png";
    this.image2.src ="../Images/Cat-04-07.png";
    this.image= this.image1
  }
  draw() {
    this.x -= 3;
    if(frames % 10 === 0) {
      this.image = this.image === this.image1 ? this.image2 : this.image1
  }
  ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

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

//Hearts
class Hearts {
  constructor(x,y,height,width) {
    this.x =x;
    this.y =y;
    this.height = height;
    this.width = width;
  }
  draw() {
    ctx.drawImage(heartImg, this.x, this.y,27,23)
  }
}

 //Declaración personajes
 const pucca = new Player(80,440,4,0,60,45.75,puccaImages);
 const cat = new Cats(300,400,52,58);

//4. UpdateCanvas
function updateCanvas() {
  frames++;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  backgroundImage.move();
  musica();
  borderCollision();
  pucca.draw();
  generateCats();
  drawCats();
  generateCoins();
  drawCoins();
  generateHearts();
  drawHearts();
  score();
  if(pucca.points >=100){
    youWin();
  }
  if(!requestId){
   return gameOver();
  }
  requestAnimationFrame(updateCanvas);
}

//Score

score=()=>{
  ctx.fillText("Vidas: " + pucca.lifes, 450,30);
  ctx.fillText("Puntos: " + pucca.points, 300,30);
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
    if(pucca.point >= 200){
      return youWin();
    }
    coin.draw()
  })
}

// Corazones
generateHearts=()=>{
  let x = Math.floor(Math.random()*18);
  let y = Math.floor(Math.random()*(450-330)+330);
  const heart = new Hearts(x*64,y,50,50);
  if(frames%400 == 0){
    //console.log("Generando moneda",coin)
    hearts.push(heart)
  }
}

drawHearts=()=>{
  hearts.forEach((heart,index)=>{
    if(pucca.collition(heart)){
      hearts.splice(index,1)
      pucca.lifes +=1;
    }
    heart.draw()
  })
}

//You win
youWin=()=>{
  ctx.drawImage(winImg,250,50,350,350);
  updateCanvas = false;
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

//Movimientos Player
document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: pucca.moveUp();    /*console.log('up',    pucca);*/ break;
    case 40: pucca.moveDown();  /*console.log('down',  pucca);*/break;
    case 39: pucca.moveRight(); /*console.log('right', pucca);*/break;
    case 37: pucca.moveLeft(); /*console.log('right', pucca);*/break;
  }
})

//Música
musica=()=>{
  sonido.play();
}
// Restart
window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    location.reload();
  };
};

// start calling updateCanvas once the image is loaded
startGame();


