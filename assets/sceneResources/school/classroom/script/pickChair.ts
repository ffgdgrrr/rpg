import { _decorator, Component, Node } from 'cc';
import { interaction } from '../../../../tools/interaction/interaction';
import { find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('pickChair')
export class pickChair extends interaction{
    start() {

    }
    interactionContactFunction(): void {
        this.node.setParent(find('Canvas/2.5d/GZY'))
        this.node.setPosition(0,40,0)
    }
    update(deltaTime: number) {
        
    }
}


