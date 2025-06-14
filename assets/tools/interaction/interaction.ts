import { __private, _decorator, Component, director, Enum, EventKeyboard, find, input, Input, instantiate, Node, Prefab, resources, SceneAsset, sys, TextAsset } from 'cc';
import { action, dialog_galgame } from '../dialog/typeScript/dialog_galgame';
import { mezi } from '../inventory/script/mezi';
import { EventHandler } from 'cc';
import { Animation } from 'cc';
import { AnimationClip } from 'cc';
import { AnimationState } from 'cc';
import { settingData, StateType } from '../../UI/settingData';
import { bag } from '../inventory/script/bag';
import { dialogLocalData } from '../本地存储/dialogLocal';
import { EventTouch } from 'cc';
Enum(StateType)
const { ccclass, property } = _decorator;
export enum interactionEvent {
    scene,
    path,
    prefab,
    animation,
    NONE,
    alert,
    value,
    localStorage,
}
enum compareNumber {
    '==',
    '>=',
    '<=',
    '>',
    '<',
}
Enum(compareNumber)
@ccclass('localStoarge')
class localStoarge {
    @property
    Key: string = ''
    @property
    Value: string = ''
}
@ccclass('inventory')
class inventory {
    @property
    meziName: string = ''
    @property
    Count: number = 1
}
@ccclass('State')
class State {

