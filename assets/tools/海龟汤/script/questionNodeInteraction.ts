import { Enum } from 'cc';
import { SceneAsset } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { instantiate } from 'cc';
import { director } from 'cc';
import { dialog_galgame } from '../../dialog/typeScript/dialog_galgame';
import { interaction, interactionEvent } from '../../interaction/interaction';
const { ccclass, property } = _decorator;
@ccclass('questionNodeInteraction')
export class questionNodeInteraction extends interaction{
    @property(SceneAsset)
    scene:SceneAsset=null!
    start() {

    }
    interactionContactFunction(){
        for(let i=0;i<this.eventHandler.length;i++){
            this.eventHandler[i].emit([])
        }
        director.loadScene(this.scene.name,(err,res)=>{
            switch(this.interactionEvent){
                case interactionEvent.animation:
                    this.animation.play(this.animationClip.name)
                    break
                case interactionEvent.path:
                    if(this.isMezi==false){
                        
                        if(this.isDialog==true){
                            this.dialogPath[this.dialogIndex].getComponent(dialog_galgame).Restart()
                            this.dialogPath[this.dialogIndex].active=true
                            if(this.dialogPath.length > this.dialogIndex+1){
                                this.dialogIndex++
                            }
                            console.log('dp'+this.dialogIndex)
                        }else{
                            if(this.path.active==false){
                                this.path.active=true
                            }else if(this.path.active==true){
                                this.path.active=false
                            }
                            
                        }
                    }else if(this.isMezi==true){
                        this.path.destroy()
                    }
                    break
                case interactionEvent.prefab:
                    let prefab=instantiate(this.instantiateNode)
                    prefab.setParent(this.instantiateParent)
                    prefab.setPosition(0,0,0)
                    
                    
                    break
            }
        })
        
    }
    update(deltaTime: number) {
        
    }
}


