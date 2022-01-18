import './style.css'

var canvas = document.createElement('canvas');

canvas.id = "CursorLayer";
canvas.width = 1224;
canvas.height = 768;
canvas.style.zIndex = 8;
canvas.style.position = "absolute";
canvas.style.border = "1px solid";


var body = document.getElementsByTagName("body")[0];
body.appendChild(canvas);

// below is optional

var ctx = canvas.getContext("2d");
ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
ctx.fillRect(100, 100, 200, 200);
ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
ctx.fillRect(150, 150, 200, 200);
ctx.fillStyle = "rgba(0, 0, 255, 0.2)";
ctx.fillRect(200, 50, 200, 200);

var img = new Image();   // Create new img element

var loaded = false;

img.onload = function() {
	loaded = true;
}

var cnt = 0

img.src = '../Data/JK_Background.png';

function main() {
    let stopMain = window.requestAnimationFrame( main );
	console.log("A");
	 
	cnt = (cnt+1)%6
	 
    ctx.drawImage(img, cnt * 512, 0,512,64,0,0,512,64);
    // Your main loop contents
  }
  
main();