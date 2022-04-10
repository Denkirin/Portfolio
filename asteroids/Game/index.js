const timeFactor = 1/100;

let canvas;
let ctx;
let player;

let obstacles;

let dir = 1;

let lft = false;
let rgt = false;
let fwd = false;
let sht = false;

let tini;
let tend;

let shotCount = 0;

let score;

window.onload = init;

let osci;

function init()
{
	canvas = document.querySelector('canvas');
	
	osci = new Oscillator();
	
	canvas.width = innerWidth;
	canvas.height = innerHeight;
	
	ctx = canvas.getContext('2d');

	player = new Player(canvas.width/2, canvas.height/2, 20);
	obstacles = []
	
	// obstacles.push(new Obstacle(new Vector(10,10),new Vector(1,1),10));
	obstacles.push(new Obstacle(new Vector(500,10),new Vector(0,0),100));
	
	oldTimestamp = 0;
	score = 0;
	
	tini = new Vector(0,0);
	tend = new Vector(0,0);
	
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
	
	let obsScore = 0;
	
	player.update(delta);
	obstacles.forEach((obstacle)=>
	{
		obstacle.update(delta);
	});
	
	if (lft)
	{
		player.rotate(-0.1);
	}
	
	if (rgt)
	{
		player.rotate(0.1);
	}
	
	if (fwd)
	{
		player.forward(2);
	}
	
	obstacles.forEach((obstacle)=>
	{
		
		if(player.pos.modDistance(obstacle.pos, innerWidth, innerHeight) - 10 <= obstacle.weight)
		{
			player.kill();
			if (player.deathCounter == 0)
			{
				osci.destroy();
			}
		}
		
		player.projectiles.forEach((projectile)=>
		{
			if (projectile.alive && projectile.pos.modDistance(obstacle.pos, innerWidth, innerHeight) <= obstacle.weight)
			{
				score += 100 - obstacle.weight
				osci.destroy()
				
				projectile.kill();
				
				obstacles.push(obstacle.kill(projectile.pos));
			
				if (obstacle.dead)
				{
					osci.success();
				}
			}
		});
	});
	
	obstacles = obstacles.filter(removeDead);
	
	if (player.dead)
	{
		document.location.href = './../Init/index.html';
	}
}

function draw(){
	ctx.fillStyle = 'rgba(0, 0, 0, 0.8)'
	ctx.fillRect(0, 0, canvas.width, canvas.height)
	player.draw(ctx);
	obstacles.forEach((obstacle)=>
	{
		obstacle.draw(ctx);
	});
	
	ctx.strokeStyle = 'white';
	ctx.fillStyle = 'white'
	
	ctx.font = canvas.height * 0.02 + 'px impact';
	ctx.textAlign = 'center';
	ctx.textBaseline = 'middle'; 
 
    ctx.fillText(Math.floor(score), canvas.width/2, canvas.height * 0.2, canvas.width);
	
}

addEventListener('keydown',() => {
	
	if (event.keyCode == 90)
	{
		fwd = true;
	}
	
	if (event.keyCode == 37)
	{
		lft = true;
	}
	
	if (event.keyCode == 39)
	{
		rgt = true;
	}

	if (event.keyCode == 88)
	{
		if (!sht)
		{
			player.shoot();
			
			osci.shot();
			sht = true;
		}
	}

})

addEventListener('keyup',() => {
	
	if (event.keyCode == 90)
	{
		fwd = false;
	}
	
	if (event.keyCode == 37)
	{
		lft = false;
	}

	if (event.keyCode == 39)
	{
		rgt = false;
	}
	
	if (event.keyCode == 88)
	{
		sht = false;
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

addEventListener('touchup',() => {

	tini.x = 0;
	tini.y = 0;
	sht = false;
	fwd = false;
	lft = false;
	rgt = false;

})