import { Toggle } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('isAutoSave')
export class isAutoSave extends Component {
    @property(Toggle)
    isAutoSave:Toggle=null!
    start() {
        const autoSave:boolean=JSON.parse(sys.localStorage.getItem('autoSave'))
        if(autoSave==false){
            this.isAutoSave.isChecked=false
            
        }else if(autoSave==true){
            this.isAutoSave.isChecked=true
            
        }
    }
    
    press(){
        //web全屏
        /*if(this.isAutoSave.isChecked==false){
            sys.localStorage.setItem('fullScreen',JSON.stringify(true))
            //ElectronAPI.fullScreen()
            screen.requestFullScreen()
        }else if(this.isAutoSave.isChecked==true){
            sys.localStorage.setItem('fullScreen',JSON.stringify(false))
            //ElectronAPI.window()
            screen.exitFullScreen()
        }*/
        //windows
        if(this.isAutoSave.isChecked==false){
            sys.localStorage.setItem('autoSave',JSON.stringify(true))

            //screen.requestFullScreen()
        }else if(this.isAutoSave.isChecked==true){
            sys.localStorage.setItem('autoSave',JSON.stringify(false))
            //screen.requestFullScreen()
        }
    }
}


