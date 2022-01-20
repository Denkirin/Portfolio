
import {Animation} from './animation.js';

export class ParalaxScene 
{
	constructor(_bgPath, _canvas, _framesX, _framesY, _frameWidth, _frameHeihgt, _scale, _animDelay)
	{
		this.loaded = false;
		this.canvas =  _canvas;
		this.ctx = this.canvas.getContext('2d');
		this.animation = new Animation(_bgPath, _framesX, _framesY, _frameWidth, _frameHeihgt, 0, 0, _scale, this.canvas, _animDelay);
		this.camPos = 0;
		this.lbound = -_scale*_frameWidth + window.innerWidth;
		this.rbound = 0;
	}

	move(dir)
	{	
		if (this.lbound <= this.camPos - dir && this.camPos - dir < this.rbound){ 
			this.camPos -= dir;
			return (true);
		}
		return (false);
	}
	
	update()
	{
		this.animation.step();
		this.animation.x = this.camPos;
	}
	
	render()
	{
		this.animation.render();
	}
}
