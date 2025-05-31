import { EventHandler } from 'cc';
import { _decorator, Component, director, EventTarget, find, Label, Node } from 'cc';
import { wordContorl } from './wordContorl';
const { ccclass, property } = _decorator;

@ccclass('questionNode')
export class questionNode extends Component {
    @property
    addNowIndex:number=0
    loadScene(){
        director.loadScene('海龟汤',()=>{
            find('Canvas/haiguitang/word').getComponent(wordContorl).nowIndex+=this.addNowIndex
        })
    }
}


