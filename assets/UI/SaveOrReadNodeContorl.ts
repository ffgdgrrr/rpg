import { find } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { dataNode } from './dataNode';
const { ccclass, property } = _decorator;

@ccclass('SaveOrReadNodeContorl')
export class SaveOrReadNodeContorl extends Component {
    start() {

    }
    Save() {
        let button = find('Canvas/readAndSaveNode/layout/' + this.node.name)
        if (button) {
            button.getComponent(dataNode).Save()
        }
    }
    Read() {

        let button = find('Canvas/readAndSaveNode/layout/' + this.node.name)
        if (button) {
            button.getComponent(dataNode).Read()
        }

    }
    update(deltaTime: number) {

    }
}


