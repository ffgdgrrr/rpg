import { Toggle } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('codeSave')
export class codeSave extends Component {
    @property(Toggle)
    isCodeSave:Toggle=null!
    start() {
        const CodeSave:boolean=JSON.parse(sys.localStorage.getItem('CodeSave'))
        if(CodeSave==false){
            this.isCodeSave.isChecked=false
        
        }else if(CodeSave==true){
            this.isCodeSave.isChecked=true
            
        }
        console.log(CodeSave)
    }
    
    press(){
        //web全屏
        /*if(this.isCodeSave.isChecked==false){
            sys.localStorage.setItem('fullScreen',JSON.stringify(true))
            //ElectronAPI.fullScreen()
            screen.requestFullScreen()
        }else if(this.isCodeSave.isChecked==true){
            sys.localStorage.setItem('fullScreen',JSON.stringify(false))
            //ElectronAPI.window()
            screen.exitFullScreen()
        }*/
        //windows
        if(this.isCodeSave.isChecked==false){
            sys.localStorage.setItem('CodeSave',JSON.stringify(true))

            //screen.requestFullScreen()
        }else if(this.isCodeSave.isChecked==true){
            sys.localStorage.setItem('CodeSave',JSON.stringify(false))
            //screen.requestFullScreen()
        }
    }
}


