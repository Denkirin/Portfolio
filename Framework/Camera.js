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

		this.buffer = [];
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
								 
		let npos = this.pos.clone();
		let spos = this.pos.clone();
		let wpos = this.pos.clone();
		let epos = this.pos.clone();
		
		npos.sum(new Vector(0, -canvas.height / 2, 0));
		spos.sum(new Vector(0, canvas.height / 2, 0));
		wpos.sum(new Vector( -canvas.width / 2, 0, 0));
		epos.sum(new Vector( canvas.width / 2, 0, 0));
		
		this.nplane = new Plane(new Point(npos), this.top.multiply(-1));
		this.splane = new Plane(new Point(spos), this.top.multiply(1));
		this.wplane = new Plane(new Point(wpos), this.side.multiply(1));
		this.eplane = new Plane(new Point(epos), this.side.multiply(-1));
		

	}
	
	render(scene)
	{
		this.buffer = [];
		
		scene.bodies.forEach(b =>
		{
			b.dots.forEach(d =>
			{
				// let p = d.clone();
				// p.sum(new Vector(-canvas.width/2, -canvas.height/2, 0)); 
				// p.pos.sum(b.pivot.multiply(-1));
				// p.pos = p.pos.multiply(this.basis);
				// p.pos.sum(b.pivot);
				// p.pos.sum(this.pos.multiply(-1));
				// p.sum(this.side.multiply(canvas.width / 2));
				// p.sum(this.top.multiply(-canvas.height / 2));
				
				console.log(this.wplane.origin.pos,this.eplane.origin.pos)
		
				this.buffer.push(new Point(new Vector(d.planeDistance(this.eplane), d.planeDistance(this.splane),0)));
				// this.buffer.push(new Point(new Vector(d.planeDistance(this.eplane), d.planeDistance(this.splane),0)));
			});
		});
	}
	
	draw(ctx)
	{
		
		ctx.fillStyle = "white";
	
		this.buffer.forEach(p=>
		{
			ctx.fillRect(p.pos.x, p.pos.y, 10, 10);
		});
	}
	
	move(npos)
	{
		this.pos = npos.clone();
		this.setup();
		
		// this.pos.sum(this.side.multiply(-canvas.width / 2));
		// this.pos.sum(this.top.multiply(canvas.height / 2));
	}
	
	pointTo(target)
	{
		let tmp = this.pos.clone();
		tmp.sum(target.multiply(-1));
		
		this.front = tmp;
		this.front.normalize();
		
		// console.log(this.pos);
		this.setup();
	}
	
}