import { _decorator, Component, Node, find, EventTouch, EventMouse, Collider2D, Contact2DType, IPhysics2DContact, Prefab, UITransform, v3, Camera, Enum, Layers, DynamicAtlasManager, AffineTransform, RigidBody2D, Terrain, Layout, director, instantiate, SpriteFrame, Sprite, inverseLerp, input, Input, EventKeyboard, KeyCode } from 'cc';
import { bag } from './bag';
import { interaction, interactionEvent } from '../../interaction/interaction';
import { action, dialog_galgame } from '../../dialog/typeScript/dialog_galgame';
import { size } from 'cc';
import { canChooseFood } from '../../烹饪/canChooseFood';
import { StateType, settingData } from '../../../UI/settingData';
import { PlayerLocal } from '../../../Player/script/PlayerLocalData';
import { dialogLocalData } from '../../本地存储/dialogLocal';
import { group, Player } from 'db://assets/Player/script/Player';
const { ccclass, property } = _decorator;
@ccclass('mezi')
export class mezi extends interaction {

    @property({
        visible: function (this: mezi) {
            return this.isFood == true
        }
    })
    增加的饱食度: number = 30
    @property
    isIngredients: boolean = false
    @property(SpriteFrame)
    在背包中的立绘: SpriteFrame = null!
    canPick: boolean = true
    contact: boolean = false
    parentPath: string = ''
    @property
    isFood = false
    playercontact: boolean;
    isTouch: boolean;
    info: string = ""
    protected update(dt: number): void {
        if (this.node.parent.parent.name == 'windows') {
            this.node.setPosition(0, 0, 0)
        }
    }
    onLoad(): void {
        super.onLoad()
        if (this.voidOnce == true && true == dialogLocalData.getSysLocalAboutDialogDOM(this.node.uuid)) {
            this.node.active = false
        }
       
    }
    pressEvent() {
        if (this.node.parent.name == 'content') {
            PlayerLocal.getPath()
            let PlayerNode = find(PlayerLocal.PlayerPath)
            console.log(PlayerNode.getPathInHierarchy(), 'Playeryyy')
            if (PlayerNode) {
                let PlayerScript = PlayerNode.getComponent(Player)
                if (PlayerScript.contact == true) {

                    PlayerScript.interactionName.getComponents(interaction).forEach(element => {
                        element.UseMezi(this.node.name)
                    })
                }
                console.log(PlayerScript.contact)
            }
            console.log('bagbag')

            switch (this.interactionEvent) {
                case interactionEvent.path:
                    this.path.active = true
                    break
                case interactionEvent.scene:
                    director.runScene(this.scene)
                    break
                case interactionEvent.prefab:
                    let prefab = instantiate(this.instantiateNode)
                    prefab.setParent(find('Canvas'))
                    prefab.setPosition(0, 0, 0)
                    if (this.isDialog == true) {
                        let galgame = prefab.getComponent(dialog_galgame)
                        galgame.csv = this.csv
                        galgame.endDelete = true
                        galgame.eventHandler = this.dialogEventHandler
                    }
                    this.info = prefab.getPathInHierarchy()
                    console.log(prefab)
                    break
            }
        }
        if (this.node.parent.name == 'windows') {
            this.node.parent.getComponent(canChooseFood).ChooseFood = this.node
            console.log('123')
        }
        if (this.node.parent.name == '布局') {
            this.interactionContactFunction()
        }
        console.log(this.node.parent.name)
    }
   
