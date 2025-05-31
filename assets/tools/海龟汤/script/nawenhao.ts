import { _decorator, Collider2D, Component, Contact2DType, EventKeyboard, input, Input, KeyCode, Node, tween, v2, v3, Vec2 } from 'cc';
import { questionNode } from './questionNode';
import { interaction } from '../../interaction/interaction';
const { ccclass, property } = _decorator;

@ccclass('nawenhao')
export class nawenhao extends Component {
    @property(Node)
    checkNode:Node=null!;
    @property(Node)
    question:Node=null!;
    eat: boolean=false
    @property(Node)
    questionNodeParent:Node=null;
    protected start(): void {
        let collider = this.node.children[0].getComponent(Collider2D);
        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
            }
    }
    isMove: boolean=false
    onLoad () {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    onBeginContact (selfCollider: Collider2D, otherCollider: Collider2D) {
        

    }
    onEndContact (selfCollider: Collider2D, otherCollider: Collider2D) {
        

    }
    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case KeyCode.KEY_A:
                console.log('Press a key');
                this.moveBy(v2(-128))
                this.node.angle=90
                break
            case KeyCode.KEY_D:
                this.moveBy(v2(128))
                this.node.angle=-90
                break
            case KeyCode.KEY_W:
                this.moveBy(v2(0,128))
                this.node.angle=0
                break
            case KeyCode.KEY_S:
                this.moveBy(v2(0,-128))
                this.node.angle=-180
                break
            case KeyCode.KEY_Z:
                if(this.eat==false){
                    this.eatQuestion()
                }else if(this.eat==true){
                    this.sendTheQuestion()
                }
                
                break
        }
    }
    moveBy(vector2:Vec2){
        if(this.isMove==false){
        this.isMove=true
        tween(this.node)
        .by(0.3,{position:v3(vector2.x,vector2.y)})
        .call(()=>{
            this.isMove=false;
        })
        .start()
        if(this.eat==true){
            tween(this.question)
            .by(0.3,{position:v3(vector2.x,vector2.y)})
            .start()
        }
        
    }
    }
    eatQuestion(){
        console.log(this.checkNode.worldPosition,this.question.worldPosition)
        if(this.checkNode.worldPosition.x==this.question.worldPosition.x&&Math.floor(this.checkNode.worldPosition.y)==Math.floor(this.question.worldPosition.y)){
            this.question.position=this.node.position
            this.eat=true
        }
    }
    sendTheQuestion(){
        for(let i=0;i<this.questionNodeParent.children.length;i++){
            if(this.question.position.x==this.questionNodeParent.children[i].position.x){
                if(this.node.angle==0&&this.question.position.y<this.questionNodeParent.children[i].position.y){
                    tween(this.question)
                    .to(0.5,{position:this.questionNodeParent.children[i].position})
                    .delay(0.5)
                    .call(()=>{
                        this.questionNodeParent.children[i].getComponent(interaction).interactionContactFunction()
                   
                    })
                    .start()
                    this.eat=false
                    break
                }
                if(this.node.angle==-180&&this.question.position.y>this.questionNodeParent.children[i].position.y){
                    tween(this.question)
                    .to(0.5,{position:this.questionNodeParent.children[i].position})
                    .delay(0.5)
                    .call(()=>{
                        this.questionNodeParent.children[i].getComponent(interaction).interactionContactFunction()
                    })
                    .start()
                    this.eat=false
                    break
                }
            }
            if(this.question.position.y==this.questionNodeParent.children[i].position.y){
                if(this.node.angle==-90&&this.question.position.x<this.questionNodeParent.children[i].position.x){
                    tween(this.question)
                    .to(0.5,{position:this.questionNodeParent.children[i].position})
                    .delay(0.5)
                    .call(()=>{
                        this.questionNodeParent.children[i].getComponent(interaction).interactionContactFunction()
                   
                    })
                    .start()
                    this.eat=false
                    break
                }
                if(this.node.angle==90&&this.question.position.x>this.questionNodeParent.children[i].position.x){
                    tween(this.question)
                    .to(0.5,{position:this.questionNodeParent.children[i].position})
                    .delay(0.5)
                    .call(()=>{
                        this.questionNodeParent.children[i].getComponent(interaction).interactionContactFunction()
                    })
                    .start()
                    this.eat=false
                    break
                }
            }
        }
        
    }
    
}


