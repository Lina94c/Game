// 1.Canvas
//imgscale:1 si quieres modificar la imagen

//ctx.drawImage("IMAGE",coordenada x,coordenaday, Coordenada Canvas)
draw(){
    ctx.drawImage(imagen, this.x, this.y, this.weight,this.height);
    }

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
}
 /* Falta establecer movimiento en player*/
const monster={
    x:25,
    y:400,
    width:50,
    SpeedX:2, 
    };

const cat ={
    x: 150
    y:"";
    width:50,
    speed:random();
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
  
//5.Actualización de objetos
const update = function (modifier) {
	if (38 in keysDown) { // Arriba
		player.y -= player.speed * modifier;
	}
	if (40 in keysDown) { // Abajo
		player.y += player.speed * modifier;
	}
	if (39 in keysDown) { // Derecha
		player.x += player.speed * modifier;
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

// INPUT (Keys)