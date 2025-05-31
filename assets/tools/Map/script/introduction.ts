import { Sprite } from 'cc';
import { Button } from 'cc';
import { SceneAsset } from 'cc';
import { director } from 'cc';
import { RichText } from 'cc';
import { Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('introduction')
export class introduction extends Component {
    @property(SceneAsset)
    scene:SceneAsset=null!
    @property(Label)
    sceneName:Label=null!
    @property(Sprite)
    picture:Sprite=null!
    @property(RichText)
    introduction:RichText=null!
    start() {
        this.node.children[3].children[0].on(Button.EventType.CLICK,()=>{
            director.loadScene(this.scene.name)
        })
        this.node.children[3].children[1].on(Button.EventType.CLICK,()=>{
            this.node.destroy()
        })
    }

    update(deltaTime: number) {
        
    }
}


