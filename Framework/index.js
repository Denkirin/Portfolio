let canvas;
let ctx;

let oldTimestamp = 0;

let myCamera;

window.onload = init;

function init(){
	canvas = document.querySelector('canvas');
	
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	
	ctx = canvas.getContext('2d');
	myCamera = new Camera(new Vector(150,150,200), new Vector(0,0,1), CAM_ORTHO);
	
	// Start the first frame request
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp){
	
	if (oldTimestamp == 0) oldTimestamp = timeStamp;
	
	const delta = (timeStamp - oldTimestamp);
		

	
	update(delta);
	
	draw();

	// Keep requesting new frames
	
	oldTimestamp = timeStamp;
	
	window.requestAnimationFrame(gameLoop);
}

function update(delta)
{
	
}

function draw(){
	ctx.fillStyle = "black";
	ctx.fillRect(0,0,canvas.width,canvas.height);
	
	myCamera.draw(ctx);
}

addEventListener('keydown',() => {
	
	if (event.keyCode == 40)
	{
	}


})

addEventListener('keyup',() => {
	
	if (event.keyCode == 36)
	{
	}

})

addEventListener("touchstart", (e) => {

		if (event.touches[0].pageY < canvas.height)
		{
		}

});
