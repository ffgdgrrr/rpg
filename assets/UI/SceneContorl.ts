import { _decorator, Component, director, find, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SceneContorl')
export class SceneContorl extends Component {
    start() {

    }
    backMenu(){
        director.loadScene('setting')
    }
    saveList(){
        let sr=find('Canvas/readAndSaveNode')
                if(sr.active==true){
                    sr.active=false
                }else if(sr.active==false){
                    sr.active=true
                    let camera=find('Canvas/Camera')
                    sr.setPosition(camera.position.x,camera.position.y)
                }
    }
    update(deltaTime: number) {
        
    }
}


