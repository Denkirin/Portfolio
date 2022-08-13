class Node 
{
	constructor(pos, size, normal)
	{
		this.pos = pos;	
		this.size = size;
		this.normal = normal.clone()
		this.normal.normalize();
		
		this.lrib = new Vector(-size);
		this.rrib = new Vector(size);
					 
	}
	
	update(delta)
	{

	}
	
	draw(ctx)
	{
		ctx.fillStyle = 'RGB(255,255,255)';
		ctx.strokeStyle = 'RGB(255,255,255)';
		ctx.beginPath();
		
		ctx.moveTo(this.pos.x + this.lrib.x, this.pos.y + this.lrib.y);
		
		ctx.lineTo(this.pos.x + this.rrib.x, this.pos.y + this.rrib.y);
		
		ctx.closePath();
		ctx.stroke();
		ctx.strokeStyle = 'red';
		ctx.beginPath();
		ctx.moveTo(this.pos.x, this.pos.y);
		ctx.lineTo(this.pos.x + 10 * this.normal.x, this.pos.y + 10 * this.normal.y);
		ctx.stroke();
		ctx.closePath();
		
	}
	
	faceTo(target)
	{
		
		this.normal = target.clone();
		this.normal.translate(-this.pos.x, -this.pos.y)
		this.normal.normalize();
		
		this.lrib.x = -this.normal.y * this.size;
		this.lrib.y = this.normal.x * this.size;
		this.rrib.x = this.normal.y * this.size;
		this.rrib.y = -this.normal.x * this.size;
	}
	
	move(vel, target)
	{
		if (this.pos.distance(target) > 2 * this.size)
		{
			this.pos.translate(this.normal.x * vel, this.normal.y * vel)
		}
	}
}	

class Player
{
	constructor(pos, dir, iniSize, thick){
		this.pos = pos.clone();
		this.dir = dir.clone();
		this.thick = thick;
		
		this.dir.normalize();
		
		console.log(this.dir)
		
		this.nodes = [];
		
		this.nodes.push(new Node(pos.clone(), thick, dir));
		for (let i = 1; i < iniSize; i++)
		{
			this.nodes.push(new Node(new Vector(pos.x, pos.y + i * 2 * thick), thick, this.nodes[i-1].pos.transClone(-pos.x, -pos.y - i * 2 * thick) ));
		}
	}
	
	update(delta)
	{
		
		for (let i = this.nodes.length - 1; i > 0; i--)
		{
			this.nodes[i].faceTo(this.nodes[i-1].pos);
		}
	}
	
	draw(ctx)
	{
		
		this.nodes.forEach(node=>
		{
			node.draw(ctx);
		});
	}
	
	faceTo(target)
	{	
		this.dir = target.sumClone(this.pos.scaleClone(-1));
		this.dir.normalize();
		this.nodes[0].faceTo(target);
	}
	
	move(vel, target)
	{
		let sizeFactor = Math.sqrt(this.nodes.length)
		if (this.pos.distance(target) > 2*this.thick)
		{
			this.pos.translate(this.dir.x * vel/sizeFactor, this.dir.y * vel/sizeFactor)
			this.nodes[0].move(vel/sizeFactor, target);
			for (let i = 1; i < this.nodes.length; i++)
			{
				this.nodes[i].move(vel/sizeFactor, this.nodes[i-1].pos);
			}
		}
	}
	
	enlarge()
	{
		this.nodes.push(new Node(new Vector(this.nodes[this.nodes.length - 1].pos.x, 
											this.nodes[this.nodes.length - 1].pos.y), 
											this.nodes[this.nodes.length - 1].size, 
											new Vector(0,-1)));
		console.log(this.nodes[this.nodes.length - 1],this.nodes[this.nodes.length - 2])									
	}
}