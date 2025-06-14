import { _decorator, Component, JsonAsset, Node, sys, TerrainLayer } from 'cc';
import { action } from '../dialog/typeScript/dialog_galgame';
const { ccclass, property } = _decorator;

@ccclass('dialogLocal')
export class dialogLocal extends Component {
    private static  readonly _instance:dialogLocal=new dialogLocal()
    start() {

    }
    getSysLocalAboutDialog(){
        
        let dialogLocal:{};
        if(sys.localStorage.getItem('dialogLocal')){
            dialogLocal=JSON.parse(sys.localStorage.getItem('dialogLocal'))
        }
        console.log(dialogLocal+'dialogLocal')
        if(dialogLocal){
            return dialogLocal
        }else{ 
            sys.localStorage.setItem('dialogLocal',JSON.stringify({}))
            console.log(dialogLocal+'dd')
            return {}
        }
        
    }
    getSysLocalAboutDialogDOM(key:string){
        let dialogLocal=this.getSysLocalAboutDialog()
        console.log('dialogLocal',dialogLocal[key],key)
        if(dialogLocal[key]!=true){
            console.log('!=true')
            return false
        }
        return dialogLocal[key]
    }
    static get instance(){
        return this._instance
    }
    setSysLocalAboutDIalog(key:string, actions:action){
        let dialogLocal:{}=this.getSysLocalAboutDialog()
        switch(actions){
            case action.add:
                dialogLocal[key]=true
                break
            case action.delete:
                dialogLocal[key]=false
                break
        }
        sys.localStorage.setItem('dialogLocal',JSON.stringify(dialogLocal))
    }
    update(deltaTime: number) {
        
    }
}
export var dialogLocalData=dialogLocal.instance