    start() {
        if (this.node.parent.name == 'content') {
            this.canPick = false
            this.node.getComponent(Sprite).sizeMode = Sprite.SizeMode.CUSTOM
            this.node.getComponent(UITransform).contentSize = size(128, 128)
            this.node.getComponent(Sprite).spriteFrame = this.在背包中的立绘
        }
        console.log(this.node.layer)
        let collider = this.getComponent(Collider2D);

        if (collider) {
            collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }
        this.node.on(Node.EventType.MOUSE_UP, (event: EventMouse) => {
            switch (event.getButton()) {
                case EventMouse.BUTTON_LEFT:
                    if (this.isTouch == false) {
                        this.pressEvent()
                    } else {
                        this.isTouch = false
                    }

                    break
                /*case EventMouse.BUTTON_RIGHT:
                    console.log('菜单'+this.node.name)
                    break*/
            }
        })
        this.node.on(Node.EventType.TOUCH_END, (event: EventTouch) => {

            if (this.node.parent.name == 'content') {
                let parentBag = this.node.parent.getComponent(bag)
                //检测拖拽到玩家身上且是食物就吃掉
                if (this.playercontact == true && this.isFood == true) {
                    parentBag.delete(this.node.name)
                }
                if (this.contact == true) {
                    console.log('put it up')
                    parentBag.delete(this.node.name, this.parentPath)
                    console.log(this.node.parent.name)
                }
                parentBag.getComponent(bag).alignHorizontal()
                console.log('7890')

            }
            if (this.node.parent.name == 'windows') {
                this.node.parent.getComponent(Layout).alignHorizontal = true
            }
        }, this)
        this.node.on(Node.EventType.TOUCH_CANCEL, (event: EventTouch) => {

            if (this.node.parent.name == 'content') {
                let parentBag = this.node.parent.getComponent(bag)
                //检测拖拽到玩家身上且是食物就吃掉
                if (this.playercontact == true && this.isFood == true) {
                    parentBag.delete(this.node.name)
                }
                if (this.contact == true) {
                    console.log('put it up')
                    parentBag.delete(this.node.name, this.parentPath)
                    console.log(this.node.parent.name)
                }
                parentBag.getComponent(bag).alignHorizontal()
                console.log('7890')

            }
            if (this.node.parent.name == 'windows') {
                this.node.parent.getComponent(Layout).alignHorizontal = true
            }
        }, this)
        this.node.on(Node.EventType.TOUCH_MOVE, (event: EventTouch) => {
            if (this.node.parent.name == 'content') {
                this.isTouch = true
                let e = find('Canvas/Camera').getComponent(Camera).screenToWorld(v3(event.getLocation().x, event.getLocation().y))
                this.node.setWorldPosition(e)

            }

        }, this)

    }
    onBeginContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        if (otherCollider.group == group.Player) {
            this.contact = true
            console.log(this.contact, 'contact')
            this.parentPath = otherCollider.node.getPathInHierarchy()
        }
        console.log('onBeginContact')
        if (otherCollider.node.parent.name == 'Player') {
            this.playercontact = true
        }
    }
    onEndContact(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        if (otherCollider.group == group.Player) {
            this.contact = false
            console.log(this.contact)
        }
        if (otherCollider.node.parent.name == 'Player') {
            this.playercontact = false
        }
    }
    interactionContactFunction(): void {
        if (this.voidOnce == true) {
            console.log('uuid', this.node.uuid)
            dialogLocalData.setSysLocalAboutDIalog(this.node.uuid, action.add)
        }
        this.node.destroy()

    }
    onDestroy() {
        super.onDestroy()
        //物品被拾起的调用
        if (this.node.parent.name != 'content' && this.node.parent.name != 'windows' && this.node.parent.parent.name != 'windows') {
            let inventory = find('Canvas/Camera/bag')
            let bagNode = find('Canvas/Camera/bag/view/content')
            if (inventory) {
                console.log(inventory.name)
                if (inventory.active = true) {
                    bagNode.getComponent(bag).add(this.node.name)
                } else {
                    inventory.active = true
                    bagNode.getComponent(bag).add(this.node.name)
                    inventory.active = false
                }

            }
            console.log('addBag')

        }
        //物品是食物被吃掉的调用
        if (this.node.parent.name == 'content') {
            if (this.isFood == true) {
                if (find('data')) {
                    let data = find('data').getComponent(settingData)
                    data.changeStateValue(StateType.饱食, this.增加的饱食度)
                }

            }
        }
    }
}


