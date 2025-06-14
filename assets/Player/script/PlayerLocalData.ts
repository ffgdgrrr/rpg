import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PlayerLocalData')
export class PlayerLocalData extends Component {
    private static  readonly _instance:PlayerLocalData=new PlayerLocalData()
    PlayerPath:string;
    start() {
        
    }
    getPath(){
        this.PlayerPath=sys.localStorage.getItem('PlayerPath')
        console.log(this.PlayerPath,'gg')
    }
    update(deltaTime: number) {
        
    }
    static get instance(){
        return this._instance
    }
}
export var PlayerLocal=PlayerLocalData.instance


