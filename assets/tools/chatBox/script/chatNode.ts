import { Sprite, Label } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('chatNode')
export class chatNode extends Component {
    @property(Sprite)
    head:Sprite=null!
    @property(Label)
    peopleName:Label=null!
    @property(Label)
    peopleText:Label=null!
    start() {

    }

    update(deltaTime: number) {
        
    }
}


