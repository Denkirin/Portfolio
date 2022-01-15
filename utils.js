export function Vector2(x,y){
	const obj = {};
	
	obj.x = x;
	obj.y = y;
	
	obj.ProjX = function(){
		return(Vector2(x,0));
	}
	obj.ProjY = function(){
		return(Vector2(0,y));
	}
	obj.Scale = function(s){
		return(Vector2(obj.x * s, obj.y * s));
	}
	obj.Sum = function(other){
		return(Vector2(other.x + obj.x, other.y + obj.y))
	}
	obj.Sub = function(other){
		return(Vector2(other.x - obj.x, other.y - obj.y))
	}
	obj.Magnitude = function(){
		return(Math.sqrt(x*x + y*y));
	}
	obj.Normalize = function(){
		let m = obj.Magnitude();
		return(Vector2(obj.x/m,obj.y/m));
	}
	obj.Randomize = function(){
		let ret = Vector2(Math.random(),Math.random());
		return(ret.Normalize());
	}
	obj.DotProduct = function(other){
		return(obj.x * other.x + obj.y * other.y);
	}
	obj.Neg = function(){
		return(Vector2(-obj.x,-obj.y));
	}
	obj.Rotate = function(deg){
		return(Vector2(obj.x * Math.cos(deg) - y * Math.sin(deg), obj.x * Math.sin(deg) + obj.y * Math.cos(deg)));
	}
	obj.Angle = function(other){
		return(Math.acos(obj.DotProduct(other)/(obj.Magnitude() * other.Magnitude())));
	}
	obj.OrthoX = function(){
		return(Vector2(-obj.y, obj.x);
	}
	obj.OrthoY = function(other){
		return(Vector2(obj.y, -obj.x);
	}
	
	return(obj);
}

export function Clamp(val, min, max){
	if (val>max){
		return(max);
	}else if (val < min){
		return(min);
	}else{
		return(val);
	}
}