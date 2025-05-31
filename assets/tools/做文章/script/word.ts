import { _decorator, Component, Node } from 'cc';
import { instantiateWord, wordDirctory } from './instantiateWord'
import { find } from 'cc';
import { scoreBoard } from './scoreBoard';
import { wordLength } from './wordLength';
const { ccclass, property } = _decorator;

@ccclass('word')
export class word extends Component {
    property:wordDirctory;
    value:number;
    start() {
        this.node.on(Node.EventType.TOUCH_START,()=>{
            if(find('Canvas/scoreBoard').getComponent(scoreBoard).canPress==true&&find('Canvas/wordLength').getComponent(wordLength).wordLength<800){
                this.node.parent.getComponent(instantiateWord).changeScore(this.property,this.value)
            }
                
            
        })
    }
    update(deltaTime: number) {
        
    }
}


