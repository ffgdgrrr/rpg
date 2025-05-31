import { Input } from 'cc';
import { v3 } from 'cc';
import { input } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('scrollWithView')
export class scrollWithView extends Component {
    start() {
        input.on(Input.EventType.MOUSE_WHEEL,(event)=>{
            //console.log(event.getScrollY()+'wheel')
            this.node.setPosition(v3(this.node.position.x,this.node.position.y-event.getScrollY()))
        },this)
    }

    update(deltaTime: number) {
        
    }
}


