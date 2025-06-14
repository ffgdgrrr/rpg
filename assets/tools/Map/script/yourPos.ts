import { _decorator, Component, Node, sys } from 'cc';
import { area } from './area';
import { find } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('yourPos')
export class yourPos extends Component {
    
    start() {
        let Map=find('Canvas/Map')
        for(let element of Map.children){
            console.log(element.getComponent(area).scene.name,sys.localStorage.getItem('FrontScene'))
            if(element.getComponent(area).scene.name==sys.localStorage.getItem('FrontScene')){
                this.node.setWorldPosition(element.worldPosition)
            }        
        }
        
    }

    update(deltaTime: number) {
        
    }
}


