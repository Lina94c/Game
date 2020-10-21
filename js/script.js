// 1.Canvas
const img = new Image();
img.src ="../Images/bg.png";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

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

function updateCanvas() {
  backgroundImage.move();

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  backgroundImage.draw();

  requestAnimationFrame(updateCanvas);
}

// start calling updateCanvas once the image is loaded
img.onload = updateCanvas;

// Instancia "Pucca"
let playerImg= new Image ();
playerImg.src="";

//Instancia "Frankstein"
let monsterImg= new Image();
monsterImg.src="";

//Instancia "Gatos"
let catImg= new Image();
catImg.src="";

//2.Objetos del jugador
const player={
x:50,
y:400,
width:50,
height:50,
speedX:3,
lifes:5,
moveUp:    function() { this.y -= 50 },
moveDown:  function() { this.y += 50 },
}

 /* Falta establecer movimiento en player*/
const monster={
    x:25,
    y:400,
    width:50,
    SpeedX:2, 
    };

const cat ={
    x: 150,
    y:"",
    width:50,
    speed:random(),
    /* Falta establecer función random, donde los 
    gatos aparezcan de forma aleatoria a velocidades
    distintas*/
}

//4.Botón iniciar juego
window.onload = function() {
    document.getElementById("start-button").onclick = function() {
      updateCanvas()
    };
  };
  
/*5.Actualización de objetos
document.onkeydown = function(e) {
  switch (e.keyCode) {
    case 38: player.moveUp();    console.log('up',    player); break;
    case 40: player.moveDown();  console.log('down',  player); break;
  }
  updateCanvas();
}
//Colisión
    if (
		player.x <= (monster.x + 50)
		&& monster.x <= (player.x + 50)
		&& player.y <= (monster.y + 50)
		&& monster.y <= (player.y + 50)
	) {
		gameOver();
	}
    if (
    player.x <= (cat.x + 50)
    && cat.x <= (player.x + 50)
    && player.y <= (cat.y + 50)
    && cat.y <= (player.y + 50)
     ) {
    damage();
    }
};

// INPUT (Keys)*/
