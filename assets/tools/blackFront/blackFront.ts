import { _decorator, Component, director, Enum, Node, SceneAsset } from 'cc';
const { ccclass, property } = _decorator;
enum blackFrontEvent{
    path,
    scene,
    NONE,
}
Enum(blackFrontEvent)
@ccclass('blackFront')
export class blackFront extends Component {
    @property({type:blackFrontEvent})
    blackFrontEvent:blackFrontEvent=blackFrontEvent.NONE
    @property({
        visible: function (this: blackFront) {
            return this.blackFrontEvent===blackFrontEvent.path
        },type:Node
    })
    path:Node=null!
    @property({
        visible: function (this: blackFront) {
            return this.blackFrontEvent===blackFrontEvent.scene
        },type:SceneAsset
    })
    scene:SceneAsset=null!
    start() {

    }
    destroySelf(){
        switch(this.blackFrontEvent){
            case blackFrontEvent.path:
                this.path.active=true
                break
            case blackFrontEvent.scene:
                director.loadScene(this.scene.name)
                break
        }
        this.node.parent.destroy()
    }
    update(deltaTime: number) {
        
    }
}


