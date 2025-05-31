import { _decorator, Button, Component, director, Event, EventTouch, Node, NodeEventType, SystemEvent } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('backToMenu')
export class backToMenu extends Component {
    start() {
    }

    update(deltaTime: number) {
        
    }
    backToMenu(){
        director.loadScene('startMenu')
    }
}


