/ 1. Canvas
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
    //con esto hacemos que nuestro mario cobre vida y se vea la animacion alternando entre una imagen y la otra
    if(frames % 10 === 0) {
        this.image = this.image === this.image1 ? this.image2 : this.image1
    }
    ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
}

/*
const pucca = new Pucca();

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: pucca.moveUp();    console.log('up',    pucca); break;
    case 40: pucca.moveDown();  console.log('down',  pucca); break;
    case 39: pucca.moveRight(); console.log('right', pucca); break;
    case 37: pucca.moveLeft();  console.log('left',  pucca); break;
  }
  updateCanvas();
})*/

//Frankstein
class Frankie {
  constructor() {
    this.x = 10;
    this.y = 360;
    this.speed=2;
    
//Imagen
    const img = new Image();
    img.addEventListener('load', () => {

// Once image loaded => draw
      this.img = img;
      this.draw();
    });
    img.src ="../Images/frankie.png";
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
  draw() {
    ctx.drawImage(this.img, this.x, this.y,40,60);
  }
}

const frankie = new Frankie();

document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 38: frankie.moveUp();    console.log('up',    frankie); break;
    case 40: frankie.moveDown();  console.log('down',  frankie); break;
    case 39: frankie.moveRight(); console.log('right', frankie); break;
  }
  updateCanvas();
})

//Gatos - Enemigos
 



//Monedas
class Coins {
  constructor() {
    this.x = 10;
    this.y = 380;

//Imagen
    const img = new Image();
    img.addEventListener('load', () => {

// Once image loaded => draw
      this.img = img;
      this.draw();
    });
    img.src ="../Images/coin.png";
  }
  
  draw() {
    ctx.drawImage(this.img, this.x, this.y,25,25);
  }
}

const coin = new Coins();
  coin.x = 25 + (Math.random() * (canvas.width - 64));
	coin.y = 25 + (Math.random() * (canvas.height - 64));

 

//4. UpdateCanvas
function updateCanvas() {
  backgroundImage.move();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();
  pucca.draw();
  frankie.draw();
  coin.draw();
  requestAnimationFrame(updateCanvas);
  ctx.fillText("Pucca_x: " + pucca.x, 720,40);
  ctx.fillText("Pucca_y: " + pucca.y, 720,60);
  ctx.fillText("Vidas: " + pucca.lifes, 720,80);
  ctx.fillText("Puntos: " + pucca.points, 720,100);
}

// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;