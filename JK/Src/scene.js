
import Animation from './animation.js';

export class ParalaxScene 
{
	constructor(_bgPath, _canvas, _framesX, _framesY, _frameWidth, _frameHeihgt, _scale, _animDelay)
	{
		this.loaded = false;
		this.canvas =  _canvas;
		this.ctx = this.canvas.getContext('2d');
		this.animation = new Animation(_bgPath, _framesX, _framesY, _frameWidth, _frameHeihgt, 0, 0, _scale, this.canvas, _animDelay);
		
	}


	
	update()
	{
		this.animation.step();
	}
	
	render()
	{
		this.animation.render();
	}
}
