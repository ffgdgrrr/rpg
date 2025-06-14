import { _decorator, Component, Node, TextAsset, Label, Button, Prefab, Layout, resources, instantiate, EventHandler, sys, SkelAnimDataHub, Camera, find, UITransform, tween, animation, Animation, director, EventKeyboard, KeyCode, Input, input, Sprite, SpriteFrame, BaseRenderData } from 'cc';
import { dialogLocalData } from '../../本地存储/dialogLocal';
const { ccclass, property } = _decorator;
export enum action{
    add,
    delete,
}
@ccclass('dialog_galgame')
export class dialog_galgame extends Component{
    @property([EventHandler])
    eventHandler:EventHandler[]=[]
    @property({tooltip:'没有放人物立绘的位置不显示图片'})
    NoPictureNoDisplay:boolean=false
    @property({displayName: "人物立绘资源", tooltip: "图片数组代表在dialogindex的位置，比如0就在dialogindex等于0的时候显示图片", type: SpriteFrame})
    renwu_spriteFrame:SpriteFrame[]=[]
    @property({displayName: "背景图片资源", tooltip: "图片数组代表在dialogindex的位置，比如0就在dialogindex等于0的时候显示图片", type: SpriteFrame})
    bgSpriteFrame:SpriteFrame[]=[]
    @property({displayName: "切换背景图片组件", tooltip: "切换图片节点", type: Sprite})
    bg_sprite:Sprite=null!
    @property({displayName: "切换人物立绘图片组件", tooltip: "切换图片节点", type: Sprite})
    renwu_sprite:Sprite=null!
    @property({displayName: "csv对话文本文件", tooltip: "对话内容", type: TextAsset})
    csv:TextAsset=null!
    @property({displayName: "对话", tooltip: "对话内容的label", type: Label})
    text:Label=null!
    @property({displayName: "名字", tooltip: "名字的label", type: Label})
    Name:Label=null!
    @property(Prefab)
    optionButton:Prefab=null!
    @property(Layout)
    Layout:Layout=null!
    //跳转对话的id
    dialogindex:number=0
    dialogRows:string[]
    cell: string[];
    index: number;
    jumptext: string=null;
    canPress: boolean=true
    anima: string;
    @property
    endDelete:boolean=false
    canRestart: boolean;
    isChoose: boolean=false
    start() {
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
                    this.text.string=sys.localStorage.getItem('text')
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
    showTextAnim(text:string){
        sys.localStorage.setItem('text',text)
        for (let i = 0; i < text.length; i++) {
            this.scheduleOnce(() => {
                this.text.string+=text[i]
                if(this.text.string==text){
                    this.canPress=true
                    console.log('canpress')
                }
            }, 0.1 * i)
         }
         
    }
    setAni(anima:string,node:Animation,动画重复检测:boolean){
        if(动画重复检测==true){
            if(this.anima==anima){return}
        }
        this.anima=anima
        node.play(anima)
    }
    updateText(_name:string,_text:string){
        if(this.eventHandler[this.dialogindex]){
            this.eventHandler[this.dialogindex].emit([])
        }
        this.Name.string = _name;
        this.canPress=false
        this.text.string = "";
        if (this.renwu_spriteFrame[this.dialogindex] != null) {
            this.renwu_sprite.spriteFrame = this.renwu_spriteFrame[this.dialogindex];
        }else if(this.NoPictureNoDisplay==true){
            this.renwu_sprite.spriteFrame=null
        }
        if (this.bgSpriteFrame[this.dialogindex] != null) {
            this.bg_sprite.spriteFrame = this.bgSpriteFrame[this.dialogindex];
        }
        // 逐字显示文本
        this.showTextAnim(_text)
    }
    readText(_TextAsset:TextAsset){
        this.dialogRows=_TextAsset.text.split('\n')
    }
    showDialogRow(){
        
        for (let index = 0; index < this.dialogRows.length; index++) {
            this.cell=this.dialogRows[index].split(',')
            if(this.cell[0]=='#'&&parseInt(this.cell[1])==this.dialogindex){
                this.canPress=true
                this.updateText(this.cell[2],this.cell[3])
                this.dialogindex=parseInt(this.cell[4])
                this.DialogueFunc(this.cell[5])
                console.log(this.cell[4])
                
                if(this.cell[4]==''){
                    if(this.eventHandler[this.dialogindex]){
                        this.eventHandler[this.dialogindex].emit([])
                    }
                    console.log('endFunc')
                    this.endFunc()
                }
                break
            }else if(this.cell[0]=='&'&&parseInt(this.cell[1])==this.dialogindex){
                this.canPress=false
                this.GenerateOption(index)
            }
        }
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
        console.log(cell)
        //选择CSV文件中的《事件》id，所执行对应的代码
        //事件必须出现在&对活里
        switch(cell){
            case 0:
                switch(this.node.name){
                    case '老师要来找我麻烦了':
                        dialogLocalData.setSysLocalAboutDIalog('老师要来找我麻烦了',action.add)
                        console.log('666')
                        break
                    
                }
               
                break
        }
        
    }
    endFunc(){
        console.log(this.node.name)
        switch(this.node.name){
            case '老师有人带手机':
                find('Canvas/Camera/blackFront').active=true
                break
            case '高中生涯规划':
                find('Canvas/Camera/blackFront').active=true
                break
            case '填写实验数据':
                find('Canvas/blackFront').active=true
                break
            case '收集实验数据':
                director.loadScene('发到班级群_自选课题')
                break
            case '肖老师讲故事':
                director.loadScene('classroom_自选课题')
                break
            case '志远快上去关掉':
                //director.loadScene('走廊')
                break
            case '看完南京大屠杀的感悟':
                break
            case '今天是什么日子大家心里清楚':
                find('Canvas/南京大屠杀').active=true
                break
            case 'xf上课':
                find('Canvas/语文老师12月13日').active=true
                break
            case '做问卷调查':
                console.log(dialogLocalData.getSysLocalAboutDialog())
                if(dialogLocalData.getSysLocalAboutDialogDOM('重写问卷')){
                    console.log('失败了！！！')
                    find('Canvas/computer2/重写问卷').active=true
                    dialogLocalData.setSysLocalAboutDIalog('重写问卷',action.delete)
                }else{
                    find('Canvas/收集实验数据').active=true
                    console.log('成功了！！！')
                }
                
                break
            case '做技术课题':
                if(dialogLocalData.getSysLocalAboutDialogDOM('问卷调查')){
                    console.log('成功啦！！！')
                    find('Canvas/computer2/Text').active=true
                    find('Canvas/computer2/重写').active=false
                }else{
                    find('Canvas/computer2/重写').active=true
                }
                dialogLocalData.setSysLocalAboutDIalog('ai生成',action.delete)
                dialogLocalData.setSysLocalAboutDIalog('问卷调查',action.delete)
                break
            case '老师拿手机':
                director.loadScene('办公室')
                break
            case '贵屿中学我来了':
                director.loadScene('home_2floor_livingroom-phone')
                break
            case '老师要来找我麻烦了':
                console.log(dialogLocalData.getSysLocalAboutDialog())
                    if(dialogLocalData.getSysLocalAboutDialogDOM('保证不带手机')){
                        if(dialogLocalData.getSysLocalAboutDialogDOM('签了字')){
                        }else{
                            if(dialogLocalData.getSysLocalAboutDialogDOM('老师要来找我麻烦了')){
                            find('Canvas/你刚才还说老师要来找你麻烦').active=true
                        }else{
                            find('Canvas/接受道歉').active=true
                        }
                        }
                        
                        
                }else if(dialogLocalData.getSysLocalAboutDialogDOM('在停学书上做文章')){
                   
                }
                dialogLocalData.setSysLocalAboutDIalog('签了字',action.delete)
                dialogLocalData.setSysLocalAboutDIalog('老师要来找我麻烦了',action.delete)
                dialogLocalData.setSysLocalAboutDIalog('保证不带手机',action.delete)
                dialogLocalData.setSysLocalAboutDIalog('在停学书上做文章',action.delete)
                console.log(dialogLocalData.getSysLocalAboutDialog(),dialogLocalData.getSysLocalAboutDialogDOM('保证不带手机'))
                break
        }
        if(this.endDelete==true){
            console.log('dddd')
            this.node.active=false
        }
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
        switch(cell){
            case 0:
                switch(this.csv.name){
                    case '不如带个坏手机':
                        find('Canvas/2.5d/desk/手机').destroy()
                        //sys.localStorage.setItem('不如带个坏手机',JSON.stringify(true))
                        dialogLocalData.setSysLocalAboutDIalog('不如带个坏手机',action.add)
                        break
                    case '做技术课题':
                        dialogLocalData.setSysLocalAboutDIalog('ai生成',action.add)
                        break
                    case '做问卷调查':
                        dialogLocalData.setSysLocalAboutDIalog('重写问卷',action.add)
                        break
                }
                
                console.log('带手机到学校')
                break
            case 1:
                switch(this.node.name){
                    case '老师要来找我麻烦了':
                        dialogLocalData.setSysLocalAboutDIalog('保证不带手机',action.add)
                        console.log('666')
                        break
                    case '做技术课题':
                        dialogLocalData.setSysLocalAboutDIalog('问卷调查',action.add)
                        break
                    
                }
                console.log('不带手机到学校')
                break
            case 2:
                switch(this.node.name){
                    case '老师要来找我麻烦了':
                        dialogLocalData.setSysLocalAboutDIalog('在停学书上做文章',action.add)
                        console.log('666')
                        break
                    
                }
                console.log('不带手机到学校')
                break
            case 3:
                switch(this.node.name){
                    case '老师要来找我麻烦了':
                        dialogLocalData.setSysLocalAboutDIalog('签了字',action.add)
                        director.loadScene('home_2floor_livingroom-停学')
                        break
                    
                }
                console.log('不带手机到学校')
                break
        }
    }
    
    GenerateOption(_index: number) {
        while (true) {
            this.cell = this.dialogRows[_index].split(',');
            if (this.cell[0] == '&') {
                let button= instantiate(this.optionButton);
                button.setParent(this.Layout.node);
                let cell1=this.cell[1]
                let dd = this.cell[4];
                let cell = this.cell[5];
                let condition=this.cell[6];
                
                this.isChoose=true
                let ooc = () => {
                    this.isChoose=false
                    this.DialogueChooseFunc(cell);
                    this.onOptionClick(parseInt(dd));
                    if( this.eventHandler[cell1]){
                        this.eventHandler[cell1].emit([])
                    }
                };
                button.on(Button.EventType.CLICK, ooc, this);
                button.getComponentInChildren(Label).string = this.cell[3];
                //语法：“名字”:“值”
                console.log(typeof condition)
                if(condition!){
                    const condition2  =condition.replace(/[^a-zA-Z0-9 :]/g, '')
                    let celll=condition2.split(':')
                    console.log(celll,condition2)
                    console.log(sys.localStorage.getItem(celll[0]),celll[1])
                    if(sys.localStorage.getItem(celll[0])==celll[1]){
                        button.getComponent(Button).interactable=true
                    }else{
                        button.getComponent(Button).interactable=false
                    }
                }
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
    



