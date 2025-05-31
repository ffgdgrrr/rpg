import { find, instantiate } from 'cc';
import { Label } from 'cc';
import { director } from 'cc';
import { Prefab } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dataNode')
export class dataNode extends Component {
    @property(Prefab)
    chooseNode:Prefab=null!
    start() {
        if(window.localStorage.getItem(this.node.name)){
            this.node.children[0].getComponent(Label).string=window.localStorage.getItem(this.node.name)
   
        }
         }
    generateChooseNode(){
        let chooseNode=instantiate(this.chooseNode)
        chooseNode.setParent(find('Canvas'))
        chooseNode.name=this.node.name
    }
    Save(){
        window.localStorage.setItem(this.node.name,director.getScene().name)
        this.node.children[0].getComponent(Label).string=window.localStorage.getItem(this.node.name)
   
    }
    Read(){
        director.loadScene(window.localStorage.getItem(this.node.name))
    }
    update(deltaTime: number) {
        
    }
}


