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
let split = false;

let banner;
let food = [];
let foodLimit = 10
let bound;

window.onload = init;

function init()
{
	canvas = document.getElementById('Viewport');
	
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	
	bound = canvas.height * 0.1;
	
	banner = document.getElementById("banner");
	
	ctx = canvas.getContext('2d');
	
	player = new Player(new Vector(100, 100), new Vector(-1,-1), 3, 10,1)
	enemy = new Player(new Vector(300, 300), new Vector(-1,-1), 3, 10,1)
	
	for(let i = 0; i < foodLimit; i++)
	{
		food.push(new Vector(Math.random()*canvas.width, Math.random()*(canvas.height - bound) + bound))
	}
	
	// Start the first frame request
	window.requestAnimationFrame(gameLoop);
}

function gameLoop(timeStamp)
{
	
	if (oldTimestamp == 0) oldTimestamp = timeStamp -0.1;
	
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
	enemy.update(food[0],delta)
	
	player.update(coreTarget,delta)
	
	food.forEach( f =>
	{
		if (f.distance(enemy.pos)<=20)
		{	
			enemy.enlarge();
			f.x = Math.random()*canvas.width
			f.y = Math.random()*(canvas.height - bound) + bound
		}
		
		if (f.distance(player.pos)<=20)
		{	
			player.enlarge();
			f.x = Math.random()*canvas.width
			f.y = Math.random()*(canvas.height - bound) + bound
		}		
	});
	
	let pcnt = 0;
	let ecnt = 0;
	
	if (enemy.nodes[0].pos.distance(player.pos)<=20)
	{
		for(let i = 1;i < enemy.nodes.length; i++)
		{
			enemy.nodes.pop();
		}
		
		for(let i = 1;i < player.nodes.length; i++)
		{
			player.nodes.pop();
		}
	}
	else
	{		
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
			if (enemy.nodes.length > 1)
			{
				enemy.nodes.pop()
				player.enlarge()
			}
		}
		for (let i = 0; i < ecnt; i++)
		{
			if (enemy.nodes.length > 1)
			{
				player.nodes.pop()
				enemy.enlarge()
			}
		}
	}
	
	
	if (up && coreTarget.y > bound)
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
	
	if (split){
		for(let i = 1; i < player.nodes.length/2; i++)
		{
			food.push(player.nodes[player.nodes.length-1].pos.clone())
			player.nodes.pop();
		}
		split = false;
	}
	
}

function draw(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	
	ctx.drawImage(banner,10,10, (banner.width / banner.height) * canvas.height * 0.05,canvas.height * 0.05);
	ctx.strokeStyle = 'rgb(255,255,255)'
	ctx.strokeRect(5,5, canvas.width-10, canvas.height * 0.1 - 10)
	
	ctx.fillStyle = 'red';
	ctx.fillRect(coreTarget.x, coreTarget.y, 5, 5);
	player.draw(ctx)
	enemy.draw(ctx)
	
	food.forEach(f=>
	{
		ctx.fillStyle = 'green';
		ctx.fillRect(f.x, f.y, 5, 5);
	});
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
	
	if (event.keyCode == 32)
	{
		split = true
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
	
	coreTarget.x = event.touches[0].pageX;
	coreTarget.y = Math.max(event.touches[0].pageY,bound);
	
})

addEventListener('touchmove',() => {
	
	coreTarget.x = event.touches[0].pageX;
	coreTarget.y = Math.max(event.touches[0].pageY,bound);
	
})

addEventListener('touchend',() => { 
// FIX THIS

	sht = false;
	fwd = false;
	lft = false;
	rgt = false;

})