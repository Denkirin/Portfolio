const timeFactor = 1/100;

let canvas;
let ctx;
let player;
let enemy;
let coreTarget = new Vector(200,200);

let dir = 0;

let oldTimestamp = 0;

let up = false;
let down = false;
let left = false;
let right = false;

let food = new Vector(500,500);

window.onload = init;

function init()
{
	canvas = document.querySelector('canvas');
	
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	
	ctx = canvas.getContext('2d');
	
	player = new Player(new Vector(100, 100), new Vector(-1,-1), 3, 10)
	enemy = new Player(new Vector(300, 300), new Vector(-1,-1), 3, 10)
	
	// Start the first frame request
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp)
{
	
	if (oldTimestamp == 0) oldTimestamp = timeStamp;
	
	const delta = (timeStamp - oldTimestamp) * timeFactor;
		
		
	update(delta);
	
	draw();

	// Keep requesting new frames
	
	oldTimestamp = timeStamp;
	
	window.requestAnimationFrame(gameLoop);
}

function removeDead(obstacle)
{
	return(!obstacle.dead);
}
	

function update(delta)
{
	enemy.faceTo(food);
	enemy.move(10,food);
	enemy.update(delta)
	
	player.faceTo(coreTarget);
	player.move(10, coreTarget);
	player.update(delta)
	
	if (food.distance(enemy.pos)<=20)
	{	
		enemy.enlarge();
		food.x = Math.random()*canvas.width
		food.y = Math.random()*canvas.height
	}
	
	if (food.distance(player.pos)<=20)
	{	
		player.enlarge();
		food.x = Math.random()*innerWidth
		food.y = Math.random()*innerHeight
	}
	
	let pcnt = 0;
	let ecnt = 0;
	
	for (let i = 0; i < enemy.nodes.length; i++)
	{
		if (enemy.nodes[i].pos.distance(player.pos)<=20)
		{
			pcnt = enemy.nodes.length-i;
			break;
		}
	}
	
	for (let i = 0; i < player.nodes.length; i++)
	{
		if (player.nodes[i].pos.distance(enemy.pos)<=20)
		{
			ecnt = player.nodes.length-i;
			break;
		}
	}
	
	for (let i = 0; i < pcnt; i++)
	{
		enemy.nodes.pop()
		player.enlarge()
	}
	for (let i = 0; i < ecnt; i++)
	{
		player.nodes.pop()
		enemy.enlarge()
	}
	
	if (up && coreTarget.y > 10)
	{
		coreTarget.translate(0,-10);
	}
	if (down && coreTarget.y < innerHeight -10)
	{
		coreTarget.translate(0,10);
	}
	if (left && coreTarget.x > 10)
	{
		coreTarget.translate(-10,0);
	}
	if (right && coreTarget.x < innerWidth - 10)
	{
		coreTarget.translate(10,0);
	}
	
}

function draw(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	ctx.fillStyle = 'red';
	ctx.fillRect(coreTarget.x, coreTarget.y, 5, 5);
	player.draw(ctx)
	enemy.draw(ctx)
	
	ctx.fillStyle = 'green';
	ctx.fillRect(food.x, food.y, 5, 5);
	player.draw(ctx)
	enemy.draw(ctx)
}

addEventListener('keydown',() => {
	
	if (event.keyCode == 38)
	{
		up = true
	}
	
	if (event.keyCode == 37)
	{
		left = true
	}
	
	if (event.keyCode == 39)
	{
		right = true
	}

	if (event.keyCode == 40)
	{
		down = true
	}

})

addEventListener('keyup',() => {
	
	if (event.keyCode == 38)
	{
		up = false
	}
	
	if (event.keyCode == 37)
	{
		left = false
	}
	
	if (event.keyCode == 39)
	{
		right = false
	}

	if (event.keyCode == 40)
	{
		down = false
	}

})

addEventListener('touchstart',() => {
	
	tini.x = event.touches[0].pageX;
	tini.y = event.touches[0].pageY;
	
	if (!sht)
	{
		player.shoot();
		
		osci.shot();
		sht = true;
	}
})

addEventListener('touchmove',() => {
	
	tend.x = event.touches[0].pageX;
	tend.y = event.touches[0].pageY;

	if (Math.abs(tini.y - tend.y) > Math.abs(tini.x - tend.x))
	{
		fwd = true;
	}
	else
	{
		if (tini.x > tend.x)
		{
			rgt = false
			lft = true;
		}
		else
		{			
			lft = false
			rgt = true;
		}
	}
})

addEventListener('touchend',() => { 
// FIX THIS

	tini.x = 0;
	tini.y = 0;
	sht = false;
	fwd = false;
	lft = false;
	rgt = false;

})