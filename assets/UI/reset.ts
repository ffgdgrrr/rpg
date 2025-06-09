import { _decorator, Component, find, Node } from 'cc';
import { ChangeKey } from './ChangeKey';
import { KeyCode } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('reset')
export class reset extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    reset() {
        window.localStorage.clear()
        if (window.localStorage.length == 0) {
            window.localStorage.setItem('interaction', JSON.stringify(KeyCode.KEY_R))
            window.localStorage.setItem('left', JSON.stringify(KeyCode.KEY_A))
            window.localStorage.setItem('right', JSON.stringify(KeyCode.KEY_D))
            window.localStorage.setItem('up', JSON.stringify(KeyCode.KEY_W))
            window.localStorage.setItem('down', JSON.stringify(KeyCode.KEY_S))
            window.localStorage.setItem('next', JSON.stringify(KeyCode.SPACE))
            window.localStorage.setItem('esc', JSON.stringify(KeyCode.ESCAPE))
            window.localStorage.setItem('save', JSON.stringify(KeyCode.HOME))
            window.localStorage.setItem('inventory', JSON.stringify(KeyCode.KEY_I))
            window.localStorage.setItem('autoSave', JSON.stringify(true))
            for (let i = 0; i < find('Canvas/操作说明/Label/Layout').children.length; i++) {
                find('Canvas/操作说明/Label/Layout').children[i].getComponent(ChangeKey).change()
            }

        }
    }
}


