import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerLocalData')
export class PlayerLocalData extends Component {
    private static  readonly _instance:PlayerLocalData=new PlayerLocalData()
    GZYPath:string;
    start() {
        
    }
    getPath(){
        this.GZYPath=window.localStorage.getItem('GZYPath')
        console.log(this.GZYPath,'gg')
    }
    update(deltaTime: number) {
        
    }
    static get instance(){
        return this._instance
    }
}
export var GZYLocal=PlayerLocalData.instance


