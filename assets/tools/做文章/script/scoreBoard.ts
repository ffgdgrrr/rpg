import { _decorator, Component, Node ,EventTarget} from 'cc';
import { wordDirctory } from './instantiateWord';
import { Animation } from 'cc';
import { Label } from 'cc';
import { tween } from 'cc';
import { v3 } from 'cc';
import { wordLength } from './wordLength';
const { ccclass, property } = _decorator;
export const eventTarget=new EventTarget()
@ccclass('scoreBoard')
export class scoreBoard extends Component {
    @property(wordLength)
    wordLength:wordLength=null!
    canPress=true

    start() {
        eventTarget.emit('canPress',this.canPress)
    }
    changeScore(Dirctory:wordDirctory,value:number){
        this.canPress=false
        let child=this.node.children[Dirctory]
        tween(child)
        .to(0.5,{position:v3(child.position.x,child.position.y+50)})
        .to(0.5,{position:v3(child.position.x,child.position.y)})
        .call(()=>{
            this.canPress=true
            console.log('drag666')
        })
        .start()
        child.children[0].getComponent(Label).string=String(parseInt(child.children[0].getComponent(Label).string)+value)
        this.wordLength.addWord(100)
    }
    update(deltaTime: number) {
        
    }
}


