class Point
{
	constructor(pos)
	{
		this.pos = pos.clone();
	}
	
	lineDistance(l)
	{
		
	}
	
	planeDistance(p)
	{
		let q = this.pos.clone();
		
		q.sum(p.origin.pos.multiply(-1));
		
		return(p.normal.multiply(q));
	}
	
	clone()
	{
		return(new Point(this.pos.clone()));
	}
}

class Line
{
	constructor(pos, dir)
	{	
		this.dir = dir;
		this.pos = pos;
		
	}
}

class Plane
{
	constructor(origin, normal)
	{
		this.origin = origin.clone();
		this.normal = normal.clone();
		this.off = origin.pos.multiply(normal);
	}
}