import FlareComponent from 'flare-react';

export default class CharacterController extends FlareComponent.Controller
{
    constructor()
    {
        super();
        this._MusicWalk = null;
        this._Walk = null;
        this._Jump = null;
        this._Wave = null;
        this._WalkTime = 0;
    }
 
    initialize(artboard)
    {
        this._Wave = artboard.getAnimation("Wave");
        this._Jump = artboard.getAnimation("Jump");
        this._MusicWalk = artboard.getAnimation("Dance");
        this._Walk = artboard.getAnimation("Stand");
    }
 
    advance(artboard, elapsed)
    {
        // advance the walk time
        this._WalkTime += elapsed;
        const { _MusicWalk: musicWalk, _Walk: walk, _WalkTime: walkTime , _Jump:jump,_Wave:wave} = this;
        
        musicWalk.apply(walkTime % musicWalk.duration, artboard, 1.0);       
        wave.apply(walkTime % wave.duration, artboard, 1.0);  
        //musicWalk.apply(walkTime % jump.duration, artboard, 1.0);
        // mix the two animations together by applying one and then the other (note that order matters).
        walk.apply(walkTime % walk.duration, artboard, 1.0);
        // if you want to slowly disable the head bobbing (musicWalk animation) you could ramp down the 
        // final argument (the mix argument) to 0.0 over some time. For now we're mixing at full strength.
        console.log(walkTime)    
        if(walkTime>=10){
            return false;
        }
        // keep rendering
        return true;
    }
}