import { _decorator, Component, Node, TextAsset, Label, Button, Prefab, Layout, resources, instantiate, EventHandler, sys, SkelAnimDataHub, Camera, find, UITransform, tween, animation, Animation, BoxCollider2D, TERRAIN_HEIGHT_BASE, director, PolygonCollider2D, EventKeyboard, Input, KeyCode, input, VideoPlayer, Sprite } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('dialog_op')
export class dialog_op extends Component {
    @property(Node)
    homoparent:Node=null!
    @property({displayName: "Mask节点", tooltip: "用于对话显示动画", type: Prefab})
    ParentAnim:Prefab=null!
    @property({displayName: "csv对话文本文件", tooltip: "对话内容", type: TextAsset})
    csv:TextAsset=null!
    @property(Prefab)
    optionButton:Prefab=null!
    @property(Layout)
    Layout:Layout=null!
    //跳转对话的id
    dialogindex:number=0
    dialogRows:string[]
    cell: string[];
    index: number;
    button: Node
    jumptext: string=null;
    canPress: boolean=true
    anima: string;
    actionBegin: boolean;
    Mask: Node=null
    canRestart:boolean=false
    start() {
        this.readText(this.csv)
        this.showDialogRow()
    }
    update(deltaTime:number){
    }
    onLoad(){
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        sys.localStorage.setItem('dialogActive','yes')
        sys.localStorage.removeItem('JUMPTEXT')
        
    }
    setAni(anima:string,动画重复检测:boolean,node?:Animation){
        if(动画重复检测==true){
            if(this.anima==anima){return}
        }
        this.anima=anima
        node.play(anima)
    }
    updateText(_text:string){
        if(this.Mask!=null){
            this.Mask.destroy()
        }
        this.Mask=instantiate(this.ParentAnim)
        this.Mask.setParent(find('Canvas'))
        this.setAni('自上而下的显示',true,this.Mask.getComponent(Animation))
        sys.localStorage.setItem('TalkText',_text)
    }
    readText(_TextAsset:TextAsset){
        this.dialogRows=_TextAsset.text.split('\n')
    }
    onDestroy () {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown (event: EventKeyboard) {
        switch(event.keyCode) {
            case parseInt(sys.localStorage.getItem('next')):
                if(this.canPress==true){
                    this.onClickNext()
                    
                }
                break;
        }
    }
    showDialogRow(){
        for (let index = 0; index < this.dialogRows.length; index++) {
            this.cell=this.dialogRows[index].split(',')
            if(this.cell[0]=='#'&&parseInt(this.cell[1])==this.dialogindex){
                //对话结束后
                console.debug(parseInt(this.cell[5]))
                this.ChooseFunc(this.cell[5])
                this.canPress=true
                this.updateText(this.cell[3])
                //寻找场景中的人物
                let homo=find(this.homoparent.getPathInHierarchy()+'/'+this.cell[2])
                if(homo!=null){
                    if(homo.getComponent(UITransform).anchorPoint.y==0.5){
                        this.Mask.setPosition(homo.position.x,homo.position.y+(homo.getComponent(UITransform).contentSize.height/2))
                    }else{
                        this.Mask.setPosition(homo.position.x,homo.position.y+(homo.getComponent(UITransform).contentSize.height/2+150))
                         }
                    }
                console.log(this.cell[4])
                if(this.cell[4]==''){
                    this.endFunc()
                    this.canRestart=true
                    this.Mask.destroy()
                    this.node.active=false
                    //寻找场景中的播放字幕，如果
                        
                    
                }
                this.dialogindex=parseInt(this.cell[4])
                break;
            }else if(this.cell[0]=='&'&&parseInt(this.cell[1])==this.dialogindex){
                this.canPress=false
                this.GenerateOption(index)
            }
        }
    }   
    endFunc(){
    }
    onOptionClick(id:number){

        this.dialogindex=id
        this.showDialogRow()
        for (let index = 0; index < this.Layout.getComponentsInChildren(Button).length ; index++){
            this.Layout.node.destroyAllChildren()
        }
    }
    //对话选项绑定函数
    DialogueChooseFunc(cell5){
        let cell=parseInt(cell5)
    }
    Restart(){
        this.readText(this.csv)
        this.dialogindex=0
        this.cell=this.dialogRows[1].split(',')
        if(this.canRestart==true){
            this.showDialogRow()
        }
       
    }
    ChooseFunc(cell5){
        let cell=parseInt(cell5)
    }
    GenerateOption(_index: number) {
        while (true) {
            this.cell = this.dialogRows[_index].split(',');
            if (this.cell[0] == '&') {
                this.button = instantiate(this.optionButton);
                this.button.setParent(this.Layout.node);
                let dd = this.cell[4];
                let cell = this.cell[5];
                let ooc = () => {
                    this.DialogueChooseFunc(cell);
                    this.onOptionClick(parseInt(dd));
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
    
