import { _decorator, Button, Component, director, Node } from 'cc';
import { KeyCode } from 'cc';
//import ElectronAPI from '../ElectronAPI';
const { ccclass, property } = _decorator;

@ccclass('MenuUIContorl')
export class MenuUIContorl extends Component {

    @property(Button)
    quitNode: Button = null
    play() {
        director.loadScene('histroy')
    }
    setting() {
        director.loadScene('setting')
    }
    exit() {
        //ElectronAPI.quit()
    }
    read() {

    }
    start() {
        if (window.localStorage.getItem('next')) {
        } else {
            window.localStorage.setItem('FLG', JSON.stringify(KeyCode.KEY_L))
            window.localStorage.setItem('interaction', JSON.stringify(KeyCode.KEY_R))
            window.localStorage.setItem('left', JSON.stringify(KeyCode.KEY_A))
            window.localStorage.setItem('right', JSON.stringify(KeyCode.KEY_D))
            window.localStorage.setItem('next', JSON.stringify(KeyCode.SPACE))
            window.localStorage.setItem('esc', JSON.stringify(KeyCode.ESCAPE))
            window.localStorage.setItem('save', JSON.stringify(KeyCode.HOME))
            window.localStorage.setItem('inventory', JSON.stringify(KeyCode.KEY_I))
            window.localStorage.setItem('autoSave', JSON.stringify(true))
        }
    }

    update(deltaTime: number) {

    }
}


