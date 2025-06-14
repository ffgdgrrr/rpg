import { _decorator, Component, EventKeyboard, Input, input, KeyCode, Label, Node, macro, markAsWarning } from 'cc';
const { ccclass, property } = _decorator;
@ccclass('ChangeKey')
export class ChangeKey extends Component {
    @property
    KeyName:string=''
    moveKey:KeyCode
    canChangeKey: boolean;
    start() {
        this.change()
        
    }

    update(deltaTime: number) {
        
    }
    change(){
        
        this.node.children[0].getComponent(Label).string=this.getEnumName(parseInt(sys.localStorage.getItem(this.KeyName)))
    }
    getEnumName(value: KeyCode): string | undefined {
        const enumKeys = Object.keys(KeyCode);
        for (const key of enumKeys) {
            if (KeyCode[key] === value) {
                console.log(key)
                return key;
            }
        }
        return undefined;
    }
    onLoad () {
        document.addEventListener('keydown', (event)=> {
            console.log(event.code);
            });
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }

    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onKeyDown(event:EventKeyboard){
        if(this.canChangeKey==true){
            this.moveKey=event.keyCode
            this.canChangeKey=false
            this.node.children[0].getComponent(Label).string=this.getEnumName(this.moveKey)
            sys.localStorage.setItem(this.KeyName,JSON.stringify(this.moveKey))
            //console.log(parseInt(sys.localStorage.getItem(this.KeyName)))
            
        }
    }
    onKeyUp(event:EventKeyboard){
        if(parseInt(sys.localStorage.getItem(this.KeyName))==event.keyCode){
        }
    }
    gaijianwei(){
        this.canChangeKey=true
    }
}


