import { _decorator, Component, find, Node, UITransform, v3, Vec3 } from 'cc';
import { interaction } from '../../../../tools/interaction/interaction';
import { Anistate, Player } from 'db://assets/Player/script/Player';
const { ccclass, property } = _decorator;

@ccclass('chair')
export class chair extends interaction {
    start() {

    }
    interactionContactFunction(): void {
        super.interactionContactFunction()
        find('Canvas/2.5d/Player').getComponent(Player).setAni(Anistate.peopleIndesk,true)
        let worldPos = this.node.getComponent(UITransform).convertToWorldSpaceAR(v3(0,-9.1));
        let localPos = find('Canvas/2.5d/Player').parent.getComponent(UITransform).convertToNodeSpaceAR(worldPos);
        find('Canvas/2.5d/Player').setPosition(localPos)
    }
    update(deltaTime: number) {
        if(this.node.parent.name=='Player'){
            this.node.setPosition(0,40,0)
        }
    }
}


