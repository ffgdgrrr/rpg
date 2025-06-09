import { _decorator, Animation, Component, Node } from 'cc';
import { interaction } from '../../../../../tools/interaction/interaction';
const { ccclass, property } = _decorator;

@ccclass('openComputer')
export class openComputer extends interaction {
    start() {

    }
    interactionContactFunction(): void {
        super.interactionContactFunction()
        this.node.children[0].getComponent(Animation).play('开机动画')
    }
    update(deltaTime: number) {
        
    }
}


