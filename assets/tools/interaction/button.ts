import { EventHandler } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('button')
export class button extends Component {
    @property([EventHandler])
    eventHandler:EventHandler[]=[]
    start() {
        this.node.once(Node.EventType.TOUCH_START,()=>{
            this.eventHandler.forEach(element=>{
                element.emit([])
            })
        })
    }

    update(deltaTime: number) {
        
    }
}


