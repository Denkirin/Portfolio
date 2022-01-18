import * as utils from '../utils.js'

export 	function Constructor(x,y,z,dx,dz){
	const obj = {};
	
	obj.height = y;
	
	obj.pos = utils.Vector2(x,z);
	
	obj.dir = utils.Vector2(dx,dz);
	
	obj.speed = 0;
	
	obj.WallBounce = function(wallNormal){
		let deb = obj.dir.Angle(wallNormal) * 180/Math.PI
		let deg = obj.dir.Neg().Angle(wallNormal)
		
		if (wallNormal.y == 0){
			deg = Math.sign(obj.dir.y) * Math.sign(wallNormal.x) * 2 * deg
		}else{
			deg = -Math.sign(obj.dir.x) * Math.sign(wallNormal.y) * 2 * deg
		}
		
		obj.dir = obj.dir.Neg().Rotate(deg).Normalize();

	}
	
	obj.DiskBounce = function(diskNormal){
		
		obj.dir = diskNormal;

	}
	
	obj.Start = function(){
		obj.speed = 0.01;
		obj.dir = obj.dir.Randomize();
	}
	
	obj.Update = function(delta){
		obj.pos = obj.pos.Sum(obj.dir.Scale(obj.speed));
	}
	
	return(obj);
}