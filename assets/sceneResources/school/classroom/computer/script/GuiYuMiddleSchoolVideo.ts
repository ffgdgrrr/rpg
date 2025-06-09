import { _decorator, Component, Node } from 'cc';
import { interaction } from '../../../../../tools/interaction/interaction';
import { find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GuiYuMiddleSchoolVideo')
export class GuiYuMiddleSchoolVideo extends interaction{
    start() {

    }
    interactionQuit(): void {
        find('Canvas/哪有啊').active=true
       this.node.destroy()
    }
    update(deltaTime: number) {
        
    }
}


