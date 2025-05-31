import { _decorator, Component, Toggle } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('isfullscreen')
export class isfullscreen extends Component {
    @property(Toggle)
    isFullScreen:Toggle=null!
    start() {
        if(JSON.parse(window.localStorage.getItem("通关"))==true){
            this.isFullScreen.interactable=true
        }else{
            //this.isFullScreen.interactable=false
        }
        /*if(ElectronAPI.isFullScreen()==false){
            this.isFullScreen.isChecked=false
            
        }else if(ElectronAPI.isFullScreen()==true){
            this.isFullScreen.isChecked=true
            
        }*/
        // if(ElectronAPI.isFullScreen()==false){
        //     this.isFullScreen.isChecked=false
            
        // }else if(ElectronAPI.isFullScreen()==true){
        //     this.isFullScreen.isChecked=true
            
        // }
        //this.node.children[1].getComponent(Label).string=ElectronAPI.isFullScreen()+'FullScreen'
        //console.log(ElectronAPI.isFullScreen())
    }
    
    press(){
        //web全屏
        /*if(this.isFullScreen.isChecked==false){
            window.localStorage.setItem('fullScreen',JSON.stringify(true))
            //ElectronAPI.fullScreen()
            screen.requestFullScreen()
        }else if(this.isFullScreen.isChecked==true){
            window.localStorage.setItem('fullScreen',JSON.stringify(false))
            //ElectronAPI.window()
            screen.exitFullScreen()
        }*/
        //windows
        // if(this.isFullScreen.isChecked==false){
        //     window.localStorage.setItem('fullScreen',JSON.stringify(true))
        //     ElectronAPI.fullScreen()
        //     //screen.requestFullScreen()
        // }else if(this.isFullScreen.isChecked==true){
        //     window.localStorage.setItem('fullScreen',JSON.stringify(false))
        //     ElectronAPI.window()
        //     //screen.requestFullScreen()
        // }
    }
    
    update(deltaTime: number) {
        
    }
}

