//1.Canvas
const canvas = document.getElementById("mi-canvas");
const ctx = canvas.getContext("2d");

//Solo para saber como pintar una imagen dentro del canvas!!!

// const image = new Image()
// image.src = "https://bit.ly/2L7yH3f";

// image.onload = () => {
//     ctx.drawImage(image,100,100,100,120);
// }
//Primero lo que necesitamos 
const puccaImages = {
  first: "../Images/pucca.png",
  second: "../Images/pucca1.png"
};
let frames = 0;
let requestId ;
let enemies = [];
//clases para mi juego
class Player {
  constructor(x,y,width,height,imgs){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      
      this.image1 = new Image();
      this.image2 = new Image();
     
      this.image1.src = imgs.first;
      this.image2.src = imgs.second;
      this.image= this.image1
  }
  collition(enemy){
      return(
          this.x < enemy.x + enemy.width &&
          this.x + this.width > enemy.x  &&
          this.y < enemy.y + enemy.height &&
          this.y + this.height > enemy.y 
      )
  }
  draw(){
      //con esto hacemos que nuestro mario cobre vida y se vea la animacion alternando entre una imagen y la otra
      if(frames % 10 === 0) {
          this.image = this.image === this.image1 ? this.image2 : this.image1
      }
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}

class Background{
  constructor(x,y,width,height,img){
      this.x = x;
      this.y = y;
      this.width = width;
      this.height = height;
      this.image = new Image();
      this.image.src= img
  }
  draw(){
      this.x -= 2
      //en caso de alcanzar el final de la image resetamos a x
      if(this.x < -canvas.width)this.x= 0 
      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)

      // dibujamos una segunda imagen  al final de la primera
      ctx.drawImage(this.image,this.x + canvas.width,this.y,this.width,this.height)
  }
}

class Enemy{
  constructor(){
      this.x = canvas.width;
      this.y = 600;
      this.width = 70;
      this.height = 100;
      this.image = new Image();
      this.image.src= "../Images/Framkie.png"
  }
  draw(){
      this.x -= 2
     

      ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
  }
}
//para nuestro variables


const background = new Background(0,0,canvas.width,canvas.height,"../Images/bg.png");
const pucca = new Player(100,580,100,120,puccaImages)
//esto es solo de ejemplo para un enemigo
//const enemy = new Enemy()


// en este se dibuja!! todo
updateGame=()=>{
  frames++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  background.draw()
  pucca.draw()
  generateEnemies()
  drawEnemies()
  //esto igual es ejemplo
  //enemy.draw()
  // if(mario.collition(enemy)){
  //     console.log("ya perdiste morra")
  //     gameOver()
  // }

  if(!requestId){ 
      gameOver()
  }else{
      requestId =  requestAnimationFrame(updateGame)
  }

  console.log(enemies.length)
  
  
}
//para inicializar el juego
startGame = () => {
  requestId = requestAnimationFrame(updateGame)
}

gameOver=()=>{
  requestId = undefined;
  ctx.fillText("Game Over", 200, 200);
}

//Generar Muchos enemigos!!!!

generateEnemies =()=> {
  if(frames % 100 == 0 || frames % 60 == 0 || frames % 170 == 0){
      let enemy = new Enemy();
      // enemies.push(enemy)
      enemies = [...enemies,enemy]
  }

}

drawEnemies=()=>{
  enemies.forEach((enemy)=>{
      enemy.draw()
      if(pucca.collition(enemy)) gameOver()
  })
}
//termina seccion enemigos


addEventListener("keydown",(event)=>{
  if(event.keyCode === 39) pucca.x += 50
  if(event.keyCode === 37) pucca.x -= 50
  if(event.keyCode === 32) pucca.y -= 50
  if(event.keyCode === 13) startGame()
})