const CAM_ORTHO = 0;
const CAM_PERSP = 1;

class Camera
{
	constructor(pos, front, type)
	{
		console.log(front)
		this.pos = pos;
		this.type = type;
		
		this.front = front.clone();
		this.top = new Vector(0,1,0);
		this.top.orthogonalize(front);
		this.side = front.clone();
		this.side.cross(this.top);
		
		console.log(this.front)
		console.log(this.top)
		console.log(this.side)
		
		this.basis = new Matrix([[this.front.x, this.front.y, this.front.z],
								 [this.top.x,	this.top.y,	  this.top.z],
								 [this.side.x,	this.side.y,  this.side.z]]);
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
		
		let dots = [p1,p2,p3,p4,p5,p6,p7,p8];
		
		ctx.fillStyle = "white";
	
		dots.forEach(p=>
		{
			p.sum(this.pos.multiply(-1));
			p = p.multiply(this.basis);
			ctx.fillRect(canvas.width / 2 + p.x, canvas.height / 2 + p.y, 10, 10);
		});
	}
	
}