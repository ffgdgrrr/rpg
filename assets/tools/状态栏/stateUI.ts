import { Label } from 'cc';
import { ProgressBar } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('stateUI')
export class stateUI extends Component {
    @property(ProgressBar)
    心情:ProgressBar=null;
    @property(ProgressBar)
    睡眠:ProgressBar=null;
    @property(ProgressBar)
    饱食:ProgressBar=null;
    @property(ProgressBar)
    理智:ProgressBar=null;
    @property(Label)
    人民币:Label=null!
    start() {

    }

    update(deltaTime: number) {
        
    }
}


