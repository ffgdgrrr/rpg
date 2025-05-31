import { _decorator, Component, Node, EditBox, EventKeyboard, KeyCode, input, Input, director, find } from 'cc';
import { bag } from '../tools/inventory/script/bag';
const { ccclass, property } = _decorator;

@ccclass('EditBoxContorl')
export class EditBoxContorl extends Component {
    @property(EditBox)
    EditBox:EditBox=null;
    start() {
    }
    解析代码(){
        let 代码块=this.EditBox.string.split(' ')
        console.log(代码块)
        switch(代码块[0]){
            case 'load':
                if(代码块[1]){
                    director.loadScene(代码块[1])
                }
                break
            case 'add':
                if(代码块[1]){
                    if(find('Canvas/Camera/bag/view/content'))
                    find('Canvas/Camera/bag/view/content').getComponent(bag).add(代码块[1])
                }
                break
        }
        this.EditBox.string=''
    }
    update(deltaTime: number) {
    }
}


