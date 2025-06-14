import { Button } from 'cc';
import { _decorator, Component, director, Node, sys } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('back')
export class back extends Component {
    start() {
        this.refuse()
    }
    refuse(){
        if(sys.localStorage.getItem('currentScene')){

        }else{
            this.node.getComponent(Button).interactable=false
        }
    }
    back(){
        director.loadScene(sys.localStorage.getItem('currentScene'))
    }
    update(deltaTime: number) {
        
    }
}

