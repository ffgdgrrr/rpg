import { EventTouch } from 'cc';
import { Prefab } from 'cc';
import { instantiate } from 'cc';
import { resources } from 'cc';
import { EventMouse } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { introduction } from './introduction';
import { Label } from 'cc';
import { SpriteFrame } from 'cc';
import { SceneAsset } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('area')
export class area extends Component {
    @property(SceneAsset)
    scene:SceneAsset=null;
    @property(SpriteFrame)
    pircture:SpriteFrame=null!;
    @property
    introduction:string=''
    start() {
        this.node.on(Node.EventType.MOUSE_MOVE,(event:EventMouse)=>{
            this.node.children[0].active=true
        },this)
        this.node.on(Node.EventType.MOUSE_LEAVE,(event:EventMouse)=>{
            this.node.children[0].active=false
        },this)
        this.node.on(Node.EventType.TOUCH_START,(event:EventTouch)=>{
            resources.load('map/介绍',Prefab,(err,res)=>{
                let prefab=instantiate(res)
                prefab.setParent(this.node.parent)
                let introductionScript=prefab.getComponent(introduction)
                introductionScript.scene=this.scene
                introductionScript.sceneName.string=this.node.children[0].getComponent(Label).string
                introductionScript.picture.spriteFrame=this.pircture
                introductionScript.introduction.string=this.introduction
                console.log(prefab.name)
            })
        },this)
    }

    update(deltaTime: number) {
        
    }
}


