import { _decorator, Component, find, Node } from 'cc';
import { ChangeKey } from './ChangeKey';
import { KeyCode } from 'cc';
import { back } from './back';
const { ccclass, property } = _decorator;

@ccclass('reset')
export class reset extends Component {
    start() {

    }

    update(deltaTime: number) {

    }
    reset() {
        sys.localStorage.clear()
        if (sys.localStorage.length == 0) {
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
            for (let i = 0; i < find('Canvas/操作说明/Label/Layout').children.length; i++) {
                find('Canvas/操作说明/Label/Layout').children[i].getComponent(ChangeKey).change()
            }
            find("Canvas/返回").getComponent(back).refuse()

        }
    }
}


