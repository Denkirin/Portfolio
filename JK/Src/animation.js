export class Animation
{
	constructor(_path, _framesX, _framesY, _frameWidth, _frameHeihgt, _posX, _posY, _scale, _canvas, _delay)
	{
		this.framesX = _framesX;
		this.framesY = _framesY;
		
		this.frameWidth = _frameWidth;
		this.frameHeight = _frameHeihgt;
		
		this.x = _posX;
		this.y = _posY;
		
		this.scale = _scale;
		
		this.canvas = _canvas;
		this.ctx = this.canvas.getContext('2d');
		
		this.img = new Image();
		
		this.img.onload = function() { };
		this.img.src = _path;
		
		this.frameCounter = 0;
		this.offsetX = 0;
		this.offsetY = 0;
		
		this.delayRatio = _delay;
		this.delayCount = 0;
		
		this.ctx.imageSmoothingEnabled = false;
		
	}
	
	flush()
	{
		this.frameCounter = 0;
		this.offsetX = 0;
		this.offsetY = 0;
	}
	
	step()
	{
		if(this.delayCount == this.delayRatio)
		{
			this.frameCounter = (this.frameCounter + 1) % (this.framesX * this.framesY)
			
			this.offsetX = (this.frameCounter % this.framesX) * this.frameWidth;
			this.offsetY = Math.floor(this.frameCounter / this.framesX) * this.frameHeight;
			
			this.delayCount = 0;
		}
		else
		{
			this.delayCount ++;
		}
		
		return(this.frameCounter == this.framesX*this.framesY -1);
	}
	
	render()
	{
		this.ctx.drawImage(this.img, this.offsetX, this.offsetY, this.frameWidth, this.frameHeight, this.x, this.y, Math.floor(this.frameWidth * this.scale), Math.floor(this.frameHeight * this.scale));
	}
	
}