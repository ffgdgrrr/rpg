import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('tangmian')
export class tangmian extends Component {
    caseFunc:Function;
    startPos:number
    endPos:number
    tag:string
    start() {
        
    }
    caseFunction(){
        this.caseFunc()
    }
    update(deltaTime: number) {
        
    }
}


