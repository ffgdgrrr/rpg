import { _decorator, Component, Node } from 'cc';
import { canChooseFood } from './canChooseFood';
import { find } from 'cc';
import { foodMake } from './foodMake';
const { ccclass, property } = _decorator;

@ccclass('food')
export class food extends Component {
    @property(canChooseFood)
    canChooseFood:canChooseFood=null!
    start() {
        this.node.on(Node.EventType.TOUCH_START,()=>{
            
            if(this.canChooseFood.ChooseFood==null){
                if(this.node.children[0]){
                    this.node.children[0].setParent(find('Canvas/stove/可选食材/windows'))
                }
            }else{
                this.canChooseFood.ChooseFood.setParent(this.node)
                this.canChooseFood.ChooseFood=null
            }
            find('Canvas/stove/烹饪/make').getComponent(foodMake).checkCanMakeFood()
            console.log(123)
        })
    }
    update(deltaTime: number) {
        
    }
}


