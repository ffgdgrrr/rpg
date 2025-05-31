import { _decorator, Component, Node, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('shicha')
export class shicha extends Component {
    @property
    offsetNum:number=1.1
    @property(Node)
    Camera:Node=null!
    start() {

    }

    update(deltaTime: number) {
        //this.node.setPosition(v3((this.Camera.position.x)*(1/this.offsetNum),this.node.position.y))
    }
}


