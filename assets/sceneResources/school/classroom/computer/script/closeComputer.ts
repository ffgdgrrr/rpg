import { _decorator, Animation, Component, Node } from 'cc';
import { interaction } from '../../../../../tools/interaction/interaction';
const { ccclass, property } = _decorator;

@ccclass('closeComputer')
export class closeComputer extends interaction {
    start() {

    }
    interactionContactFunction(): void {
        super.interactionContactFunction()
        this.node.children[0].getComponent(Animation).play('close')
    }
    update(deltaTime: number) {
        
    }
}


