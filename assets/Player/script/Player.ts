import { _decorator, Collider2D, Component, Contact2DType, director, Animation, EventKeyboard, find, input, Input, IPhysics2DContact, KeyCode, Node, RigidBody2D, Sprite, v2, BaseNode, EPhysics2DDrawFlags, PhysicsSystem2D, Label, Prefab, instantiate, screen, ProgressBar, Vec2, sys } from 'cc';
import { interaction } from 'db://assets/tools/interaction/interaction';
import { stateUI } from '../../tools/状态栏/stateUI';
const { ccclass, property } = _decorator;
export let Anistate = {
    walk: 'walk',
    walkUp: 'walkUp',
    idle: 'idle',
    sitDown: 'sitDown',
    walkDown: 'walkDown',
    sitUp: 'sitUp',
    idleDown: 'idleDown',
    idleUp: 'idleUp',
    peopleIndesk: 'peopleIndesk',
}

export const group = {
    default: 1,
    Player: 2,
    interaction: 4,
}
@ccclass('Player')
export class Player extends Component {
    @property
    drawPhysics: boolean = false
    @property(Animation)
    Ani: Animation = null!
    @property(RigidBody2D)
    rBody: RigidBody2D = null!
    @property
    moveSpeed: number = 8
    right: boolean = false
    left: boolean = false
    anima: string;
    contact: boolean;
    interactionName: Node;
    canMove: boolean = true
    up: boolean = false
    down: boolean = false
    finallyDir: Vec2 = v2(0, 0);
    lockInPlayAnimation() {
        this.canMove = false
    }
    unlockInPlayAnimation() {
        this.canMove = true
    }
    start() {

        //screen.requestFullScreen()
        /*this.inventory=instantiate(this.bag)
        this.inventory.setParent(find('Canvas/Camera'))
        this.inventory.setPosition(0,300)*/
        if (this.drawPhysics == true) {
            PhysicsSystem2D.instance.debugDrawFlags = EPhysics2DDrawFlags.Aabb |
                EPhysics2DDrawFlags.Pair |
                EPhysics2DDrawFlags.CenterOfMass |
                EPhysics2DDrawFlags.Joint |
                EPhysics2DDrawFlags.Shape;
        }
        let colliderPlayer = this.node.getComponent(Collider2D);
        if (colliderPlayer) {
            console.log('67890')
            colliderPlayer.on(Contact2DType.BEGIN_CONTACT, this.onBeginContactPlayer, this);
            colliderPlayer.on(Contact2DType.END_CONTACT, this.onEndContactPlayer, this)
        }
        colliderPlayer.enabled = true
        console.log(colliderPlayer.group)
    }
    onLoad() {
        sys.localStorage.setItem('PlayerPath',this.node.getPathInHierarchy())


        this.anima = this.Ani.defaultClip.name
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    onDestroy() {

        input.off(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.off(Input.EventType.KEY_UP, this.onKeyUp, this);
    }
    idle() {
        this.setAni(Anistate.idle, true)
    }
    onKeyDown(event: EventKeyboard) {
        switch (event.keyCode) {
            case parseInt(sys.localStorage.getItem('left')):
                this.left = true
                console.log(this.left)
                break;
            case parseInt(sys.localStorage.getItem('right')):
                this.right = true

                break;
            case parseInt(sys.localStorage.getItem('up')):
                this.up = true

                break;
            case parseInt(sys.localStorage.getItem('down')):
                this.down = true

                break
            case parseInt(sys.localStorage.getItem('interaction')):
                console.log(this.anima)
                if (this.node.children[0].active == true) {
                    this.interactionName.getComponents(interaction).forEach(element => {
                        element.interactionContactFunction()
                    });
                    //this.interactionName.getComponent(interaction).interactionContactFunction()
                    this.node.children[0].active = false
                } else if (this.anima == Anistate.peopleIndesk) {
                    this.idle()
                } else if (this.node.children[1]) {
                    let equipName = this.node.children[1].name
                    this.node.children[1].setParent(find('Canvas/2.5d'))
                    find('Canvas/2.5d/' + equipName).setWorldPosition(this.node.worldPosition)
                }
                break
            /*case parseInt(sys.localStorage.getItem('esc')):
                director.loadScene('setting')
                break*/
            /*case parseInt(sys.localStorage.getItem('save')):
                sys.localStorage.setItem('SaveScene',director.getScene().name)
                /*let saveLabel=instantiate()
                saveLabel.addComponent(Label).string='保存'+director.getScene().name
                saveLabel.setParent(find('Canvas'))
                break
                */
        }
    }
    onKeyUp(event: EventKeyboard) {
        switch (event.keyCode) {
            case parseInt(sys.localStorage.getItem('left')):
                if (this.left == true) {

                    this.left = false
                    this.finallyDir = v2(-1, 0)
                }
                console.log(this.left)
                break;
            case parseInt(sys.localStorage.getItem('right')):
                if (this.right == true) {
                    this.right = false
                    this.finallyDir = v2(1, 0)
                }

                break;
            case parseInt(sys.localStorage.getItem('up')):
                if (this.up == true) {
                    this.up = false
                    this.finallyDir = v2(0, 1)
                }

                break
            case parseInt(sys.localStorage.getItem('down')):
                if (this.down == true) {
                    this.down = false
                    this.finallyDir = v2(0, -1)
                }
                break
        }
    }
    update(deltaTime: number) {
        if (this.node.children[0]) {
            this.node.children[0].setPosition(0, 84, 0)
        }
        //console.log(this.lnventory)
        this.move(deltaTime)
    }
    onBeginContactPlayer(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        //console.log(otherCollider.group)
        console.log(otherCollider.group)
        if (otherCollider.group == 4) {
            this.contact = true
            if (otherCollider.node.getComponent(interaction).canInteraction == true) {
                this.interactionName = otherCollider.node

                console.log(this.interactionName.name + 'onBeginContact')
                this.node.children[0].active = true
            }

        }
    }
    onEndContactPlayer(selfCollider: Collider2D, otherCollider: Collider2D, contact: IPhysics2DContact | null) {
        if (otherCollider.group == 4) {
            this.contact = false
            this.node.children[0].active = false
        }
        console.log(666)
    }
    move(deltaTime: number) {
        if (this.canMove == true) {

            //console.log(this.anima)
            if (this.anima == Anistate.idle || this.anima == Anistate.walk || this.anima == Anistate.walkUp || this.anima == Anistate.walkDown || this.anima == Anistate.idleDown || this.anima == Anistate.idleUp) {
                if (this.left == true || this.right == true) {
                    this.setAni(Anistate.walk, true)

                } else if (this.up == true || this.down == true) {
                    if (this.down == true) {
                        this.setAni(Anistate.walkDown, true)
                    } else if (this.up == true) {
                        this.setAni(Anistate.walkUp, true)
                    }
                }
                if (this.left == true) {
                    this.node.setScale(-1, 1, 1)
                } else if (this.right == true) {
                    this.node.setScale(1, 1, 1)
                }
                if (this.left == true && this.right == false) {
                    this.rBody.linearVelocity = v2(-1 * this.moveSpeed, this.rBody.linearVelocity.y)
                } else if (this.left == false && this.right == true) {
                    this.rBody.linearVelocity = v2(1 * this.moveSpeed, this.rBody.linearVelocity.y)
                } else {
                    if (this.up == false && this.down == false) {
                        if (this.finallyDir.y == 1) {
                            this.setAni(Anistate.idleUp, true)
                        } else if (this.finallyDir.y == -1) {
                            this.setAni(Anistate.idleDown, true)
                        }
                    }

                    this.rBody.linearVelocity = v2(0, this.rBody.linearVelocity.y)
                }
                if (this.up == true && this.down == false) {
                    this.rBody.linearVelocity = v2(this.rBody.linearVelocity.x, 1 * this.moveSpeed)
                } else if (this.up == false && this.down == true) {
                    this.rBody.linearVelocity = v2(this.rBody.linearVelocity.x, -1 * this.moveSpeed)
                } else {
                    if (this.left == false && this.right == false) {
                        if (this.finallyDir.x == 1 || this.finallyDir.x == -1) {
                            this.setAni(Anistate.idle, true)
                        }
                    }
                    this.rBody.linearVelocity = v2(this.rBody.linearVelocity.x, 0)
                }
            } else {

            }
        }

    }
    setAni(anima: string, 动画重复检测: boolean, node?: Animation) {
        if (动画重复检测 == true) {
            if (this.anima == anima) return
        }
        this.anima = anima
        if (node) {
            node.play(anima)
        } else { this.Ani.play(anima) }
    }
}

