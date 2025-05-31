import { find } from 'cc';
import { director } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { wordContorl } from './wordContorl';
const { ccclass, property } = _decorator;

@ccclass('changedScene')
export class changedScene extends Component {
    start() {

    }
    loadScene(){
        director.loadScene('海龟汤',()=>{
            find('Canvas/haiguitang/word').getComponent(wordContorl).nowIndex++
        })
    }
    update(deltaTime: number) {
        
    }
}


