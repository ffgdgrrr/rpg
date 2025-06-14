import { _decorator, Button, Component, director, Node } from 'cc';
import { KeyCode } from 'cc';
import ElectronAPI from '../ElectronAPI';
//import ElectronAPI from '../ElectronAPI';
const { ccclass, property } = _decorator;

@ccclass('MenuUIContorl')
export class MenuUIContorl extends Component {

    @property(Button)
    quitNode: Button = null
    play() {
        director.loadScene('start')
    }
    setting() {
        director.loadScene('setting')
    }
    exit() {
        ElectronAPI.quit()
    }
    read() {

    }
    start() {
        if (sys.localStorage.getItem('next')) {
        } else {
            sys.localStorage.setItem('interaction', JSON.stringify(KeyCode.KEY_R))
            sys.localStorage.setItem('left', JSON.stringify(KeyCode.KEY_A))
            sys.localStorage.setItem('right', JSON.stringify(KeyCode.KEY_D))
            sys.localStorage.setItem('up', JSON.stringify(KeyCode.KEY_W))
            sys.localStorage.setItem('down', JSON.stringify(KeyCode.KEY_S))
            sys.localStorage.setItem('next', JSON.stringify(KeyCode.SPACE))
            sys.localStorage.setItem('esc', JSON.stringify(KeyCode.ESCAPE))
            sys.localStorage.setItem('save', JSON.stringify(KeyCode.HOME))
            sys.localStorage.setItem('inventory', JSON.stringify(KeyCode.KEY_I))
            sys.localStorage.setItem('autoSave', JSON.stringify(true))
        }
    }

    update(deltaTime: number) {

    }
}


