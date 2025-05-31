import { instantiate } from 'cc';
import { Label } from 'cc';
import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { word } from './word';
import { scoreBoard } from './scoreBoard';
const { ccclass, property } = _decorator;
export enum wordDirctory{
    知错,
    文风,
    情感,
}
class wordLabel{
    text:string
    property:wordDirctory
    value:number
    constructor(property:wordDirctory,value:number){

        this.property=property
        this.value=value
    }
}
const wordLabelDirctory={
    老师对不起:new wordLabel(wordDirctory.知错,1),
    我知道错了:new wordLabel(wordDirctory.知错,1),
    我的行为有辱老师:new wordLabel(wordDirctory.知错,2),
    请您原谅我吧:new wordLabel(wordDirctory.情感,2),
    鲁迅说过:new wordLabel(wordDirctory.文风,2),
    共青团说过:new wordLabel(wordDirctory.文风,1),
    我想要上学:new wordLabel(wordDirctory.情感,1),
    垃圾贵屿中学:new wordLabel(wordDirctory.情感,-5),
    中国教育制度有问题:new wordLabel(wordDirctory.知错,-5),
    他妈的:new wordLabel(wordDirctory.文风,-5),
}
@ccclass('instantiateWord')
export class instantiateWord extends Component {
    @property(scoreBoard)
    scoreBoard:scoreBoard=null!
    @property(Prefab)
    word:Prefab=null!
    start() {
        this.instantiateWord()
    }
    instantiateWord(){
        this.node.destroyAllChildren()
        const shuffledKeys = Object.keys(wordLabelDirctory).sort(() => 0.5 - Math.random());
        const selectedKeys = shuffledKeys.slice(0, Object.keys(wordLabelDirctory).length);
        for(let i=0; i<selectedKeys.length; i++){ // 使用selectedKeys.length进行循环
            let wordNode=instantiate(this.word)
            const randomKey = selectedKeys[i];
            const randomValue:wordLabel = wordLabelDirctory[randomKey];
            wordNode.getComponent(Label).string=randomKey
            let wordScript=wordNode.getComponent(word)
            wordScript.property=randomValue.property
            wordScript.value=randomValue.value
            wordNode.setParent(this.node)
        }
    }
    changeScore(Dirctory:wordDirctory,value:number){
        this.scoreBoard.changeScore(Dirctory,value)
        this.instantiateWord()
    }
    update(deltaTime: number) {
        
    }
}


