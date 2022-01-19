import './style.css'
import {ParalaxScene} from './scene';

const canvas = document.getElementById('Renderer');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas); // adds the canvas to the body element

var scene = new ParalaxScene('../Data/JK_Background.png', canvas, 6, 1, 512, 64, window.innerHeight/64,15);

var jhonny = new ParalaxScene('../Data/JK_Walking.png', canvas, 6, 1, 32, 64, window.innerHeight/64,4);

var x = 0;
var y = 200;

function init()
{
	
}

function update()
{
	scene.update();
	jhonny.update();
	jhonny.animation.x = x;
	jhonny.animation.y = y;
	
	if (x <= -32 * window.innerHeight/64){
		x = window.innerWidth - 32;
	}else{
		x -= 20;
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