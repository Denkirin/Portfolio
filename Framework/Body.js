class Body
{
	constructor()
	{
		let p1 = new Point(new Vector(0,0,0));
		let p2 = new Point(new Vector(200,100,100));
		let p3 = new Point(new Vector(200,200,100));
		let p4 = new Point(new Vector(100,200,100));
		let p5 = new Point(new Vector(100,200,200));
		let p6 = new Point(new Vector(200,200,200));
		let p7 = new Point(new Vector(200,100,200));
		let p8 = new Point(new Vector(100,100,200));
		
		this.pivot = new Vector(0,0,0);
		
		this.dots = [p1]//,p2,p3,p4,p5,p6,p7,p8];
	}
}