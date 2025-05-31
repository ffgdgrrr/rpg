import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('comic')
export class comic extends Component {
    @property(Node)
    activeNode: Node=null!
    start() {

    }
    closeButton(){
        this.node.destroy()
        if(this.activeNode){
            this.activeNode.active=true
        }
    }
    update(deltaTime: number) {
        
    }
}


