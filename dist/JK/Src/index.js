// import './style.css'
import {ParalaxScene} from './scene.js';
import {Animation} from './animation.js';
import {Entity} from './entity.js';

const canvas = document.getElementById('Renderer');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas); // adds the canvas to the body element

var x = 0;
var playerX = window.innerWidth/2 - 16*window.innerHeight/64;
var playerY = 200;
var speed = 10;

var moving = 0;

var crouch = false;

var touchX = 0;

var playerAnimations = [];
playerAnimations.push(new Animation('../Data/JK_Iddle_R.png', 4, 1, 32, 64, playerX, playerY, window.innerHeight/64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Iddle_L.png', 4, 1, 32, 64, playerX, playerY, window.innerHeight/64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Walking_R.png', 6, 1, 32, 64, playerX, playerY, window.innerHeight/64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_Walking_L.png', 6, 1, 32, 64, playerX, playerY, window.innerHeight/64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_CrossWalking_R.png', 6, 1, 32, 64, playerX, playerY, window.innerHeight/64, canvas, 4));
playerAnimations.push(new Animation('../Data/JK_CrossWalking_L.png', 6, 1, 32, 64, playerX, playerY, window.innerHeight/64, canvas, 4));

var scene = new ParalaxScene('../Data/JK_Background.png', canvas, 6, 1, 512, 64, window.innerHeight/64,15);

var jhonny = new Entity(playerAnimations);



window.addEventListener( 'keydown', (event) => {
	if(event.key == "ArrowRight" && moving == 0){
		moving = 1;
		jhonny.changeAnimation((crouch ? 4 : 2),-1);
	}else if(event.key == "ArrowLeft" && moving == 0){
		moving = -1;
		jhonny.changeAnimation((crouch ? 5 : 3), -1);
	}else if(event.key == "Shift" && moving == 0){
		crouch = true;
		speed /= 2;
	}
}, false );

window.addEventListener( 'keyup', (event) => {
	if(event.key == "ArrowRight"){
		moving = 0;
		jhonny.changeAnimation(0,-1);
	}else if(event.key == "ArrowLeft"){
		moving = 0;
		jhonny.changeAnimation(1,-1);
	}else if(event.key == "Shift"){
		crouch = false;
		speed *= 2;
	}
}, false );

function handleStart(e) 
	{
    if(e.touches) 
	{
        touchX = e.touches[0].pageX ;
    }
}

function handleMove(e)
{
	if(e.touches) 
	{
		if(touchX - e.touches[0].pageX > 0)
		{
			moving = -1;
			jhonny.changeAnimation((crouch ? 5 : 3), -1);
		}
		else if (touchX - e.touches[0].pageX < 0)
		{
			moving = 1;
			jhonny.changeAnimation((crouch ? 4 : 2),-1);	
		}
	}
}

function handleEnd(e)
{
	if(moving< 0)
	{
		moving = 0;
		jhonny.changeAnimation(1,-1);
	}
	else if (moving>0)
	{
		moving = 0;
		jhonny.changeAnimation(0,-1);
	}

}

canvas.addEventListener("touchstart", handleStart);
canvas.addEventListener("touchmove", handleMove);
canvas.addEventListener("touchend", handleEnd)



function init()
{
	
}

function update()
{
	scene.update();
	jhonny.update();
	
	if (moving != 0){
		if (!scene.move(moving*speed)){
			jhonny.changeAnimation((moving > 0 ? 0 : 1), -1);
			moving = 0;
		}
	}
}

function render()
{
	scene.render();
	jhonny.render();
}

function main() 
{
    let stopMain = window.requestAnimationFrame( main );
	
	update();
	
	render();
    // Your main loop contents
  }
  
main();