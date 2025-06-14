import { find, instantiate } from 'cc';
import { Label } from 'cc';
import { director } from 'cc';
import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dataNode')
export class dataNode extends Component {
    @property(Prefab)
    chooseNode: Prefab = null!
    start() {
        if (sys.localStorage.getItem(this.node.name)) {
            this.node.children[0].getComponent(Label).string = sys.localStorage.getItem(this.node.name)

        }
    }
    generateChooseNode() {
        let chooseNode = instantiate(this.chooseNode)
        chooseNode.setParent(find('Canvas'))
        chooseNode.name = this.node.name
    }
    Save() {
        sys.localStorage.setItem(this.node.name, director.getScene().name)
        this.node.children[0].getComponent(Label).string = sys.localStorage.getItem(this.node.name)

    }
    Read() {
        if (sys.localStorage.getItem(this.node.name)) {
            director.loadScene(sys.localStorage.getItem(this.node.name))
        }

    }
    update(deltaTime: number) {

    }
}


