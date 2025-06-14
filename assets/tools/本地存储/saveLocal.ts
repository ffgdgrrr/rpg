import { Enum, sys } from 'cc';
import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MapNode')
class MapNode{
    @property
    key:string=''
    @property
    value:string=''
}
enum localEvent{
    setItem,
    getItem,
    
}
Enum(localEvent)
@ccclass('saveLocal')
export class saveLocal extends Component {
    @property
    AwakeLoad=true
    @property({type:localEvent})
    localEvent:localEvent=localEvent.setItem
    @property({type:MapNode,visible:function(this:saveLocal){
        return this.localEvent===localEvent.setItem
    }})
    MapNode:MapNode;
    @property({type:MapNode,visible:function(this:saveLocal){
        return this.localEvent===localEvent.getItem
    }})
    keyNode:MapNode;
    start() {
        if(this.AwakeLoad==true){
            this.local()
        }
    }
    local(){
        if(this.localEvent===localEvent.getItem){
           
            return JSON.parse(sys.localStorage.getItem(this.MapNode.key))
        }else if(this.localEvent===localEvent.setItem){
            sys.localStorage.setItem(this.MapNode.key,this.MapNode.value)
        }
        
    }
    update(deltaTime: number) {
        
    }
}


