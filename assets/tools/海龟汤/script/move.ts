import { _decorator, Component, EventKeyboard, find, input, Input, KeyCode, Node, tween, v2, v3, Vec2 } from 'cc';
import { tangmian } from './tangmian';
import { Label } from 'cc';
import { color } from 'cc';
import { Animation } from 'cc';
import { Vec3 } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('move')
export class move extends Component {
    distance:Vec2=v2(0,0)
    @property(Node)
    tangmian:Node=null!;
    isMove: boolean=false
    word:Node;
    event:Map<string,[number,number]>;
    private moveDistance: number = 40; // 移动距离

    private moveDirection: Vec3 = v3(0, 0, 0); // 移动方向

    onLoad() {
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
                this.moveDirection = v3(-1,0);
                break;
            case KeyCode.KEY_D:
                this.moveDirection=v3(1,0);
                break;
            case KeyCode.KEY_W:
                this.moveDirection=v3(0,1);
                break;
            case KeyCode.KEY_S:
                this.moveDirection=v3(0,-1);
                break;
            case KeyCode.KEY_Z:
                this.checkPosIsWord()
                this.enterWord()
                break
        }
        if(this.isMove==false){
            this.movePlayer();
        }
        
    }

    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case KeyCode.KEY_A:
            case KeyCode.KEY_D:
                this.moveDirection.x = 0;
                break;
            case KeyCode.KEY_W:
            case KeyCode.KEY_S:
                this.moveDirection.y = 0;
                break;
        }
    }

    movePlayer() {
        tween(this.node)
        .call(()=>{
            this.isMove=true
        })
            .by(0.2, { position: v3(this.moveDirection.x*this.moveDistance,this.moveDirection.y*this.moveDistance) })
            .call(() => {
                this.isMove=false
                if (this.moveDirection.x !== 0 || this.moveDirection.y !== 0) {
                    setTimeout(() => {
                       this.movePlayer() 
                    }, 0); 
                    console.log('666')
                }
            })
            .start();
    }
    enterWord(){
        let tangmianScript=this.word.getComponent(tangmian)
        for(let i=0;i<this.tangmian.children.length;i++){
            if(i>=tangmianScript.startPos&&i<tangmianScript.endPos){
                this.tangmian.children[i].getComponent(Animation).play()
            }
        }
        
    }
    checkPosIsWord(){
        for(let i=0;i<this.tangmian.children.length;i++){
            console.log(this.node.worldPosition,this.tangmian.children[i].worldPosition,'对比')
            if(this.tangmian.children[i].worldPosition.x==this.node.worldPosition.x&&Math.floor(this.tangmian.children[i].worldPosition.y)==Math.floor(this.node.worldPosition.y)){
                console.log("是这个字"+this.tangmian.children[i].name)
                this.word=this.tangmian.children[i]
                
            }
        }
    }
}

