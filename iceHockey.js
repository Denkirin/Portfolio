import * as utils from './utils.js'
import * as Disk from './disk.js'
import * as Player from './oponent.js'


export function Constructor(x, y, z, sx, sy, sz){
	const obj = {};
	
	obj.lowXbound = x-sx/2;
	obj.lowYbound = z-sz/2;
	obj.uppXbound = x+sx/2;
	obj.uppYbound = z+sz/2;
	
	obj.x = x;
	obj.y = y;
	obj.z = z;
	
	obj.bouncingX = false;
	obj.bouncingY = false;
	obj.bouncingD = false;
	
	obj.playerDir = 0;
	obj.ratio = 1;
	
	obj.sx = sx;
	obj.sy = sy;
	obj.sz = sz;
	
	obj.normalX = utils.Vector2(1,0);
	obj.normalY = utils.Vector2(0,1);
	
	obj.disk = Disk.Constructor(x,y,z,0,1);
	obj.oponent = Player.Constructor(x,y,obj.uppYbound-0.15);
	obj.player = Player.Constructor(x,y,obj.lowYbound + 0.15);
	
	obj.Point = function(){
		obj.disk.speed = 0.001;
		obj.disk.pos.y = obj.z;
		obj.disk.pos.x = obj.uppXbound - 0.1;
		// obj.dir = obj.disk.dir.Randomize();
		obj.disk.dir = utils.Vector2(0,-1);
	}
	
	obj.MovePlayer = function(dir){
		obj.playerDir = dir;
	}
	
	obj.StopPlayer = function(dir){
		if(obj.playerDir == dir){
			obj.playerDir = 0;
		}
	}
	
	obj.Start = function(){
		obj.disk.Start();
	}
	
	obj.Update = function(delta)
	{
		if (!obj.bouncingX && obj.uppXbound-0.05 - obj.disk.speed <= obj.disk.pos.x){
			obj.disk.WallBounce(obj.normalX.Neg());
			obj.disk.Update(1);
			// obj.disk.pos.x = obj.uppXbound-0.05;
			// obj.bouncingX = true;
		}else if(!obj.bouncingX && obj.disk.pos.x-0.05 - obj.disk.speed <= obj.lowXbound){
			obj.disk.WallBounce(obj.normalX);
			obj.disk.Update(1);
			// obj.disk.pos.x = obj.lowXbound+0.05; // rebota en la direcció de la normal (MALAMENT)
			// obj.bouncingX = true;
		}else if(!obj.bouncingY && obj.uppYbound-0.05 - obj.disk.speed<= obj.disk.pos.y){
			// obj.disk.WallBounce(obj.normalY.Neg());
			// obj.disk.pos.y = obj.uppYbound-0.05;
			// obj.bouncingY = true;
			obj.Point();
		}else if(!obj.bouncingY && obj.disk.pos.y-0.05 - obj.disk.speed <= obj.lowYbound){
			// obj.disk.WallBounce(obj.normalY);
			// obj.disk.pos.y = obj.lowYbound+0.05;
			// obj.bouncingY = true;
			obj.Point();
		}else if(!obj.bouncingD && utils.Vector2(obj.oponent.x,obj.oponent.z).Sub(obj.disk.pos).Magnitude()<0.1+obj.disk.speed){
			obj.disk.DiskBounce(utils.Vector2(obj.oponent.x,obj.oponent.z).Sub(obj.disk.pos).Normalize());
			obj.disk.Update(1);
			// obj.bouncingD = true;
		}else if(!obj.bouncingD && utils.Vector2(obj.player.x,obj.player.z).Sub(obj.disk.pos).Magnitude()<0.1+obj.disk.speed){
			obj.disk.DiskBounce(utils.Vector2(obj.player.x,obj.player.z).Sub(obj.disk.pos).Normalize());
			obj.disk.Update(1);
			// obj.bouncingD = true;
		}
		
		if (utils.Vector2(obj.player.x,obj.player.z).Sub(obj.disk.pos).Magnitude()>0.1+obj.disk.speed &&
				  utils.Vector2(obj.oponent.x,obj.oponent.z).Sub(obj.disk.pos).Magnitude()>0.1+obj.disk.speed){
			obj.bouncingD = false;
					  
		}
		if (obj.disk.pos.x-0.05 - obj.disk.speed > obj.lowXbound &&
				  obj.uppXbound -0.05 - obj.disk.speed > obj.disk.pos.x){
			obj.bouncingX = false;
			  
		}
		if (obj.disk.pos.y-0.05 - obj.disk.speed > obj.lowYbound &&
				  obj.uppYbound -0.05 - obj.disk.speed > obj.disk.pos.y){
			obj.bouncingY = false;
		}
		
		obj.ratio = 1 - utils.Clamp(2*Math.abs(obj.oponent.z - obj.disk.pos.y)/Math.abs(obj.oponent.z - obj.lowYbound),0.1+obj.disk.speed,1-obj.disk.speed)
		
		obj.oponent.x = obj.ratio*obj.disk.pos.x + (1-obj.ratio)*obj.oponent.x;

		if (
			obj.player.x + obj.playerDir*0.02 - 0.05 > obj.lowXbound && 
			obj.player.x + obj.playerDir*0.02 + 0.05 < obj.uppXbound ||
			obj.disk.pos.y < obj.player.z + 0.1 &&
			obj.player.x + obj.PlayerDir*0.02 - 0.15 > obj.lowXbound &&
			obj.player.y + onj.playerDir*0.02 + 0.15 < obj.uppXbound
		){
			obj.player.x += obj.playerDir*0.02;
		}
		
		obj.disk.speed = Math.min(obj.disk.speed + 0.0001, 0.05)

		
		obj.disk.Update(delta);
		
	}
	
	return(obj);
}