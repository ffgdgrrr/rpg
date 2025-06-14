import { _decorator, Component, Label, Toggle } from 'cc';
import ElectronAPI from '../ElectronAPI';
const { ccclass, property } = _decorator;

@ccclass('isfullscreen')
export class isfullscreen extends Component {
    @property(Toggle)
    isFullScreen:Toggle=null!
    start() {
   
   
    
        if(ElectronAPI.isFullScreen()==false){
            this.isFullScreen.isChecked=false
            
        }else if(ElectronAPI.isFullScreen()==true){
            this.isFullScreen.isChecked=true
            
        }
        this.node.children[1].getComponent(Label).string=ElectronAPI.isFullScreen()+'FullScreen'
        console.log(ElectronAPI.isFullScreen())
    }
    
    press(){
       

        if(this.isFullScreen.isChecked==false){
            sys.localStorage.setItem('fullScreen',JSON.stringify(true))
            ElectronAPI.fullScreen()
            //screen.requestFullScreen()
        }else if(this.isFullScreen.isChecked==true){
            sys.localStorage.setItem('fullScreen',JSON.stringify(false))
            ElectronAPI.window()
            //screen.requestFullScreen()
        }
    }
    
    update(deltaTime: number) {
        
    }
}

