import { _decorator, Component, Node } from 'cc';
import { interaction, interactionEvent } from '../interaction/interaction';
import { director } from 'cc';
import { SceneAsset } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('SceneList')
class SceneList {
    @property(SceneAsset)
FrontScene: SceneAsset = null!;
@property(SceneAsset)
LoadScene: SceneAsset = null!;
}


@ccclass('connectScene')
export class connectScene extends interaction{
    @property(SceneAsset)
    deafultScene:SceneAsset=null!
    @property([SceneList])
    connectScene: SceneList[] = [];
    start() {

    }
    
    interactionContactFunction(): void {
        
        const FrontScene=sys.localStorage.getItem('FrontScene')
        console.log('FrontScene',FrontScene)
        let isFind:boolean=false
        this.connectScene.forEach(element=>{
            if(element.FrontScene.name==FrontScene){
                director.loadScene(element.LoadScene.name)
                isFind=true
            }
        })
        if(isFind==false){
            director.loadScene(this.deafultScene.name)
        }
        if(this.isEmitFrontScene==true){
            sys.localStorage.setItem('FrontScene',director.getScene().name)
        }
    }
    update(deltaTime: number) {
        
    }
}


