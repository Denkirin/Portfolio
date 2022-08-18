const CAM_ORTHO = 0;
const CAM_PERSP = 1;

class Camera
{
	constructor(pos, front, type)
	{
		console.log(front)
		this.pos = pos.clone();
		this.type = type;
		
		this.front = front.clone();
		this.front.normalize();

		this.setup();
	}
	
	setup()
	{
		this.top = new Vector(0,-1,0);
		this.top.orthogonalize(this.front);
		this.top.normalize();
		this.side = this.front.clone();
		this.side.cross(this.top);
		this.side.normalize();
		
		this.basis = new Matrix([[this.side.x, 	this.side.y,   this.side.z],
								 [this.top.x,	this.top.y,    this.top.z],
								 [this.front.x,	this.front.y,  this.front.z]]);
								 
								 
	}
	
	draw(ctx)
	{
		let p1 = new Vector(100,100,100);
		let p2 = new Vector(200,100,100);
		let p3 = new Vector(200,200,100);
		let p4 = new Vector(100,200,100);
		let p5 = new Vector(100,200,200);
		let p6 = new Vector(200,200,200);
		let p7 = new Vector(200,100,200);
		let p8 = new Vector(100,100,200);
		
		let pivot = new Vector(150,150,150);
		
		let dots = [p1,p2,p3,p4,p5,p6,p7,p8];
		
		ctx.fillStyle = "white";
	
		dots.forEach(p=>
		{
			// p.sum(new Vector(-canvas.width/2, -canvas.height/2, 0)); 
			p.sum(pivot.multiply(-1));
			p = p.multiply(this.basis);
			p.sum(this.pos);
			ctx.fillRect(p.x, p.y, 10, 10);
			// console.log(p)
		});
	}
	
	move(npos)
	{
		this.pos = npos.clone();
		this.setup();
	}
	
}