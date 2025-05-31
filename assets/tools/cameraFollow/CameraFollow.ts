import { _decorator, Component, Node, UITransform, find, tween, Vec3, EventMouse, quat, v2, v3, Vec2, Enum } from 'cc';
const { ccclass, property } = _decorator;
enum xy{
    Xposition,
    Yposition,
    XYposition,
}
Enum(xy)
@ccclass('CameraFollow')
export class CameraFollow extends Component {
    @property({type:xy})
    followPosType:xy=xy.XYposition
    @property
    onLoadShake:boolean=false
    @property(UITransform)
    Canvas:UITransform=null!
    //跟随到这个节点的x轴边界为止，要求是此节点的x轴为0
    @property(UITransform)
    blackBoard:UITransform=null!
    //摄像机要跟随的节点
    @property(Node)
    FollowNode:Node=null!
    followPos:number;
    isShake: boolean=false
    followPosY: number;
    onLoad(){
        this.followPos=-this.blackBoard.width/2+this.Canvas.width/2+this.blackBoard.node.getPosition().x
        this.followPosY=-this.blackBoard.height/2+this.Canvas.height/2
    }
    start() {
        if(this.onLoadShake==true){
            this.shake()
        }
    }

    update(deltaTime: number) {
        //console.log([this.followPos,this.FollowNode.position.x])
        if(this.isShake==false&&this.blackBoard!=null!&&this.FollowNode){
            if(this.FollowNode.position.x>this.followPos&&this.FollowNode.position.x<(-this.followPos)){
                if(this.followPosType==xy.Xposition||this.followPosType==xy.XYposition){
                    this.node.setPosition(this.FollowNode.position.x,this.node.position.y,this.node.position.z)
                }
            
            }
            if(this.FollowNode.position.y>this.followPosY&&this.FollowNode.position.y<(-this.followPosY)){
                if(this.followPosType==xy.Yposition||this.followPosType==xy.XYposition){
                this.node.setPosition(this.node.position.x,this.FollowNode.position.y,this.node.position.z)
            }
        }
        }else{this.node.setPosition(this.FollowNode.position.x,this.FollowNode.position.y,this.node.position.z)

        }
        
    }
    shake(){
        this.isShake=true
        this.scheduleOnce(()=>{
            this.isShake=false
        },0.1)
        tween(this.node)
        .by(0.05,{position:new Vec3(-5,5)})
        .by(0.05,{position:new Vec3(5,-5)})
        .start()
    }
    CameraShake(duration: number, strength: number) {
        // 相机抖动的动画效果
        const sequence = tween(this.node)
            .by(0.05, { position: new Vec3(strength, 0, 0) })
            .by(0.05, { position: new Vec3(-strength, 0, 0) })
            .by(0.05, { position: new Vec3(0, strength, 0) })
            .by(0.05, { position: new Vec3(0, -strength, 0) })
            sequence.start()
            .repeat(duration,sequence);

    }
}

