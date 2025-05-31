import { _decorator, Component, Node, VideoPlayer } from 'cc';
import { interaction } from '../tools/interaction/interaction';
const { ccclass, property } = _decorator;

@ccclass('videoPlayerContorl')
export class videoPlayerContorl extends interaction{
    @property(VideoPlayer)
    vpc:VideoPlayer=null!
    start() {
        this.node.on(Node.EventType.TOUCH_START,()=>{
            if(this.vpc.isPlaying==false){
                this.vpc.play()
            }
        })
        this.node.on(VideoPlayer.EventType.COMPLETED,()=>{
           
                this.interactionContactFunction()
                this.node.destroy()
        
            
        })
        
    }

    update(deltaTime: number) {
        
    }
}


