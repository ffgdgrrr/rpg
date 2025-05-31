import { Vec3 } from 'cc';
import { UITransform } from 'cc';
import { v3 } from 'cc';
import { tween } from 'cc';
import { _decorator } from 'cc';
import { interaction } from '../../interaction/interaction';
const { ccclass, property } = _decorator;

@ccclass('caidanText')
export class caidanText extends interaction {
    @property
    arhName:string=''
    @property
    alert:string=''
    startPos:Vec3=v3(0,-384)
    endPos:Vec3;
    start() {
        this.node.setPosition(this.startPos)
        this.endPos=v3(0,this.node.getComponent(UITransform).height+Math.abs(this.startPos.y))
        tween(this.node)
        .to(this.node.getComponent(UITransform).height/50,{position:this.endPos})
        .call(()=>{
            this.interactionContactFunction()
        })
        .start()
    }
    interactionContactFunction(): void {
        super.interactionContactFunction()
        if(this.alert!=''){
            alert(this.alert)
        }
        if(this.arhName!=''){
            //ElectronAPI.unlockAch(this.arhName)
        }
        
    }
    update(deltaTime: number) {
        
    }
}


