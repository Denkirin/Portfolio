
import {Animation} from './animation.js';

export class Entity 
{
	constructor(_animations)
	{
		this.animations = _animations;
		this.lastIdx = 0;
		this.currIdx = 0;
		this.repCount = 0;
		this.repLimit = 0;
		this.state = 0;
	}
	
	

	changeAnimation(idx, repeat){
		if (idx != this.currIdx){
			this.animations[idx].flush();
			this.lastIdx = this.currIdx;
			this.currIdx = idx;
			this.repCount = 0;
			this.repLimit = repeat;
		}
	}
	
	
	update()
	{
		if (this.repCount == this.repLimit && this.repLimit > 0){
			this.currIdx = this.lastIdx;
			this.repLimit = -1;
			this.repCount = 0;
			this.state = 0;
		}
		
		if (this.animations[this.currIdx].step()){
			this.repCount ++;
		}
		
	}
	
	render()
	{
		this.animations[this.currIdx].render();
	}
}
