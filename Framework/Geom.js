
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
	constructor(pos, dir)
	{
		this.pos = pos;
		this.dir = dir;
		this.off = pos.dot(dir);
	}
}