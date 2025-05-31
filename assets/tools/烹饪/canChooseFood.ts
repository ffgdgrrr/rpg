import { find } from 'cc';
import { _decorator, Component, Node } from 'cc';
import { bag } from '../inventory/script/bag';
import { mezi } from '../inventory/script/mezi';
import { instantiate } from 'cc';
import { Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('canChooseFood')
export class canChooseFood extends Component {
    chooseFood:Node;
    start() {
        
    }
    protected onEnable(): void {
        this.node.destroyAllChildren()
        let bagScript=find('Canvas/Camera/bag/view/content')
        for(let meziNode of bagScript.children){
            if(meziNode.getComponent(mezi).isIngredients==true){
                let meziNode2=instantiate(meziNode)
                meziNode2.setParent(this.node)
                this.node.getComponent(Layout).alignHorizontal=true
            }
        }
    }
    set ChooseFood(node:Node){
        this.chooseFood=node
    }
    get ChooseFood(){
        return this.chooseFood
    }
    update(deltaTime: number) {
        
    }
}


