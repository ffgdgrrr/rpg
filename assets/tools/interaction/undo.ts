import { _decorator, Component, Node } from 'cc';
import { EventKeyboard } from 'cc';
import { interaction } from './interaction';
const { ccclass, property } = _decorator;

@ccclass('undo')
export class undo extends interaction {

    start() {

    }

    update(deltaTime: number) {
    }
    onKeyDown (event: EventKeyboard) {
        console.log('drag666')
        switch(event.keyCode) {
            case parseInt(sys.localStorage.getItem('next')):
                for(let i=0;i<this.eventHandler.length;i++){
                    this.eventHandler[i].emit([])
                }
                this.interactionContactFunction()
                break;
        }
    }
}


