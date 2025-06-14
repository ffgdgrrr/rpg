import { _decorator, Component, Node, TextAsset, Label, Button, Prefab, Layout, resources, instantiate, EventHandler, sys, SkelAnimDataHub, Camera, find, UITransform, tween, animation, Animation, director, EventKeyboard, KeyCode, Input, input, Sprite, SpriteFrame, BaseRenderData, view } from 'cc';
import { dialogLocalData } from '../../本地存储/dialogLocal';
import { AudioClip } from 'cc';
import { AudioSource } from 'cc';
import { color } from 'cc';
import { ProgressBar } from 'cc';
import { highPriorityGlobalInput } from '../../HighInput/HighPriorityGlobalInput';
const { ccclass, property } = _decorator;
export enum action {
    add,
    delete,
}
@ccclass('dialog_galgame')
export class dialog_galgame extends Component {
    @property(AudioSource)
    AudioSource: AudioSource = null!
    @property(AudioClip)
    AudioClip: AudioClip[] = []
    @property
    once: boolean = false
    @property([EventHandler])
    eventHandler: EventHandler[] = []
    @property({ tooltip: '没有放人物立绘的位置不显示图片' })
    NoPictureNoDisplay: boolean = false
    @property({ displayName: "人物立绘资源", tooltip: "图片数组代表在dialogindex的位置，比如0就在dialogindex等于0的时候显示图片", type: SpriteFrame })
    renwu_spriteFrame: SpriteFrame[] = []
    @property({ displayName: "背景图片资源", tooltip: "图片数组代表在dialogindex的位置，比如0就在dialogindex等于0的时候显示图片", type: SpriteFrame })
    bgSpriteFrame: SpriteFrame[] = []
    @property({ displayName: "切换背景图片组件", tooltip: "切换图片节点", type: Sprite })
    bg_sprite: Sprite = null!
    @property({ displayName: "切换人物立绘图片组件", tooltip: "切换图片节点", type: Sprite })
    renwu_sprite: Sprite = null!
    @property({ displayName: "csv对话文本文件", tooltip: "对话内容", type: TextAsset })
    csv: TextAsset = null!
    @property({ displayName: "对话", tooltip: "对话内容的label", type: Label })
    text: Label = null!
    @property({ displayName: "名字", tooltip: "名字的label", type: Label })
    Name: Label = null!
    @property(Prefab)
    optionButton: Prefab = null!
    @property(Layout)
    Layout: Layout = null!
    //跳转对话的id
    dialogindex: number = 0
    dialogRows: string[]=[]
    cell: string[];
    index: number;
    jumptext: string = null;
    canPress: boolean = true
    anima: string;
    @property(Prefab)
    TimeProgress: Prefab = null!
    @property
    endDelete: boolean = false
    canRestart: boolean;
    isChoose: boolean = false
    start() {
        if (this.once == true) {
            if (dialogLocalData.getSysLocalAboutDialogDOM(this.node.name)) {
                this.node.active = false
            }
            dialogLocalData.setSysLocalAboutDIalog(this.node.name, action.add)
        }
        //dialogLocalData.getSysLocalAboutDialog()
        this.readText(this.csv)
        this.showDialogRow()
    }
    becomeBlack() {
        tween(this.node.children[0].getComponent(Sprite))
            .by(0.1, { color: color(0, 0, 0, 30) })
            .start()
    }
    onLoad() {
        highPriorityGlobalInput.on(Input.EventType.TOUCH_START, this.click, this)
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.on(Input.EventType.KEY_PRESSING, this.onKeyDown, this)
        sys.localStorage.removeItem('JUMPTEXT')
    }
    click() {
        console.log('press')
        if (this.isChoose == false) {
            if (this.canPress == true && this.node.active == true) {
                this.onClickNext()
                /*if(this.node.name=='序'){
                    find('Canvas/Label').active=false
                }*/
            } else if (this.canPress == false) {
                this.unscheduleAllCallbacks()
                this.text.string = sys.localStorage.getItem('text')
                this.canPress = true
            }
        }
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case parseInt(sys.localStorage.getItem('next')):
                if(this.dialogRows.length>0){
                    this.click()
                }
                
                break;
        }
    }
    protected onDestroy(): void {
        highPriorityGlobalInput.off(Input.EventType.TOUCH_START, this.click, this)
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        input.off(Input.EventType.KEY_PRESSING, this.onKeyDown, this)
    }
    update(deltaTime: number) {
        //this.node.setPosition(find('Canvas/Camera').position)
    }
    showTextAnim(text: string) {
        sys.localStorage.setItem('text', text)
        for (let i = 0; i < text.length; i++) {
            this.scheduleOnce(() => {
                this.text.string += text[i]
                if (this.text.string == text) {
                    this.canPress = true
                    console.log('canpress')
                }
            }, 0.1 * i)
        }

    }
    setAni(anima: string, node: Animation, 动画重复检测: boolean) {
        if (动画重复检测 == true) {
            if (this.anima == anima) { return }
        }
        this.anima = anima
        node.play(anima)
    }
    updateText(_name: string, _text: string) {
        if (this.eventHandler[this.dialogindex]) {
            this.eventHandler[this.dialogindex].emit([])
        }
        if (this.AudioClip[this.dialogindex]) {
            this.AudioSource.stop()
            this.AudioSource.clip = this.AudioClip[this.dialogindex]
            this.AudioSource.play()
        }
        this.Name.string = _name;
        this.canPress = false
        this.text.string = "";
        if (this.renwu_spriteFrame[this.dialogindex] != null) {
            this.renwu_sprite.spriteFrame = this.renwu_spriteFrame[this.dialogindex];
        } else if (this.NoPictureNoDisplay == true) {
            this.renwu_sprite.spriteFrame = null
        }
        if (this.bgSpriteFrame[this.dialogindex] != null) {
            this.bg_sprite.spriteFrame = this.bgSpriteFrame[this.dialogindex];
            this.resizeBackground()
        }
        // 逐字显示文本
        this.showTextAnim(_text)
    }
    // 在设置完 spriteFrame 后调用这个函数
    private resizeBackground() {
        // 获取屏幕可见区域尺寸
        const screenSize = view.getVisibleSize();

        // 获取图片原始尺寸
        const spriteFrame = this.bg_sprite.spriteFrame;
        const textureSize = spriteFrame?.originalSize;
        if (!textureSize) return;

        // 计算屏幕与图片的宽高比
        const screenRatio = screenSize.width / screenSize.height;
        const imageRatio = textureSize.width / textureSize.height;

        // 计算适配比例
        let targetScale = 1;
        if (screenRatio > imageRatio) {
            // 以高度为基准缩放
            targetScale = screenSize.height / textureSize.height;
        } else {
            // 以宽度为基准缩放
            targetScale = screenSize.width / textureSize.width;
        }

        // 应用缩放
        this.bg_sprite.node.setScale(targetScale, targetScale);

        // 确保居中显示（如果锚点不是0.5需要调整）
        this.bg_sprite.node.setPosition(0, 0);
    }
    readText(_TextAsset: TextAsset) {
        this.dialogRows = _TextAsset.text.split('\n')
    }
    showDialogRow() {

        for (let index = 0; index < this.dialogRows.length; index++) {
            this.cell = this.dialogRows[index].split(',')
            if (this.cell[0] == '#' && parseInt(this.cell[1]) == this.dialogindex) {
                this.canPress = true
                this.updateText(this.cell[2], this.cell[3])
                this.dialogindex = parseInt(this.cell[4])
                this.DialogueFunc(this.cell[5])
                console.log(this.cell[4])

                if (this.cell[4] == '') {
                    if (this.eventHandler[this.dialogindex]) {
                        this.eventHandler[this.dialogindex].emit([])
                    }
                    console.log('endFunc')
                    this.endFunc()
                }
                break
            } else if (this.cell[0] == '&' && parseInt(this.cell[1]) == this.dialogindex) {
                this.canPress = false
                this.GenerateOption(index)
            }
        }
    }
    onOptionClick(id: number) {

        this.dialogindex = id
        this.showDialogRow()
        for (let index = 0; index < this.Layout.getComponentsInChildren(Button).length; index++) {
            this.Layout.node.destroyAllChildren()
        }
    }
    //对话选项绑定函数
    DialogueChooseFunc(cell5) {
        

    }
    endFunc() {
        
    }
    Restart() {
        this.readText(this.csv)
        this.dialogindex = 0
        this.cell = this.dialogRows[1].split(',')
        if (this.canRestart == true) {
            this.showDialogRow()
            this.canRestart = false
        }

    }
    DialogueFunc(cell5) {
       
    }

    GenerateOption(_index: number) {
        while (true) {
            this.cell = this.dialogRows[_index].split(',');
            if (this.cell[0] == '&') {
                let button = instantiate(this.optionButton);
                button.setParent(this.Layout.node);
                let cell1 = this.cell[1]
                let dd = this.cell[4];
                let cell = this.cell[5];
                let condition = this.cell[6];
                let time = this.cell[7]
                let elseSkip = this.cell[8]
                this.isChoose = true
                let ooc = () => {
                    this.unscheduleAllCallbacks()
                    this.isChoose = false
                    this.DialogueChooseFunc(cell);
                    this.onOptionClick(parseInt(dd));
                    if (this.eventHandler[cell1]) {
                        this.eventHandler[cell1].emit([])
                    }


                };
                if (time) {
                    let TimeProgress = instantiate(this.TimeProgress)
                    TimeProgress.setParent(this.node)
                    tween(TimeProgress.getComponent(ProgressBar))
                        .to(Number(time), { progress: 0 })
                        .call(() => {
                            TimeProgress.destroy()
                        })
                        .start()
                    this.scheduleOnce(() => {
                        const condition2 = elseSkip.replace(/[^a-zA-Z0-9 :]/g, '')
                        this.dialogindex = Number(condition2)

                        for (let index = 0; index < this.Layout.getComponentsInChildren(Button).length; index++) {
                            this.Layout.node.destroyAllChildren()
                        }
                        this.showDialogRow()
                        this.isChoose = false
                    }, Number(time))
                }
                button.on(Button.EventType.CLICK, ooc, this);
                button.getComponentInChildren(Label).string = this.cell[3];
                //语法：“名字”:“值”
                console.log(typeof condition)
                if (condition.trim()) {
                    const condition2 = condition.replace(/[^a-zA-Z0-9 :]/g, '')
                    // let celll = condition2.split(':')
                    // console.log(celll, condition2)
                    // console.log(sys.localStorage.getItem(celll[0]), celll[1])
                    if (dialogLocalData.getSysLocalAboutDialogDOM(condition2)) {
                        button.getComponent(Button).interactable = true
                    } else {
                        button.getComponent(Button).interactable = false
                    }
                }
                _index++;
            } else {
                break;
            }
        }
    }
    onClickNext() {
        /*this.button_next.node.active=true
        this.cell=this.dialogRows[parseInt(this.jumptext)].split(',')
        this.dialogindex=parseInt(this.cell[4])*/
        this.showDialogRow()
    }
}




