import { _decorator, Button, Component, director, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('read')
export class read extends Component {
    @property(Button)
    Button:Button=null!
    start() {
        if(window.localStorage.getItem('SaveScene')==null){
            this.Button.interactable=false
        }else{
            this.Button.interactable=true
        }
    }

    read(){
        director.loadScene(window.localStorage.getItem('SaveScene'))
        
    }
    update(deltaTime: number) {
        
    }
}