    @property
    number: number = 0
    @property({ type: compareNumber, tooltip: 'number在左边,StateType在右边' })
    compareType: compareNumber = compareNumber['<']
    @property({ type: StateType })
    StateType: StateType = StateType.心情

}
@ccclass('dialogLocalSet')
class dialogLocalSet {
    @property
    dialogLocal: string = ''
    @property
    EqualType: boolean = true
}
// @ccclass('confidentsetter')
// class confidentsetter{
//     @property({type:localStoarge})
//     localStorage:localStoarge[]=[];
//     @property({type:State})
//     State:State[]=[];
//     @property({type:inventory})
//     inventory:inventory[]=[];
// }
Enum(interactionEvent)
@ccclass('interaction')
export class interaction extends Component {
    @property
    canInteraction: boolean = true
    @property
    voidOnce: boolean = false
    @property
    启用条件: boolean = false
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true
        }
    })
    else: boolean = false;
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true
        }, type: localStoarge
    })
    localStorage: localStoarge[] = [];
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true
        }, type: inventory
    })
    inventroy: inventory[] = [];
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true
        }, type: State
    })
    State: State[] = [];
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true
        }, type: dialogLocalSet
    })
    dialogLocalSet: dialogLocalSet[] = []
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true && this.isUseMezi == true
        }
    })
    NeedlyMezi: string = ''
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true && this.isUseMezi == true
        }
    })
    MeziOnce: boolean = false
    @property({
        visible: function (this: interaction) {
            return this.启用条件 === true
        }
    })
    isUseMezi: boolean = false
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.scene
        }
    })
    isEmitFrontScene: boolean = false
    @property([EventHandler])
    eventHandler: EventHandler[] = []

    @property({
        type: [EventHandler], visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.prefab && this.isDialog == true
        }
    })
    dialogEventHandler: EventHandler[] = []
    @property
    canQuit: boolean = false
    once: number = 0
    @property
    finishedTalk: boolean = false
    @property
    isMezi: boolean = false
    @property
    isDialog: boolean = false
    @property({ type: interactionEvent })
    interactionEvent = interactionEvent.NONE
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.localStorage;
        }
    })
    key: string = '';
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.value;
        }, type: StateType
    })
    changeValue: StateType = StateType.金钱
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.value;
        }
    })
    changeNumber: number = 10
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.alert;
        }, type: Node
    })
    alertMessage: Node = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.path && this.isDialog == false;
        }, type: Node
    })
    path: Node = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.animation;
        }, type: Animation
    })
    animation: Animation = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.animation;
        }, type: AnimationClip
    })
    animationClip: AnimationClip = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.animation;
        }, type: [EventHandler]
    })
    onAnimationFinishedFunc: EventHandler[] = []
    @property({
        type: TextAsset,
        visible: function (this: interaction) {
            return this.isDialog === true && this.interactionEvent === interactionEvent.prefab
        }
    })
    csv: TextAsset = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.scene;
        }, type: SceneAsset
    })
    scene: SceneAsset = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.prefab;
        }, type: Prefab
    })
    instantiateNode: Prefab = null!;
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.prefab && this.isDialog == false;
        }, type: Node
    })
    instantiateParent: Node = null!
    @property({
        visible: function (this: interaction) {
            return this.interactionEvent === interactionEvent.path && this.isDialog == true
        }, type: Node
    })
    dialogPath: Node[] = []
    dialogIndex: number = 0;
    interactionContactFunction() {
        let func = () => {

            switch (this.interactionEvent) {
                case interactionEvent.localStorage:
                    console.log(dialogLocalData.getSysLocalAboutDialog())
                    dialogLocalData.setSysLocalAboutDIalog(this.key, action.add)
                case interactionEvent.value:
                    find('data').getComponent(settingData).changeStateValue(this.changeValue, this.changeNumber)
                    break
                case interactionEvent.animation:
                    this.animation.play(this.animationClip.name)
                    break
                case interactionEvent.path:
                    if (this.isMezi == false) {

                        if (this.isDialog == true) {
                            this.dialogPath[this.dialogIndex].getComponent(dialog_galgame).Restart()
                            this.dialogPath[this.dialogIndex].active = true
                            if (this.dialogPath.length > this.dialogIndex + 1) {
                                this.dialogIndex++
                            }
                            console.log('dp' + this.dialogIndex)
                        } else {
                            if (this.path.active == false) {
                                this.path.active = true
                            } else if (this.path.active == true) {
                                this.path.active = false
                            }

                        }
                    } else if (this.isMezi == true) {
                        this.path.destroy()
                    }
                    break
                case interactionEvent.scene:
                    if (this.isEmitFrontScene == true) {
                        sys.localStorage.setItem('FrontScene', director.getScene().name)
                        console.log('emitScene', sys.localStorage.getItem('FrontScene'))
                    }
                    director.loadScene(this.scene.name)
                    break
                case interactionEvent.prefab:

                    if (this.isDialog == true) {
                        let prefab = instantiate(this.instantiateNode)
                        prefab.setParent(find('Canvas'))
                        prefab.setPosition(0, 0, 0)
                        prefab.getComponent(dialog_galgame).csv = this.csv
                        prefab.getComponent(dialog_galgame).eventHandler = this.dialogEventHandler
                    } else {
                        let prefab = instantiate(this.instantiateNode)
                        prefab.setParent(this.instantiateParent)
                        prefab.setPosition(0, 0, 0)
                    }

                    break
                case interactionEvent.alert:
                    alert(this.alertMessage)
                    break
            }
            for (let i = 0; i < this.eventHandler.length; i++) {
                this.eventHandler[i].emit([])
            }
            if (this.voidOnce == true) {
                console.log('uuid', this.node.uuid)
                dialogLocalData.setSysLocalAboutDIalog(this.node.uuid, action.add)
            }
        }
        if (this.启用条件 == false) {
            func()
        } else {
            let canInteraciton: boolean = true
            let fuckYou = false
            this.localStorage.forEach((value, index) => {
                if (sys.localStorage.getItem(value.Key) == value.Value) {
                    if (this.else == true) {
                        fuckYou = true
                    }
                } else {

                    canInteraciton = false
                }
            })
            this.inventroy.forEach((value, index) => {
                let bagScript = find('Canvas/Camera/bag/view/content').getComponent(bag)
                if (bagScript.checkHas(value.meziName, value.Count)) {
                    if (this.else == true) {
                        fuckYou = true
                    }
                } else {

                    canInteraciton = false
                }
            })
            this.State.forEach(value => {
                if (this.else == true) {
                    fuckYou = true
                }
                if (this.compareWithStateType(value.compareType, value.number) == false) {
                    canInteraciton = false
                    fuckYou = false
                }

            })
            this.dialogLocalSet.forEach(value => {
                if (dialogLocalData.getSysLocalAboutDialogDOM(value.dialogLocal) == value.EqualType) {
                    console.log(dialogLocalData.getSysLocalAboutDialogDOM(value.dialogLocal))
                    if (this.else == true) {
                        fuckYou = true
                    }
                } else {

                    canInteraciton = false
                }
            })

            if (fuckYou == false && this.else == true) {
                func()
            }

            if (canInteraciton == true && this.isUseMezi == false && this.else == false) {
                func()
            }
        }

    }
    UseMezi(mezi: string) {
        let func = () => {

            switch (this.interactionEvent) {
                case interactionEvent.localStorage:
                    console.log(dialogLocalData.getSysLocalAboutDialog())
                    dialogLocalData.setSysLocalAboutDIalog(this.key, action.add)
                case interactionEvent.value:
                    find('data').getComponent(settingData).changeStateValue(this.changeValue, this.changeNumber)
                    break
                case interactionEvent.animation:
                    this.animation.play(this.animationClip.name)
                    break
                case interactionEvent.path:
                    if (this.isMezi == false) {

                        if (this.isDialog == true) {
                            this.dialogPath[this.dialogIndex].getComponent(dialog_galgame).Restart()
                            this.dialogPath[this.dialogIndex].active = true
                            if (this.dialogPath.length > this.dialogIndex + 1) {
                                this.dialogIndex++
                            }
                            console.log('dp' + this.dialogIndex)
                        } else {
                            if (this.path.active == false) {
                                this.path.active = true
                            } else if (this.path.active == true) {
                                this.path.active = false
                            }

                        }
                    } else if (this.isMezi == true) {
                        this.path.destroy()
                    }
                    break
                case interactionEvent.scene:
                    if (this.isEmitFrontScene == true) {
                        sys.localStorage.setItem('FrontScene', director.getScene().name)
                        console.log('emitScene', sys.localStorage.getItem('FrontScene'))
                    }
                    director.loadScene(this.scene.name)
                    break
                case interactionEvent.prefab:

                    if (this.isDialog == true) {
                        let prefab = instantiate(this.instantiateNode)
                        prefab.setParent(find('Canvas'))
                        prefab.setPosition(0, 0, 0)
                        prefab.getComponent(dialog_galgame).csv = this.csv
                        prefab.getComponent(dialog_galgame).eventHandler = this.dialogEventHandler
                    } else {
                        let prefab = instantiate(this.instantiateNode)
                        prefab.setParent(this.instantiateParent)
                        prefab.setPosition(0, 0, 0)
                    }

                    break
                case interactionEvent.alert:
                    alert(this.alertMessage)
            }
            for (let i = 0; i < this.eventHandler.length; i++) {
                this.eventHandler[i].emit([])
            }
        }
        if (this.启用条件 == false) {
            func()
        } else {
            let canInteraciton: boolean = true
            this.localStorage.forEach((value, index) => {
                if (sys.localStorage.getItem(value.Key) == value.Value) {

                } else {
                    canInteraciton = false
                }
            })
            this.inventroy.forEach((value, index) => {
                let bagScript = find('Canvas/Camera/bag/view/content').getComponent(bag)
                if (bagScript.checkHas(value.meziName)) {

                } else {
                    canInteraciton = false
                }
            })
            this.State.forEach(value => {
                if (this.compareWithStateType(value.compareType, value.number) == false) {
                    canInteraciton = false
                }
            })
            this.dialogLocalSet.forEach(value => {
                if (dialogLocalData.getSysLocalAboutDialogDOM(value.dialogLocal) == value.EqualType) {
                    console.log(dialogLocalData.getSysLocalAboutDialogDOM(value.dialogLocal))
                } else {
                    canInteraciton = false
                }
            })
        }


        if (this.isUseMezi == true) {
            if (this.NeedlyMezi == mezi) {
                if (this.MeziOnce == true) {
                    find('Canvas/Camera/bag/view/content').getComponent(bag).delete(this.NeedlyMezi)
                }
                func()
            }
        }
    }
    compareWithStateType(stateType: compareNumber, number: number): boolean {
        switch (stateType) {
            case compareNumber['==']:
                return number == stateType;
            case compareNumber['>=']:
                return number >= stateType;
            case compareNumber['<=']:
                return number <= stateType;
            case compareNumber['>']:
                return number > stateType;
            case compareNumber['<']:
                return number < stateType;

        }
    }
    loadCSV() {

    }
    onDestroy() {
        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);

    }
    onLoad() {
        if (this.voidOnce == true && true == dialogLocalData.getSysLocalAboutDialogDOM(this.node.uuid)) {
            this.interactionEvent = interactionEvent.NONE
            console.log('NONE')
        }
        if (this.animation) {
            this.animation.on(Animation.EventType.FINISHED, (type: Animation.EventType, state: AnimationState) => {
                if (this.animationClip.name == state.clip.name)
                    this.onAnimationFinishedFunc.forEach(element => {
                        element.emit([])
                    })
            })
        }

        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this)
        console.log('drag666')
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case parseInt(sys.localStorage.getItem('next')):
                this.interactionQuit()
                console.log('press_next')
                break;
        }
    }
    interactionQuit() {

        //判断交互物体是否指向对话，如果不是，按下继续（next）键即可关闭生成的prefab
        if (this.canQuit == true) {
            switch (this.interactionEvent) {
                case interactionEvent.path:
                    if (this.isDialog == false) {
                        this.path.active = false
                    }

                    break
                case interactionEvent.prefab:

                    if (this.isDialog == false) {
                        setTimeout(() => {
                            if (this.path) {
                                this.path.destroy()
                            }

                        });

                    }

                    break
            }
        }

    }
    funcFinished: boolean
}

