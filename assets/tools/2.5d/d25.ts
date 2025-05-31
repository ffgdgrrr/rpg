import { _decorator, Animation, Component, Node, UITransform, v2, Layout } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('d25')
export class d25 extends Component {
    children:Node[]
    isD25: boolean=true;
    start() {

    }
    update(deltaTime: number) {
        if(this.isD25==true){
            let children = this.node.children;
        children.sort((a: Node, b: Node) => b.position.y - a.position.y);
        if(children!=this.children){
            console.log(children)
            children.forEach((child: Node, idx: number) => {
            if(child.name!='Mask'){
                child.setSiblingIndex(idx);
                this.children=children
                
            }
        });
        }
        
        }
        
    }
}

