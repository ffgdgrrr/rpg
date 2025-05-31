import { _decorator, Component, Node, Label, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Mask_sLabel')
export class Mask_sLabel extends Component {
    @property(Label)
    text:Label=null!
    start() {
        this.text.string=sys.localStorage.getItem('TalkText')
    }

    update(deltaTime: number) {
        this.node.parent.setSiblingIndex(999)
    }
}

