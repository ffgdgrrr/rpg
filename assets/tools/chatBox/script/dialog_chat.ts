import { _decorator, Component, Node, TextAsset, Label, Button, Prefab, Layout, resources, instantiate, EventHandler, sys, SkelAnimDataHub, Camera, find, UITransform, tween, animation, Animation, director, EventKeyboard, KeyCode, Input, input, Sprite, SpriteFrame, BaseRenderData } from 'cc';
import { dialogLocalData } from '../../本地存储/dialogLocal';
import { chatNode } from './chatNode';
import { v3 } from 'cc';
const { ccclass, property } = _decorator;
export enum action{
    add,
    delete,
}
@ccclass('dialog_galgame')
export class dialog_galgame extends Component{
    @property(Prefab)
    chatNode:Prefab=null!
    @property(Prefab)
    chatNodeSelf:Prefab=null!
    @property([EventHandler])
    eventHandler:EventHandler[]=[]
    @property({displayName: "人物立绘资源", tooltip: "图片数组代表在dialogindex的位置，比如0就在dialogindex等于0的时候显示图片", type: SpriteFrame})
    renwu_spriteFrame:SpriteFrame[]=[]
    @property({displayName: "csv对话文本文件", tooltip: "对话内容", type: TextAsset})
    csv:TextAsset=null!
    @property(Prefab)
    optionButton:Prefab=null!
    @property(Layout)
    Layout:Layout=null!
    @property(Node)
    otherLayout:Node=null!
    //跳转对话的id
    dialogindex:number=0
    dialogRows:string[]
    cell: string[];
    index: number;
    button: Node
    jumptext: string=null;
    canPress: boolean=true
    anima: string;
    canRestart: boolean;
    isChoose: boolean=false
    start() {
        this.schedule(()=>{
            if(this.isChoose==false&&this.canPress==true){
                this.onClickNext()
            }
        },1)
        
        dialogLocalData.getSysLocalAboutDialog()
        this.readText(this.csv)
        this.showDialogRow()
    }
    onLoad(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        sys.localStorage.removeItem('JUMPTEXT')
    }
    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case parseInt(sys.localStorage.getItem('next')):
                console.log('press')
                if(this.isChoose==false){
                if(this.canPress==true&&this.node.active==true){
                    this.onClickNext()
                    /*if(this.node.name=='序'){
                        find('Canvas/Label').active=false
                    }*/
                }else if(this.canPress==false){
                    this.unscheduleAllCallbacks()
                    this.canPress=true
                }
                }

                break;
        }
    }
    protected onDestroy(): void {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
    }
    update(deltaTime: number) {
    }
    setAni(anima:string,node:Animation,动画重复检测:boolean){
        if(动画重复检测==true){
            if(this.anima==anima){return}
        }
        this.anima=anima
        node.play(anima)
    }
    updateText(_name:string,_text:string){
        
        if(_name=='郭志远'){
            let chatNodePrefab=instantiate(this.chatNodeSelf)
        chatNodePrefab.setParent(this.otherLayout) 
            chatNodePrefab.setPosition(v3(1100))
            let chatNodeScript=chatNodePrefab.getComponent(chatNode)
        chatNodeScript.peopleName.string=_name
        chatNodeScript.peopleText.string=_text
        if (this.renwu_spriteFrame[this.dialogindex] != null) {
            chatNodeScript.head.spriteFrame = this.renwu_spriteFrame[this.dialogindex];
        }
        }else{
            let chatNodePrefab=instantiate(this.chatNode)
        chatNodePrefab.setParent(this.otherLayout) 
            chatNodePrefab.setPosition(v3(0))
            let chatNodeScript=chatNodePrefab.getComponent(chatNode)
        chatNodeScript.peopleName.string=_name
        chatNodeScript.peopleText.string=_text
        if (this.renwu_spriteFrame[this.dialogindex] != null) {
            chatNodeScript.head.spriteFrame = this.renwu_spriteFrame[this.dialogindex];
        }
        }
        
        

    }
    readText(_TextAsset:TextAsset){
        this.dialogRows=_TextAsset.text.split('\n')
    }
    showDialogRow(){
        if(this.eventHandler[this.dialogindex]){
            this.eventHandler[this.dialogindex].emit([])
        }
        for (let index = 0; index < this.dialogRows.length; index++) {
            this.cell=this.dialogRows[index].split(',')
            if(this.cell[0]=='#'&&parseInt(this.cell[1])==this.dialogindex){

                this.canPress=true
                this.updateText(this.cell[2],this.cell[3])
                this.dialogindex=parseInt(this.cell[4])
                this.DialogueFunc(this.cell[5])
                console.log(this.cell[4])
                if(this.cell[4]==''){
                    console.log('endFunc')
                    
                    this.endFunc()
                }
                break
            }else if(this.cell[0]=='&'&&parseInt(this.cell[1])==this.dialogindex){
                this.canPress=false
                this.GenerateOption(index)
               
                break
            }
        }
    }   
    onOptionClick(id:number){
        this.canPress=true
        this.dialogindex=id
        for (let index = 0; index < this.Layout.getComponentsInChildren(Button).length ; index++){
            this.Layout.node.destroyAllChildren()
        }
    }
    //对话选项绑定函数
    DialogueChooseFunc(cell5){
        let cell=parseInt(cell5)
        console.log(cell)
        //选择CSV文件中的《事件》id，所执行对应的代码
        //事件必须出现在&对活里

        
    }
    endFunc(){
        this.canRestart=true
    }
    Restart(){
        this.readText(this.csv)
        this.dialogindex=0
        this.cell=this.dialogRows[1].split(',')
        if(this.canRestart==true){
            this.showDialogRow()
            this.canRestart=false
        }
       
    }
    DialogueFunc(cell5){
        let cell=parseInt(cell5)
        console.log(cell)
        //选择CSV文件中的《事件》id，所执行对应的代码
         //事件必须出现在#对活里
        
    }
    
    GenerateOption(_index: number) {
        while (true) {
            this.cell = this.dialogRows[_index].split(',');
            if (this.cell[0] == '&') {
                this.button = instantiate(this.optionButton);
                this.button.setParent(this.Layout.node);
                let cell3=this.cell[3]
                let dd = this.cell[4];
                let cell = this.cell[5];
                this.isChoose=true
                let ooc = () => {
                    this.isChoose=false
                    this.DialogueChooseFunc(cell);
                    this.onOptionClick(parseInt(dd));
                    this.updateText('郭志远',cell3)
                    console.log('gzy')
                };
                
                this.button.on(Button.EventType.CLICK, ooc, this);
                this.button.getComponentInChildren(Label).string = this.cell[3];
                _index++;
            } else {
                break;
            }
        }
    }
    onClickNext(){
        /*this.button_next.node.active=true
        this.cell=this.dialogRows[parseInt(this.jumptext)].split(',')
        this.dialogindex=parseInt(this.cell[4])*/
        this.showDialogRow()
    }
}
    



