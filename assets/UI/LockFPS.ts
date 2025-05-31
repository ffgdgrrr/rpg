import { _decorator, Component, director, game, Node,EditBox } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LockFPS')
export class LockFPS extends Component {
    @property(EditBox)
    editBox:EditBox=null
    start() {
        
    }

    update(deltaTime: number) {
        
    }
    checkNum(){
        console.log(game.frameRate,parseInt(this.editBox.string))
        game.frameRate=parseInt(this.editBox.string)
    }
}


