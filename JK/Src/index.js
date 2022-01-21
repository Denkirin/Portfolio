// import './style.css'
import {ParalaxScene} from './scene.js';
import {Animation} from './animation.js';
import {Entity} from './entity.js';

const canvas = document.getElementById('Renderer');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas); // adds the canvas to the body element

var x = 0;
var playerX = window.innerWidth / 2 - 16 * window.innerHeight / 64;
var playerY = 200;
var speed = 10;
var moving = 0;
var crouch = false;
var touchX = 0;
var attacking = false;
var wasMoving = 0;

var playerAnimations = [];
playerAnimations.push(new Animation('../Data/JK_Iddle_R.png',		 	4, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Iddle_L.png', 			4, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Walking_R.png', 		6, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Walking_L.png', 		6, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_CrossWalking_R.png', 	6, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_CrossWalking_L.png', 	6, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Combo1_L.png', 		   11, 1, 32, 64, playerX, playerY, window.innerHeight / 64, canvas, 4));

var scene =  new ParalaxScene('../Data/JK_Background.png', canvas, 6, 1, 512, 64, window.innerHeight / 64,15);
var jhony = new Entity(playerAnimations);

function handleKeyDown(event)
{
	if (event.key == "ArrowRight" && moving == 0 && !attacking)
	{
		moving = 1;
		jhony.changeAnimation((crouch ? 4 : 2),-1);
	}
	else if (event.key == "ArrowLeft" && moving == 0 && !attacking)
	{
		moving = -1;
		jhony.changeAnimation((crouch ? 5 : 3), -1);
	}
	else if (event.key == "Shift" && moving == 0 && !attacking)
	{
		crouch = true;
		speed /= 2;
	}
	else if (event.keyCode == 32  && !attacking)
	{
		wasMoving = moving;
		moving = 0;
		jhony.changeAnimation(6, 1);
	}
}

function handleKeyUp(event)
{
	if (event.key == "ArrowRight")
	{
		moving = 0;
		jhony.changeAnimation(0, -1);
	}
	else if (event.key == "ArrowLeft")
	{
		moving = 0;
		jhony.changeAnimation(1, -1);
	}
	else if (event.key == "Shift")
	{
		crouch = false;
		speed *= 2;
	}
}

function handleStart(e) 
{
    if(e.touches) 
	{
        touchX = e.touches[0].pageX;
    }
}

function handleMove(e)
{
	if(e.touches) 
	{
		if(touchX - e.touches[0].pageX > 0)
		{
			moving = -1;
			jhony.changeAnimation((crouch ? 5 : 3), -1);
		}
		else if (touchX - e.touches[0].pageX < 0)
		{
			moving = 1;
			jhony.changeAnimation((crouch ? 4 : 2), -1);	
		}
	}
}

function handleEnd(e)
{
	if(moving < 0)
	{
		moving = 0;
		jhony.changeAnimation(1,-1);
	}
	else if (moving > 0)
	{
		moving = 0;
		jhony.changeAnimation(0, -1);
	}

} 

window.addEventListener( 'click', (event) => {
		wasMoving = moving;
		moving = 0;
		jhony.changeAnimation(6, 1);
}, false );
window.addEventListener("keydown", 		handleKeyDown, false );
window.addEventListener("keyup",  		handleKeyUp , false );
canvas.addEventListener("touchstart", 	handleStart);
canvas.addEventListener("touchmove", 	handleMove);
canvas.addEventListener("touchend", 	handleEnd)

function init()
{
	
}

function update()
{
	scene.update();
	jhony.update();
	
	if (moving != 0){
		if (!scene.move(moving*speed)){
			jhony.changeAnimation((moving > 0 ? 0 : 1), -1);
			moving = 0;
		}
	}
	
	if (attacking && jhony.state == 0){
		attacking = false;
		moving = wasMoving;
	}
}

function render()
{
	scene.render();
	jhony.render();
}

function main() 
{
    let stopMain = window.requestAnimationFrame( main );
	
	update();
	
	render();
    // Your main loop contents
  }
  
main();